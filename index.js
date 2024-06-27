const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

db.serialize(() => {
    db.run(
        "CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, password TEXT)"
    );
});

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/home", (_, res) => {
    res.sendFile(__dirname + "/home.html");
});

app.get("/cadastrar", (_, res) => {
    res.sendFile(__dirname + "/cadastrar.html");
});

app.post("/signup", (req, res) => {
    const body = req.body;
    console.log(req.body);
    const { email, password } = body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Body da requisiçõa é inválido" });
    }

    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    stmt.get(email, (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao buscar usuário" });
        }

        if (row) {
            return res.status(409).json({ message: "Usuário já cadastrado" });
        }

        const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
        stmt.run(email, password, (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Erro ao cadastrar usuário" });
            }

            res.status(201).json({
                message: "Usuário cadastrado com sucesso!",
            });
        });
    });
});

app.post("/login", (req, res) => {
    const body = req.body;
    const { email, password } = body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Body da requisiçõa é inválido" });
    }

    const stmt = db.prepare(
        "SELECT * FROM users WHERE email = ? AND password = ?"
    );
    const user = stmt.get(email, password);

    if (!user) {
        return res.status(401).json({ message: "Usuário ou senha inválida" });
    }

    res.status(200).json({ message: "Logado com sucesso!" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

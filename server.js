const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, _, next) => {
    console.log(`[REQ] ${req.method} ${req.url}`);
    next();
});

app.get("/", (_, res) => {
    res
        .status(303)
        .location("/login")
        .end();
});

app.get("/login", (_, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`SW POC server running: http://localhost:${PORT}`);
});
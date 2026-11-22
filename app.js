const http = require("http");
const fs = require("fs");
const { getAccountCount } = require("./utils");

// Читаем данные из JSON-файла
const data = fs.readFileSync("./data/accounts.json", "utf-8");
const accounts = JSON.parse(data);

// Выводим количество счетов в консоль при запуске
console.log("Количество счетов в базе: ", getAccountCount(accounts));

const server = http.createServer((req, res) => {
    // Обработка GET-запроса к /api/accounts
    if (req.method === "GET" && req.url === "/api/accounts") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(accounts));
        return;
    }

    // Обработка всех остальных маршрутов (404)
    res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "Маршрут не найден" }));
});

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => {
    console.log(`Сервер запущен на порту ${port}`);
});
const http = require('http');
const getUsers = require('../module/users')

const hostname = '127.0.0.1';
const port = 3003;

const server = http.createServer((req, res) => {
    const currentUrl = new URL(req.url, "http://127.0.0.1");
    const params = currentUrl.searchParams;
    const name = params.get("hello");
    const users = params.has("users");
    const hello = params.has("hello");

    for (let value of params.keys()) {
        if (value !== "hello" && value !== "users") {
          res.status = 500;
          res.header = "Content-Type: text/plain";
          res.write("Error");
          res.end();
          return;
        }
    }

    if (name) {
        res.status = 200;
        res.statusMessage = "OK";
        res.header = "Content-Type: text/plain";
        res.write(`"Hello, ${name}"`);
        res.end();
        return;
    }

    if (hello && !name) {
        res.status = 400;
        res.header = "Content-Type: text/plain";
        res.write("Enter a name");
        res.end();
        return;
    }

    if (users) {
        res.status = 200;
        res.statusMessage = "OK";
        res.header = "Content-Type: application/json";
        res.write(getUsers());
        res.end();
        return;
    }

    if (!hello && !users) {
        res.status = 200;
        res.statusMessage = "OK";
        res.header = "Content-Type: text/plain";
        res.write("Hello, world");
        res.end();
        return;
    }
});

server.listen(port, hostname, () => {
    console.log(`Сервер запущен по адресу http://${hostname}:${port}/`)
});
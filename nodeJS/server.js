const http = require('http');

const api_users = require('./routers/api_users.js');
const api_sort = require('./routers/api_sort.js');
const api_bubble = require('./routers/api_bubble.js');

const server = http.createServer((req, res) => {
    let time = new Date().getTime(),
        body = '';

    if (req.method === 'GET') {
        if (req.url.includes('?')) {
            [req.url, body] = req.url.split('?');
        }

        if (req.url === '/') res.end();

        if (req.url === '/api/users') api_users(req, res, time);

        if (req.url === '/api/sort') api_sort(req, res, body);

        if (req.url === '/api/bubble') api_bubble(req, res);
    } else if (req.method === 'POST') {
        res.end();
    }
})

server.listen(8000, () => {
    console.log('server is running...');
})
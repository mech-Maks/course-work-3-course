const http = require('http');

const route_get = require('./routers/route_get.js');
const route_post = require('./routers/route_post.js');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        route_get(req, res);
    } else if (req.method === 'POST') {
        route_post(req, res);
    }
})

server.listen(8000, () => {
    console.log('server is running...');
})
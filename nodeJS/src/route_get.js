const fs = require('fs');
const path = require('path');

module.exports = function route_get(req, res) {
    if (req.url === '/') {
        res.end();
    }

    if (req.url === '/api/users') {
        // show users in json-format
        res.writeHead(200, {
            'Content-Type': 'text/json',
            'Access-Control-Allow-Origin': '*'
        });

        fs.readFile(path.join(__dirname, '../..', 'data', 'users.json'),
            'utf-8',
            (err, content) => {
                if (err) throw err;

                res.end(content);
            }
        )
    }
}
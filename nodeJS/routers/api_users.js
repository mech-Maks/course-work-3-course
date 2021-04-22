const fs = require('fs');
const path = require('path');

module.exports = function api_users(req, res, time) {
    res.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*'
    });

    // Считывает как строку
    fs.readFile(path.join(__dirname, './../..', 'data', 'users_300000.json'),
        'utf-8',
        (err, content) => {
            if (err) throw err;
            time = new Date().getTime() - time;

            res.end(`time=${time}//` + content); // закончить с отправкой строки
        }
    )

}
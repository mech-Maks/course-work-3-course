const fs = require('fs');
const path = require('path');

module.exports = function api_users(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*'
    });

    let time_read = Date.now();
    let content = fs.readFileSync(path.join(__dirname, './../..', 'data', 'users_300000.json'),
        'utf-8'
    );
    time_read = Date.now() - time_read;

    let time_write = Date.now();
    fs.writeFileSync(path.join(__dirname, './../../write_file_res/res.json'), content);
    time_write = Date.now() - time_write;

    res.end(`time=${time_read}&${time_write}//` + content); // закончить с отправкой строки
}
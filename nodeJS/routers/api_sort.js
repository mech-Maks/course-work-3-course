const fs = require('fs');
const path = require('path');

function readSync(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, fileName),
            'utf-8',
            (err, content) => {
                if (err) reject(err);

                resolve(JSON.parse(content));
            })
    })
}

module.exports = async function api_sort(req, res, body) {
    let time = [],
        users_75,
        users_150,
        users_300,
        type = body.split('=')[1],
        files = [
            './../../data/users_75000.json',
            './../../data/users_150000.json',
            './../../data/users_300000.json'
        ]

    res.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*'
    });

    users_75 = await readSync(files[0]);
    users_150 = await readSync(files[1]);
    users_300 = await readSync(files[2]);

    time[0] = Date.now();
    users_75 = sort_arr(users_75, type);
    time[0] = Date.now() - time[0];

    time[1] = Date.now();
    users_150 = sort_arr(users_150, type);
    time[1] = Date.now() - time[1];

    time[2] = Date.now();
    users_300 = sort_arr(users_300, type);
    time[2] = Date.now() - time[2];

    res.end(JSON.stringify(time));
}

function sort_arr(users, type) {
    if (type === 'fullName') {
        return sort_names(users);
    }
    else if (type === 'age') {
        return sort_numbers_int(users);
    }
    else if (type === 'rate') {
        return sort_numbers_float(users);
    }
}

function sort_names(users) {
    if (users.length === 0) return [];

    let temp_arr = users.map((el, i) => {
        return {
            index: i,
            value: el.fullName.toLowerCase()
        };
    });

    temp_arr.sort((a, b) => {
        if (a.value > b.value) return 1;
        if (a.value < b.value) return -1;
        return 0;
    })

    return temp_arr.map(el => {
        return users[el.index];
    });
}

function sort_numbers_int(users) {
    return users.sort((a, b) => {
        return (Number(a.age) - Number(b.age));
    })
}

function sort_numbers_float(users) {
    return users.sort((a, b) => {
        return (Number(a.rate) - Number(b.rate));
    })
}
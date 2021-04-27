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

module.exports = async function api_bubble(req, res) {
    let time = [],
        users_4700,
        users_9375,
        users_18750,
        files = [
            './../../data/users_4700.json',
            './../../data/users_9375.json',
            './../../data/users_18750.json'
        ]

    res.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*'
    });

    users_4700 = await readSync(files[0]);
    users_9375 = await readSync(files[1]);
    users_18750 = await readSync(files[2]);

    time[0] = Date.now();
    sort_arr(users_4700);
    time[0] = Date.now() - time[0];

    time[1] = Date.now();
    sort_arr(users_9375);
    time[1] = Date.now() - time[1];

    time[2] = Date.now();
    sort_arr(users_18750);
    time[2] = Date.now() - time[2];

    console.log(users_18750.slice(0, 5));

    res.end(JSON.stringify(time));
}

function sort_arr(a) {
    let temp = new Object(),
        n = a.length,
        i, j;

    for (i = 0; i < n; i++) {
        for (j = 0; j < n - 1; j++) {
            if (a[j].rate > a[j + 1].rate) {
                copy_obj(a[j], temp);
                copy_obj(a[j + 1], a[j]);
                copy_obj(temp, a[j + 1]);
            }
        }
    }
}

function copy_obj(a, b) {
    b.fullName = a.fullName;
    b.sex = a.sex;
    b.birth = a.birth;
    b.age = a.age;
    b.rate = a.rate;
}


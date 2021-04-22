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

function copy_obj(a, b) {
    b.fullName = a.fullName;
    b.sex = a.sex;
    b.birth = a.birth;
    b.age = a.age;
    b.rate = a.rate;
}

async function start() {
    let users_4700 = await readSync('./../../data/users_4700.json');
    let time,
        i, j,
        temp = new Object(),
        n = users_4700.length;

    time = new Date().getTime();

    for (i = 0; i < n; i++) {
        for (j = 0; j < n - 1; j++) {
            if (users_4700[j].age > users_4700[j + 1].age) {

                copy_obj(users_4700[j], temp);
                copy_obj(users_4700[j + 1], users_4700[j]);
                copy_obj(temp, users_4700[j + 1]);
            }
        }
    }
    time = new Date().getTime() - time;
    console.log(time);
    console.log(users_4700.splice(0, 5));
}

start();
// Создает дата-сет пользователей (размер передается первым параментром) и 
// сохраняет его в data/users.json

'use strict';

const fs = require('fs');
const path = require('path');

function readSync(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, fileName),
            'utf-8',
            (err, content) => {
                if (err) reject(err);

                resolve(content);
            })
    })
}

function getRandomDate() {
    let month = getRandomInterval(1, 12),
        day = 0,
        year = getRandomInterval(1970, 2005);

    if (month == 1) {
        day = getRandomInterval(1, 28);
    } else if ((month < 7 && month % 2 == 0) || (month > 6 && month % 2 == 1)) {
        day = getRandomInterval(1, 31);
    } else {
        day = getRandomInterval(1, 30);
    }

    return String(day) + '-' + String(month) + '-' + String(year);
}

// Границы включаются
function getRandomInterval(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return min + Math.floor(Math.random() * (max - min + 1));
}

// на вход подается дд-мм-гггг
function getAge(str) {
    let comps = str.split('-'),
        now = new Date(),
        age;

    comps = comps.map(el => Number(el));

    age = now.getFullYear() - comps[2] - 1;

    if (comps[1] - 1 < now.getMonth()) age++;
    else if (comps[1] - 1 === now.getMonth()) {
        if (comps[0] <= now.getDate()) age++;
    }

    return age;
}

(async function () {
    let names = await readSync('./big_data/names.json'),
        surnames = await readSync('./big_data/surnames.json'),
        // surnames = await readSync('surnames-data.json'),
        counter = 0,
        i = 0, j = 0,
        users_amount = 0,
        names_length,
        found = 0,
        birth_date,
        max_users = process.argv[2] || 5000;

    names = JSON.parse(names);
    surnames = JSON.parse(surnames);

    names_length = names.length;

    let users = [];

    surnames.forEach(surname => {
        if (users_amount >= max_users) return;
        found = 0;
        if (counter >= names_length) counter = 0;
        i = counter;

        while (found === 0) {
            if (names[i].Sex === surname.Sex) {
                birth_date = getRandomDate();

                users.push({
                    'fullName': surname.Surname + ' ' + names[i].Name,
                    'sex': surname.Sex,
                    'birth': birth_date,
                    'age': getAge(birth_date)
                });
                found = 1;
                counter = i + 1;
                users_amount++;
            }
            i++;
            if (i >= names_length) i = 0;
        }
    });

    fs.writeFile(path.join(__dirname, '../data', 'users.json'),
        JSON.stringify(users),
        (err) => {
            if (err) throw err;
        })

})();
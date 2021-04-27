'use strict';

let GetApiUsersReqsAmount = document.querySelector('.api-users-reqs'),
    GetSortUsersReqsAmount = document.querySelector('.sort-users-reqs'),
    apiUsersReqsAmount = 1,
    sortUsersReqsAmount = 1,
    nodejsSortType = 'fullName',
    phpSortType = 'fullName',
    sortTimesNodejs = [0, 0, 0],
    sortTimesPhp = [0, 0, 0],
    bubbleSortTimesNodejs = [0, 0, 0],
    bubbleSortTimesPhp = [0, 0, 0];

// Счетчик числа запросов при чтении данных из файла и передачи их на клиент
GetApiUsersReqsAmount.addEventListener('keyup', ev => {
    apiUsersReqsAmount = Number(ev.target.value);
})

GetSortUsersReqsAmount.addEventListener('keyup', ev => {
    sortUsersReqsAmount = Number(ev.target.value);
})

// Обработчики выбираемой сортировки nodejs
document.querySelectorAll('.sort-users-input-nodejs').forEach(el => {
    el.addEventListener('click', (ev) => {
        nodejsSortType = ev.target.value;
    })
})

// Обработчики выбираемой сортировки php
document.querySelectorAll('.sort-users-input-php').forEach(el => {
    el.addEventListener('click', (ev) => {
        phpSortType = ev.target.value;
    })
})

function start() {
    console.log('started');

    // Запрос пользователей NodeJS 
    document.getElementById('api-users-nodeJS-btn').addEventListener('click', async (ev) => {
        if (isNaN(apiUsersReqsAmount) || apiUsersReqsAmount == 0) {
            return false;
        } else {
            let time_transportation = 0,
                time_reading = 0,
                time_writing = 0,
                temp_1,
                temp_2,
                temp_3;

            for (let i = 0; i < apiUsersReqsAmount; i++) {
                temp_1 = Date.now();

                await fetch('http://localhost:8000/api/users', {
                    method: 'GET'
                })
                    .then(data => {
                        temp_1 = Date.now() - temp_1;
                        return data.text();
                    })
                    .then(data => {
                        temp_2 = Number(data.split('//')[0].split('=')[1].split('&')[0]);
                        temp_3 = Number(data.split('//')[0].split('=')[1].split('&')[1]);
                        time_reading += temp_2;
                        time_writing += temp_3;
                        time_transportation += (temp_1 - temp_2 - temp_3);
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            }

            document.getElementById('api-users-time-read-nodejs').innerHTML = `${time_reading} мс`;
            document.getElementById('api-users-time-send-nodejs').innerHTML = `${time_transportation} мс`;
            document.getElementById('api-users-time-write-nodejs').innerHTML = `${time_writing} мс`;
        }
    })

    // Запрос пользователей PHP
    document.getElementById('api-users-PHP-btn').addEventListener('click', async (ev) => {
        if (isNaN(apiUsersReqsAmount) || apiUsersReqsAmount == 0) {
            return false;
        } else {
            let time_transportation = 0,
                time_reading = 0,
                time_writing = 0,
                temp_1,
                temp_2,
                temp_3;

            for (let i = 0; i < apiUsersReqsAmount; i++) {
                temp_1 = Date.now();

                await fetch('http://localhost:4000/api/users', {
                    method: 'GET'
                })
                    .then(data => {
                        temp_1 = Date.now() - temp_1;
                        return data.text();
                    })
                    .then(data => {
                        temp_2 = Number(data.split('//')[0].split('=')[1].split('&')[0]);
                        temp_3 = Number(data.split('//')[0].split('=')[1].split('&')[1]);
                        time_reading += temp_2;
                        time_writing += temp_3;
                        time_transportation += (temp_1 - temp_2 - temp_3);
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            }

            document.getElementById('api-users-time-read-php').innerHTML = `${time_reading} мс`;
            document.getElementById('api-users-time-send-php').innerHTML = `${time_transportation} мс`;
            document.getElementById('api-users-time-write-php').innerHTML = `${time_writing} мс`;
        }
    })


    // Сортировка с выбранным критерием на Nodejs
    document.querySelector('.sort-users-nodejs-btn').addEventListener('click', async (ev) => {
        if (isNaN(sortUsersReqsAmount) || sortUsersReqsAmount == 0) {
            return false;
        } else {
            sortTimesNodejs = sortTimesNodejs.map(el => 0);

            for (let i = 0; i < sortUsersReqsAmount; i++) {
                await fetch(`http://localhost:8000/api/sort?type=${nodejsSortType}`, {
                    method: 'GET'
                }).then(data => data.json())
                    .then(data => {
                        sortTimesNodejs = sortTimesNodejs.map((el, i) => {
                            return el + data[i];
                        })
                    })
            }

            document.getElementById('sort-users-time-nodejs-75k').innerHTML = `${sortTimesNodejs[0]} мс`;
            document.getElementById('sort-users-time-nodejs-150k').innerHTML = `${sortTimesNodejs[1]} мс`;
            document.getElementById('sort-users-time-nodejs-300k').innerHTML = `${sortTimesNodejs[2]} мс`;
        }
    })

    // Сортировка с выбранным критерием на PHP
    document.querySelector('.sort-users-php-btn').addEventListener('click', async (ev) => {
        if (isNaN(sortUsersReqsAmount) || sortUsersReqsAmount == 0) {
            return false;
        } else {
            sortTimesPhp = sortTimesPhp.map(el => 0);

            for (let i = 0; i < sortUsersReqsAmount; i++) {
                await fetch(`http://localhost:4000/api/sort?type=${phpSortType}`, {
                    method: 'GET'
                }).then(data => data.json())
                    .then(data => {
                        sortTimesPhp = sortTimesPhp.map((el, i) => {
                            return el + data[i];
                        })
                    })
            }

            document.getElementById('sort-users-time-php-75k').innerHTML = `${sortTimesPhp[0]} мс`;
            document.getElementById('sort-users-time-php-150k').innerHTML = `${sortTimesPhp[1]} мс`;
            document.getElementById('sort-users-time-php-300k').innerHTML = `${sortTimesPhp[2]} мс`;
        }
    })

    // Сортировка пузырьком на JS
    document.querySelector('.bubble-sort-users-nodejs-btn').addEventListener('click', (ev) => {
        fetch('http://localhost:8000/api/bubble', {
            method: 'GET'
        }).then(data => data.json())
            .then(data => {
                console.log('keks');
                console.log(data);
                document.getElementById('bubble-sort-users-time-nodejs-4700').innerHTML = `${data[0]} мс`;
                document.getElementById('bubble-sort-users-time-nodejs-9375').innerHTML = `${data[1]} мс`;
                document.getElementById('bubble-sort-users-time-nodejs-18750').innerHTML = `${data[2]} мс`;
            })
    })

    // Сортировка пузырьком на PHP
    document.querySelector('.bubble-sort-users-php-btn').addEventListener('click', (ev) => {
        console.log('hei');
        fetch('http://localhost:4000/api/bubble', {
            method: 'GET'
        }).then(data => data.json())
            .then(data => {
                console.log(data);
                document.getElementById('bubble-sort-users-time-php-4700').innerHTML = `${data[0]} мс`;
                document.getElementById('bubble-sort-users-time-php-9375').innerHTML = `${data[1]} мс`;
                document.getElementById('bubble-sort-users-time-php-18750').innerHTML = `${data[2]} мс`;
            })
    })
}

start();
let nodeJsGetBtn = document.getElementById('GET-users-nodeJS'),
    phpGetBtn = document.getElementById('GET-users-PHP'),
    GetTime = document.querySelector('.GET-time-result'),
    GetReqsAmount = document.querySelector('.GET-amount-of-reqs');

let reqsAmount = 1;
GetReqsAmount.addEventListener('keyup', ev => {
    reqsAmount = Number(ev.target.value);
})

function start() {
    console.log('started');

    // NodeJS get users
    nodeJsGetBtn.addEventListener('click', async (ev) => {
        if (isNaN(reqsAmount) || reqsAmount == 0) {
            return false;
        } else {
            let start = new Date().getTime();

            for (let i = 0; i < reqsAmount; i++)
                await fetch('http://localhost:8000/api/users', {
                    method: 'GET'
                }).then(data => data.json())
            // .then(data => console.log(data));

            let end = new Date().getTime();

            let result = end - start;

            GetTime.innerHTML = `${result} мс`;
            console.log(result);
        }
    })

    // PHP get users
    phpGetBtn.addEventListener('click', async (ev) => {
        if (isNaN(reqsAmount) || reqsAmount == 0) {
            return false;
        } else {
            let start = new Date().getTime();

            for (let i = 0; i < reqsAmount; i++)
                await fetch('http://localhost:4000/api/users', {
                    method: 'GET'
                }).then(data => data.json())
            // .then(data => console.log(data));

            let end = new Date().getTime();

            let result = end - start;

            GetTime.innerHTML = `${result} мс`;
            console.log(result);
        }
    })
}

start();
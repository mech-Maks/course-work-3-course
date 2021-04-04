Идея: написать 2 rest-сервиса на php и nodeJS и сравнить скорость обработки различных данных 
(json, фото, видео, большие по объему данные, большое чсло запросов в секунду и тд)

REST-сервер nodeJS: localhost:8000
RESR-сервер PHP: localhost:4000

Для запуска сервера PHP: 
    в директории /PHP прописать php -S localhost:4000 
    (необходимо наличие встроенного PHP-сервера, идет в комплекте: sudo apt-get install php7).

Для запуска сервера nodeJS:
    Необходима платформа nodeJS (sudo apt install nodejs).
    Далее перейти в /nodeJS и прописать в консоли node server.js (запуск локального хоста).

Для запуска тестировочной клиентской части: 
    Достаточно открыть просто открыть client/index.html в браузере.


Текущий функционал: 
    Получить список пользователей запросом на сервер (можно указывать число запросов), сам список
    выводится в консоли браузера.  


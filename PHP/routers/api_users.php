<?php

function api_users($method, $url, $params, $time) {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/json');
    $res = file_get_contents(__DIR__."./../../data/users_300000.json", true);
    $time = round(1000*(microtime(true) - $time));
    print_r("time=$time//".$res);
}

?>
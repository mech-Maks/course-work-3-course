<?php

function api_users($method, $url, $params) {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/json');
    
    $time_read = microtime(true);
    $content = file_get_contents(__DIR__."./../../data/users_300000.json", true);
    $time_read = round(1000*(microtime(true) - $time_read));

    $time_write = microtime(true);
    file_put_contents(__DIR__."./../../write_file_res/res.json", $content);
    $time_write = round(1000*(microtime(true) - $time_write));
    
    print_r("time=$time_read&$time_write//".$content);
}

?>
<?php

function route_get($method, $api_call, $params) {
    if ($api_call == 'users') {
        header('Access-Control-Allow-Origin: *');
        // header('Content-Type: text/json');
        $res = file_get_contents(__DIR__."/../../data/users.json", true);
        print_r($res);
    }
}

?>
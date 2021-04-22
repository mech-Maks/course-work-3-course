<?php

function api_sort($method, $url, $params) {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/json');

    $time = array();

    $users_75 = json_decode(file_get_contents(__DIR__."./../../data/users_75000.json", true));
    $users_150 = json_decode(file_get_contents(__DIR__."./../../data/users_150000.json", true));
    $users_300 = json_decode(file_get_contents(__DIR__."./../../data/users_300000.json", true));

    $type = "fullName";
    if (array_key_exists("type", $params)) {
        $type = $params["type"];
    }

    $time[0] = microtime(true);
    $users_75 = array_sort($users_75, $type);
    $time[0] = round(1000*(microtime(true) - $time[0]));

    $time[1] = microtime(true);
    $users_150 = array_sort($users_150, $type);
    $time[1] = round(1000*(microtime(true) - $time[1]));

    $time[2] = microtime(true);
    $users_300 = array_sort($users_300, $type);
    $time[2] = round(1000*(microtime(true) - $time[2]));
    
    print_r(json_encode($time));
}

function array_sort($array, $on, $order=SORT_ASC)
{
    $new_array = array();
    $sortable_array = array();

    if (count($array) > 0 && property_exists($array[0], $on)) {
        foreach ($array as $k => $v) {
            $sortable_array[$k] = $v->$on;
        }

        switch ($order) {
            case SORT_ASC:
                asort($sortable_array);
            break;
            case SORT_DESC:
                arsort($sortable_array);
            break;
        }

        foreach ($sortable_array as $k => $v) {
            $new_array[$k] = $array[$k];
        }
    }

    return $new_array;
}

?>
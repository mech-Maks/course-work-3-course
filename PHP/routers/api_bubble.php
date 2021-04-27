<?php

function copy_obj($a, $b) {
    $b->fullName = $a->fullName;
    $b->sex = $a->sex;
    $b->birth = $a->birth;
    $b->age = $a->age;
    $b->rate = $a->rate;
}

function bubble_sort(&$a) {
    $n = count($a);
    $temp = (object)[];

    for ($i=0; $i<$n; $i++) {
        for ($j=0; $j<$n-1; $j++) {
            if ($a[$j]->rate > $a[$j+1]->rate) {
                copy_obj($a[$j], $temp);
                copy_obj($a[$j+1], $a[$j]);
                copy_obj($temp, $a[$j+1]);
            }
        }
    }
}

function api_bubble($method, $url, $params) {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/json');

    $time = array(0,0,0);

    $users_4700 = json_decode(file_get_contents(__DIR__."./../../data/users_4700.json", true));
    $users_9375 = json_decode(file_get_contents(__DIR__."./../../data/users_9375.json", true));
    $users_18750 = json_decode(file_get_contents(__DIR__."./../../data/users_18750.json", true));
    
    $time[0] = microtime(true);
    bubble_sort($users_4700);
    $time[0] = round(1000*(microtime(true) - $time[0]));

    $time[1] = microtime(true);
    bubble_sort($users_9375);
    $time[1] = round(1000*(microtime(true) - $time[1]));

    $time[2] = microtime(true);
    bubble_sort($users_18750);
    $time[2] = round(1000*(microtime(true) - $time[2]));

    print_r(json_encode($time));
}

?>
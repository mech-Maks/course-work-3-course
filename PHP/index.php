<?php
include_once './routers/api_users.php';
include_once './routers/api_sort.php';
include_once './routers/api_bubble.php';

$method = $_SERVER['REQUEST_METHOD'];
$url = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$url = rtrim($url, '/');

$parts = parse_url($url);
$params = [];
if ( array_key_exists('query', $parts) ) {
    parse_str($parts['query'], $params);
} 

if (array_key_exists('path', $parts)) $url = $parts['path'];

set_time_limit(600);

if ($method === 'GET') {
    if ($url === '/api/users') api_users($method, $url, $params);
    if ($url === '/api/sort') api_sort($method, $url, $params);
    if ($url === '/api/bubble') api_bubble($method, $url, $params);
} else if ($method === 'POST') {
    return;
}

?>
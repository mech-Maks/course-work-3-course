<?php
include_once './routers/route_get.php';
include_once './routers/route_post.php';

$method = $_SERVER['REQUEST_METHOD'];
$url = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$url = rtrim($url, '/');

$parts = parse_url($url);
$params = [];
if ( array_key_exists('query', $parts) ) {
    parse_str($parts['query'], $params);
} 

$api_call = '';
$parts = explode('/', $url);
if (count($parts) > 2) {
    $api_call = $parts[2]; 
}

if ($method === 'GET') {
    route_get($method, $api_call, $params);
} else if ($method === 'POST') {
    route_post($method, $api_call, $params);
}

?>
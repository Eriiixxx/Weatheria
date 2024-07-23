<?php

header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allows specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allows specific headers


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

require_once 'controllers/WeatherController.php';

header("Content-Type: application/json");

if (!isset($_GET['action'])) {
    echo json_encode(['error' => 'No action specified.']);
    exit;
}

$controller = new WeatherController();
$action = $_GET['action'];
$controller->handleRequest($action);
?>
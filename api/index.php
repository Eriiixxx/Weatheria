<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: *");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
require_once __DIR__ . '/controller/WeatherController.php';

header("Content-Type: application/json");

$tunnel = new WeatherController();


//Converts request link to array
if (isset($_REQUEST['request'])) {
    $request = explode('/', $_REQUEST['request']);
    //echo json_encode($request);
} else {
    //echo json_encode(array('message' => 'failed request'));
    http_response_code(404);
}


// //Main request switch endpoints
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        switch ($request[0]) {
            case 'current':
                echo $tunnel->toGetCurrent();
                break;

            case 'forecast':
                echo $tunnel->toGetForecast();
                break;

            case 'air-pollution':
                echo $tunnel->toGetPollution();
                break;

            case 'geocoding':
                echo $tunnel->toGetGeo();
                break;

            case 'reverse-geocoding':
                echo $tunnel->toGetRevGeo();
                break;
        }
        break;

    default:
        http_response_code(404);
        break;
}




// if (!isset($_GET['action'])) {
//     echo json_encode(['error' => 'No action specified.']);
//     exit;
// }

$controller = new WeatherController();
// $action = $_GET['action'];
// $controller->handleRequest($action);
?>
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

if (isset($_REQUEST['request'])) {
    $request = explode('/', $_REQUEST['request']);
} else {
    http_response_code(404);
    exit;
}

$location = isset($_GET['location']) ? $_GET['location'] : '';
$lat = isset($_GET['lat']) ? $_GET['lat'] : '';
$lon = isset($_GET['lon']) ? $_GET['lon'] : '';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        switch ($request[0]) {
            case 'current':
                echo $tunnel->toGetCurrent($location);
                break;

            case 'forecast':
                echo $tunnel->toGetForecast($location);
                break;

            case 'air-pollution':
                echo $tunnel->toGetPollution($location);
                break;

            case 'reverse-geocode':
                echo $tunnel->toReverseGeocode($lat, $lon);
                break;

            case 'reverse-geocoding':
                echo $tunnel->toGetReverseGeocoding($lat, $lon);
                break;

            default:
                http_response_code(404);
                break;
        }
        break;

    default:
        http_response_code(404);
        break;
}
?>

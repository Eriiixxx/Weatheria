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

// Extract path parameters
$endpoint = isset($request[0]) ? $request[0] : '';
$location = isset($request[1]) ? $request[1] : '';
$lat = isset($request[1]) ? $request[1] : '';
$lon = isset($request[2]) ? $request[2] : '';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        switch ($endpoint) {
            case 'current':
                echo $tunnel->toGetCurrent($location);
                break;

            case 'forecast':
                echo $tunnel->toGetForecast($location);
                break;

            case 'air-pollution':
                echo $tunnel->toGetPollution($location);
                break;

            case 'reverse-geocoding':
                if ($lat && $lon) {
                    echo $tunnel->toReverseGeocode($lat, $lon);
                } else {
                    http_response_code(400);
                    echo json_encode(['error' => 'Latitude and longitude are required.']);
                }
                break;

            case 'geocoding':
                echo json_encode($tunnel->toGetGeoData($location));
                break;

            case 'location-suggestions':
                echo $tunnel->toGetLocationSuggestions($location);
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

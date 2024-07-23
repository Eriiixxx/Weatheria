<?php
require_once '../models/Weather.php';

class WeatherController {

    private $weather;

    public function __construct() {
        $this->weather = new Weather();
    }

    public function handleRequest($action) {
        switch ($action) {
            case 'current':
                $this->weather->getWeather();
                break;
            case 'forecast':
                $this->weather->getForecast();
                break;
            case 'air-pollution':
                $this->weather->getAirPollution();
                break;
            case 'geocoding':
                $this->weather->getGeoCoding();
                break;
            case 'reverse-geocoding':
                $this->weather->getGeoCodingReverse();
                break;
            default:
                echo json_encode(['error' => 'Invalid action specified.']);
        }
    }
}
?>

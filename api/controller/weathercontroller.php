<?php
require_once __DIR__ . '/../models/Weather.php';

class WeatherController {

    private $weather;

    public function __construct() {
        $this->weather = new Weather();
    }

    public function toGetCurrent($location) {
        return $this->weather->getWeather($location);
    }

    public function toGetForecast($location) {
        return $this->weather->getForecast($location);
    }

    public function toGetPollution($location) {
        return $this->weather->getAirPollution($location);
    }
}
?>

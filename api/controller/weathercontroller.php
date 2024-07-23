<?php
require_once __DIR__ . '/../models/Weather.php';

class WeatherController {

    // include_once "./Model/Login/login.php";


    private $weather;

    public function __construct() {
        $this->weather = new Weather();
    }

    public function toGetCurrent() {
        return $this->weather->getWeather();
    }

    public function toGetForecast() {
        return $this->weather->getForecast();
    }

    public function toGetPollution() {
        return $this->weather->getAirPollution();
    }

    public function toGetGeo() {
        return $this->weather->getGeoCoding();
    }

    public function toGetRevGeo() {
        return $this->weather->getGeoCodingReverse();
    }

}

?>

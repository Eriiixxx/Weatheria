<?php
require_once '../../config/config.php';

class Weather {

    private $apiKey;

    public function __construct() {
        $this->apiKey = API_KEY;
    }

    private function fetchData($url) {
        $response = file_get_contents($url);
        if ($response === FALSE) {
            echo json_encode(['error' => 'Failed to fetch data.']);
            exit;
        }
        echo $response;
    }

    public function getWeather() {
        $url = "https://api.openweathermap.org/data/2.5/weather?lat=14.599512&lon=120.984222&units=metric&appid=" . $this->apiKey;
        $this->fetchData($url);
    }

    public function getForecast() {
        $url = "https://api.openweathermap.org/data/2.5/forecast?lat=14.599512&lon=120.984222&units=metric&appid=" . $this->apiKey;
        $this->fetchData($url);
    }

    public function getAirPollution() {
        $url = "https://api.openweathermap.org/data/2.5/air-pollution?lat=14.599512&lon=120.984222&appid=" . $this->apiKey;
        $this->fetchData($url);
    }

    public function getGeoCoding() {
        $url = "http://api.openweathermap.org/geo/1.0/direct?q=manila&limit=5&appid=" . $this->apiKey;
        $this->fetchData($url);
    }

    public function getGeoCodingReverse() {
        $url = "http://api.openweathermap.org/geo/1.0/reverse?lat=14.599512&lon=120.984222&limit=5&appid=" . $this->apiKey;
        $this->fetchData($url);
    }
}
?>

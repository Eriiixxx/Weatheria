<?php
require_once __DIR__ . '/../../config/config.php';

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

    public function getWeather($location) {
        $geoData = $this->getGeoData($location);
        if ($geoData && count($geoData) > 0) {
            $lat = $geoData[0]['lat'];
            $lon = $geoData[0]['lon'];
            $url = "https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&units=metric&appid=" . $this->apiKey;
            $this->fetchData($url);
        } else {
            echo json_encode(['error' => 'Location not found.']);
        }
    }

    public function getForecast($location) {
        $geoData = $this->getGeoData($location);
        if ($geoData && count($geoData) > 0) {
            $lat = $geoData[0]['lat'];
            $lon = $geoData[0]['lon'];
            $url = "https://api.openweathermap.org/data/2.5/forecast?lat=$lat&lon=$lon&units=metric&appid=" . $this->apiKey;
            $this->fetchData($url);
        } else {
            echo json_encode(['error' => 'Location not found.']);
        }
    }

    public function getAirPollution($location) {
        $geoData = $this->getGeoData($location);
        if ($geoData && count($geoData) > 0) {
            $lat = $geoData[0]['lat'];
            $lon = $geoData[0]['lon'];
            $url = "https://api.openweathermap.org/data/2.5/air_pollution?lat=$lat&lon=$lon&units=metric&appid=" . $this->apiKey;
            $this->fetchData($url);
        } else {
            echo json_encode(['error' => 'Location not found.']);
        }
    }

    public function reverseGeocode($lat, $lon) {
        $url = "http://api.openweathermap.org/geo/1.0/reverse?lat=$lat&lon=$lon&limit=1&appid=" . $this->apiKey;
        $this->fetchData($url);
    }

    public function getGeoData($location) {
        $url = "http://api.openweathermap.org/geo/1.0/direct?q=" . $location . "&limit=5&appid=" . $this->apiKey;
        $response = file_get_contents($url);
        if ($response === FALSE) {
            return null;
        }
        return json_decode($response, true);
    }

    public function getReverseGeoData($lat, $lon) {
        $url = "https://api.openweathermap.org/geo/1.0/reverse?lat=$lat&lon=$lon&limit=1&appid=" . $this->apiKey;
        $this->fetchData($url);
    }

    public function getLocationSuggestions($query) {
        $url = "http://api.openweathermap.org/geo/1.0/direct?q=" . urlencode($query) . "&limit=5&appid=" . $this->apiKey;
        $this->fetchData($url);
    }
    
}
?>

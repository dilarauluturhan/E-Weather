import { apiKey } from "../constants";

const forecastEndpoint = (params) =>
  `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=yes&alerts=${params.alert}`;

const locationEndpoint = (params) =>
  `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

export const getWeatherForecast = async (params) => {
  try {
    const response = await fetch(forecastEndpoint(params));
    if (!response.ok) {
      throw new Error("getWeatherForecast response basarisiz");
    }
    const data = await response.json();
    console.log("getWeatherForecast data:", data);
    return data;
  } catch (error) {
    console.error("getWeatherForecast Fetch hatasi:", error);
    throw error;
  }
};

export const searchLocation = async (params) => {
  try {
    const response = await fetch(locationEndpoint(params));
    if (!response.ok) {
      throw new Error("searchLocation response basarisiz");
    }
    const data = await response.json();
    console.log("searchLocation data:", data);
    return data;
  } catch (error) {
    console.error("searchLocation Fetch hatasi:", error);
    throw error;
  }
};

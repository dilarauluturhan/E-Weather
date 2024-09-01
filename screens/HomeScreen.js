import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { getWeatherForecast } from "../api/weather";

export default function HomeScreen() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const handleSearch = async () => {
    try {
      const params = {
        cityName: cityName,
        days: 7,
        alert: "no",
      };
      const data = await getWeatherForecast(params);
      setWeatherData(data.current);
      setForecastData(data.forecast.forecastday);
    } catch (error) {
      console.log("Arama hatası:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={cityName}
        onChangeText={setCityName}
        style={styles.input}
        placeholder="Şehir Adı Giriniz"
      />
      <Button title="Ara" onPress={handleSearch} />

      {weatherData && (
        <View style={styles.currentWeather}>
          <Text>Şu anki hava durumu cnmsss:</Text>
          <Text>{weatherData.temp_c}°C</Text>
          <Text>{weatherData.condition.text}</Text>
        </View>
      )}

      {forecastData.length > 0 && (
        <FlatList
          data={forecastData}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={styles.forecastItem}>
              <Text>{item.date}</Text>
              <Text>Max: {item.day.maxtemp_c}°C</Text>
              <Text>Min: {item.day.mintemp_c}°C</Text>
              <Text>{item.day.condition.text}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  currentWeather: {
    marginBottom: 16,
  },
  forecastItem: {
    padding: 8,
    marginVertical: 4,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
  },
});

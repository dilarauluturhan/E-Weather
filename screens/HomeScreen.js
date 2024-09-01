import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { getWeatherForecast } from "../api/weather";
import { deviceHeight, deviceWidth } from "../utils/Dimensions";

export default function HomeScreen() {
  // api'den gelen dataları sakladım

  const [cityName, setCityName] = useState("");

  // seçilen şehrin şu anki hava durumunu tuttum, api'den başarılı bir data aldığımda setWeatherData güncellenecek
  // başlangıçta null dedim çünkü henüz bir datam yok
  const [weatherData, setWeatherData] = useState(null);

  // 7 günlük hava durumu tahminini tuttum başlangıçta boş bir array çünkü data yok
  const [forecastData, setForecastData] = useState([]);
  const [locationData, setLocationData] = useState(null);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  // kullanıcının girdiği şehir adıyla hava durumu apisini aldım
  const handleSearch = async () => {
    try {
      // params adında bir obje oluşturdum, apiye gönderilecek parametreleri girdim
      const params = {
        cityName: cityName,
        days: 7,
        alert: "no",
      };
      // getWeatherForecast isteğini çağırdım ve params objesini bu fonksiyona geçtim
      // gelen sonucu data değişkenine atadım
      const data = await getWeatherForecast(params);
      // şu anki hava durumu bilgisini current ile aldım
      setWeatherData(data.current);
      setLocationData(data.location);
      setForecastData(data.forecast.forecastday);
    } catch (error) {
      console.log("Arama hatası:", error);
    }
  };

  return (
    <View
      style={[styles.container, { height: deviceHeight, width: deviceWidth }]}
    >
      <Text style={styles.header}>E-Weather</Text>
      <TextInput
        value={cityName}
        onChangeText={setCityName}
        style={styles.input}
        placeholder="Search the city by the name..."
      />
      <TouchableOpacity
        title="Search"
        onPress={handleSearch}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {/* weatherData true ise ve şehir adı var ise */}
      {weatherData && locationData && (
        <View style={styles.weatherCard}>
          <Text style={styles.cityName}>{locationData.name}</Text>
          <Text style={styles.temperature}>{weatherData.temp_c}°C</Text>
          <Text style={styles.condition}>{weatherData.condition.text}</Text>
        </View>
      )}

      {/* tahmin verileri dizisi 0'dan büyük ise */}
      {forecastData.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={forecastData}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={styles.forecastItem}>
              <Text style={styles.forecastDate}>{formatDate(item.date)}</Text>
              <Text style={styles.forecastText}>
                Max: {item.day.maxtemp_c}°C
              </Text>
              <Text style={styles.forecastText}>
                Min: {item.day.mintemp_c}°C
              </Text>
              <Text style={styles.forecastText}>{item.day.condition.text}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    color: "#333",
    textAlign: "center",
    fontWeight: "thin",
    marginVertical: 24,
    letterSpacing: 3,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  weatherCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    marginTop: 16,
  },
  cityName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  temperature: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  condition: {
    fontSize: 16,
    color: "#555",
  },
  forecastItem: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    marginTop: 16,
  },
  forecastDate: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#fff",
  },
  forecastText: {
    fontSize: 16,
    color: "#fff",
  },
});

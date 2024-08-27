import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import { debounce } from "lodash";
import { searchLocation, getWeatherForecast } from "../api/weather";

export default function HomeScreen() {
  const [cityName, setCityName] = useState("");
  const [location, setLocation] = useState([]);

  const handleLocation = (loc) => {
    console.log("location:", loc);
    setLocation([]);
    getWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      console.log("got forecast", data);
    });
  };

  const handleSearch = (value) => {
    if (value.length > 2) {
      searchLocation({ cityName: value }).then((data) => {
        setLocation(data);
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Image
        blurRadius={20}
        style={styles.imageWrap}
        source={require("../assets/bg.jpeg")}
      /> */}
      <SafeAreaView>
        <Text>E-Weather</Text>
        <View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter city name"
              value={cityName}
              onChange={(text) => setCityName(text)}
              onChangeText={handleTextDebounce}
            />
          </View>
          {location.length > 0 ? (
            <View>
              {location.map((loc, i) => {
                return (
                  <TouchableOpacity onPress={() => handleLocation(loc)} key={i}>
                    <Text>
                      {loc?.name}, {loc?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>

        {/* forecast section */}
        <View>
          <Text>
            London,
            <Text>United Kingdom</Text>
          </Text>
          {/* degree */}
          <View>
            <Text>23&#176;</Text>
            <Text>Partly Cloudy</Text>
          </View>
          {/* other stats */}
          <View>
            <Text>22km</Text>
          </View>
          <View>
            <Text>22%</Text>
          </View>
          <View>
            <Text>6:05 AM</Text>
          </View>
        </View>

        {/* forecast next days */}
        <View>
          <View>
            <Text>Daily Forecast</Text>
          </View>
          <ScrollView
            horizantal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            <View>
              <Text>Monday</Text>
              <Text>23&#176;</Text>
            </View>
            <View>
              <Text>Monday</Text>
              <Text>23&#176;</Text>
            </View>
            <View>
              <Text>Monday</Text>
              <Text>23&#176;</Text>
            </View>
            <View>
              <Text>Monday</Text>
              <Text>23&#176;</Text>
            </View>
            <View>
              <Text>Monday</Text>
              <Text>23&#176;</Text>
            </View>
            <View>
              <Text>Monday</Text>
              <Text>23&#176;</Text>
            </View>
            <View>
              <Text>Monday</Text>
              <Text>23&#176;</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 56,
    paddingHorizontal: 20,
  },
  imageWrap: {
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});

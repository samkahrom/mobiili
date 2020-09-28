import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [locationlat, setLocationlat] = useState(60.166640739);
  const [locationlng, setLocationlng] = useState(24.943536799);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    //Check permission
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No permission to access location");
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLocationlat(location.coords.latitude);
      setLocationlng(location.coords.longitude);
      console.log(location);
    }
  };

  const getLocation = async () => {
    const url =
      "https://www.mapquestapi.com/geocoding/v1/address?key=HPktEGttUajZcYURGNIzFrm3Zljpm8uh&inFormat=kvp&outFormat=json&location=" +
      address +
      "%2C+Helsinki+Finland&thumbMaps=false";

    try {
      const response = await fetch(url);
      const data = await response.json();
      setLocationlat(data.results[0].locations[0].displayLatLng.lat);
      setLocationlng(data.results[0].locations[0].displayLatLng.lng);
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 8 }}
        region={{
          latitude: locationlat,
          longitude: locationlng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.004,
        }}
      >
        <Marker
          coordinate={{ latitude: locationlat, longitude: locationlng }}
        />
      </MapView>
      <View style={{ flex: 1, alignItems: "center", paddingTop: 5 }}>
        <TextInput
          style={{
            fontSize: 18,
            width: 200,
            padding: 5,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
          }}
          value={address}
          placeholder="Address"
          onChangeText={(address) => setAddress(address)}
        />
      </View>
      <View style={styles.button}>
        <Button type="outline" title="Find" onPress={getLocation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    overflow: "hidden",
    padding: 1,
    textAlign: "center",
  },
});

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Picker,
  TextInput,
  Button,
  Image,
  Alert,
} from "react-native";

export default function EuroConverter() {
  const [euro, setEuro] = useState(0);
  const [currency, setCurrency] = useState([]);
  const [result, setResult] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");

  const getCurrency = () => {
    const url =
      "http://data.fixer.io/api/latest?access_key=aaceed7a889adf48ed969332694a62d7";
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setCurrency(responseJson.rates);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  const Convert = () => {
    const search = currency.find((element) => element == selectedValue);
    const multiply = search * euro;
    setResult(multiply);
  };

  useEffect(() => {
    getCurrency();
  }, []);
  useEffect(() => {
    console.log(selectedValue);
  });

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 80, width: 150, marginBottom: 20 }}
        source={require("./euros.png")}
      />
      <Text style={{ marginBottom: 20, fontSize: 20 }}>{result} €</Text>
      <View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            keyboardType={"decimal-pad"}
            onChangeText={(text) => setEuro(text)}
            title="Euro"
            placeholder="Euros"
            style={{
              borderBottomColor: "lightblue",
              borderBottomWidth: 2,
              width: 40,
            }}
          ></TextInput>
          <Button title="Convert" onPress={Convert}></Button>
        </View>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          mode="dropdown"
        >
          {Object.keys(currency).map((key, index) => (
            <Picker.Item label={key} value={key} key={index} />
          ))}
        </Picker>
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
});

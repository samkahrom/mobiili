import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [tulos, setTulos] = useState("");
  const [eka, setEka] = useState("");
  const [toka, setToka] = useState("");

  const Tab = createBottomTabNavigator();

  const sum = () => {
    const ekaTulos = parseInt(eka) + parseInt(toka);
    setTulos(ekaTulos);
    setEka();
    setToka();
  };

  const minus = () => {
    const tokaTulos = parseInt(eka) - parseInt(toka);
    setTulos(tokaTulos);
    setEka();
    setToka();
  };

  return (
    <View style={styles.container}>
      <Text>Result: {tulos}</Text>

      <TextInput
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setEka(text)}
        value={eka}
        keyboardType={"number-pad"}
      />

      <TextInput
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setToka(text)}
        value={toka}
        keyboardType={"number-pad"}
      />

      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Button title="+" onPress={sum} color="pink" />
        <Button title="-" onPress={minus} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "20%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

//

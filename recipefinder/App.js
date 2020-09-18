import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Image,
} from "react-native";

export default function App() {
  const [desc, setDesc] = useState("");
  const [recipes, setRecipe] = useState([]);

  const getRecipe = () => {
    const url = "http://www.recipepuppy.com/api/?i=" + desc;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setRecipe(responseJson.results);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginLeft: "5%", marginTop: "20%" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: item.thumbnail }}
            />
          </View>
        )}
        ItemSeparatorComponent={listSeparator}
        data={recipes}
      />
      <TextInput
        style={{ fontSize: 18, width: 200 }}
        value={desc}
        placeholder="Description"
        onChangeText={(desc) => setDesc(desc)}
      />

      <Button title="Find" onPress={getRecipe} />
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

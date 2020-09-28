import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const buttonAdd = () => {
    if (text) {
      setData(data);
      setData([...data, { key: text }]);
      setText("");
    }
  };
  const buttonDelete = (e) => {
    var data = [];
    setData(data);
    setText("");
  };
  return (
    <View style={styles.container}>
      <View style={styles.middle}>
        <TextInput
          style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setText(text)}
          value={text}
        />

        <View
          style={{
            flex: 0.35,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.button}>
            <Button onPress={buttonAdd} title="ADD" />
          </View>
          <View style={styles.button}>
            <Button onPress={buttonDelete} title="CLEAR" />
          </View>
        </View>
        <View style={styles.history}>
          <Text>Shopping List</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => <Text>{item.key}</Text>}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
    margin: 10,
    alignItems: "center",
  },
  middle: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  history: {
    margin: 5,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    flex: 0.3,
    borderWidth: 1,
    padding: 3,
    margin: 10,
    borderColor: "black",
    backgroundColor: "yellow",
    borderRadius: 20,
  },
});

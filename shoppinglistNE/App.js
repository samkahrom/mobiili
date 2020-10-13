import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Header } from "react-native-elements";

import * as SQLite from "expo-sqlite";

import { Input, Button, ListItem, Icon } from "react-native-elements";

const db = SQLite.openDatabase("shoplist.db");

export default () => {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS shoplist (id integer primary key" +
            " not null, product text, amount text);"
        );
      },
      null,
      updateList
    );
  }, []);

  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM shoplist;", [], (_, { rows }) =>
        setData(rows._array)
      );
    });
  };
  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("INSERT INTO shoplist (product, amount) VALUES (?, ?);", [
          product,
          amount,
        ]);
      },
      null,
      updateList
    );
  };

  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from shoplist where id = ?;", [id]);
      },
      null,
      updateList
    );
  };

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.product}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
      </ListItem.Content>
      <Text style={{ color: "black" }} onPress={() => deleteItem(item.id)}>
        Poista
      </Text>
      <ListItem.Chevron color="black" onPress={() => deleteItem(item.id)} />
    </ListItem>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "OSTOSLISTA", style: { color: "#fff" } }}
        rightComponent={{ icon: "home", color: "#fff" }}
        linearGradientProps={{
          colors: ["red", "purple"],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
      />
      <View style={styles.textStyles}>
        <Input
          placeholder={" Tuote"}
          label={"Tuote"}
          style={styles.inputStyles}
          value={product}
          onChangeText={(item) => setProduct(item)}
        />
        <Input
          label={"Määrä"}
          placeholder={" Määrä"}
          value={amount}
          style={styles.inputStyles}
          onChangeText={(item) => setAmount(item)}
        />
      </View>
      <View>
        <Button
          buttonStyle={{ backgroundColor: "grey", height: 60 }}
          onPress={saveItem}
          title="Lisää"
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textStyles: {
  },
  inputStyles: {
  },

  shoppingStyle: {
    alignItems: "center",
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
  const [contacts, SetContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        SetContacts(data);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <Text>
              {item.name} {item.phoneNumbers[0].number}
            </Text>
          )}
        />
      </View>
      <Button title={"Get contacts"} onPress={getContacts} />

      <StatusBar style="auto" />
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
  list: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
});

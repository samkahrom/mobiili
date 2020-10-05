import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, FlatList, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglist.db');


export default function App() {

const[text, setText] = useState("");
const[amount, setAmount] = useState("");
const[shList, addToList] = useState([]);

useEffect(() => {
  db.transaction(tx => {
    tx.executeSql('create table if not exists shList (id integer primary key not null, text text, amount int);');
  },(error => {console.log("error" +error)}), updateList)
}, []);

const saveItem = () => {
  db.transaction(tx => {
    tx.executeSql('insert into shList (text, amount) values (?, ?);',
      [text, parseInt(amount)]);
  }, (error => {console.log("error" +error)}), updateList);
setText("");
setAmount("");
}

const updateList= () => {
  db.transaction(tx => {
    tx.executeSql('select * from shList;', [], (_, { rows }) => addToList(rows._array)
    );
  });
  console.log(shList);
}

const deleteItem = (id) => {
  db.transaction(
    tx => { tx.executeSql('delete from shList where id = ?;', [id]);
  },null, updateList
  )
}
const listSeparator = () => {
  return (
    <View
      style={{
        height: 5,
        width: "80%",
        backgroundColor: "#fff",
        marginLeft: "10%"
      }}
    />
  );
}
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      

      <View style={styles.inputCont}>
      <Text style={{fontSize:22}}>Shopping list</Text>
        <TextInput style={styles.textInput} placeholder="item" onChangeText={text => setText(text)} value={text}></TextInput>
        <TextInput style={styles.textInput} placeholder="amount" 
        onChangeText={amount => setAmount(amount)} value={amount} keyboardType="numeric"></TextInput>
        <Button style={styles.button} title="Save" onPress={saveItem}></Button>
      </View>

      <View style={styles.outputCont}>
      <FlatList
      keyExtractor={item => item.id.toString()} 
      renderItem={({item}) =>
        <View style={styles.listcontainer}>
          <Text style={{fontSize:22}}>{item.text}, {item.amount}</Text>
          <Text style={styles.delete} onPress={() => deleteItem(item.id)}> Delete</Text>
      </View>}
      data={shList}
      ItemSeparatorComponent={listSeparator}/>

      </View>
    
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    
  },
  inputCont: {
 
    paddingTop:20,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    paddingBottom:20,
  },
  textInput: {
    marginBottom:3,
    marginTop:5,
    fontSize:20,
    width:200,
    borderWidth:1,
    borderColor:'gray',
    paddingBottom:3,
  },
  outputCont: {
    paddingTop:10,
    flex:4,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-start',
  },
  listcontainer: {
    flexDirection:'row',
    justifyContent:'center'
  },
  delete: {
    color:'red',
    fontSize:20,
    paddingLeft:15,
  }
});
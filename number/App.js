import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, Alert } from 'react-native';


export default function App() {

  const [tulos, setTulos] = useState(tulos);
  const [arvaus, setArvaus] = useState(0);
  const [random, setRandom] = useState(Math.floor(Math.random() * 100) + 1);
  const [lasku, setLasku] = useState(1);
  const [viesti, setViesti] = useState('Guess a number between 0-100');

  const arpa = () => {
    setRandom(Math.floor(Math.random() * 100) + 1);
  }

  const tarkistus = async () => {

    if (parseInt(arvaus) < parseInt(random)) {

      setViesti('Your guess ' + arvaus + ' is too low');
      setLasku(lasku + 1);
      setArvaus();

    }

    else if (parseInt(arvaus) > parseInt(random)) {
      setViesti('Your guess ' + arvaus + ' is too high');
      setLasku(lasku + 1);
      setArvaus();

    }

    else {

      Alert.alert('You guessed the number in ' + lasku + ' guesses');
      arpa();
      setLasku(1);
      setArvaus();
      setViesti(viesti);
      storeData(lasku);

    }
  }

  useEffect(() => {
    readData();
  }, [])

  const tyhjennys = async () => {
    AsyncStorage.clear();
    setTulos(100);
  }

  storeData = async () => {
    if (lasku < tulos) {
      try {
        await AsyncStorage.setItem('someKey', JSON.stringify(lasku));
        readData();
      } catch (error) {
        Alert.alert('Error saving data');
      }
    }
  }

  readData = async () => {
    try {
      let value = await AsyncStorage.getItem('someKey');
      let d = JSON.parse(value);
      if (d !== null) {
        setTulos(d);
      }
    } catch (error) {
      Alert.alert('Error reading data');
    }
  }

  return (
    <View style={styles.container}>

      <Text> {viesti} </Text>

      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setArvaus(text)}
        keyboardType={'number-pad'}
        value={arvaus}
      />


      <Button title="MAKE GUESS" onPress={tarkistus} color='blue' />
      <Button title="CLEAR" onPress={tyhjennys} color='blue' />
      <Text>Highscore: {tulos} guesses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '5%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

  const [line, setSaying] = useState('');

  const speak = () => {

    Speech.speak(line);
  }

  {
    return (
        <View style={styles.container}>

          <TextInput placeholder="What do you wany me to say?" value={line} style={styles.textInput}
                     onChangeText={ line => setSaying(line)}
          />
          <Button title="LETS HEAR IT" onPress={speak} />

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    backgroundColor: 'pink',
    padding: 2,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'beige',
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    height: 60,
    paddingTop: 10,
    marginBottom: 50,
    borderBottomWidth: 2
  }
});
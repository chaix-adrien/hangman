import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Hangman from "./Hangman"
export default function App() {
  return (
    <View style={styles.container}>
      <Hangman word="carte d'iden-tité" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

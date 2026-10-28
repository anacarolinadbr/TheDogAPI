
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import CardDog from './components/CardDogs';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CardDog />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
});

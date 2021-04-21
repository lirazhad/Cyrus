import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MainScreen from './src/components/mainScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
       <MainScreen/>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

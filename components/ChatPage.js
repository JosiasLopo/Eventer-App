// App.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Gemini from './Gemini';


export default function Default() {
  return (
    <View style={styles.container}>
      <Gemini/>
    </View>
  );
};



const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
  }, 
});
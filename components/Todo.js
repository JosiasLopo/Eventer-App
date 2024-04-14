import React from "react";
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, createStackNavigator } from '@react-navigation/stack';
import List from './List'; // Import your List component here
import { Text } from 'react-native';
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";

const Stack = createStackNavigator();

export default function Default() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container,{ paddingBottom: insets.bottom, }]}>
        
        <View style={{paddingTop: insets.top + responsiveWidth(3), padding: responsiveWidth(5), backgroundColor:"#1D1E26"}}>
            <Text style={styles.txt1}>Eventer</Text>
            <Text style={styles.txt2}>TODO LIST</Text>
        </View>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MyTodos" component={List} />
      </Stack.Navigator>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',

  },

txt1: {
    fontSize: responsiveFontSize(6),
    color: '#fff',
    fontFamily: 'NanumMyeongjo',
  },

  txt2:{
    paddingTop: responsiveWidth(1),
    fontSize: responsiveFontSize(2),
    color: '#fff',
    fontFamily: 'MPLUS1p',
  },
});

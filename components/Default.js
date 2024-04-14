import React from "react";
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, createStackNavigator } from '@react-navigation/stack';
import List from './List'; // Import your List component here

const Stack = createStackNavigator();

export default function Default() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container,{paddingTop: insets.top, paddingBottom: insets.bottom}]}>
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
});

import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, View, Text } from "react-native";

export default function ScreensScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Screens Screen</Text>

      <Button
        title="Go to Hall"
        onPress={() => navigation.navigate("Hall")}/>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}/>
        <Button
        title="Go to Regist"
        onPress={() => navigation.navigate("Regist")}/>
        <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}/>

        <Button
        title="Default"
        onPress={() => navigation.navigate("Default")}/>


    </View>
  );
}



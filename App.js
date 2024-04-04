import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreensScreen from "./components/ScreensScreen";
import Regist from "./components/Regist";
import Hall from "./components/Hall";
import Login from "./components/Login";
import Home from "./components/Home";
import Default from "./components/Default";
import { StatusBar } from "expo-status-bar";
import useAuth from "./hooks/useAuth";


const Stack = createNativeStackNavigator();

export default function App() {
  const {user} = useAuth();
  if (user){
     return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName='Home' screenOptions={({ route, navigation }) => ({ headerShown: false })}>

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Default" component={Default} />

     </Stack.Navigator>
    </NavigationContainer>
  );
  } else {
  return (
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator initialRouteName='Hall' screenOptions={({ route, navigation }) => ({ headerShown: false })}>

          <Stack.Screen name="Regist" component={Regist} />
          <Stack.Screen name="Hall" component={Hall} />
          <Stack.Screen name="Login" component={Login} />

      </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

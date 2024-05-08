import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreensScreen from "./components/ScreensScreen";
import Regist from "./components/Regist";
import Hall from "./components/Hall";
import Login from "./components/Login";
import Home from "./components/Home";
import Todo from "./components/Todo";
import Default from "./components/Default";
import Gemini from './components/Gemini';
import { StatusBar } from "expo-status-bar";
import useAuth from "./hooks/useAuth";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Icon,Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { auth } from './config/firebase';
import 'firebase/auth';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Ionicons, Entypo } from '@expo/vector-icons'; 
import Profile from './components/Profile';
import ChatsScreen from './components/ChatsScreen';
import ChatGpt from './components/ChatGpt';
import ChatPage from './components/ChatPage';
import MediaWidget from './components/MediaWidget';

function DrawerContent(props) {
  const [userEmail, setUserEmail] = useState(''); // State to store user's email
   const navigation = useNavigation();

   useEffect(() => {
        // Fetch user's email from Firebase
        const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setUserEmail(user.email);
        } else {
            setUserEmail(''); // Clear email if user is not signed in
        }
        });

        // Cleanup function to unsubscribe when the component unmounts
        return () => unsubscribe();
    }, []);


    const handleLogout = async() =>{
        await signOut (auth);
    }


    return (

        <View style={{flex: 1,}}>
            <DrawerContentScrollView {...props}>
                <View style={{}}>
                      <View>
                          <View>
                              <View style={{flex: 1,paddingLeft: responsiveWidth(2), paddingRight: responsiveWidth(2)}}>
                                  <View style={{marginLeft: responsiveWidth(4)}}>
                                    <Text style={{marginBottom: responsiveWidth(7), color: 'white', fontFamily: 'NanumMyeongjo', fontSize: responsiveFontSize(6),}}>Menu</Text>
                                    <Text numberOfLines={1} style={{ color: 'white',fontFamily:'MPLUS1pBold', fontSize:responsiveWidth(3.5)}}>Josias Lopo</Text>
                                    <Text numberOfLines={1} style={{ color: 'white', fontFamily: 'MPLUS1p', fontSize:responsiveWidth(3.5)}}>{userEmail}</Text>
                                  </View>
                                  <View style={{
                                    borderBottomColor: '#525468',
                                    borderBottomWidth: 1,
                                    width: responsiveHeight(25),
                                    alignSelf: 'center',
                                    marginTop: responsiveHeight(2),
                                  }}></View>
                                  <View style={{gap: responsiveWidth(4), height: responsiveHeight(50), justifyContent: "center", marginLeft: responsiveWidth(7)}}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{flexDirection:"row", alignItems: "center"}}><Ionicons name="document" size={responsiveWidth(7)} style={{marginRight: responsiveWidth(4)}}  color="white"  /><Text style={{color: "white", fontFamily: "MPLUS1p", fontSize: responsiveFontSize(2)}}>Home</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{flexDirection:"row", alignItems: "center"}}><Ionicons name="person" size={responsiveWidth(7)} style={{marginRight: responsiveWidth(4)}}  color="white"  /><Text style={{color: "white", fontFamily: "MPLUS1p", fontSize: responsiveFontSize(2)}}>Profile</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Todo')} style={{flexDirection:"row", alignItems: "center"}}><Ionicons name="heart" size={responsiveWidth(7)}  style={{marginRight: responsiveWidth(4)}} color="white"  /><Text style={{color: "white", fontFamily: "MPLUS1p", fontSize: responsiveFontSize(2)}}>Notes</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Default')} style={{flexDirection:"row", alignItems: "center"}}><Ionicons name="locate" size={responsiveWidth(7)} style={{marginRight: responsiveWidth(4)}}  color="white"  /><Text style={{color: "white", fontFamily: "MPLUS1p", fontSize: responsiveFontSize(2)}}>Localizations</Text></TouchableOpacity>
                                  </View>
                                  <View style={{
                                    borderBottomColor: '#525468',
                                    borderBottomWidth: 1,
                                    width: responsiveHeight(25),
                                    alignSelf: 'center',
                                    marginTop: responsiveHeight(2),
                                  }}></View>
                                  <View style={{gap: responsiveWidth(4), marginTop:responsiveWidth(7), justifyContent: "center", marginLeft: responsiveWidth(7)}}>
                                    <View style={{flexDirection:"row", alignItems: "center"}}><Text style={{color: "white", fontFamily: "MPLUS1p", fontSize: responsiveFontSize(2)}}>Settings & Suport</Text></View>
                                    <TouchableOpacity style={{flexDirection:"row", alignItems: "center"}}><Entypo name="cog" size={responsiveWidth(6.5)}  style={{marginRight: responsiveWidth(4)}} color="white"  /><Text style={{color: "white", fontFamily: "MPLUS1p", fontSize: responsiveFontSize(2)}}>Settings and privacy</Text></TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection:"row", alignItems: "center"}}><Ionicons name="help-circle-outline" size={responsiveWidth(7)} style={{marginRight: responsiveWidth(4)}}  color="white"  /><Text style={{color: "white", fontFamily: "MPLUS1p", fontSize: responsiveFontSize(2)}}>Help Center</Text></TouchableOpacity>
                                  </View>
                              </View>
                          </View>
                      </View>
                </View>
            </DrawerContentScrollView>
        </View>
    )
}


const Stack = createNativeStackNavigator();


const StackNav=()=>{
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={({ route, navigation }) => ({ headerShown: false })}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Default" component={Default} />
      <Stack.Screen name="Todo" component={Todo} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
      <Stack.Screen name="Gemini" component={Gemini} />
      <Stack.Screen name="ChatGpt" component={ChatGpt} />
      <Stack.Screen name="ChatPage" component={ChatPage} />
      <Stack.Screen name="MediaWidget" component={MediaWidget} />
    </Stack.Navigator>
  )
}

const DrawerNav=()=>{
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
    drawerContent={(props) => <DrawerContent {...props} />} // Adicione isso para integrar o DrawerContent
    screenOptions={{
      drawerLabel: 'Home',
      headerShown: false,
      overlayColor: 'rgba(0, 0, 0, 0.5)',
      drawerStyle: {
        backgroundColor: '#1D1E26',
      },
      drawerItemStyle: {
        backgroundColor: 'transparent', // Remove background color
        height: 60, // Adjust item height if needed
      },
    }}
  >
    <Drawer.Screen name="Home" component={StackNav} />
  </Drawer.Navigator>
  )
}

export default function App() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {user ? (
        <DrawerNav />
      ) : (
        <Stack.Navigator initialRouteName='Hall' screenOptions={({ route, navigation }) => ({ headerShown: false })}>
          <Stack.Screen name="Regist" component={Regist} />
          <Stack.Screen name="Hall" component={Hall} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

       
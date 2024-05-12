import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import { View, Text, Linking, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Icon,Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { auth } from './config/firebase';
import { signOut } from 'firebase/auth';
import 'firebase/auth';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Ionicons, Entypo } from '@expo/vector-icons'; 
import Profile from './components/Profile';
import ChatsScreen from './components/ChatsScreen';
import ChatGpt from './components/ChatGpt';
import ChatPage from './components/ChatPage';
import MediaWidget from './components/MediaWidget';
import NewPost from './components/NewPost';
import Notes from './components/Notes';
import NoteDetail from './components/NoteDetail';
import CreateNote from './components/CreateNote';
import Git from './src/assets/images/Git.png';
import Link from './src/assets/images/Link.png';
import Insta from './src/assets/images/Insta.png';
import Logout from './src/assets/images/Logout.png';
import Web from './src/assets/images/Web.png';
import ProfileImg from './src/assets/images/Profile.png';
import HomeImg from './src/assets/images/Home.png';
import Messages from './src/assets/images/Messages.png';
import TodoImg from './src/assets/images/Todo.png';
import NotesImg from './src/assets/images/Notes.png';



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
                                    <Text style={{marginTop: responsiveWidth(7), color: 'white', fontFamily: 'NanumMyeongjo', fontSize: responsiveFontSize(6),}}>Menu</Text>
                                    <Text numberOfLines={1} style={{ color: '#818181', fontFamily: 'MPLUS1p', fontSize:responsiveWidth(3.5)}}>{userEmail}</Text>
                                  </View>
                                  <View style={{
                                    borderBottomColor: '#525468',
                                    borderBottomWidth: 1,
                                    width: responsiveHeight(25),
                                    alignSelf: 'center',
                                    marginTop: responsiveHeight(2),
                                  }}></View>
                                  <View style={{gap: responsiveWidth(4), height: responsiveHeight(50), justifyContent: "center", marginLeft: responsiveWidth(4)}}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ gap: responsiveWidth(4),flexDirection:"row", alignItems: "center", marginRight: responsiveWidth(4)}}><Image source={ProfileImg} style={{height: responsiveWidth(6), width: responsiveWidth(6), resizeMode: "contain"}}    /><Text style={{color: "white", fontFamily: "MPLUS1p", fontSize: responsiveFontSize(2)}}>Profile</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ gap: responsiveWidth(4),flexDirection:"row", alignItems: "center", marginRight: responsiveWidth(4)}}><Image source={HomeImg} style={{height: responsiveWidth(6), width: responsiveWidth(6), resizeMode: "contain",}}   /><Text style={{color: "white", fontFamily: "MPLUS1p", fontSize: responsiveFontSize(2)}}>Home</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('ChatsScreen')} style={{ gap: responsiveWidth(4),flexDirection:"row", alignItems: "center", marginRight: responsiveWidth(4)}}><Image source={Messages} style={{height: responsiveWidth(6), width: responsiveWidth(6), resizeMode: "contain",}}  /><Text style={{color: "white", fontFamily: "MPLUS1p", fontSize: responsiveFontSize(2)}}>Chats</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Todo')} style={{ gap: responsiveWidth(4),flexDirection:"row", alignItems: "center", marginRight: responsiveWidth(4)}}><Image source={TodoImg} style={{height: responsiveWidth(6), width: responsiveWidth(6), resizeMode: "contain",}}  /><Text style={{color: "white", fontFamily: "MPLUS1p", fontSize: responsiveFontSize(2)}}>To-do</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Notes')} style={{ gap: responsiveWidth(4),flexDirection:"row", alignItems: "center", marginRight: responsiveWidth(4)}}><Image source={NotesImg} style={{height: responsiveWidth(6), width: responsiveWidth(6), resizeMode: "contain",}}   /><Text style={{color: "white", fontFamily: "MPLUS1p", fontSize: responsiveFontSize(2)}}>Notes</Text></TouchableOpacity>
                                  </View>
                                  <View style={{
                                    borderBottomColor: '#525468',
                                    borderBottomWidth: 1,
                                    width: responsiveHeight(25),
                                    alignSelf: 'center',
                                    marginTop: responsiveHeight(2),
                                  }}></View>

                                  <View onPress={handleLogout()} style={{gap: responsiveWidth(4), marginTop:responsiveWidth(7), marginBottom: responsiveWidth(4)}}>
                                    <TouchableOpacity style={{marginLeft: responsiveWidth(4), flexDirection: 'row', overflow: 'hidden', alignItems: 'center', gap: responsiveWidth(4)}}>
                                      <Image source={Logout} style={{height: responsiveWidth(5), width: responsiveWidth(5), resizeMode: "contain",}} />
                                      <Text style={{color: 'white', fontSize: responsiveFontSize(2), fontFamily: "MPLUS1p"}}>Logout</Text>
                                    </TouchableOpacity>
                                    
                                    <View style={{marginLeft: responsiveWidth(4), flexDirection: 'row', overflow: 'hidden', alignItems: 'center', gap: responsiveWidth(4)}}>
                                      <TouchableOpacity><Image source={Insta} style={{height: responsiveWidth(5), width: responsiveWidth(5), resizeMode: "contain",}}/></TouchableOpacity>
                                      <TouchableOpacity><Image source={Git} style={{height: responsiveWidth(5), width: responsiveWidth(5), resizeMode: "contain",}}/></TouchableOpacity>
                                      <TouchableOpacity><Image source={Link} style={{height: responsiveWidth(5), width: responsiveWidth(5), resizeMode: "contain",}}/></TouchableOpacity>
                                    </View>

                                    <TouchableOpacity onPress={() => Linking.openURL('https://www.josias.pt')} style={{alignSelf: 'center',marginTop: responsiveWidth(5),flexDirection: 'row', width: responsiveWidth(40),alignItems: 'center',justifyContent: 'center', gap: responsiveWidth(4), backgroundColor: '#101014', padding: responsiveWidth(3.5), borderRadius: 100,}}>
                                      <Image source={Web} style={{height: responsiveWidth(5), width: responsiveWidth(5), resizeMode: "contain",}} />
                                      <Text style={{color: 'white', fontSize: responsiveFontSize(1.8), fontFamily: "MPLUS1p"}}>Josias.pt</Text>
                                    </TouchableOpacity>
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
      <Stack.Screen name="NewPost" component={NewPost} />
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="NoteDetail" component={NoteDetail} />
      <Stack.Screen name="CreateNote" component={CreateNote} />
    </Stack.Navigator>
  )
}

const DrawerNav=()=>{
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
    drawerContent={(props) => <DrawerContent {...props} />} 
    screenOptions={{
      drawerLabel: 'Home',
      headerShown: false,
      overlayColor: 'rgba(0, 0, 0, 0.5)',
      drawerStyle: {
        backgroundColor: '#1D1E26',
      },
      drawerItemStyle: {
        backgroundColor: 'transparent', 
        height: 60, 
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

       
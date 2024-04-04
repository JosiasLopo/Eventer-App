import React, { useEffect, useState } from 'react';
import { Image, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import menu from '../src/assets/images/menu.png';
import noti from '../src/assets/images/notification.png';
import account from '../src/assets/images/account.png';
import calendar from '../src/assets/images/calendar.png';
import bride from '../src/assets/images/Bride.jpg';
import hands from '../src/assets/images/hands.jpg';
import wood from '../src/assets/images/wood.jpg';
import chatBtn from '../src/assets/images/ChatBtn.png';
import { AuthCredential, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';



export default function Home({ navigation }) {

const [userEmail, setUserEmail] = useState(''); // State to store user's email

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

  const insets = useSafeAreaInsets();

  const [selectedButton, setSelectedButton] = useState(0);

  const handlePress = (index) => {
    setSelectedButton(index);
    console.log(`Button ${index + 1} pressed`);
  };
  const [loaded] = useFonts({
    NanumMyeongjo: require('../src/assets/fonts/NanumMyeongjo-Regular.ttf'),
    NanumMyeongjoBold: require('../src/assets/fonts/NanumMyeongjo-Bold.ttf'),
    NanumMyeongjoEBold: require('../src/assets/fonts/NanumMyeongjo-ExtraBold.ttf'),
    Inter: require('../src/assets/fonts/Inter-Regular.ttf'),
    InterBold: require('../src/assets/fonts/Inter-Bold.ttf'),
    InterEBold: require('../src/assets/fonts/Inter-ExtraBold.ttf'),
    MPLUS1p: require('../src/assets/fonts/MPLUS1p-Regular.ttf'),
    MPLUS1pBold: require('../src/assets/fonts/MPLUS1p-Bold.ttf'),
    MPLUS1pEBold: require('../src/assets/fonts/MPLUS1p-ExtraBold.ttf'),
  });

  if (!loaded){
    return null;
  } 

  const data = [
    { text: 'Todos', image: null},
    { text: 'Videos', image: require('../src/assets/images/Videos.png') },
    { text: 'Imagens', image: require('../src/assets/images/images.png') },
    { text: 'Gostos', image: require('../src/assets/images/gostos.png') },
  ];

    

 
  return ( 
    <View style={[styles.container,{paddingTop: insets.top, paddingBottom: insets.bottom}]}>
    <ScrollView style={[styles.container,{paddingTop: responsiveWidth(5)}]} stickyHeaderIndices={[]}>

        <View style={[styles.headerBtns, {paddingRight: responsiveWidth(2.5), paddingLeft: responsiveWidth(2.5)}]}>
                <View>
                    <TouchableOpacity style={styles.menuBtn} >
                        <Image source = {menu} style={styles.menuBtnImg}/>
                    </TouchableOpacity>

                </View>

                <View style={styles.headerBtnsRight}>
                <TouchableOpacity style={styles.menuBtnRight}>
                        <Image source = {noti} style={styles.notiBtnImg}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuBtnRight} onPress={handleLogout}>
                        <Image source = {account} style={styles.accountBtnImg}/>
                    </TouchableOpacity>

                </View>
        </View>

        <View style={styles.welcomeTxt}>
            <Text style={styles.Welcome}>Bem Vindo</Text>
            
            <Text style={styles.userTxt}>{userEmail.split('@')[0].replace(/\.| /g, '')}</Text>
        </View>

        <View style={[styles.eventTypeDate, { marginBottom: responsiveWidth(-6),paddingLeft: responsiveWidth(5.5),  paddingEnd: responsiveWidth(5.5)}]}>
                <Text style={styles.eventTypeDisplay}>Casamento</Text>
                <Text style={styles.eventDate}>16 setembro </Text>
                <Image source = {calendar} style={styles.calendarImg}/>
        </View>

        <View style={styles.ChatsView}>
            <TouchableOpacity style={styles.ChatsContainer}>
                <Image /*source={}*/ style={styles.ChatImage}/>
            </TouchableOpacity>
        </View>

        <View style={styles.ChatsText}><Text style={[{color: '#818181', fontFamily:'MPLUS1p'}]}>Chats Recentes...</Text></View>

        <View style={styles.WidgetsContainer}>
            <View style={styles.WidgetsView}>
                <View style={styles.ToDoHeader}>
                    <Text style={styles.ToDoTitle}>Pagamentos</Text>
                    <TouchableOpacity style={styles.TodoAddBtn}><Text style={styles.TodoAddText} onPress={() => alert('Popup appears')}>+</Text></TouchableOpacity>
                </View>
                <View style={styles.ToDoContainer}>
                    <TouchableOpacity style={styles.ToDoCheckBtn}></TouchableOpacity>
                    <Text style={styles.ToDoData}>Pagamento 1</Text>
                </View>
                <View style={styles.ToDoContainer}>
                    <TouchableOpacity style={styles.ToDoCheckBtn}></TouchableOpacity>
                    <Text style={styles.ToDoData}>Pagamento 1</Text>
                </View>
                <View style={styles.ToDoContainer}>
                    <TouchableOpacity style={styles.ToDoCheckBtn}></TouchableOpacity>
                    <Text style={styles.ToDoData}>Pagamento 1</Text>
                </View>
                <View style={styles.ToDoContainer}>
                    <TouchableOpacity style={styles.ToDoCheckBtn}></TouchableOpacity>
                    <Text style={styles.ToDoData}>Pagamento 1</Text>
                </View>

                
            </View>
        </View>
      </ScrollView>

        <TouchableOpacity style={styles.chatBtn} onPress={() => navigation.navigate("Default")}>
            <Image source = {chatBtn} style={styles.chatBtnImg}/>
        </TouchableOpacity>
    </View>
  );
}

const buttonWidth = 124;


export const styles = StyleSheet.create({ 

    container: {
        flex: 1,
        backgroundColor: '#101014',
    },

    chatBtn: {
        position: 'absolute',
        bottom: responsiveWidth(10),
        right: responsiveWidth(8),
        backgroundColor: '#1D1E26',
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(16),
        height: responsiveWidth(16),
        resizeMode: "contain",
        borderRadius: 100,
       
    },

    chatBtnImg: {
       width: responsiveWidth(9),
       resizeMode: "contain",
       marginTop: responsiveWidth(1),
       marginRight: responsiveWidth(0.5),
    },

    headerBtns: {
        flex: 0.35,
        flexDirection: "row",
        marginBottom: responsiveWidth(8)
    },

    headerBtnsRight: {
        flex: 1,
        height: 'auto',
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: responsiveWidth(0.3),
    },

    menuBtnRight: { 
        backgroundColor: 'rgba(29, 30, 38, 0.76)',
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(12),
        height: responsiveWidth(12),
        resizeMode: "contain",
        //borderRadius: '100%',
        borderRadius: 100,
    },


    menuBtn: {
        backgroundColor: 'rgba(29, 30, 38, 0.76)',
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(12),
        height: responsiveWidth(12),
        resizeMode: "contain",
        //borderRadius: '100%',
        borderRadius: 100,
    },

    menuBtnImg: {
        width: responsiveWidth(4.7),
        resizeMode: "contain",
    },

    notiBtnImg: {
        width: responsiveWidth(8),
        resizeMode: "contain",
    },

    accountBtnImg: {
        width: responsiveWidth(13),
        resizeMode: "contain",
    },

    welcomeTxt: {
        flex:0.6,
        justifyContent: 'center',
        alignItems: 'left',
        paddingLeft: responsiveWidth(2.5),
        paddingRight: responsiveWidth(2.5),
    },

    Welcome: {
        color: 'white',
        fontFamily: 'NanumMyeongjo',
        fontSize: responsiveFontSize(6)
    },

    userTxt:{
        color: 'white',
        fontFamily: 'NanumMyeongjoBold',
        fontSize: responsiveFontSize(6),
    },

    eventTypeDate: {
        flex:1,
        flexDirection: "row",
        alignItems: 'center',
        //backgroundColor: 'tomato',
        gap: responsiveWidth(1.5),

    },

    eventTypeDisplay: {
        flex: 1,
        textAlign:'left',
        fontFamily: 'NanumMyeongjoBold',
        color: '#818181',
        fontSize: responsiveFontSize(2.2),
    },

    eventDate: {
        flex: 1,
        textAlign:'right',
        fontFamily: 'NanumMyeongjoBold',
        color: 'white',
        fontSize: responsiveFontSize(2.2),
    },

    calendarImg: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(8),
        resizeMode: "contain",
    },

    ChatsText:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveWidth(3),
    },

   

   


    WidgetsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveWidth(13),
        
    },

    WidgetsView: {
        width: responsiveWidth(90), // Ajuste conforme necessário
        height: responsiveWidth(60), // Ajuste conforme necessário
        borderRadius: 60,
        overflow: 'hidden', // Para garantir que a imagem respeite a borda arredondada
        backgroundColor: '#1D1E26',
        paddingBottom: responsiveWidth(3),
        paddingTop: responsiveWidth(2),
    },

    ToDoHeader: {
        flex:1.3,
        flexDirection: "row",
        alignItems: 'center',
        //justifyContent: "flex-end",
        marginBottom: responsiveWidth(3),
    },

    ToDoTitle: {
        color: 'white',
        fontFamily: 'NanumMyeongjoBold',
        fontSize: responsiveFontSize(3),
        paddingLeft: responsiveWidth(8),
    },

    TodoAddBtn: {
        backgroundColor: '#101014',
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        resizeMode: "contain",
        borderRadius: 100,
        marginLeft: responsiveWidth(30),
    },

    TodoAddText: {
        color: 'white',
        fontFamily: 'NanumMyeongjo',
        fontSize: responsiveFontSize(3),
        paddingTop: responsiveWidth(0.5),
    },

    ToDoContainer: {
        flex:0.7,
        flexDirection: "row",
        alignItems: 'flex-start',
        //justifyContent: "flex-end",
        paddingLeft: responsiveWidth(16),
    },

    ToDoCheckBtn: {
        borderWidth: 2,
        width: responsiveWidth(6),
        height: responsiveWidth(6),
        borderRadius: 100,
        borderColor: 'white',
    },

    ToDoData: {
        color: 'white',
        fontFamily: 'MPLUS1p',
        fontSize: responsiveFontSize(2),
        paddingLeft: responsiveWidth(5),
    },

    });
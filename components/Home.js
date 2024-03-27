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


        <View style={styles.contentButtons}>

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer} 
        >
        {data.map((buttonData, index) => (
            <TouchableOpacity
            key={index}
            style={[
                styles.button,
                index === 0 && { width: 'auto' },
                selectedButton === index && { backgroundColor: '#1563FF' }, // Change color when selected
            ]}
            onPress={() => handlePress(index)}
            >
            {buttonData.image && <Image source={buttonData.image} style={styles.buttonImage} />}
            <Text style={styles.buttonText}>
                {buttonData.text}
            </Text>
            </TouchableOpacity>
        ))}
        </ScrollView>
        </View>

        <View style={[styles.filter, {paddingLeft: responsiveWidth(5.5), paddingEnd: responsiveWidth(6.3)}]}>
    
                <Text style={styles.filterType}>Fotografos</Text>
                <Text style={styles.filterButton}>Filtrar </Text>
        </View>

        <View style={styles.redirectBtnsView}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.redirectBtnsContainer}>
            <TouchableOpacity style={[styles.allPicturesBtn, styles.firstBtnMargin]}>
              <Text style={styles.numPics}>150</Text>
              <Text style={styles.numPics}>Fotos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.allPicturesBtn}>
              <Text style={styles.numPics}>150</Text>
              <Text style={styles.numPics}>Fotos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.allPicturesBtn, styles.lastBtnMargin]}>
              <Text style={styles.numPics}>200</Text>
              <Text style={styles.numPics}>Comentários</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.ImagesContainer}>
            <View style={styles.ImagesView}>
                <Image source = {bride} style={styles.Images}/>
            </View>
        </View>

        <View style={styles.ImagesContainer}>
            <View style={styles.ImagesView}>
                <Image source = {hands} style={styles.Images}/>
            </View>
        </View>

        <View style={styles.ImagesContainer}>
            <View style={styles.ImagesView}>
                <Image source = {wood} style={styles.Images}/>
            </View>
        </View>
      </ScrollView>
    </View>
  );
}

const buttonWidth = 124;


export const styles = StyleSheet.create({ 

    container: {
        flex: 1,
        backgroundColor: '#101014',
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

    contentButtons: {
        flex: 0.25,
        marginBottom: responsiveWidth(5),
    },

    scrollContainer: {
        flexDirection: 'row',
        flex: 1,
        paddingLeft: responsiveWidth(3.8),
    },

    button: {
        backgroundColor: '#1D1E26',
        borderRadius: 100,
        paddingHorizontal: 12, // Adjusted the padding to be smaller
        marginHorizontal: responsiveWidth(0.2),
        height: responsiveHeight(7),
        width: buttonWidth,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: responsiveWidth(2),
        alignSelf: 'flex-start', // Align each button to the start of the ScrollView

    },

    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(2.2),
        fontFamily: 'MPLUS1p',
    },

    buttonImage: {
    width: responsiveWidth(4.5), // Set the width of the image
    resizeMode: "contain",
    },

    filter: {
        flex:0.2,
        flexDirection: "row",
        alignItems: 'center',
        gap: responsiveWidth(1.5),
        marginTop: responsiveWidth(4),
        marginBottom: responsiveFontSize(1),
    },

    filterType: {
        flex: 1,
        textAlign:'left',
        fontFamily: 'MPLUS1p',
        color: 'white',
        fontSize: responsiveFontSize(2.2),
    },

    filterButton: {
        flex: 1,
        textAlign:'left',
        fontFamily: 'MPLUS1p',
        color: '#818181',
        textAlign:'right',
        fontSize: responsiveFontSize(2.2),
    },

    redirectBtnsView: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveWidth(13),
    },

    redirectBtnsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    allPicturesBtn: {
        backgroundColor: '#1D1E26',
        borderRadius: 45,
        marginHorizontal: responsiveWidth(0.5),
        height: responsiveWidth(40),
        width: responsiveWidth(45),
        justifyContent: 'center',
        paddingLeft: responsiveWidth(10),

    },

    firstBtnMargin: {
        marginLeft: responsiveWidth(-15), // Adjusted margin
    },

    lastBtnMargin: {
        marginRight: responsiveWidth(-15), // Adjusted margin
    },

    numPics: {
        // ... (previous styles)
        textAlign:'left',
        fontFamily: 'NanumMyeongjoBold',
        color: 'white',
        fontSize: responsiveFontSize(3),
    },

    ImagesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveWidth(13),
    },

    ImagesView: {
        width: responsiveWidth(93), // Ajuste conforme necessário
        height: responsiveWidth(60), // Ajuste conforme necessário
        borderRadius: 60,
        overflow: 'hidden', // Para garantir que a imagem respeite a borda arredondada
    },

    Images: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },

});
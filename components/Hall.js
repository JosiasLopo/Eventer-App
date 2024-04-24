import React from "react";
import { Image, TextInput, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Seta from "../src/assets/images/seta.png";
import GLogo from "../src/assets/images/googlelogo.png";

export default function Hall({ navigation }) {
  
  const insets = useSafeAreaInsets();

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

  return (
    

    <View style={[styles.container,{paddingTop: insets.top + responsiveWidth(5), paddingBottom: insets.bottom}]}>
      
      <View style={[styles.title, {paddingLeft: insets.left + responsiveWidth(4)}]}>
        <Text style={styles.txt1}>Melhora o teu</Text>
      </View>

      <ImageBackground
      source={require('../src/assets/images/intro-bg.jpg')} style={[styles.bgImg,{paddingLeft: insets.left + responsiveWidth(4)}]}>

        <Text style={styles.txt2}>Evento</Text>
      </ImageBackground>

      <TouchableOpacity style={styles.containerOu} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.txtOu}>Login</Text>
        <View  style={styles.btnArrow}>
            <Image source = {Seta} style={styles.btnArrowImg}/>
          </View>  
        </TouchableOpacity>

        <View style={styles.googleRegisBtn}>
          <TouchableOpacity style={styles.googleBtn} onPress={() => navigation.navigate('Home')}>
            <Image source = {GLogo} style={styles.googleBtnLogo}/>
            <Text style={styles.googleBtnTxt}>Continua com Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.regisBtn} onPress={() => navigation.navigate("Regist")}>
            <Text style={styles.regisBtnTxt}>Regista-te</Text>
          </TouchableOpacity>
        </View>


      
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
  },
  title: {
    flex: 1,
    justifyContent: 'flex-end', 
  },
  
  bgImg:{
    flex:2,
  },

  txt1: {
    paddingBottom: responsiveWidth(5),
    fontSize: responsiveFontSize(6),
    color: 'rgba(255,255,255,0.67)',
    fontFamily: 'NanumMyeongjo',
  },

  txt2:{
    paddingTop: responsiveWidth(5),
    fontSize: responsiveFontSize(6),
    color: 'white',
    fontFamily: 'NanumMyeongjoEBold',

  },

  containerOu: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveWidth(2),
  },

  txtOu: {
    color: '#B6B6B6',
    fontSize: responsiveFontSize(2.3),
    fontFamily: 'MPLUS1p',
  },
  
  btnArrowImg:{
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(3.2),
    resizeMode: "contain",
  },

  googleRegisBtn: {
    flex: 1,
    gap: responsiveWidth(3),
    alignItems: 'center',
  },  

  googleBtn: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: "center",
    width: responsiveHeight(30),
    height: responsiveHeight(6),
    justifyContent:'center',
    //borderRadius: responsiveWidth(6.5),
    borderRadius: 100,
    gap: responsiveWidth(2)
  },

  googleBtnLogo: {
    width: responsiveWidth(6.5),
    height: responsiveHeight(3),
    resizeMode: "contain",
  },

  googleBtnTxt: {
    color: 'black',
    fontFamily: 'Inter',
    fontSize: responsiveFontSize(1.7),
  },

  regisBtn: {
    backgroundColor: 'rgba(29,30,38,0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(3.5),
    width: responsiveWidth(27),
    //borderRadius: responsiveWidth(4)
    borderRadius: 100,
  },

  regisBtnTxt: {
    color: 'white',
    fontFamily: 'MPLUS1p',

  },

  




});

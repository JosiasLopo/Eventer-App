import React, { useState } from "react";
import { Image, TextInput, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Seta2 from "../src/assets/images/arrowLeft.png";
import GLogo from "../src/assets/images/googlelogo.png";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


export default function Login({ navigation }) {

  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async ()=>{
    if(email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch(err){
        console.log('got erros', err.message);
      }
    }
  }

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
      
    <View style={[styles.container,{paddingTop: insets.top + responsiveWidth(5), paddingBottom: insets.bottom, paddingLeft: insets.left + responsiveWidth(3), paddingRight: insets.left + responsiveWidth(3)}]}>
      
      <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate("Hall")}>
          <View  style={styles.btnArrow}>
            <Image source = {Seta2} style={styles.btnArrowImg}/>
          </View>  
            <Text style={[styles.txtLoginBtn, {marginLeft: responsiveWidth(3)}]}>Login</Text>
      </TouchableOpacity>


      <View style={styles.loginContent}>


        <View style={styles.logoContent}>
          <Text style={styles.logo}>
            Eventer
          </Text>
          <Text style={styles.logoDot}>.</Text>
          </View>


        <View style={styles.userData}>

          <View style={styles.Name}>
            <Text style={styles.userNamePassword}>E-mail adress:</Text>
            <TextInput placeholder=''  style = {styles.userInput }
              value={email}
              onChangeText={value => setEmail(value)}/>
          </View>

          <View style={styles.Password}>
            <Text style={styles.userNamePassword}>Password:</Text>
            <TextInput placeholder='' style = {styles.userInput}
              value={password}
              onChangeText={value => setPassword(value)}
            />
          </View>
        </View>

       

        <View style={styles.googleRegisBtn}>
          <View style={styles.Login}>
          <TouchableOpacity 
            onPress={handleSubmit}>
              <View  style={styles.btnArrowRotate}>
                <Image source = {Seta2} style={styles.btnArrowImg}/>
              </View> 
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.regisBtn} onPress={() => navigation.navigate("Regist")}>
            <Text style={styles.regisBtnTxt}>Don't have an account? </Text>
            <Text style={styles.regisBtnLink}>Register</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
    
  },



  btnBack:{
    width: responsiveWidth(25),
    flexDirection: "row",
    alignItems: "center",

  },

  btnArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 30, 38, 0.76)',
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    resizeMode: "contain",
    borderRadius: 100,
  },

  btnArrowImg: {
  
    width: responsiveWidth(4.5),
    resizeMode: "contain",
  },

  btnArrowRotate: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 30, 38, 0.76)',
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    resizeMode: "contain",
    borderRadius: 100,
    transform: [{ rotate: '180deg' }],
  },

  txtLoginBtn: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontFamily: 'MPLUS1p',
  },



  loginContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  logoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    color: 'white',
    fontFamily: 'MPLUS1pEBold',
    fontSize: responsiveFontSize(6),
  },

  logoDot: {
    color: '#1563FF',
    fontFamily: 'MPLUS1pEBold',
    fontSize: responsiveFontSize(6),
  },


  userData: {
    flex: 1,
    width: responsiveHeight(33),
  },

  Name:{
    flex: 1,
    justifyContent: 'center',
  },

  Password:{
    flex: 1,
    justifyContent: 'center',
  },

  userNamePassword: {
    color: 'white',
    fontFamily: 'MPLUS1p',
    fontSize: responsiveFontSize(2.3),
  },

  userInput: {
    color: 'white',
    fontFamily: 'MPLUS1p',
    fontSize: responsiveFontSize(2),
    borderBottomColor: '#525468',
    borderBottomWidth: responsiveWidth(0.10),
  },
  
  Login: {
    paddingTop: responsiveHeight(3),
    flex: 0.70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleRegisBtn: {
    flex: 1.3,
    alignItems: 'center',
  },  

  regisBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(3.5),
    borderRadius: 100,
    flexDirection: 'row',
  },

  regisBtnTxt: {
    color: 'white',
    fontFamily: 'MPLUS1p',

  },

  regisBtnLink: {
    color: '#1563FF',
    fontFamily: 'MPLUS1p',
  },


});
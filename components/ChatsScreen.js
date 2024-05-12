// App.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextComponent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"; 
import ChatGptIcon from '../src/assets/images/GptIcon.png';
import Gemini from '../src/assets/images/GeminiIcon.png';
import Chat from '../src/assets/images/ChatIcon.png';
import Arrow from '../src/assets/images/ArrowNoTail.png';
import headerImg from '../src/assets/images/AI_Stars.png';

export default function ChatsScreen() {
     const navigation = useNavigation();
     const insets = useSafeAreaInsets();

     const showAlert = () => {
    Alert.alert(
      'Alert Title',
      'My Alert Message',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={[styles.container,{paddingTop: insets.top}]}>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={styles.header}>
        <View style={styles.TxtView}>
            <Text style={styles.headerTxt}>   AI </Text>
            <Text style={styles.headerTxtDot}>Ask and Add</Text>
        </View>
        <Text style={styles.headerTxt2}>   ZONE</Text>
      </View>

      <View style={
        {flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#101014',
        width: '100%',}
      }>
        <Image source={headerImg} style={styles.headerImg}/>
      </View>
      
      </View>
    
    <View style={{flex: 3.5, width: '100%', flexDirection: 'row'}}>
    <View style={{height: '100%', backgroundColor:'#1D1E26', flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: responsiveWidth(10), paddingBottom: insets.bottom}}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
          <Text onPress={showAlert} style={{flex: 1, color: 'white', width: '100%',fontSize: responsiveFontSize(1), transform: [{ rotate: '-90deg'}], textAlign: 'center'}}>Easter Egg</Text>
          <Image source={Arrow} style={styles.Arrow}/>
      </TouchableOpacity>
    </View>

      <View style={[styles.chatContainer, {paddingBottom: insets.bottom}]}>

          <TouchableOpacity style={styles.chatView} onPress={() => navigation.navigate('ChatGpt')}>
            <View style={{marginLeft: responsiveWidth(5)}}>
              <Text style={styles.AiTitle}>Gpt 3.5 API</Text>
              <Text style={styles.AiDescription}>Most Optimized</Text>
            </View>
            <View style={[styles.logoImage, {marginRight: responsiveWidth(5)}]}>
              <Image source={ChatGptIcon} style={styles.menuBtnImg}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chatView} onPress={() => navigation.navigate('Gemini')}>
            <View style={{marginLeft: responsiveWidth(5)}}>
              <Text style={styles.AiTitle}>Gemini</Text>
              <Text style={styles.AiDescription}>Regional And Longer Responses</Text>
            </View>
            <View style={[styles.logoImage, {marginRight: responsiveWidth(5)}]}>
              <Image source={Gemini} style={styles.menuBtnImg}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chatView} onPress={() => navigation.navigate('ChatPage')}>
            <View style={{marginLeft: responsiveWidth(5)}}>
              <Text style={styles.AiTitle}>Fast Notes</Text>
              <Text style={styles.AiDescription}>Chat Yourself</Text>
            </View>
            <View style={[styles.logoImage, {marginRight: responsiveWidth(5)}]}>
              <Image source={Chat} style={styles.menuBtnImg}/>
            </View>
          </TouchableOpacity>
          
        
      </View>
    </View>

    </View>
  );
};



const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: "#101014",
  }, 
  header:{
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#101014',
    width: '100%',
  },

  headerImg:{
    flex: 1,
    width: responsiveWidth(40),
    resizeMode: "contain",
    marginLeft: responsiveWidth(7),
  },
  TxtView:{
    flexDirection: "row",
    alignItems: 'baseline',
  },
  headerTxt:{
      color:"white",
      fontSize: responsiveFontSize(5),
      fontFamily: "NanumMyeongjo",
  },
  headerTxtDot:{
      color:"#818181",
      fontSize: responsiveFontSize(1.4),
      fontFamily: "MPLUS1p",
  },

  headerTxt2:{
      color:"white",
      fontSize: responsiveFontSize(5),
      fontFamily: "NanumMyeongjo",
  },
  chatContainer: {
    flex: 11,
    width: '100%',
    backgroundColor: '#1D1E26',
    alignItems: 'center',
    justifyContent: 'center'    
  },  

  chatView:{
    flexDirection: 'row',
    width: responsiveHeight(40),
    height: responsiveHeight(10),
    backgroundColor: '#101014',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: responsiveWidth(14), 
    borderTopRightRadius: responsiveWidth(6.5), 
    borderBottomLeftRadius: responsiveWidth(6.5), 
    borderBottomRightRadius: responsiveWidth(14), 
    marginBottom: responsiveWidth(4),
    marginRight: responsiveWidth(3),
  },

  logoImage:{
    height: responsiveHeight(10),
    justifyContent: 'center',
  },

  menuBtnImg:{
    height: responsiveWidth(17),
    width: responsiveWidth(17),
    resizeMode: "contain",
  },

  backBtn: {
    flexDirection: 'row',
    height: responsiveHeight(17),
    width: responsiveWidth(17),
    backgroundColor: '#101014', 
    borderTopRightRadius: 100, 
    borderBottomRightRadius: 100, 
    overflow: 'hidden',
    marginRight: responsiveWidth(14),
    marginBottom: responsiveWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
  },

  Arrow:{
    flex: 1,
    height: responsiveWidth(4),
    resizeMode: "contain",
    marginRight: responsiveWidth(-1),
  },

  AiTitle: {
    color: 'white',
    fontSize: responsiveFontSize(2.3),
    fontFamily: "MPLUS1p",
    marginLeft: responsiveWidth(5),
  },

  AiDescription: {
    color: '#818181',
    fontSize: responsiveFontSize(1.5),
    fontFamily: "MPLUS1p",
    marginLeft: responsiveWidth(5),
    width: responsiveWidth(40),
  },

}); 
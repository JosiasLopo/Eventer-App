import React, { useEffect, useState } from 'react';
import { Image, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity, View, Linking } from 'react-native';
import { useFonts } from 'expo-font';
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth } from "react-native-responsive-dimensions"; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import menu from '../src/assets/images/menu.png';
import Upload from '../src/assets/images/Upload.png';
import calendar from '../src/assets/images/calendar.png';
import bride from '../src/assets/images/Bride.jpg';
import hands from '../src/assets/images/hands.jpg';
import wood from '../src/assets/images/wood.jpg';
import chatBtn from '../src/assets/images/ChatBtn.png';
import { AuthCredential, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import ListWidget from './ListWidget'; // Import your List component here
import { Header, createStackNavigator } from '@react-navigation/stack';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ChatGptIcon from '../src/assets/images/GptIcon.png';
import Gemini from '../src/assets/images/GeminiIcon.png';
import Chat from '../src/assets/images/ChatIcon.png';
import PhotosPage from './MediaWidget';
import ProfileScreen from './profilePic';

const Stack = createStackNavigator();

export default function Home() {
    const navigation = useNavigation();
    const currentDate = new Date();
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);


    const handleOpenCalendar = () => {
        Linking.openURL('content://com.android.calendar/time/');
        Linking.openURL('calshow://'); 
    };


const [userEmail, setUserEmail] = useState('');

useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
        setUserEmail(user.email);
    } else {
        setUserEmail(''); 
    }
    });

    
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
    <View style={[styles.container,{paddingTop: insets.top, paddingBottom: insets.bottom - 10}]}>
        <ScrollView style={[styles.container,{paddingTop: responsiveWidth(5)}]} stickyHeaderIndices={[]}>


            <View style={[styles.headerBtns, {paddingRight: responsiveWidth(2.5), paddingLeft: responsiveWidth(2.5)}]}>
                    <View>
                        <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.toggleDrawer()}>
                            <Image source={menu} style={styles.menuBtnImg}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.headerBtnsRight}>
                    <TouchableOpacity style={styles.menuBtnRight} onPress={() => navigation.navigate("NewPost")}>
                            <Image source = {Upload} style={styles.UploadBtnImg}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuBtnRight} onPress={() => navigation.navigate("Profile")}> 
                            <View style={styles.accountBtnImg}>
                                    <ProfileScreen/>
                            </View>
                        </TouchableOpacity>

                    </View>
            </View>

            <View style={styles.welcomeTxt}>
                <Text style={styles.Welcome}>Welcome</Text>
                
                <Text style={styles.userTxt}>{userEmail.split('@')[0].replace(/\.| /g, '')}</Text>
            </View>

            <View style={[styles.eventTypeDate, { marginBottom: responsiveWidth(-6),paddingLeft: responsiveWidth(5.5),  paddingEnd: responsiveWidth(5.5)}]}>
                    <Text style={styles.eventTypeDisplay}>Eventer</Text>
                    <TouchableOpacity style={styles.eventTypeDate} onPress={handleOpenCalendar}>
                        <Text style={styles.eventDate}>{formattedDate}</Text>
                        <Image source = {calendar} style={styles.calendarImg}/>
                    </TouchableOpacity>
            </View>

            <View style={styles.ChatsView}>
                <TouchableOpacity style={styles.ChatsContainer}>
                    <Image /*source={}*/ style={styles.ChatImage}/>
                </TouchableOpacity>
            </View>

            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: responsiveWidth(5),
                marginBottom: responsiveWidth(3),
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('ChatGpt')}>
                    <Image source={ChatGptIcon} style={{height: responsiveWidth(15), width: responsiveWidth(17), resizeMode: "contain",}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Gemini')}>
                    <Image source={Gemini} style={{height: responsiveWidth(15), width: responsiveWidth(17), resizeMode: "contain",}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ChatPage')}>
                    <Image source={Chat} style={{height: responsiveWidth(15), width: responsiveWidth(17), resizeMode: "contain",}}/>
                </TouchableOpacity>
            </View>
            <View style={styles.ChatsText}><Text style={[{color: '#818181', fontFamily:'MPLUS1p'}]}>Your Chats...</Text></View>

            <View style={styles.WidgetsContainer}>
                <View style={styles.WidgetsView}>
                    <View style={styles.ToDoHeader}>
                        <View style={{justifyContent:'left', alignItems:'left'}}>
                            <Text style={styles.ToDoTitle}>To-do List</Text>
                        </View>
                            <View style={{justifyContent:'right', alignItems:'right'}}>
                                <TouchableOpacity style={styles.TodoAddBtn}><Text style={styles.TodoAddText} onPress={() => navigation.navigate("Todo")}><Ionicons name="arrow-forward" size={responsiveWidth(5)} color="white"  /></Text></TouchableOpacity>
                            </View>
                    </View>
                  
                </View>


                <View style={styles.TodoView}>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                        <Stack.Screen name="MyTodos" component={ListWidget} />
                    </Stack.Navigator>
                </View>

                <View style={{flexDirection: 'row', marginTop: responsiveWidth(5), gap: 1,}}>
                <View style={{backgroundColor:"#1D1E26", width: responsiveWidth(2.5), height: responsiveWidth(2.5), borderRadius: responsiveWidth(10)}}></View>
                <View style={{backgroundColor:"#1D1E26", width: responsiveWidth(2.5), height: responsiveWidth(2.5), borderRadius: responsiveWidth(10)}}></View>
                <View style={{backgroundColor:"#1D1E26", width: responsiveWidth(2.5), height: responsiveWidth(2.5), borderRadius: responsiveWidth(10)}}></View>
                </View>
                <PhotosPage/>
            </View>
        </ScrollView>

        <TouchableOpacity style={styles.chatBtn}  onPress={() => navigation.navigate('ChatPage')}>
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

    UploadBtnImg: {
        width: responsiveWidth(6),
        resizeMode: "contain",
    },

    accountBtnImg: {
        width: responsiveWidth(11),
        height: responsiveWidth(11),
        resizeMode: "cover",
        overflow: "hidden",
        borderRadius: 100,
        position: 'absolute', 
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
        marginBottom: responsiveWidth(8),
    },






    WidgetsContainer: {
        justifyContent: 'center',
        alignItems: 'center',        
    },

    WidgetsView: {
        width: "85%",
        height: responsiveHeight(8),
        backgroundColor: '#1D1E26',
        paddingTop: responsiveWidth(2),
        justifyContent: "center",
        borderTopLeftRadius: responsiveWidth(10), 
        borderTopRightRadius: responsiveWidth(10),
        overflow: 'hidden', 
        marginBottom: 1,
    },


    TodoView: {
        height:responsiveWidth(35),
        width: '85%',
    },

    ToDoHeader: {
        flex:0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"

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
        marginRight: responsiveWidth(8),
    },


    });
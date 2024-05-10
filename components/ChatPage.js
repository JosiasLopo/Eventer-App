import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ChatIcon from "../src/assets/images/ChatIcon.png";
import Seta2 from "../src/assets/images/arrowLeft.png";
import SendIcon from "../src/assets/images/SendIcon.png";
import { useNavigation } from "@react-navigation/native";
 

const db = getFirestore();



const MyChatScreen = () => {

    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const userId = auth.currentUser.uid;

        const messagesRef = collection(db, 'users', userId, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    const sendMessage = async () => {
        if (newMessage.length === 0) return;

        try {
            const auth = getAuth();
            const userId = auth.currentUser.uid;

            await addDoc(collection(db, 'users', userId, 'messages'), {
                text: newMessage,
                from: 'me', 
                timestamp: Date.now(),
            });
            setNewMessage(''); 
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    };
 
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.btnArrow} onPress={() => navigation.navigate("Home")}>
                <Image source={Seta2} style={styles.btnArrowImg} />
                </TouchableOpacity>
                <View
                style={{
                    marginRight: responsiveWidth(30),
                    marginBottom: responsiveWidth(2),
                }}
                >
                <Text style={styles.title}>Notes</Text>
                <Text style={styles.titleDescription}>Save your stuff</Text>
                </View>
            </View>

            <View
                style={{
                marginTop: responsiveWidth(-20),
                alignItems: "flex-end",
                width: "100%",
                height: responsiveHeight(9),
                marginLeft: responsiveWidth(5),
                zIndex: 1,
                }}
            >
                <TouchableOpacity style={{
                    backgroundColor: "#101014",
                    width: responsiveWidth(5.5),
                    height: responsiveWidth(5.5),
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: responsiveWidth(18),
                    }}>
                <Text
                    style={{
                    color: "white",
                    fontSize: responsiveFontSize(1.5),
                    fontFamily: "MPLUS1p",
                    }}>?</Text>
                </TouchableOpacity>
                <Image
                source={ChatIcon}
                style={{
                    height: responsiveWidth(23),
                    width: responsiveWidth(23),
                    resizeMode: "contain",
                }}
                />
            </View>

            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.chatContainer}
                renderItem={({ item }) => (
                    <View style={[styles.message, item.from === 'me' ? styles.myMessage : styles.otherMessage]}>
                      <Text style={{alignSelf: 'flex-end', color: "white", fontFamily: 'MPLUS1p', fontSize: responsiveFontSize(2)}}>{item.text}</Text>
                      <Text style={styles.timestamp}>
                          {new Date(item.timestamp).toLocaleDateString() + ' ' + new Date(item.timestamp).toLocaleTimeString()}
                      </Text>
                  </View>
                )}
            />
           
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.button} onPress={sendMessage}>
                <Image source={SendIcon} style={styles.buttonText} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Type a fast note..."
                    placeholderTextColor="#818181"
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: responsiveWidth(6),
        backgroundColor: "#101014",
        width: "100%",
        alignItems: "center",
    },
    message: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        maxWidth: '80%', // Limit message width
    },
    myMessage: {
        alignSelf: 'flex-end', // Align right
        backgroundColor: '#1563FF', // Light blue for your messages 
    },
    otherMessage: {
        alignSelf: 'flex-start', // Align left
        backgroundColor: '#e8e8e8' // Light gray for others' messages
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#e8e8e8',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginRight: 10
    },
    sendButton: {
        color: '#007bff', //  Standard blue for send button
        fontSize: 16,
    },

    timestamp: {
        fontSize: responsiveFontSize(1.3),
        fontStyle: 'italic',
        color: 'black', // Light gray color
        marginTop: 5,
        alignSelf: 'flex-end'
    },

    header: {
        flexDirection: "row",
        paddingBottom: responsiveWidth(2),
        paddingRight: responsiveWidth(4),
        backgroundColor: "#1D1E26",
        marginTop: responsiveWidth(-5.5),
        height: responsiveHeight(15.5),
        width: responsiveWidth(100),
        alignItems: "flex-end",
        justifyContent: "space-between",
        zIndex: 1,
    },

    btnArrow: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(29, 30, 38, 0.76)",
        marginLeft: responsiveWidth(7),
        height: responsiveWidth(15),
        resizeMode: "contain",
        //borderRadius: '100%',
    },

    btnArrowImg: {
        width: responsiveWidth(5),
        resizeMode: "contain",
    },

    title: {
        fontFamily: "MPLUS1p",
        fontSize: responsiveFontSize(3),
        color: "white",
        textAlign: "center",
        alignSelf: 'flex-end'
    },

    titleDescription: {
        fontFamily: "NanumMyeongjo",
        fontSize: responsiveFontSize(1.5),
        color: "#9F9F9F",
        textAlign: "right",
        alignSelf: 'flex-end'
    },

    chatContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
        width: responsiveWidth(86),
        paddingTop: responsiveWidth(14),
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        height: responsiveHeight(7),
        marginRight: 10,
        padding: responsiveWidth(1),
        borderRadius: 100,
        backgroundColor: "#1D1E26",
        gap: responsiveWidth(3),
    },

    input: {
        flex: 4,
        color: "#818181",
    },

    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        width: responsiveWidth(8),
        height: responsiveWidth(8),
        resizeMode: "contain",
    },
});


export default MyChatScreen;

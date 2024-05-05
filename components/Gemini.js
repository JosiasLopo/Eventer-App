import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Gemini1 from "../src/assets/images/GeminiIcon.png";
import Seta2 from "../src/assets/images/arrowLeft.png";
import SendIcon from "../src/assets/images/SendIcon.png";
import { useNavigation } from '@react-navigation/native';

export default function Gemini() {

  const navigation = useNavigation();

  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = "AIzaSyD-IKdWQnxgAxUyhiTmu4z-N_cftRtyM30";

  const handleUserInput = async () => {
    let updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];

    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );

      console.log("Gemini Pro API Response", response.data);

      const modelResponse =
        response.data?.candidates?.[0]?.content.parts?.[0]?.text || "";

      if (modelResponse) {
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];

        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error) {
      console.error("Error Calling Gemini Pro Api: ", error);
      console.error("Error Response: ", error.response);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const renderChatItem = ({ item }) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity style={styles.btnArrow} onPress={() => navigation.navigate("Home")}>
            <Image source = {Seta2} style={styles.btnArrowImg}/>
          </TouchableOpacity>  
        <View
          style={{
            marginRight: responsiveWidth(30),
            marginBottom: responsiveWidth(2),
          }}
        >
          <Text style={styles.title}>Gemini</Text>
          <Text style={styles.titleDescription}>Online</Text>
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
          source={Gemini1}
          style={{
            height: responsiveWidth(23),
            width: responsiveWidth(23),
            resizeMode: "contain",
          }}
        />
      </View>

      <FlatList
        data={chat}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUserInput}>
          <Image source={SendIcon} style={styles.buttonText}/>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#818181"
          value={userInput}
          onChangeText={setUserInput}
        />
      </View>
      {loading && <ActivityIndicator style={styles.loading} color="#333" />}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(6),
    backgroundColor: "#101014",
    width: "100%",
    alignItems: "center",
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 30, 38, 0.76)',
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
  },

  titleDescription: {
    fontFamily: "NanumMyeongjo",
    fontSize: responsiveFontSize(1.5),
    color: "#9F9F9F",
    textAlign: "right",
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
    justifyContent: 'center',
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
    color: '#818181',
  },

  button: {
    flex: 1,
    justifyContent: 'center',   
    alignItems: 'center',
  },

  buttonText: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    resizeMode: "contain",
  },

  loading: {
    marginTop: 10,
  },

  error: {
    color: "red",
    marginTop: 10,
  },
});

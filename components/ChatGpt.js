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
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatBubble from "./ChatBubble";
import {
  responsiveFontSize,
  responsiveHeight, 
  responsiveWidth,
} from "react-native-responsive-dimensions";
import GptIcon from "../src/assets/images/GptIcon.png";
import Seta2 from "../src/assets/images/arrowLeft.png";
import SendIcon from "../src/assets/images/SendIcon.png";
import { useNavigation } from "@react-navigation/native";

export default function ChatGpt() {
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    // Load messages from AsyncStorage when the component mounts
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem("messages");
        if (storedMessages) setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    loadMessages();
  }, []);

  const sendMessage = async () => {
    const userMessage = { role: "user", content: inputText };
    setInputText(""); // Clear input field

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [userMessage],
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer sk-proj-Z1Ajya69IBOyKQA0mdfMT3BlbkFJSuZIGj78evtVB9VRpwFF", // Replace with your OpenAI API key
          },
        }
      );
      const botMessage = {
        role: "bot",
        content: response.data.choices[0].message.content,
      };

      const updatedMessages = [...messages, userMessage, botMessage]; // Append new messages
      setMessages(updatedMessages); // Update state with all messages
      saveMessages(updatedMessages); // Save updated messages to AsyncStorage
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const saveMessages = async (messages) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages:", error);
    }
  };

  const renderChatItem = ({ item }) => (
    <ChatBubble role={item.role} text={item.content} />
  );

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
          <Text style={styles.title}>Gpt 3.5</Text>
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
          source={GptIcon}
          style={{
            height: responsiveWidth(23),
            width: responsiveWidth(23),
            resizeMode: "contain",
          }}
        />
      </View>

      <FlatList
        data={messages}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Image source={SendIcon} style={styles.buttonText} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#818181"
          value={inputText}
          onChangeText={setInputText}
        />
      </View>
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

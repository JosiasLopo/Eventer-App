import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import ChatGpt from "./Gemini";
import { responsiveWidth } from "react-native-responsive-dimensions";

const ChatBubble = ({ role, text }) => {
    return(
        <View 
            style={[
                styles.chatItem,
                role === "user" ? styles.userChatItem : styles.modelChatItem,
            ]}
        >
            <Text style={styles.chatText}>{text}</Text>
            
        </View>
    );
};

const styles = StyleSheet.create({
    chatItem: {
        marginBottom: responsiveWidth(3),
        padding: responsiveWidth(4),
        borderRadius: responsiveWidth(3),
        maxWidth: "80%",
        position: "relative",
    },
    userChatItem: {
        alignSelf: "flex-end",
        backgroundColor: "#007AFF",
    },
    modelChatItem: {
        alignSelf: "flex-start",
        backgroundColor: "#000",
    },
    chatText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default ChatBubble;

//18:50 https://www.youtube.com/watch?v=ZXdJ04Q1ksE
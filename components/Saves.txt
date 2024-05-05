import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const ChatGpt = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const sendMessage = async () => {
  const userMessage = { role: 'user', content: inputText };
  
  // Clear messages state after sending a message
  setMessages([]);
  
  setInputText('');
  
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [userMessage],
        temperature: 0.5
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-proj-Z1Ajya69IBOyKQA0mdfMT3BlbkFJSuZIGj78evtVB9VRpwFF', // Replace with your actual API key
        },
      }
    );
    const botMessage = {
      role: 'bot',
      content: response.data.choices[0].message.content,
    };
    setMessages([userMessage,botMessage]); // Set messages state with only the bot message
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

  return (
    <View style={{marginTop: 100, }}>
      {messages.map((message, index) => (
        <Text key={index} style={{ color: message.role === 'user' ? 'blue' : 'green' }}>
          {message.content}
        </Text>
      ))}
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 50, }}
        onChangeText={text => setInputText(text)}
        value={inputText}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};
export default ChatGpt;
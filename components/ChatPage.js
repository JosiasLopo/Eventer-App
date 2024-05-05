import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

const MyChatScreen = () => {
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
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.message, item.from === 'me' ? styles.myMessage : styles.otherMessage]}>
                      <Text>{item.text}</Text>
                      <Text style={styles.timestamp}>
                          {new Date(item.timestamp).toLocaleDateString() + ' ' + new Date(item.timestamp).toLocaleTimeString()}
                      </Text>
                  </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type your message..."
                />
                <TouchableOpacity onPress={sendMessage}>
                    <Text style={styles.sendButton}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5' // Light background
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
        backgroundColor: '#e1f0ff', // Light blue for your messages 
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
        fontSize: 10,
        fontStyle: 'italic',
        color: '#666', // Light gray color
        marginTop: 5,
    }
});


export default MyChatScreen;

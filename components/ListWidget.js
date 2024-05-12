import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Text } from 'react-native';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../config/firebase';
import { Ionicons, Entypo } from '@expo/vector-icons'; 
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { getAuth, onAuthStateChanged, currentUser } from 'firebase/auth'; 



const ListWidget = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const auth = getAuth(); 
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser); 
        });

        return () => unsubscribe();
    }, []);

    const addTodo = async () => {
        if (user) { 
        try {
            const docRef = await addDoc(collection(FIRESTORE_DB, 'todos'), {
            title: todo,
            done: false,
            email: user.email 
            });
            setTodo('');
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
        } else {
       
        }
    };

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');

        const unsubscribe = onSnapshot(todoRef, (snapshot) => {
        const todos = [];
        snapshot.docs.forEach((doc) => {
            if (doc.data().email === user?.email) { 
            todos.push({
                id: doc.id,
                ...doc.data(),
            });
            }
        });
        setTodos(todos);
        });

        return () => unsubscribe();
    }, [user]); 
        const toggleDone = async (itemId, done) => {
            const todoRef = doc(FIRESTORE_DB, 'todos', itemId);
            await updateDoc(todoRef, { done: !done });
        };

        const deleteItem = async (itemId) => {
            const todoRef = doc(FIRESTORE_DB, 'todos', itemId);
            await deleteDoc(todoRef);
        };

        const renderTodo = ({ item }) => {
            return (
                <View style={[styles.todoContainer, { borderRadius:"100%"}]}>
                <TouchableOpacity onPress={() => toggleDone(item.id, item.done)} style={styles.todo}>
                    {item.done ? <Ionicons name="checkmark-circle" size={responsiveWidth(7.5)} color="green"  /> : <Ionicons name="radio-button-off" size={responsiveWidth(7.5)} color="white" />}
                    <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                </View>
            );
        };

    return (
        <View style={styles.container}>

            <View style={{height: '100%', width: '100%', backgroundColor: '#1D1E26', borderBottomLeftRadius: responsiveWidth(10), borderBottomRightRadius: responsiveWidth(10)}}>
            <View  style={styles.content}>
            {todos.length > 0 && (
                <FlatList style={styles.Flat}
                    data={todos}
                    renderItem={renderTodo}
                    keyExtractor={(todo) => todo.id}
                    
                />
            )}
        
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

    content: {
        padding: responsiveWidth(3),
        paddingBottom: 0,
    },

    todo: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginBottom: responsiveWidth(3),
    },

    todoText: {
        flex: 1,
        color: 'white',
        fontSize: responsiveFontSize(2.3),
        paddingLeft: 10,

    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: responsiveWidth(10),
    },

});

export default ListWidget;

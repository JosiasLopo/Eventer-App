import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Text } from 'react-native';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../config/firebase';
import { Ionicons, Entypo } from '@expo/vector-icons'; // Certifique-se de importar esses ícones corretamente
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

const List = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

    const addTodo = async () => {
        try {
            const docRef = await addDoc(collection(FIRESTORE_DB, 'todos'), {
                title: todo,
                done: false
            });
            setTodo('');
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');

        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos = [];
                snapshot.docs.forEach((doc) => {
                    todos.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                setTodos(todos);
            }
        });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

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
                {item.done ? <Ionicons name="checkmark-circle" size={responsiveWidth(7)} color="green"  /> : <Ionicons name="radio-button-off" size={responsiveWidth(7)} color="white" />}
                <Text style={styles.todoText}>{item.title}</Text>
            </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            <View  style={styles.content}>
            {todos.length > 0 && (
                <FlatList style={styles.Flat}
                    data={todos}
                    renderItem={renderTodo}
                    keyExtractor={(todo) => todo.id}
                    // removeClippedSubviews={true}
                />
            )}
        
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    
        container: {
            flex: 1,
            backgroundColor: '#1D1E26',
        },

    containerTitle: {
        flex: 0.2,
        justifyContent: 'flex-start',
    },

    containerTodo: {
        flex: 1,
        paddingLeft: responsiveWidth(7),
        paddingRight: responsiveWidth(7),
        paddingTop: responsiveWidth(5),
        backgroundColor: '#101014',
        borderTopLeftRadius: responsiveWidth(10),
        borderTopRightRadius: responsiveWidth(10),
        
        
    },

    content: {
        flex: 1,
    },
    
    form: {
        flex: 0.1,
        marginVertical: responsiveWidth(5),
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        height: responsiveWidth(15),
        borderRadius: responsiveWidth(100),
        backgroundColor: "#1D1E26",
        color: 'white',
        paddingLeft: responsiveWidth(5),
        paddingRight: responsiveWidth(5),
        fontFamily: 'MPLUS1p',
    },

    ButtonAdd: {
        paddingLeft: responsiveWidth(5),
        paddingRight: responsiveWidth(5),
    },

    TextAdd: {
        color:"blue", 
        fontFamily:"MPLUS1p", 
        fontSize: responsiveFontSize("2")
    },

    todo: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginBottom: responsiveWidth(1.7),

    },
    todoText: {
        flex: 1,
        paddingHorizontal: 4,
        color: 'white',
        fontSize: responsiveFontSize(2.3),
        paddingLeft: 10,

    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: responsiveWidth(10),
    },

    Flat: {
        flex: 1,
    }
});

export default List;

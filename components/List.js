import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Text } from 'react-native';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../config/firebase';
import { Ionicons, Entypo } from '@expo/vector-icons'; 
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { getAuth, onAuthStateChanged, currentUser } from 'firebase/auth'; 


const List = () => {
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
                {item.done ? <Ionicons name="checkmark-circle" size={32} color="green"  /> : <Ionicons name="radio-button-off" size={32} color="white" />}
                <Text style={styles.todoText}>{item.title}</Text>
            </TouchableOpacity>
            <Ionicons name="close-circle" size={responsiveWidth(5.8)} color="#FF6060" onPress={() => deleteItem(item.id)} />
            </View>
        );
    };
//FF6060
    return (
        <View style={styles.container}>
        <View style={styles.containerTodo}>

            

            <View  style={styles.content}>
            {todos.length > 0 && (
                <FlatList style={styles.Flat}
                    data={todos}
                    renderItem={renderTodo}
                    keyExtractor={(todo) => todo.id}

                />
            )}
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Start typing..."
                    placeholderTextColor="gray"
                    onChangeText={(text) => setTodo(text)}
                    value={todo}
                />
                <TouchableOpacity style={styles.ButtonAdd} onPress={addTodo} disabled={todo === ''}>
                    <Text style={styles.TextAdd}>ADD</Text>
            </TouchableOpacity>
            </View>
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
        paddingLeft: responsiveWidth(10),
        paddingRight: responsiveWidth(10),
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
        fontSize: responsiveFontSize(2)
    },

    todo: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',

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
        padding: 10,
        marginVertical: 4,
        
    },

    Flat: {
        flex: 1,
    }
});

export default List;

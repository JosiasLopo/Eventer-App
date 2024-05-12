import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { FIRESTORE_DB, auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth } from "react-native-responsive-dimensions"; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Seta2 from "../src/assets/images/arrowLeft.png";


export default function CriarNota({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const insets = useSafeAreaInsets();

  const [isPlaceholderTitle, setIsPlaceholderTitle] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  const handleGoBack = () => {
    navigation.goBack(); 
  };

  const criarNota = async () => {
    try {
      await addDoc(collection(FIRESTORE_DB, 'notas'), {
        titulo,
        conteudo,
        userId: auth.currentUser.uid,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error creating a note:", error);
      
    }
  };

  const handleTitleChange = (title) => {
    setTitulo(title);
    if (title === '') {
      setIsPlaceholderTitle(true); 
    } else {
      setIsPlaceholderTitle(false); 
    }
  };

  const handleTextChange = (text) => {
    setConteudo(text);
    if (text === '') {
      setIsPlaceholder(true);
    } else {
      setIsPlaceholder(false);
    }
  };

  return (
    <View style={[styles.container,{paddingTop: insets.top }]}>
        <View style={[styles.notesContainer, {paddingBottom: insets.bottom - 10}]}>
            <View style={styles.title}>
                 <TouchableOpacity style={styles.btnArrow} onPress={handleGoBack}  >
                    <Image source={Seta2} style={styles.btnArrowImg} />
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Title"
                        placeholderTextColor="#818181"
                        value={titulo} 
                        onChangeText={(title) => {
                            setTitulo(title); 
                            handleTitleChange(title); 
                        }}
                        selectionColor="white" 

                    />
                </View>
            </View>
        
                <TextInput 
                    style={styles.inputArea} 
                    multiline={true} 
                    placeholder="Write your note..."
                    placeholderTextColor="#818181"
                    value={conteudo} 
                    onChangeText={(text) => {
                        setConteudo(text); 
                        handleTextChange(text); 
                    }}
                    selectionColor="white" 
                />

            <View style={styles.deleteBtn}>
                <TouchableOpacity onPress={criarNota}>
                    <Text style={styles.deleteBtnText}>Save Note</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#1D1E26',
    },

    notesContainer: {
        flex: 1,
        backgroundColor: '#101014',
        marginTop: responsiveWidth(10),
        borderTopRightRadius: responsiveWidth(10),
        borderTopLeftRadius: responsiveWidth(10),
    },

   
    title: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: responsiveWidth(10),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        //backgroundColor: 'tomato'
    },

     btnArrow: {
      marginTop: responsiveWidth(3),
      justifyContent: "center",
      alignItems: "center",
      width: responsiveWidth(10),
      height: responsiveWidth(10),
      resizeMode: "contain",
      marginLeft: responsiveWidth(5)
    },

    btnArrowImg: {
        width: responsiveWidth(5),
        resizeMode: "contain",
    },

    inputContainer: {
        flex: 1,
        alignItems: 'center',
    },

    input: {
      fontSize: responsiveFontSize(5),
      fontFamily: 'NanumMyeongjo',
      color: 'white',
      marginTop: responsiveWidth(3),
      paddingRight: responsiveWidth(18)
    },

    inputArea: {
      flex: 5,
      fontSize: 18,
      color: 'white',
      paddingLeft: responsiveWidth(10),
      paddingRight: responsiveWidth(10)
      //textAlignVertical: 'top', // Para Android
    },

    deleteBtn: {
        fontSize: responsiveFontSize(2),
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1E26',
        width: responsiveWidth(30),
        alignSelf: 'center',
        marginBottom: responsiveWidth(2)
    },
    deleteBtnText: {
        color: '#1563FF',
        fontSize: responsiveFontSize(1.8),
    }
  });



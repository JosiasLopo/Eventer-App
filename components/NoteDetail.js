import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { doc, getDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import { FIRESTORE_DB } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth } from "react-native-responsive-dimensions"; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Seta2 from "../src/assets/images/arrowLeft.png";

export default function DetalheNota({ route }) {
  const { notaId } = route.params;
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [shouldSave, setShouldSave] = useState(false);
  const navigation = useNavigation(); 
  const insets = useSafeAreaInsets();

  useEffect(() => {
    
    const carregarNota = async () => {
      const docRef = doc(FIRESTORE_DB, 'notas', notaId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTitulo(docSnap.data().titulo);
        setConteudo(docSnap.data().conteudo);
      }
    };
    carregarNota();

    let timeoutId;
    if (shouldSave) {
      timeoutId = setTimeout(() => {
        salvarNota();
        setShouldSave(false);
      }, 10000); 
    }

    return () => clearTimeout(timeoutId);
  }, [shouldSave]);

  const salvarNota = async () => {

        const docRef = doc(FIRESTORE_DB, 'notas', notaId);
    await updateDoc(docRef, { titulo, conteudo });
  };

  const handleBlur = () => {
    setShouldSave(true);
  };

  const handlePress = () => {
    salvarNota();
    navigation.goBack();
  };

  const apagarNota = async () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to DELETE?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(FIRESTORE_DB, 'notas', notaId));
              navigation.goBack(); 
            } catch (error) {
              console.error("Error deleting note:", error);
              
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container,{paddingTop: insets.top }]}>
        <View style={[styles.notesContainer, {paddingBottom: insets.bottom - 10}]}>
            <View style={styles.title}>
                 <TouchableOpacity style={styles.btnArrow} onPress={handlePress}>
                    <Image source={Seta2} style={styles.btnArrowImg} />
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={titulo}
                        onChangeText={setTitulo}
                        onBlur={handleBlur}
                    />
                </View>
            </View>
            <TextInput
                style={styles.inputArea}
                multiline={true}
                value={conteudo}
                onChangeText={setConteudo}
                onBlur={handleBlur}
            />

            <View style={styles.deleteBtn}>
                <TouchableOpacity onPress={apagarNota}>
                    <Text style={styles.deleteBtnText}>Delete Note</Text>
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
        color: '#EA4335',
        fontSize: responsiveFontSize(1.8),
    }
  });



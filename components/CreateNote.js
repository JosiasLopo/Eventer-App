import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { FIRESTORE_DB, auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth } from "react-native-responsive-dimensions"; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Seta2 from "../src/assets/images/arrowLeft.png";


export default function CriarNota({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  const criarNota = async () => {
    try {
      await addDoc(collection(FIRESTORE_DB, 'notas'), {
        titulo,
        conteudo,
        userId: auth.currentUser.uid,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao criar nota:", error);
      // Adicionar tratamento de erro para o usuário (ex: exibir um alerta)
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Título"
        value={titulo} 
        onChangeText={setTitulo}
      />
      <TextInput 
        style={styles.inputArea} 
        multiline={true} 
        placeholder="Conteúdo da nota"
        value={conteudo} 
        onChangeText={setConteudo}
      />
      <Button title="Salvar Nota" onPress={criarNota} />
    </View>
  );
}

// ... (styles - mesmos estilos do DetalheNota.js)
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginTop: 100,
    },
    input: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    inputArea: {
      flex: 1,
      fontSize: 18,
      textAlignVertical: 'top', // Para Android
    },
  });
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
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
  const navigation = useNavigation(); // Hook para navegação

  useEffect(() => {
    // ... (carregar nota - mesma lógica)
    const carregarNota = async () => {
      const docRef = doc(FIRESTORE_DB, 'notas', notaId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTitulo(docSnap.data().titulo);
        setConteudo(docSnap.data().conteudo);
      }
    };
    carregarNota();
  }, []);

  const salvarNota = async () => {
    // ... (salvar nota - mesma lógica)
        const docRef = doc(FIRESTORE_DB, 'notas', notaId);
    await updateDoc(docRef, { titulo, conteudo });
  };

  const apagarNota = async () => {
    Alert.alert(
      "Apagar Nota",
      "Tem certeza que deseja apagar esta nota?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(FIRESTORE_DB, 'notas', notaId));
              navigation.goBack(); // Voltar para a lista de notas
            } catch (error) {
              console.error("Erro ao apagar nota:", error);
              // Tratar erro (ex: exibir alerta)
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        onBlur={salvarNota}
      />
      <TextInput
        style={styles.inputArea}
        multiline={true}
        value={conteudo}
        onChangeText={setConteudo}
        onBlur={salvarNota}
      />
      <Button title="Apagar Nota" onPress={apagarNota} color="red" /> 
    </View>
  );
}

// ... (styles - mesmos estilos)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
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



// ... (styles)

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { FIRESTORE_DB, auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth } from "react-native-responsive-dimensions"; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Seta2 from "../src/assets/images/arrowLeft.png";


export default function ListaNotas() {
  const [notas, setNotas] = useState([]);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(FIRESTORE_DB, 'notas'), where('userId', '==', auth.currentUser.uid)),
      (snapshot) => {
        setNotas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <View style={[styles.container,{paddingBottom: insets.bottom - 10}]}>

        <View style={[styles.header,{paddingTop: insets.top}]}>
            <Text style={styles.title}>Notes</Text>
            <Text style={styles.description}>Imagine and write...</Text>
        </View>

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.notaItem} 
            onPress={() => navigation.navigate('NoteDetail', { notaId: item.id })}
          >
            <Text style={styles.notaTitulo}>{item.titulo}</Text>
            <View style={styles.btnArrow}>
             <Image source={Seta2} style={styles.btnArrowImg} />
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity 
        style={styles.botaoNovaNota} 
        onPress={() => navigation.navigate('CreateNote')}
      >
        <Text style={styles.botaoTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1E26',
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    backgroundColor: '#101014',
    marginBottom: responsiveWidth(8),
    width: '100%',
    borderBottomLeftRadius: responsiveWidth(16),
    borderBottomRightRadius: responsiveWidth(16),
    paddingBottom: responsiveWidth(10),
    paddingLeft: responsiveWidth(15)
  },

  title: {
    color: 'white',
    fontSize: responsiveFontSize(6),
    fontFamily: 'NanumMyeongjo',
    marginTop: responsiveWidth(2)
  },

  description: {
    color: '#9F9F9F',
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'MPLUS1p',
  },


  notaItem: {
    padding: responsiveWidth(4),
    marginBottom: responsiveWidth(5),
    backgroundColor: '#101014',
    borderRadius: responsiveWidth(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(70),
    overflow: 'hidden',
    alignItems: 'center'
  },
  notaTitulo: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: 'MPLUS1p',
    color: 'white',
    marginLeft: responsiveWidth(3)
  },

   btnArrow: {
    justifyContent: "center",
    alignItems: "center",
    width: responsiveWidth(10),
    resizeMode: "contain",
},

btnArrowImg: {
    width: responsiveWidth(3.5),
    resizeMode: "contain",
    transform: [{ rotate: '180deg' }],
},

  botaoNovaNota: {
    position: 'absolute',
    bottom: responsiveWidth(10),
    right: responsiveWidth(6),
    backgroundColor: '#1563FF', // Cor verde
    borderRadius: 100,
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10, // Sombra para Android
  },
  botaoTexto: {
    color: 'white',
    fontSize: responsiveFontSize(4),
    marginBottom: responsiveWidth(1),
  },
});

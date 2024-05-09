import React, {useState} from 'react'
import {View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Alert, TextInput} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../config/firebase'; // Importe o serviço de armazenamento
import { getStorage, ref, app, uploadBytes } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Seta2 from "../src/assets/images/arrowLeft.png";



// funciona, no android está a dar upload no emulador ios crascha não sei pq
// continuar no mesmo chat do Gemini para ele perceber os erros
// mudar a pasta para media ao inves de images e mandar ao zé

const UploadScreen = () => {

  const insets = useSafeAreaInsets();
  const db = getFirestore(app); 

  const navigation = useNavigation();

  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false) 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState(''); // Consider a way to manage multiple hashtags



   const pickImage = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, access to your photo library is needed.');
        return;
      }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });
        const source = {uri: result.assets[0].uri}
        console.log(source)
        setImage(source)
    }; 




    const uploadImage = async () => {
        setUploading(true);

        const response = await fetch(image.uri);
        const blob = await response.blob();

        const auth = getAuth();
        const user = auth.currentUser;
        const uid = user.uid; 

        const storage = getStorage(app); 
        const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
        const storageRef = ref(storage, `images/${uid}/${filename}`);

        console.log("const storageRef");

        try {
          //wait uploadBytes(storageRef, blob);
           uploadBytes(storageRef, blob);    // Now you should be able to upload
            // ... rest of your upload logic
         } catch (e) {
           console.log("Upload Error:", e);
        }
        setUploading(false)
        Alert.alert(
            'Photo uploaded!'
        );
        setImage(null);

        try {
        const docRef = await addDoc(collection(db, "photoDescriptions"), {
            title: title, 
            description: description, 
            hashtags: hashtags, // Consider how to store an array of hashtags
            imageRef: storageRef.toString(), // Store the image reference without modification
            userID: uid 
        });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        setTitle('');
        setDescription('');
        setHashtags('');

        console.log("Image uploaded to:", storageRef.toString()); 

    };




    return(
        <SafeAreaView style={[styles.container,{paddingTop: insets.top, paddingBottom: insets.bottom}]}>

          <View style={styles.header}>
            <Text style={styles.headerTxt}>NewPost</Text>

             <TouchableOpacity style={styles.btnArrow} onPress={uploadImage}>
              <Image source={Seta2} style={styles.btnArrowImg} />
            </TouchableOpacity>
          </View>

           <View style={styles.imageContainer}>
            {image && <Image source={{uri: image.uri}} style={{width: "100%", height: "100%"}}/>} 

          </View> 
          <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
            <Text style={styles.btnText}>Select</Text> 
          </TouchableOpacity> 

        <View style={styles.description}>

          <View style={styles.inputTitle}>
            <TextInput style={[styles.inputTitleTxt]} onChangeText={setTitle} 
              value={title} placeholder="Title" placeholderTextColor="gray"
            />
          </View>

          <View style={styles.descriptionContainer}>

          <View style={styles.inputDescription}>
            <TextInput style={styles.inputDescriptionTxt} onChangeText={setDescription} 
              value={description} placeholder="Write your description" placeholderTextColor="gray"
              multiline={true} // Permite várias linhas
              numberOfLines={4} // Define um número máximo de linhas
              maxLength={150} // Define um número máximo de caracteres
              textAlignVertical="top" // Alinha o texto no topo do componente
              flexWrap="wrap" // Faz com que o texto envolva para baixo
            />
          </View> 

          <View style={styles.inputHashtag}>
          <TextInput style={styles.inputHashtagTxt} onChangeText={setHashtags} 
              value={hashtags} placeholder="#hashtag or second description" placeholderTextColor="gray"
            />
          </View>

          </View>

        </View>

      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101014'
    },

    header: {
        width: '80%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: 'center',
        marginTop: responsiveWidth(6),
        marginBottom: responsiveWidth(7),
    },

    headerTxt : {
        fontSize: responsiveFontSize(5),
        color: 'white',
        textAlign: 'center',
        fontFamily: 'NanumMyeongjo',
    },

    btnArrow: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1D1E26",
      marginLeft: responsiveWidth(7),
      height: responsiveWidth(10),
      width: responsiveWidth(10),
      resizeMode: "contain",
      borderRadius: responsiveWidth(100),
    },

    btnArrowImg: {
      width: responsiveWidth(3.5),
      resizeMode: "contain",
      transform: [{ rotate: '180deg' }],
    },

    imageContainer: {
      flex: 1.5,
      backgroundColor: 'rgba(29, 30, 38, 0.30)',
      justifyContent: 'flex-end',
    },

    selectButton: {
      backgroundColor: '#1D1E26',
      width: responsiveWidth(35),
      height: responsiveWidth(10),
      borderRadius: responsiveWidth(100),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      position: 'relative',
      bottom: responsiveWidth(5), // Define a distância entre o botão e a parte inferior
      alignSelf: 'center', // Centraliza o botão horizontalmente
      marginTop: responsiveWidth(2)
    },

    btnText: {
      color: 'white',
      fontSize: responsiveFontSize(1.9),
      fontFamily: 'MPLUS1pBold',
    },

    description: {
      flex: 1,
      alignItems: 'center',
    },

    inputTitle: {
      width: '80%',
      justifyContent: 'center',
      paddingLeft: responsiveWidth(4)
    },

    inputTitleTxt: {
      color: 'white',
      fontSize: responsiveFontSize(3),
      fontFamily: 'MPLUS1pBold',
    },

    descriptionContainer: {
      width: '80%',
      alignItems: 'center',
      marginTop: responsiveWidth(2),
      backgroundColor: '#1D1E26',
      borderRadius: responsiveWidth(8),
    },

    inputDescription: {
      width: '100%',
      justifyContent: 'top',
      padding: responsiveWidth(4),
      height: responsiveHeight(15),
    },

    inputDescriptionTxt: {
      color: 'white',
      fontSize: responsiveFontSize(2),
      fontFamily: 'MPLUS1p',
    },

    inputHashtag: {
      width: '100%',
      justifyContent: 'center',
      height: responsiveHeight(8),
      padding: responsiveWidth(4),
      backgroundColor: 'rgba(16,16,20,0.84)',
      borderRadius: responsiveWidth(8)
    },

    inputHashtagTxt: {
      color: 'gray',
      fontSize: responsiveFontSize(2),
      fontFamily: 'MPLUS1p',
    },


})

export default UploadScreen;


//lighshot
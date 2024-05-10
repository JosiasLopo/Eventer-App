import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert, TextInput} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../config/firebase'; // Importe o serviço de armazenamento
import { getStorage, ref, app, uploadBytes } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Seta2 from "../src/assets/images/arrowLeft.png";
import account from '../src/assets/images/account.png';
import { auth } from '../config/firebase';

const Profile = () => {
  const insets = useSafeAreaInsets();
  const db = getFirestore(app); 

  const navigation = useNavigation();

  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false) 

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
        const filename = "profilePic";
        const storageRef = ref(storage, `profilePic/${uid}/${filename}`);

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

      }


  const [userEmail, setUserEmail] = useState(''); // State to store user's email

  useEffect(() => {
      // Fetch user's email from Firebase
      const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
          setUserEmail(user.email);
      } else {
          setUserEmail(''); // Clear email if user is not signed in
      }
      });

      // Cleanup function to unsubscribe when the component unmounts
      return () => unsubscribe();
  }, []);

  return (
    <View style={[styles.container,{paddingTop: insets.top, paddingBottom: insets.bottom - 10}]}>
        <ScrollView>
            <View style={{alignItems: 'center', marginTop: 20}}>
                <Image source={account} style={{width: 100, height: 100, borderRadius: 50}} />
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 10}}>{userEmail.split('@')[0].replace(/\.| /g, '')}</Text>
                <Text style={{color: 'white', fontSize: 16, marginTop: 5}}>
                    <Text style={{color: 'gray'}}>
                        <Image source={account} style={{width: 20, height: 20}} />{' '}
                        {image && <Image source={{uri: image.uri}}/>} 
                        <Text>{userEmail}</Text>
                    </Text>
                  </Text>
            </View>

            <View style={styles.imageContainer}>
            {image && <Image source={{uri: image.uri}} style={{width: "100%", height: "100%"}}/>} 
            </View>
          <TouchableOpacity onPress={pickImage}>
            <Text style={{color: "white"}}>Select</Text> 
          </TouchableOpacity> 
          <TouchableOpacity onPress={uploadImage}>
              <Image source={Seta2} style={styles.btnArrowImg} />
            </TouchableOpacity>
          </ScrollView>
          
    </View>
  );
};

export const styles = StyleSheet.create({ 

    container: {
        flex: 1,
        backgroundColor: '#101014',
    },

    imageContainer: {
      width: 100,
      height: 100,
      backgroundColor: 'white',
      justifyContent: 'flex-end',
    },

});

export default Profile;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert, TextInput, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config/firebase';
import { getStorage, ref, app, uploadBytes } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Seta2 from "../src/assets/images/arrowLeft.png";
import account from '../src/assets/images/account.png';
import { auth } from '../config/firebase';
import ProfileScreen from './profilePic2';


const Profile = () => {
  const insets = useSafeAreaInsets();
  const db = getFirestore(app);

  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, access to your photo library is needed.');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    const source = { uri: result.assets[0].uri };
    setImage(source);
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

    try {
      uploadBytes(storageRef, blob);
    } catch (e) {
      console.log("Upload Error:", e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!'
    );
    setImage(null);

  };

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom - 10 }]}>
      <ScrollView>

          <View style={styles.imageContainer}>
            <View style={styles.onChangeImage}>
              {image && <Image source={{ uri: image.uri }} style={{ width: "100%", height: "100%" }} />}
            </View>

            <View style={styles.background}>
              <ProfileScreen/>
            </View>
          </View>


        <TouchableOpacity onPress={pickImage}>
          <Text style={{ color: "white" }}>Select</Text>
        </TouchableOpacity>
        {image && (
          <TouchableOpacity onPress={uploadImage}>
            <Text style={styles.btnArrowImg}>Update</Text>
          </TouchableOpacity>
        )}
        <Image source={account} style={{ width: 20, height: 20 }} />
        <Text>{userEmail}</Text>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{userEmail.split('@')[0].replace(/\.| /g, '')}</Text>
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1D1E26',
    justifyContent: 'center',
    alignItems: 'center'
  },

    imageContainer: {
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    borderRadius: 100,
    backgroundColor: '#1D1E26',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101014',
  },

  background: {
    height: '100%',
    width: '100%',
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: responsiveWidth(200),
    position: 'absolute',
  },

});

export default Profile;

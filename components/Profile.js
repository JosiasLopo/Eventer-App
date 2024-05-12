import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert, TextInput, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config/firebase';
import { getStorage, ref, app, uploadBytes } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Seta2 from "../src/assets/images/arrowLeft.png";
import camera from "../src/assets/images/camera.png";
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
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom}]}>

      <View style={styles.header}>

        <TouchableOpacity style={styles.btnArrow} onPress={() => navigation.navigate("Home")}>
          <Image source={Seta2} style={styles.btnArrowImg} />
        </TouchableOpacity>

        {image && (
          <TouchableOpacity onPress={uploadImage}>
            <Text style={styles.updateBtn}>Update</Text>
          </TouchableOpacity>
        )}

        </View>

        <View style={styles.profilePic}>
          <View style={styles.imageContainer}>
            <View style={styles.imageContainer2}>
              <View style={styles.onChangeImage}>
                {image && <Image source={{ uri: image.uri }} style={{ width: "100%", height: "100%" }} />}
              </View>
              <View style={styles.background}>
                <ProfileScreen/>
              </View>
            </View>
          </View>

          <View style={styles.cameraImg}>
            <TouchableOpacity onPress={pickImage}>
              <Image source={camera} style={styles.cameraImg2} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.emailTxt}>E-mail:</Text>
          <Text style={styles.userTxt}>{userEmail}</Text>
        </View>
      
    </View>
  );
};

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1D1E26',
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    width: '80%',
    justifyContent: "space-between",
    alignItems: 'flex-start',
    paddingTop: responsiveWidth(4)
  },

  btnArrow: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#101014",
      width: responsiveWidth(12),
      height: responsiveWidth(12),
      resizeMode: "contain",
      borderRadius: 100,
      alignSelf: 'flex-start'
  },

  btnArrowImg: {
      width: responsiveWidth(5),
      resizeMode: "contain",
  },

  updateBtn: {
    color: '#1563FF',
    fontFamily: 'MPLUS1pBold',
    fontSize: responsiveFontSize(2),
    padding: 10,
    marginTop: responsiveWidth(1),
    borderRadius: 10,
    overflow: 'hidden'
  },

  profilePic: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveWidth(10),
  },


  imageContainer: {
    padding: 5,  
    width: responsiveWidth(62),
    height: responsiveWidth(62),
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#525468',
    overflow: 'hidden',
    alignSelf: 'center',
    zIndex: 1,
  },

  imageContainer2: {
    padding: 4,  
    width: responsiveWidth(60.5),
    height: responsiveWidth(60.5),
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1E26',
    overflow: 'hidden'
  },


  onChangeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
    position: 'absolute',
    zIndex: 2,
    overflow: "hidden",

  },

  background: {
    height: '100%',
    width: '100%',
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 200,
    position: 'absolute',
    zIndex: 1,
  },

  cameraImg: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    zIndex: 2,
    marginLeft: responsiveWidth(52),
    position: 'relative',
    bottom: responsiveWidth(9), 
    alignSelf: 'center', 
  },

   cameraImg2: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
  },

  content: {
    flex: 1.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  emailTxt: {
    color: 'white',
    fontFamily: 'MPLUS1pBold',
    fontSize: responsiveFontSize(2),
    overflow: 'hidden'
  },

  userTxt: {
    color: '#818181',
    fontFamily: 'MPLUS1p',
    fontSize: responsiveFontSize(2),
    overflow: 'hidden'
  }

});

export default Profile;

import React, {useState} from 'react'
import {View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Alert, TextInput} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../config/firebase'; // Importe o serviço de armazenamento
import { getStorage, ref, app, uploadBytes } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';



// funciona, no android está a dar upload no emulador ios crascha não sei pq
// continuar no mesmo chat do Gemini para ele perceber os erros
// mudar a pasta para media ao inves de images e mandar ao zé

const UploadScreen = () => {
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

       // try {
           await uploadBytes(storageRef, blob);    // Now you should be able to upload
            // ... rest of your upload logic
        // } catch (e) {
        //    console.log("Upload Error:", e);
        //}
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
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
            <Text style={styles.btnText}>Pick an Image</Text> 
          </TouchableOpacity> 
          
          <View style={styles.imageContainer}>
            {image && <Image source={{uri: image.uri}} style={{width: 300, height: 300}}/>} 
              <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                  <Text style={styles.btnText}>Upload Image</Text> 
              </TouchableOpacity> 
          </View> 
          <TextInput 
            style={styles.input} 
            onChangeText={setTitle} 
            value={title} 
            placeholder="Title" 
          />
          <TextInput 
            style={styles.input} 
            onChangeText={setDescription} 
            value={description} 
            placeholder="Description" 
          />
          <TextInput 
            style={styles.input} 
            onChangeText={setHashtags} 
            value={hashtags} 
            placeholder="Hashtag" 
          />
          <TouchableOpacity onPress={() => navigation.navigate("MediaWidget")}><Text>Photos</Text></TouchableOpacity>
      </SafeAreaView>
    )
}
export default UploadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    }
})

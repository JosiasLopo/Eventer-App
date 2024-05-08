import React, {useState} from 'react'
import {View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../config/firebase'; // Importe o serviço de armazenamento
import { getStorage, ref, app, uploadBytes } from 'firebase/storage';


// funciona, no android está a dar upload no emulador ios crascha não sei pq
// continuar no mesmo chat do Gemini para ele perceber os erros
// mudar a pasta para media ao inves de images e mandar ao zé

const UploadScreen = () => {
   const [image, setImage] = useState(null)
   const [uploading, setUploading] = useState(false) 


   const pickImage = async () => {
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
        const storage = getStorage(app);  // Get the Storage service
        const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
        const storageRef = ref(storage, `images/${filename}`); // Create a valid reference

        await uploadBytes(storageRef, blob); 

        try {
           await uploadBytes(storageRef, blob);    // Now you should be able to upload
            // ... rest of your upload logic
        } catch (e) {
            console.log("Upload Error:", e);
        }
        setUploading(false)
        Alert.alert(
            'Photo uploaded!'
        );
        setImage(null);
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
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { firebase } from '../config/firebase';
import { getStorage, ref, app, getDownloadURL, listAll } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const PhotosPage = () => {

    const [imageUrls, setImageUrls] = useState([]);
    const storage = getStorage(app); // Initialize storage at the top level

    
    useEffect(() => {
        const fetchImages = async () => {

            const auth = getAuth();
            const user = auth.currentUser;
            const uid = user.uid; 

            const imagesRef = ref(storage, `images/${uid}`); 
            const listResult = await listAll(imagesRef); 

            const urls = await Promise.all(listResult.items.map(async imageRef => { 
                return await getDownloadURL(imageRef); 
            }));
            setImageUrls(urls);
        };

        fetchImages();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {imageUrls.map((url, index) => (
                    <Image key={index} source={{ uri: url }} style={styles.image} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10
    }
});

export default PhotosPage;

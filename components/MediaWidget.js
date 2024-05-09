import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import { firebase } from '../config/firebase';
import { getStorage, ref, app, getDownloadURL, listAll } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; 
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';


const PhotosPage = () => {

    const [imageData, setImageData] = useState([]);
    const db = getFirestore(app); // Initialize Firestore at the top level
    const storage = getStorage(app); // Initialize storage at the top level

    
    useEffect(() => {
        const fetchImages = async () => {

            const auth = getAuth();
            const user = auth.currentUser;
            const uid = user.uid; 

            const imagesRef = ref(storage, `images/${uid}`); 
            const listResult = await listAll(imagesRef); 

            const imageUrls = await Promise.all(listResult.items.map(async imageRef => { 
                const url = await getDownloadURL(imageRef);

                // Retrieve image metadata from Firestore
                const querySnapshot = await getDocs(query(collection(db, 'photoDescriptions'), where("imageRef", "==", imageRef.toString())));
                let imageData = {};
                querySnapshot.forEach((doc) => {
                    imageData = doc.data();
                });

                return { url, ...imageData }; 
            }));
            setImageData(imageUrls);
        };

        fetchImages();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {imageData.map((data, index) => (
                    <View key={index}>
                        <Image source={{ uri: data.url }} style={styles.image} />
                        <Text style={styles.title}>{data.title}</Text>
                        <Text style={styles.description}>{data.description}</Text>
                        <Text style={styles.hashtags}>{data.hashtags}</Text>
                    </View>
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
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    description: {
        fontSize: 16,
        marginBottom: 5
    },
    hashtags: {
        fontSize: 14,
        color: 'gray'
    }
});

export default PhotosPage;

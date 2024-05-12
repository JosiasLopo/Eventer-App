import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Text , Alert} from 'react-native';
import { getStorage, ref, app, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; 
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Ionicons } from '@expo/vector-icons'; 

const PhotosPage = () => {

    const [imageData, setImageData] = useState([]);
    const db = getFirestore(app); 
    const storage = getStorage(app);

    useEffect(() => {
        const fetchImages = async () => {

            const auth = getAuth();
            const user = auth.currentUser;
            const uid = user.uid; 

            const imagesRef = ref(storage, `images/${uid}`); 
            const listResult = await listAll(imagesRef); 

            const imageUrls = await Promise.all(listResult.items.map(async imageRef => { 
                const url = await getDownloadURL(imageRef);


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


        const intervalId = setInterval(fetchImages, 10000);

        return () => clearInterval(intervalId);
    }, [db, storage]);

      const handleDelete = async (imageRefString) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this photo and its description?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                           
                            const imageRef = ref(storage, imageRefString);
                            await deleteObject(imageRef);

                            
                            const querySnapshot = await getDocs(query(collection(db, 'photoDescriptions'), where("imageRef", "==", imageRefString)));
                            querySnapshot.forEach(async (doc) => {
                                await deleteDoc(doc.ref);
                            });

                           
                            setImageData(imageData.filter(data => data.imageRef !== imageRefString));
                        } catch (error) {
                            console.error("Error deleting image:", error);
                           
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                {imageData.map((data, index) => (
                    <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: data.url }} style={styles.image} />

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.title}>{data.title}</Text>
                            <Text style={styles.description}>{data.description}</Text>
                            <Text style={styles.hashtags}>{data.hashtags}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(data.imageRef)}
                            >
                                    <Ionicons name="close-circle" size={responsiveWidth(5.8)} color="#898989" />

                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#101014'
    },

    
    image: {
        width: width - 60,
        height: responsiveHeight(24),
        borderRadius: responsiveWidth(12),
        position: 'relative',
        top: 10,
        zIndex:1,
        
    },

    descriptionContainer: {
        marginBottom: responsiveWidth(5),
        backgroundColor: "#1D1E26",
        width: responsiveWidth(75),
        height: responsiveHeight(16),
        justifyContent: 'flex-start',
        paddingTop: responsiveWidth(5),
        paddingLeft: responsiveWidth(10),
        paddingRight: responsiveWidth(10),
        paddingBottom: responsiveWidth(2),
        borderBottomLeftRadius: responsiveWidth(12),
        borderBottomRightRadius: responsiveWidth(12),
        
    },

    title: {
        color: "white",
        fontSize: responsiveFontSize(2.5),
        marginBottom: responsiveWidth(1),
        fontFamily: "MPLUS1pBold",
    },
    description: {
        color: "white",
        fontSize: responsiveFontSize(1.8),
        marginBottom: responsiveWidth(1),
        fontFamily: "MPLUS1p",
        marginLeft: responsiveWidth(2),
        marginBottom: responsiveWidth(2.5)
    },
    hashtags: {
        fontSize: responsiveFontSize(1.5),
        color: '#898989',
        fontFamily: "MPLUS1p",
        marginBottom: responsiveWidth(3.5),
        marginLeft: responsiveWidth(2)
    },

     deleteButton: {
        position: 'absolute',
        top: responsiveWidth(6),
        right: responsiveWidth(10),
    },
});

export default PhotosPage;

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { getStorage, ref, app, getDownloadURL, listAll } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; 
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

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

        // Atualiza a lista de imagens a cada 60 segundos
        const intervalId = setInterval(fetchImages, 10000);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, [db, storage]);

    return (
        <View style={styles.container}>
            <ScrollView>
                {imageData.map((data, index) => (
                    <View key={index} style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={{ uri: data.url }} style={styles.image} />
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.title}>{data.title}</Text>
                            <Text style={styles.description}>{data.description}</Text>
                            <Text style={styles.hashtags}>{data.hashtags}</Text>
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
        width: width - 30,
        height: responsiveHeight(27),
        borderRadius: responsiveWidth(12),
        position: 'relative',
        top: 10,
        zIndex:1,
        
    },

    descriptionContainer: {
        marginBottom: responsiveWidth(5),
        backgroundColor: "#1D1E26",
        width: responsiveWidth(80),
        height: responsiveHeight(18),
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
    }
});

export default PhotosPage;

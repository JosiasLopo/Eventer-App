import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { firebase } from '../config/firebase';
import { getAuth } from 'firebase/auth'; 
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import account from '../src/assets/images/account.png';

const ProfileScreen = () => {
  const [profilePic, setProfilePic] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    // Get the current user
    const currentUser = auth.currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      const storage = getStorage(firebase);
      const storageRef = ref(storage, `profilePic/${uid}/profilePic`);

      // Function to fetch the profile picture URL
      const fetchProfilePic = () => {
        getDownloadURL(storageRef)
          .then(url => {
            setProfilePic(url);
          })
          .catch(error => {
            console.error('Error fetching image:', error);
          });
      };

      // Fetch profile picture initially
      fetchProfilePic();

      // Check for profile picture updates periodically (every minute in this example)
      const interval = setInterval(fetchProfilePic, 10000);

      // Clear interval on component unmount
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={account} style={styles.image} />
        {profilePic && <Image source={{ uri: profilePic }} style={styles.profilePic} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: responsiveWidth(62),
    height: responsiveWidth(62),
    position: 'relative',
  },
  image: {
    width: responsiveWidth(62),
    height: responsiveWidth(62),
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 1,
  },
  profilePic: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: 2,
  },
});

export default ProfileScreen;

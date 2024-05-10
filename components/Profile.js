import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { firebase } from '../config/firebase';
import { getAuth } from 'firebase/auth'; 
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const Profile = () => {

  return (
    <View style={styles.container}>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: responsiveHeight(40),
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 100,
  },
});

export default Profile;

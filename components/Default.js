import React, { useState, useEffect } from "react";
import { Image, TextInput, StyleSheet, Text, Button, View, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { tempData } from '../todoData/tempData';
import TodoList from '../components/TodoList';
import AddListModal from "../components/AddListModal";
import firebase, { auth } from "../config/firebase";


export default function Default({ navigation }) {
  const insets = useSafeAreaInsets();
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [lists, setLists] = useState(tempData);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);




  const [loaded] = useFonts({
    NanumMyeongjo: require('../src/assets/fonts/NanumMyeongjo-Regular.ttf'),
    NanumMyeongjoBold: require('../src/assets/fonts/NanumMyeongjo-Bold.ttf'),
    NanumMyeongjoEBold: require('../src/assets/fonts/NanumMyeongjo-ExtraBold.ttf'),
    Inter: require('../src/assets/fonts/Inter-Regular.ttf'),
    InterBold: require('../src/assets/fonts/Inter-Bold.ttf'),
    InterEBold: require('../src/assets/fonts/Inter-ExtraBold.ttf'),
    MPLUS1p: require('../src/assets/fonts/MPLUS1p-Regular.ttf'),
    MPLUS1pBold: require('../src/assets/fonts/MPLUS1p-Bold.ttf'),
    MPLUS1pEBold: require('../src/assets/fonts/MPLUS1p-ExtraBold.ttf'),
  });

  if (!loaded){
    return null;
  }

  const toggleAddTodoModal = () => {
    setAddTodoVisible(!addTodoVisible);
  };

  const renderList = (list) => {
    return <TodoList list={list} updateList={updateList}/>;
  };

  const addList = (list) => {
    setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
  };

  const updateList = (list) => {
    setLists(
      lists.map((item) => {
        return item.id === list.id ? list : item;
      })
    );
  };

  return (
    <View style={[styles.container,{paddingTop: insets.top + responsiveWidth(5), paddingBottom: insets.bottom}]}>
      <Modal animationType="slide" visible={addTodoVisible} onRequestClose={toggleAddTodoModal}>
        <AddListModal closeModal={toggleAddTodoModal} addList={addList}/>
      </Modal>

      <View>
          <Text>User: {userId}</Text>
      </View>

      <View style={{flexDirection: "row"}}>
        <View style={styles.divider} />
        <Text style={styles.title}>ToDo <Text style={{fontWeight: "360", color: 'blue'}}>Lists</Text></Text>
        <View style={styles.divider} />
      </View>

      <View style={{marginVertical: 48}}>
        <TouchableOpacity style={styles.addList} onPress={toggleAddTodoModal}>
          <AntDesign name="plus" size={16} color="blue" />
        </TouchableOpacity>
        <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{height: 275, paddingLeft: 32}}>
        <FlatList
          data={lists}
          keyExtractor={item => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: 'blue',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: responsiveFontSize(4),
    fontWeight: "800",
    color: 'black',
    paddingHorizontal: 64,
    textAlign: 'center',
  },
  addList: {
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: 'blue',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});

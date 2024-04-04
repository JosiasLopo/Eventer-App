import React, {useState} from "react";
import { Image, TextInput, StyleSheet, Text, Button, View, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { tempData } from '../todoData/tempData';
export { TodoList } from '../components/TodoList';
import AddListModal from "../components/AddListModal";

export default function Default({ navigation }) {
 const insets = useSafeAreaInsets();
 const [addTodoVisible, setAddTodoVisible] = useState(false); // Initialize state with useState



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

  const toggleAddTodoModal = () => { // Define toggleAddTodoModal as a regular function
    setAddTodoVisible(!addTodoVisible);
  };

  return ( 
    <View style={[styles.container,{paddingTop: insets.top + responsiveWidth(5), paddingBottom: insets.bottom}]}>

      <Modal animationType="slide" visible={addTodoVisible} onRequestClose={toggleAddTodoModal} >
        <AddListModal />
      </Modal>

      <View style = {{flexDirection: "row"}}>
        <View style = {styles.divider} />
        <Text style = {styles.title}>
            ToDo <Text style = {{fontWeight: "360", color: 'blue'}}>Lists</Text>
        </Text>
        <View style = {styles.divider} />
      </View>

      
      <View style={{marginVertical: 48}}>
        <TouchableOpacity style={styles.addList} onPress={toggleAddTodoModal}>
          <AntDesign name="plus" size={16} color="blue" />
        </TouchableOpacity>
         <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{height: 275, paddingLeft: 32}}>
        <FlatList
          data={tempData}
          keyExtractor={item => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <TodoList list={item} />}
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


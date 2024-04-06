import { StyleSheet, TouchableWithoutFeedback, View , KeyboardAvoidingView, Text, TextInput} from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { tempData } from '../todoData/tempData';


export default class AddListModal extends Component {
    backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];
    state = {
        name: "",
        color: this.backgroundColors[0],
    };

    createTodo = () => {
        const { name, color } = this.state;

        const list = { name, color };

        this.props.addList(list);

        this.setState({name: ""});
        this.props.closeModal();
    }

    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity key={color} style={[styles.addList, {backgroundColor: color}]} onPress={() => this.setState({color})}/>
            );
        });
    }

    addList = () => {
        const { name, color } = this.state;

        const list = { name, color };
        this.props.addList(list);

        this.setState({name: ""});
        this.props.closeModal();
    }

  render() {

    const { closeModal } = this.props;

      return (
        <GestureHandlerRootView style={styles.container}>
            <KeyboardAvoidingView style={[styles.container, {width: '100%'}]} behavior="padding">
            <View style={{ position: 'absolute', top: 64, right: 32 }}>
                <TouchableOpacity onPress={closeModal}>
                <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
                <Text style={styles.title}>Create Todo List</Text>

                <TextInput style={styles.input} placeholder="List Name?" onChangeText={text => this.setState({name: text})}/>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>{this.renderColors()}</View>

                <TouchableOpacity style={[styles.create, { backgroundColor: this.state.color }]} onPress={this.createTodo}>
                <Text style={{ color: 'white', fontWeight: '600' }}>Create!</Text>
                </TouchableOpacity>

            </View>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>

        

    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: 'black',
        alignSelf: 'center',
        marginBottom: 16,
    },

    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },

    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },

    add: {
        color: 'blue',
        fontWeight: '600',
        fontSize: 14,
        marginTop: 8,
    },

    addList: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
      },

      colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,
      },
});
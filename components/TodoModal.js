import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, KeyboardAvoidingView, TextInput } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Gesture, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class TodoModal extends Component {
    state = {
        newTodo: "",
    };

    toggleTodoCompleted = (index) => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    }

    renderTodo = (todo, index) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                    <Ionicons name={todo.completed ? "ios-square" : "ios-square-outline"} size={24} color="black" style={{width: 32}}/>
                </TouchableOpacity>

                <Text 
                    style={[
                        styles.todo, 
                        { 
                            textDecorationLine: todo.completed ? "line-through" : "none", 
                            color: todo.completed ? "gray" : "black"
                        }
                    ]}
                >
                    {todo.title}
                </Text>
            </View>
        );
    }

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter(todo => todo.completed).length;

    const { closeModal } = this.props;

    return (
        <GestureHandlerRootView style={styles.container}>
            <KeyboardAvoidingView style={{flex: 1, width:'100%', height: "100%"}} behavior="padding">
            <SafeAreaView style={styles.container}>
                <View style={{position: 'absolute', top: 64, right: 32, zIndex: 10}} >
                    <TouchableOpacity onPress={closeModal}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
                    <View>
                        <Text style={styles.title}>{list.name}</Text>
                        <Text style={styles.taskCount}>{completedCount} of {taskCount} tasks</Text>
                    </View>
                </View>

                <View style={[styles.section, {flex: 3}]}>
                    <FlatList 
                    data={list.todos} 
                    renderItem={({ item, index }) => this.renderTodo(item, index)} 
                    keyExtractor={item => item.title}
                    contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
                    showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={[styles.section, styles.footer]}>
                    <TextInput style={[styles.input, {borderBlockColor: list.color}]} />
                    <TouchableOpacity style={[styles.addTodo, {backgroundColor: list.color}]}>
                        <AntDesign name="plus" size={16} color="white" />
                    </TouchableOpacity>
                </View> 

            </SafeAreaView>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    section: {
        flex: 1,
        alignSelf: 'stretch',
    },

    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3,
    },

    title: {
        fontSize: 30,
        fontWeight: '800',
        color: 'black',
    },

    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: 'gray',
        fontWeight: '600',
    },

    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        height: 48,
        borderWidth: 1,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },

    addTodo: {
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

    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },

    todo: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
    },

    todoInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 6,
        height: 50,
        paddingHorizontal: 16,
        fontSize: 18,
    },

})
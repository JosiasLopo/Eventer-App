import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import TodoModal from "../components/TodoModal";

export default TodoList = ({ list, updateList }) => {
    const completedCount = list.todos.filter(todo => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;

    const [showListVisible, setShowListVisible] = useState(false);

    const toggleListModal = () => {
        setShowListVisible(!showListVisible);
    };

    return (
        <View>
            <Modal animationType="slide" visible={showListVisible} onRequestClose={toggleListModal}>
                <TodoModal list={list} closeModal={toggleListModal} updateList={updateList}/>
            </Modal>
            <TouchableOpacity style={[styles.listContainer, {backgroundColor: 'white'}]} onPress={toggleListModal}>
                <Text style={styles.listTitle} numberOfLines={1}>
                    {list.name}
                </Text>

                <View style={{alignItems: 'center',}}>
                    <Text style={styles.count}>{remainingCount}</Text>
                    <Text style={styles.subtitle}>Remaining</Text>
                </View>    

                <View style={{alignItems: 'center',}}>
                    <Text style={styles.count}>{completedCount}</Text>
                    <Text style={styles.subtitle}>Completed</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200,
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
        marginBottom: 18,
    },
    count: {
        fontSize: 48,
        fontWeight: '200',
        color: 'black',
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '700',
        color: 'black',
    },
});

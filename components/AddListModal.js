import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

export default class AddListModal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Modal</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
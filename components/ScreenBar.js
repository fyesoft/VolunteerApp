import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Constants } from 'expo';

import { Ionicons } from '@expo/vector-icons';

export default class ScreenBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, alignItems:'flex-start', paddingLeft: 15}}>
            <TouchableOpacity onPress={this.props.onPress}>
                <Ionicons name='ios-menu' size={32} color="black" />
            </TouchableOpacity>
        </View>
        <View style={{flex:1, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>{this.props.title}</Text>
        </View>
        <View style={{flex:1, alignItems: 'flex-end', paddingRight: 15}}>
            <TouchableOpacity >
                <Ionicons name='ios-settings' size={32} color="black" />
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        height: Constants.statusBarHeight+30,
        backgroundColor: 'white',
        color: 'black',
        flexDirection: 'row',
        alignItems: 'center',
    },
})

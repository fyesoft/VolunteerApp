import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native'

export default class Loading extends Component {
    render() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                animating={true}
                color="white"
                size="large"
                style={{marginBottom: 15}}/>

                <Text style={styles.loadingText}>
                    {this.props.loadingText}
                </Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    loadingContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText:{
        color: 'white',
        fontWeight: 'bold',
    }
})

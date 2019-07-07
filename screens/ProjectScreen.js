import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

export default class ProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.project = props.navigation.state.params.project;
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.titleBar}>
                    <View style={styles.backButton}>
                        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
                    </View>
                </View>
                <View style={styles.image_container}>
                    <Image
                        style={{ width: 'auto', height: 400 }}
                        source={this.project.img_url}
                        indicator={Progress.ProgressBar}
                    />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsItem}>Title: {this.project.title} </Text>

                    <Text style={styles.detailsItem}>Start: {this.project.start.date}</Text>
                    <Text style={styles.detailsItem}>End: {this.project.end.date}</Text>

                    <Text style={styles.detailsItem}>Full Summary: {this.project.summary}</Text>
                </View>


                <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.centerButtonText}>Register</Text>
                </TouchableOpacity>



            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    titleBar: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        padding: 20,
        marginTop: 5,
    },
    backButton: {
        position: 'absolute',
        left: 0,
        top: 0,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    image_container: {

    },
    detailsContainer: {
        padding: 10,
        paddingTop: 5,
    },
    detailsItem: {
        fontWeight: 'bold',
        paddingTop: 5,
    },
    dateContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerButton: {
        width: 200,
        height: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#00A887',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',

        shadowOffset: { width: 0, height: 12, },
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6, // Android
    },
    centerButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    }

})

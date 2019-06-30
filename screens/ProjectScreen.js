import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
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

                    <Text style={styles.title}> {this.project.title} </Text>
                </View>
                <View style={styles.image_container}>
                    <Image
                        style={{ width: 'auto', height: 400 }}
                        source={this.project.img_url}
                        indicator={Progress.Circle}
                    />
                </View>
                <View style={styles.dateContainer}>
                    <Text>Start Date: {this.project.start.date}</Text>
                    <Text>End Date: {this.project.end.date}</Text>
                </View>

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
        padding: 10,
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
    dateContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }

})

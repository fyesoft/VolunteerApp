import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

export default class Project extends Component {
    constructor(props) {
        super(props)

        this.state = {

        };
        //console.log(this.props.currentUser);
    };

    render() {
        return (

            <TouchableOpacity key={this.props.id} style={styles.container} onPress={
                () => this.props.navigation.navigate('Project',
                    {
                        project: this.props.project,
                        id: this.props.id,
                        isAuthenticated: this.props.isAuthenticated,
                        getCurrentUser: this.props.getCurrentUser,
                        setCurrentUser: this.props.setCurrentUser
                    }
                )
            }>
                <View style={styles.image_container}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={this.props.project.img_url}
                        indicator={Progress.ProgressBar}
                    />
                </View>
                <View style={styles.details_container}>
                    <Text>Title: {this.props.project.title}</Text>
                    <Text>Start Time: {this.props.project.start.date}</Text>
                    <Text>End TIme: {this.props.project.end.date}</Text>
                    <Text>Summary: {this.props.project.summary}</Text>

                </View>
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1F1F1',
        margin: 5,
        padding: 15,
        borderRadius: 10,

    },
    image_container: {
        flex: 1,
    },
    details_container: {
        flex: 2
    }

})

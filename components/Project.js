import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

export default class Project extends Component {
    constructor(props) {
        super(props)

        this.state = {

        };
    };


    render() {
        return (

            <TouchableOpacity style={styles.container}>
                <View style={styles.image_container}>
                    {/* <Image
                        style={{ width: 100, height: 100 }}
                        source={this.props.project.img_url}
                    /> */}
                </View>
                <View style={styles.details_container}>
                    <Text>Title: {this.props.project.title}</Text>
                    <Text>Start Time: {this.props.project.start.date}</Text>
                    <Text>End TIme: {this.props.project.end.date}</Text>
                    <Text>Summary: {this.props.project.summary}</Text>
                    <Text>Position: {this.props.project.positions}</Text>

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

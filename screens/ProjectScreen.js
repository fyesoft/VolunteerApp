import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Button,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert
} from 'react-native';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import * as firebase from 'firebase';

export default class ProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.fbProjects = firebase.firestore().collection('projects');

        this.project = props.navigation.state.params.project;
        this.projectID = props.navigation.state.params.id;
        this.isAuthenticated = props.navigation.state.params.isAuthenticated;
        this.getCurrentUser = () => props.navigation.state.params.getCurrentUser();
    }

    componentWillMount() {
        //console.log(this.project.positions);
        this.project.positions.forEach(element => {
            console.log(element);
            console.log(element.name);
            console.log(element.count);
        });
    }

    renderPosition = ({ position }) => (
        <TouchableOpacity style={styles.positionsListItem}>

            <Text> {position} </Text>
        </TouchableOpacity>

    )

    renderEmptyList = () => (
        <Text>
            No Positions
        </Text>
    )

    keyExtractor = (item) => item.index;

    renderPositions() {
        let positions = this.project.positions;
        if (positions.length > 0) {
            return positions.map((position, index) => (
                <TouchableOpacity key={index} style={styles.positionsListItem} onPress={() => this.onPositionPress(index)}>
                    <Text> {position.name} </Text>
                    <Text> {position.count} </Text>
                </TouchableOpacity>
            ))
        } else {
            return <Text>No Positions</Text>
        }
    }

    onPositionPress(index) {

        let project = this.fbProjects.doc(this.project.id + "");
        let newPositions = this.project.positions;

        if (this.getCurrentUser().id !== "") {
            //check if the user is already registered to avoid multiple entries.
            newPositions[index].enrolled.push({
                name: this.getCurrentUser().name,
                email: this.getCurrentUser().email,
            })
            project.update({
                positions: newPositions
            }).then(uh => Alert.alert("Registered as " + newPositions[index].name))
        }else{
            //pop open modal saying something along the lines of either sign in or register anonymously.
        }
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
                    <Text style={styles.detailsItem}>Name: {this.project.title} </Text>

                    <Text style={styles.detailsItem}>Starting: {this.project.start.date}</Text>
                    <Text style={styles.detailsItem}>Ending: {this.project.end.date}</Text>

                    <Text style={styles.detailsItem}>Summary: {this.project.summary}</Text>

                    <Text style={styles.detailsItem}>Positions: </Text>
                    {this.renderPositions()}
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
    },
    positionsListItem: {
        width: '90%',
        margin: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
        borderColor: 'black',
        height: 50,
    }

})

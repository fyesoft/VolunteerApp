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
            confirmModalVisible: false,
            selectedPosition: -1,
        };

        this.fbProjects = firebase.firestore().collection('projects');
        this.users = firebase.firestore().collection('users');

        this.project = props.navigation.state.params.project;
        this.projectID = props.navigation.state.params.id;
        this.isAuthenticated = props.navigation.state.params.isAuthenticated;
        this.getCurrentUser = () => props.navigation.state.params.getCurrentUser();
        this.setCurrentUser = () => props.navigation.state.params.setCurrentUser;
    }

    componentWillMount() {
        //console.log(this.project.positions);
        // this.project.positions.forEach(element => {
        //     console.log(element);
        //     console.log(element.name);
        //     console.log(element.count);
        // });
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
        //() => this.onPositionPress(index)
        let positions = this.project.positions;
        if (positions.length > 0) {
            return positions.map((position, index) => (
                <TouchableOpacity key={index} style={styles.positionsListItem} onPress={() => this.toggleConfirmation(index)}>
                    <Text style={styles.positionText}> {position.name} </Text>
                    <Text style={styles.positionText}> {position.enrolled.length}/{position.count} </Text>
                </TouchableOpacity>
            ))
        } else {
            return <Text>No Positions</Text>
        }
    }

    toggleConfirmation(index) {
        this.setState({
            confirmModalVisible: !this.state.confirmModalVisible,
            selectedPosition: index,
        })
    }

    onConfirmPress(index) {

        //this.toggleConfirmation(index);

        let project = this.fbProjects.doc(this.project.id + "");
        let newPositions = this.project.positions;

        if (this.getCurrentUser().id !== "") {
            //check if the user is already registered to avoid multiple entries.
            for (let i = 0; i < newPositions[index].enrolled.length; i++) {
                if (newPositions[index].enrolled[i].email == this.getCurrentUser().email) {
                    Alert.alert("Already Registered");
                    return;
                }
            }

            if (newPositions[index].enrolled.length == newPositions[index].count) {
                Alert.alert("No more slots available for this position, please choose another.");
            }
            else {
                newPositions[index].enrolled.push({
                    name: this.getCurrentUser().name,
                    email: this.getCurrentUser().email,
                })

                project.update({
                    positions: newPositions
                }).then(yuh => {
                    let user = this.users.doc(this.getCurrentUser().id + "");
                    let attendingProjects = this.getCurrentUser().projects;
                    project.get().then(snapshot => {
                        //console.log(snapshot.data());
                        attendingProjects.push(snapshot.data());
                        user.update({
                            projects: attendingProjects,
                        }).then(yuh => {
                            user.get().then(snapshot => {
                                this.setCurrentUser(snapshot.data())
                            })
                            Alert.alert("Registered as " + newPositions[index].name);
                        })
                    })

                })
            }
        } else {
            //pop open modal saying something along the lines of either sign in or register anonymously.
            Alert.alert("Please sign in if you want to register.")
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.confirmModalVisible}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalDialogue}>
                            <Text style={styles.modalTitle}>Confirmation</Text>
                            <Text style={styles.modalText}>Please confirm that you would like to register for this project:</Text>
                            <View style={styles.modalButtonsContainer}>
                                <Button title="Cancel" onPress={() => this.toggleConfirmation(-1)} />
                                <Button title="Confirm" onPress={() => this.onConfirmPress(this.state.selectedPosition)} />
                            </View>
                        </View>
                    </View>
                </Modal>

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
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        backgroundColor: '#00A887',
        height: 45,
        marginTop: 5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    positionText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    modalDialogue: {
        padding: 15,
        height: 200,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 15,
        opacity: 0.8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    modalText: {
        fontSize: 15,
        margin: 3,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    modalButton: {
        margin: 3,
    }

})

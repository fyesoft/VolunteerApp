import React, { Component } from 'react'
import {
    Text,
    Image,
    TextInput,
    View,
    StyleSheet,
    Alert,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    LayoutAnimation,
    FlatList,
    ScrollView,
} from 'react-native'
import { ImagePicker, Permissions } from 'expo';
// import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modalbox';
import * as firebase from 'firebase';

import PositionsAdder from '../components/PositionsAdder';
import Loading from '../components/Loading';

const green = '#00A887';

export default class CreateProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            summary: "",

            start: { date: "" },
            end: { date: "" },

            positions: [],
            img_url: { uri: "http://www.waterville-me.gov/wp-content/uploads/2017/06/volunteer-hands.jpg" },
            isApproved: true,

            verified: false,
        }

        this.upload_options = {
            title: 'Select Image',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        this.projects = firebase.firestore().collection('projects');
        this.storage = firebase.storage().ref();
    }

    verify = (bool) => {
        this.setState({ verified: bool });
    }

    // onUploadPress = async () => {
    //     await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     ImagePicker.showImagePicker(this.upload_options, (response) => {
    //         console.log('Response = ', response);

    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //             const source = { uri: response.uri };

    //             // You can also display the image using data:
    //             // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    //             this.setState({
    //                 avatarSource: source,
    //             });
    //         }
    //     });
    // }

    onUploadImagePress = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let result = await ImagePicker.launchImageLibraryAsync();
        console.log(result);

        if (!result.cancelled) {
            this.setState(
                (prevState) => ({
                    ...prevState,
                    img_url: {
                        ...prevState.img_url,
                        uri: result.uri
                    }
                })
            )

            this.uploadImage(result.uri, this.state.title).then(() => Alert.alert("Uploaded"))
                .catch(error => console.log(error));
        }
    }

    onCameraPress = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        let result = await ImagePicker.launchCameraAsync();
        console.log(result);

        if (!result.cancelled) {
            this.setState(
                (prevState) => ({
                    ...prevState,
                    img_url: {
                        ...prevState.img_url,
                        uri: result.uri
                    }
                })
            )

            this.uploadImage(result.uri, this.state.title).then(() => {
                Alert.alert("Uploaded");
            }).catch(error => console.log(error))
        }
    }

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        return firebase.storage().ref().child('images/'+imageName).put(blob);
    }

    onConfirmPress = () => {

        this.refs.Loader.open();
        this.projects.add(this.state).then(
            () => {
                Alert.alert("Project has been sent for approval.");
                this.props.navigation.goBack();
                this.refs.Loader.close();
            }, (error) => alert(error.message)
        )
    }

    onStartDateChange = (stateDate) => {
        this.setState(
            (prevState) => ({
                ...prevState,
                start: {
                    ...prevState.start,
                    date: stateDate
                }
            })
        )
    }

    onEndDateChange = (stateDate) => {
        this.setState(
            (prevState) => ({
                ...prevState,
                end: {
                    ...prevState.end,
                    date: stateDate
                }
            })
        )
    }

    updatePositions = (newPositions) => {
        this.setState({ positions: newPositions });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    backdrop={false}
                    backdropPressToClose={false}
                    swipeToClose={false}
                    backButtonClose={false}
                    ref='Loader'
                    style={styles.loadingModal}
                    animationDuration={5}
                >
                    <Loading loadingText='Processing...' />
                </Modal>
                <ScrollView style={styles.container}>
                    <Text style={styles.createModalTitle}>Create Project</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>Title: </Text>
                        <TextInput
                            value={this.state.title}
                            onChangeText={(text) => this.setState({ title: text })}
                            autoCapitalize='none'
                            autoCorrect={false}
                            clearTextOnFocus={false}
                            clearButtonMode='always'
                            placeholder="Ex: Food Drive 2019"
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>Summary: </Text>
                        <TextInput
                            value={this.state.summary}
                            onChangeText={(text) => this.setState({ summary: text })}
                            autoCapitalize='none'
                            autoCorrect={false}
                            clearButtonMode='always'
                            multiline={true}
                            placeholder="Ex: Hi, the food drive is for the needy of Piscataway and requires volunteers to cook, carry.."
                            style={[styles.textInput, { height: 100, }]}
                        />
                    </View>
                    <View style={[styles.inputContainer, { flexDirection: 'column', }]}>

                        <View style={styles.dateInputContainer}>
                            <Text style={styles.inputTitle}>Start:</Text>
                            <DatePicker
                                style={[styles.textInput, { borderColor: 'white', padding: 0 }]}
                                date={this.state.start.date}
                                mode="datetime"
                                placeholder="select date and time"
                                format="MMM Do YYYY, hh:mm a"

                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        flex: 1,
                                        borderWidth: 1,
                                        padding: 10,
                                        borderRadius: 10,
                                        borderColor: green,
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => this.onStartDateChange(date)}
                            />
                        </View>
                        <View style={styles.dateInputContainer}>
                            <Text style={styles.inputTitle}>End:</Text>
                            <DatePicker
                                style={[styles.textInput, { borderColor: 'white', padding: 0 }]}
                                date={this.state.end.date}
                                mode="datetime"
                                placeholder="select date and time"
                                format="MMM Do YYYY, hh:mm a"

                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        flex: 1,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        borderColor: green,
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => this.onEndDateChange(date)}
                            />
                        </View>
                    </View>

                    <View style={styles.imageContainer}>
                        <Text style={[styles.inputTitle, { marginBottom: 10 }]}>Flyer Image:</Text>

                        <View style={styles.createAccountButtons}>
                            <TouchableOpacity onPress={this.onCameraPress} style={[styles.createAccountButton, { backgroundColor: '#3D7E9A', marginRight: '2.5%', }]}>
                                <Text style={styles.lgBtnText}>Camera</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.onUploadImagePress} style={[styles.createAccountButton, { backgroundColor: '#3D7E9A', marginLeft: '2.5%' }]}>
                                <Text style={styles.lgBtnText}>Upload Image</Text>
                            </TouchableOpacity>
                        </View>

                        <Image style={styles.image} source={this.state.img_url} />
                    </View>

                    <PositionsAdder state={this.state} verify={this.verify} updateHandler={this.updatePositions} />

                    <View style={styles.createAccountButtons}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={[styles.createAccountButton, { backgroundColor: '#F73737', marginRight: '2.5%' }]}>
                            <Text style={[styles.lgBtnText, { color: 'white' }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.onConfirmPress}
                            disabled={!this.state.verified}
                            style={!this.state.verified ? styles.disabledButton : [styles.createAccountButton, { backgroundColor: '#00A887', marginLeft: '2.5%' }]}>
                            <Text style={[styles.lgBtnText, { color: 'white' }]}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    createModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginBottom: 10,
        marginTop: 0,
        padding: 0,
    },
    inputTitle: {
        flex: 0.4,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: green
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 8,
    },
    createAccountButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    createAccountButton: {
        width: '35%',
        height: 50,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,

        shadowOffset: { width: 2, height: 3, },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 2.5,
        elevation: 1, // Android
    },
    disabledButton: {
        width: '35%',
        height: 50,
        backgroundColor: 'gray',
        marginLeft: '2.5%',

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,

        shadowOffset: { width: 2, height: 3, },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 2.5,
        elevation: 1, // Android
    },
    lgBtnText: {
        fontWeight: 'bold',
        color: 'white',
    },
    loadingModal: {
        backgroundColor: 'black',
        opacity: 0.75,
        height: 100,
        width: 200,
        borderRadius: 50,
    },
    imageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        marginTop: 20,
        padding: 20,
        height: 300,
        width: 300,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
    },
})
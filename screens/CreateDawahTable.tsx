import React,{ Component } from 'react';
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

export class CreateDawahTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(): React.ReactNode {
        return(
            <ScrollView style={styles.container}>
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

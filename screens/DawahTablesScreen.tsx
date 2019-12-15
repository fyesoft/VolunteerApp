import React, { Component } from "react";
import { 
    View,
    ScrollView,
    Text,
    StyleSheet,
} from "react-native";

import MapView, { Region } from "react-native-maps";

export interface Props {

}

interface State {

}

export default class DawahTablesScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Text style={styles.mapTitle}>Dawah Tables</Text>
                <MapView 
                    style={{flex: 1}}
                    initialRegion={{
                        latitude: 40.7585218066997,
                        latitudeDelta: 0.6563895294963871,
                        longitude: -73.80803199042016,
                        longitudeDelta: 0.46756768825822803,
                      }}
                    onRegionChange={this.onRegionChange.bind(this)}

                />
            </View>
        );
    }

    onRegionChange(region: Region) {
        console.log(region)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    mapTitle: {
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
        borderColor: "green"
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
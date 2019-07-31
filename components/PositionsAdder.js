import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, FlatList, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class PositionsAdder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            positions: [{ name: "", count: "", enrolled: [] }]
        }
    }

    onVerify = () => {
        // this.props.updateHandler(this.state.positions);
        // this.props.setPositions(true);

        let verifying = new Promise((resolve, reject) => {
            if(
                this.props.state.title === "" ||
                this.props.state.summary === "" ||
                this.props.state.start.date === "" ||
                this.props.state.end.date === ""
            ){
                reject('One or more of your first four fields are empty.')
            }

            for(let i=0; i<this.state.positions.length; i++){
                if(
                    this.state.positions[i].name === "" ||
                    this.state.positions[i].count === "" ||
                    isNaN(this.state.positions[i].count)
                ){
                    reject('Please recheck your position fields.');
                    break;
                }
            }

            resolve('Looks valid. Please review before you press confirm.')
        })

        verifying.then((message) => {
            Alert.alert(message);
            this.props.updateHandler(this.state.positions);
            this.props.verify(true);
        }).catch((message)=>{
            Alert.alert(message);
        })
    }

    onAddPosition = () => {
        this.state.positions.push(
            {
                name: "",
                count: "",
                enrolled: []
            }
        )
        this.setState(this.state.positions);
    }

    onRemovePosition = (index) => {
        this.state.positions.splice(index, 1);
        this.setState({ positions: this.state.positions });
    }

    handleNameChange(text, index) {
        this.state.positions[index].name = text;
        this.setState({ positions: this.state.positions });
    }

    handleCountChange(text, index) {
        this.state.positions[index].count = text;
        this.setState({ positions: this.state.positions });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}> Volunteer Positions: </Text>
                    <TouchableOpacity onPress={this.onAddPosition}>
                        <Ionicons name='ios-add-circle' size={45} color="#00A887" />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.labelRow}>
                        <Text style={{ marginLeft: 'auto', marginRight: 'auto' }}>Position Name</Text>
                        <Text style={{ paddingRight: 15, paddingLeft: 15 }}>How many?</Text>
                    </View>
                    {
                        this.state.positions.map(
                            (position, index) => {
                                return (
                                    <View style={styles.position} key={index}>
                                        <TextInput
                                            value={position.name}
                                            onChangeText={(text) => this.handleNameChange(text, index)}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            clearTextOnFocus={false}
                                            clearButtonMode='always'
                                            placeholder="Ex: Floater, Cook etc."
                                            style={styles.textInput}
                                        />
                                        <TextInput
                                            value={position.count}
                                            onChangeText={(text) => this.handleCountChange(text, index)}
                                            keyboardType = 'numeric'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            clearTextOnFocus={false}
                                            placeholder="#"
                                            style={[styles.textInput, { width: 60, }]}
                                        />
                                        <TouchableOpacity onPress={this.onRemovePosition.bind(this, index)}>
                                            
                                            <Ionicons name='md-close-circle' size={30} color="#F73737" />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        )
                    }
                    <TouchableOpacity onPress={this.onVerify} style={styles.doneButton}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Verify Everything</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleBar: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    title:{
        fontWeight: 'bold',
    },
    labelRow:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    position: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#00A887',
        width: 250,
    },
    doneButton: {
        backgroundColor: '#00A887',
        width: 200,
        height: 40,
        borderRadius: 5,
        margin: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: 'center',

        shadowOffset: { width: 0, height: 2, },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 4,
    }
})
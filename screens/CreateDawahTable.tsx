import React,{ Component } from 'react';
import ScreenBar from "../components/ScreenBar";
import { DrawerActions } from 'react-navigation';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Picker,
    Button,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert
} from 'react-native';

import { TabView, TabBar, Route, SceneRendererProps } from "react-native-tab-view";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import createStackedNavigator, { NavigationContainer } from "react-navigation"

export interface Props {
    navigation: NavigationContainer;
}
const repeatOptions = ["Every Day", "Every Week", "Every Weekend", "Every Weekday", "Every Two Weeks", "Every Month"];

interface State {
    location: string
    tabViewState: {
        index: number,
        routes: Array<Route>
    },
    firstOccurence: Date;
    repeats: typeof repeatOptions[number];
    tableType: "once" | "recurring";
}

export default class CreateDawahTable extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            location: "",
            tabViewState: {
                index: 0,
                routes: [
                    { key: "recurring", title: "Recurring"},
                    { key: "once", title: "Once"},
                ]
            },
            firstOccurence: new Date(),
            repeats: "Every Week",
            tableType: "recurring",
        }
    }

    _renderTabView = (props: SceneRendererProps & { route: Route; }): React.ReactNode => {
        switch(props.route.key) {
            case "recurring":
                return <View style={styles.container}>
                    <Text style={styles.positionText}>
                        First Occurence
                    </Text>
                    <DateTimePicker
                        value={this.state.firstOccurence}
                        mode="datetime"
                        onChange={this._onFirstOccurenceChanged}
                    />
                    <Text style={styles.positionText}>
                        Repeats every
                    </Text>
                    <Picker
                        selectedValue={this.state.repeats}
                        onValueChange={this._onRepeatsValueChange}
                        {...repeatOptions.map((value: string) => {
                            return (<Picker.Item label={value} value={value}/>);
                        })}
                    />
                    
                </View>
            case "once":
                return <View style={styles.container}>
                    <Text style={styles.positionText}>
                        When
                    </Text>
                    <DateTimePicker
                        value={this.state.firstOccurence}
                        mode="datetime"
                        onChange={this._onFirstOccurenceChanged}
                    />
                </View>
        }
    }

    _onFirstOccurenceChanged = (event: Event, date?: Date) => {
        this.state.firstOccurence = date || new Date();
    }

    _onRepeatsValueChange = (value: string, index: number) => {
        this.state.repeats = value;
    }

    _onTabIndexChange = () => {

    }
    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <ScreenBar onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} title={'Create Dawah Table'} />
                <ScrollView contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>
                    <TextInput
                        value={this.state.location}
                        onChangeText={(text) => this.setState({ location: text })}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder="Location"
                        style={styles.textInput}
                    />
                    <TabView
                        navigationState={this.state.tabViewState}
                        renderScene={this._renderTabView}
                        renderTabBar={ props => 
                        <TabBar
                            {...props}
                            indicatorStyle={{backgroundColor: 'black'}}
                            style={{
                                backgroundColor: 'white',
                                shadowOffset: { width: 0, height: 1},
                                shadowColor: 'black',
                                shadowOpacity: 0.4,
                                shadowRadius: 8,
                            }}
                            labelStyle={{
                                color: 'black',
                                fontSize: 13,
                                fontWeight: 'bold'
                            }}
                        />}
                        onIndexChange={this._onTabIndexChange}
                        tabBarPosition='top'
                    />

                    <TextInput
                        value={this.state.location}
                        onChangeText={(text) => this.setState({ location: text })}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder="Schedule"
                        style={styles.textInput}
                    />
                </ScrollView>
            </View>
        )
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
    loadingModal: {
        backgroundColor: 'black',
        opacity: 0.75,
        height: 100,
        width: 200,
        borderRadius: 50,
    },
    textInput: {
        textAlign: 'center',
        width: 300,
        height: 50,
        backgroundColor: 'white',
        color: 'black',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: '#00A887',
        marginBottom: 15,
    
        shadowOffset: { width: 1, height: 2, },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        //elevation: 1, // Android
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

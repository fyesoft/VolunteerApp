import React from 'react';
import { createDrawerNavigator, createAppContainer, createStackNavigator} from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import DonateScreen from '../screens/DonateScreen';
import VideosScreen from '../screens/VideosScreen';
import VolunteerScreen from '../screens/VolunteerScreen';
import CreateProjectScreen from '../screens/CreateProjectScreen';
import ProjectScreen from '../screens/ProjectScreen';

const VolunteerNavigator = createStackNavigator({
    Volunteer: {screen: VolunteerScreen},
    CreateProject: {
        screen: CreateProjectScreen,
        navigationOptions: () => ({
            title: 'Create Project'
        })
    },
    Project: {
        screen: ProjectScreen
    }
},{
    initialRouteName: 'Volunteer',
    headerMode: 'none'
})

const MyDrawerNavigator = createDrawerNavigator({
    
    Home: {screen: HomeScreen},
    Donate: {screen: DonateScreen},
    Videos: {screen: VideosScreen},
    Volunteer: {screen: VolunteerNavigator},

},{
    initialRouteName: 'Home',
    drawerWidth: 300,
    drawerPosition: 'left'  
});

const AppContainer = createAppContainer(MyDrawerNavigator);

export default class DrawerNavigator extends React.Component{

    render(){
        return <AppContainer />;
    }
}
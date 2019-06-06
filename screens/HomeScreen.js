import React, { Component } from 'react'
import { 
  Text, 
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import { DrawerActions } from 'react-navigation';

import ScreenBar from '../components/ScreenBar';

export default class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    
  }

  render() {
    return (
      <View style={styles.container}>
        <ScreenBar onPress={ () => this.props.navigation.dispatch(DrawerActions.openDrawer()) } title={'HOME'}/>
        <Text> HomeScreen </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,

  },
  openButton:{
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
  openText:{
    color: 'white'
  }
})
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Icon } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import DrawerNavigator from './navigation/DrawerNavigator';

import * as firebase from 'firebase';
import ApiKeys from './constants/ApiKeys';

interface Props {
  skipLoadingScreen: boolean;
}

interface State {
    isLoadingComplete: boolean;
    isAuthenticationReady: boolean;
    isAuthenticated: boolean;
}

export default class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
    };

    //Initializing Firebase
    if (!firebase.apps.length) firebase.initializeApp(ApiKeys.FirebaseConfig);
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user: firebase.User | null): any => {
    this.setState({ isAuthenticationReady: true, isAuthenticated: !!user });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <DrawerNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async (): Promise<void> => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]) as any;
  };

  _handleLoadingError = (error: any) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
});

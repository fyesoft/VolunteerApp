import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableOpacity, LayoutAnimation, Alert, AsyncStorage } from 'react-native'
import Modal from 'react-native-modalbox';
import { TabBar, TabView } from 'react-native-tab-view'
import { DrawerActions } from 'react-navigation';
import * as firebase from 'firebase';
import 'firebase/firestore';

import ScreenBar from '../components/ScreenBar';
import Loading from '../components/Loading';
import CurrentProjects from '../components/CurrentProjects';
import Dashboard from '../components/Dashboard';

export default class VolunteerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Dashboard' },
        { key: 'second', title: 'Current Projects' },
      ],
      isLoading: false,
      isAuthenticated: false,
      currentUser: {
        name: "",
        email: "",
        hours: 0,
        minutes: 0,
        completedProjects: [],
        currentProjects: [],
        isAuthorized: false,
      },
    };

    this.ref = firebase.firestore().collection('users');

    this.authenticate = this.authenticate.bind(this);
    this.load = this.load.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
  };

  // componentWillMount(){
  //   this.load(true);
  // }

  // componentDidMount(){
  //   setTimeout(()=>this.load(false), 1000);
  // }

  load(bool) {
    this.setState({ isLoading: bool });
  }

  authenticate(bool) {
    this.setState({ isAuthenticated: bool });
  }

  setCurrentUser(user) {
    this.setState({ currentUser: user });
  }

  _handleIndexChange = index => this.setState({ index });

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        if (this.state.isAuthenticated)
          return <Dashboard
            navigation={this.props.navigation}
            isLoading={this.state.isLoading}
            load={this.load}
            user={this.state.currentUser}
            authenticate={this.authenticate}
          />
        else
          return <LoginPortal
            isLoading={this.state.isLoading}
            load={this.load}
            users={this.ref}
            setCurrentUser={this.setCurrentUser}
            authenticate={this.authenticate}
          />
      case 'second':
        return <CurrentProjects />;
      default: return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScreenBar onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} title={'VOLUNTEER'} />
        <Modal
          backdrop={false}
          backdropPressToClose={false}
          swipeToClose={false}
          backButtonClose={false}
          isOpen={this.state.isLoading}
          style={styles.loadingModal}
          animationDuration={5}
        >
          <Loading loadingText='Loading...' />
        </Modal>

        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'black' }}
              style={{
                backgroundColor: 'white', shadowOffset: { width: 0, height: 1, },
                shadowColor: 'black',
                shadowOpacity: 0.4,
                shadowRadius: 8,
              }}
              labelStyle={{ color: 'black', fontSize: 13, fontWeight: 'bold', }}
            />
          }
          onIndexChange={this._handleIndexChange}
          scrollEnabled={true}
          tabBarPosition='top'
        />
      </View>
    )
  }
}

class LoginPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      signUpEmail: "",
      signUpPassword: "",
      confirmPassword: "",

      loginEmail: "",
      loginPassword: "",

      modalPosition: 'top'
    };

  }

  componentWillMount() {
    LayoutAnimation.easeInEaseOut();
    //this.getSavedUser();
  }

  componentWillUnmount() {
    LayoutAnimation.easeInEaseOut();
  }

  onCreateAccount = () => this.refs.createAccountModal.open();
  onCancelPress = () => this.refs.createAccountModal.close();

  onSignUpSuccess = async () => {
    //this.props.load(true);
    this.props.users.add({
      name: this.state.username,
      email: this.state.signUpEmail,
      hours: 0,
      minutes: 0,
      completedProjects: [],
      currentProjects: [],
      isAuthorized: false,
    }).then(() => {
      this.setState({
        username: "",
        signUpEmail: "",
        signUpPassword: "",
        confirmPassword: "",
      })
      setTimeout(() => this.props.load(false), 500);
      this.refs.createAccountModal.close();
      Alert.alert('Account Created!');
    }).catch((error) => {
      setTimeout(() => this.props.load(false), 500);
      Alert.alert(error.message)
    })

  }
  onLoginSuccess = async () => {
    //set the current user from database.

    //this.props.load(true);
    //this.saveUser();
    this.props.users.get().then(querySnapShot => {
      querySnapShot.forEach(
        (doc) => {
          if (doc.data().email === this.state.loginEmail) {
            console.log(doc.data());
            this.props.setCurrentUser(doc.data());
            return;
          }
        }
      )
      setTimeout(() => this.props.load(false), 250);
      this.props.authenticate(true);
    }, (error) => {
      setTimeout(() => this.props.load(false), 250);
      Alert.alert(error.message);
    })
  }

  onLoginPress = async () => {

    this.props.load(true);
    firebase.auth().signInWithEmailAndPassword(this.state.loginEmail, this.state.loginPassword).then(
      this.onLoginSuccess, (error) => {
        setTimeout(() => this.props.load(false), 250);
        Alert.alert(error.message);
      }
    )

  }
  onSignUpPress = async () => {
    if (this.state.signUpPassword !== this.state.confirmPassword) Alert.alert("Passwords don't match");
    else {
      this.props.load(true);
      firebase.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword)
        .then(
          this.onSignUpSuccess, (error) => {
            setTimeout(() => this.props.load(false), 500);
            Alert.alert(error.message);
          }
        )
    }
  }

  saveUser() {
    AsyncStorage.setItem('savedEmail', this.state.loginEmail);
    AsyncStorage.setItem('savedPassword', this.state.loginPassword);
  }

  getSavedUser = async () => {
    try{
      this.setState({
        loginEmail: AsyncStorage.getItem('savedEmail'),
        loginPassword: AsyncStorage.getItem('savedPassword')
      });
    }catch(error){
      console.log(error.message);
    }
  }

  renderModalContent() {
    return (
      <View>
        <TextInput
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder="Name"
          style={styles.textInput} />
        <TextInput
          value={this.state.signUpEmail}
          onChangeText={(text) => this.setState({ signUpEmail: text })}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder="Email"
          style={styles.textInput} />
        <TextInput
          value={this.state.signUpPassword}
          onChangeText={(text) => this.setState({ signUpPassword: text })}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.textInput} />
        <TextInput
          value={this.state.confirmPassword}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={styles.textInput} />

        <View style={styles.createAccountButtons}>
          <TouchableOpacity
            onPress={this.onCancelPress}
            style={[styles.createAccountButton, { backgroundColor: '#F73737', marginRight: '2.5%' }]}>
            <Text style={[styles.lgBtnText, { color: 'white' }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onSignUpPress}
            style={[styles.createAccountButton, { backgroundColor: '#00A887', marginLeft: '2.5%' }]}>
            <Text style={[styles.lgBtnText, { color: 'white' }]}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    )

  }

  render() {
    return (
      <View style={styles.login_contaner}>

        <Modal
          backButtonClose={true}
          swipeToClose={false}
          style={styles.createAccountModal}
          backdrop={true}
          position='top'
          ref='createAccountModal'
          keyboardTopOffset={0}
        >
          {this.renderModalContent()}
        </Modal>

        <View style={styles.loginFields}>
          <TextInput
            value={this.state.loginEmail}
            onChangeText={(text) => this.setState({ loginEmail: text })}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder="Email"
            style={styles.textInput} />
          <TextInput
            value={this.state.loginPassword}
            onChangeText={(text) => this.setState({ loginPassword: text })}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder="Password"
            secureTextEntry={true}
            style={styles.textInput} />
          <TouchableOpacity onPress={this.onLoginPress} style={styles.loginButton}>
            <Text style={styles.lgBtnText}>Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this.onCreateAccount} style={[styles.loginButton, { backgroundColor: 'white', borderWidth: 3, borderColor: '#00A887', }]}>
          <Text style={[styles.lgBtnText, { color: '#00A887' }]}>Create Account</Text>
        </TouchableOpacity>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    width: 300,
    height: 200,
  },
  login_contaner: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  loginFields: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    textAlign: 'center',
    width: 300,
    height: 50,
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#00A887',
    marginBottom: 15,

    shadowOffset: { width: 1, height: 2, },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    //elevation: 1, // Android
  },
  loginButton: {

    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    backgroundColor: '#00A887',
    borderRadius: 5,
    marginBottom: 15,

    shadowOffset: { width: 2, height: 3, },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2.5,
    //elevation: 1, // Android
  },
  lgBtnText: {
    fontWeight: 'bold',
    color: 'white',
  },
  createAccountModal: {
    marginTop: '5%',
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '85%',
    height: 'auto',
    paddingTop: 25,
    paddingBottom: 15,

    elevation: 6,

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
  loadingModal: {
    backgroundColor: 'black',
    opacity: 0.75,
    height: 100,
    width: 200,
    borderRadius: 50,
  }
})

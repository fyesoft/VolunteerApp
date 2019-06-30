import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  LayoutAnimation,
  FlatList,
  ScrollView,
} from 'react-native'
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modalbox';
import * as firebase from 'firebase';

import Project from '../components/Project';
import PositionsAdder from '../components/PositionsAdder';

const green = '#00A887';

export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthorized: true,
      createModalVisible: false,
      currentProjects: [],
      completedProjects: [],

      createdProject: {
        title: "",
        summary: "",

        start: { date: "" },
        end: { date: "" },

        positions: [],
        img_url: { uri: "" },
        isApproved: true,
      }
    }

    this.emptyProject = {
      title: "",
      summary: "",

      start: { date: "" },
      end: { date: "" },

      positions: [],
      img_url: { uri: "" },
      isApproved: true,
    }
    this.projects = firebase.firestore().collection('projects');
  }

  componentWillMount() {
    LayoutAnimation.easeInEaseOut();
  }

  async componentDidMount() {
    console.log(this.state.currentProjects);
    this.fetchProjects();
  }

  componentWillUnmount() {
    LayoutAnimation.easeInEaseOut();
  }

  fetchProjects = async () => {
    let currentProjects = [];
    let completedProjects = [];

    this.projects.get().then(
      snapShot => {
        snapShot.forEach(doc => {
          //console.log(this.props.user);
          //console.log(doc.data());

          if (this.props.user.completedProjects.includes(doc.data().title))
            completedProjects.push(doc.data());

          if (this.props.user.currentProjects.includes(doc.data().title))
            currentProjects.push(doc.data());

          //console.log(completedProjects);
          //console.log(this.state.completedProjects);
        });
        this.setState({
          completedProjects: completedProjects,
          currentProjects: currentProjects
        });
      }, error => {
        alert(error.message);
      }
    )
  }

  onSignOutPress = () => {
    firebase.auth().signOut().then(
      this.props.authenticate(false),
      (error) => {
        alert(error.message);
      }
    )
  }

  keyExtractor = (item, index) => item.index;

  renderItem = ({ item }) => (
    <Project project={item} key={item.index}/>
  )

  renderCreateButton() {
    if (this.state.isAuthorized) {
      return (
        <View style={styles.createButton}>
          <Button
            title='Create Project'
            color='white'
            onPress={() => this.props.navigation.navigate('CreateProject')}
          />
        </View>
      )
    } else return null;
  }

  onCancelPress = () => {
    this.setState({ createModalVisible: false, createdProject: this.emptyProject });
    console.log(this.state.createModalVisible);
  }

  onConfirmProjectPress = () => {

    // if (
    //   this.state.createdProject.title.length <= 3 ||
    //   this.state.createdProject.summary.length <= 10 ||
    //   this.state.createdProject.dateRange === "" ||
    //   this.state.createdProject.positions
    // )

    this.projects.add(this.state.createdProject).then(
      () => {
        let tempProjects = this.state.currentProjects;
        tempProjects.push(this.state.createdProject);
        console.log(this.state.currentProjects);
        this.setState({
          currentProjects: tempProjects,
        });
        console.log(this.state.currentProjects);
        this.setState({ createModalVisible: false, createdProject: this.emptyProject });

      }, (error) => alert(error.message)
    )
  }

  onCreateProjectTextChange = (object) => {
    this.setState({
      createdProject: Object.assign({}, this.state.createdProject, object)
    })
  }

  onStartDateChange = (stateDate) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        createdProject: {
          ...prevState.createdProject,
          start: {
            ...prevState.createdProject.start,
            date: stateDate
          }
        }
      })
    )
  }

  onEndDateChange = (stateDate) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        createdProject: {
          ...prevState.createdProject,
          end: {
            ...prevState.createdProject.end,
            date: stateDate
          }
        }
      })
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>

          <View style={styles.profile}>
            <Text style={styles.name}>{this.props.user.name}</Text>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={this.onSignOutPress}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Sign Out</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.volunteerExp]}>
            <Text style={[styles.name, { fontSize: 15, }]}>Volunteer Experience</Text>
            <View style={styles.hours}>
              <Text style={styles.hoursText}>Hours:</Text>
              <Text style={styles.hoursText}>{this.props.user.hours} Hours and {this.props.user.minutes} Minutes</Text>
            </View>
          </View>

          {this.renderCreateButton()}

          <View style={styles.volunteerExp}>
            <Text style={[styles.name, { fontSize: 15, }]}>Completed Projects</Text>
            <FlatList
              data={this.state.completedProjects}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ref='myList'
            />
          </View>

          <View style={styles.volunteerExp}>
            <Text style={[styles.name, { fontSize: 15, }]}>Attending Projects</Text>
            <FlatList
              data={this.state.currentProjects}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ref='myList'
            />
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
  profile: {
    width: '100%',
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22,
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    backgroundColor: 'black',
    width: 90,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',

    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  volunteerExp: {
    width: '100%',
    flexDirection: 'column',
    padding: 15,
  },
  hours: {
    flexDirection: 'row',
    marginTop: 5,
  },
  hoursText: {
    marginRight: 5,
  },
  createButton: {
    backgroundColor: green,
    width: '75%',
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',

    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  createModal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginBottom: 0,
    marginTop: 0,
    padding: 0,
  },
  inputTitle: {
    flex: 0.4,
    textAlign: 'center',
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
    width: '100%'
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
  lgBtnText: {
    fontWeight: 'bold',
    color: 'white',
  },
})

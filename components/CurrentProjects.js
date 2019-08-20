import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Button, FlatList } from 'react-native';
import * as firebase from 'firebase';

import Project from '../components/Project';
import CurrentProject from './CurrentProject';

export default class CurrentProjects extends Component {
  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
    };
    this.projects = firebase.firestore().collection('projects');
    //this.user = this.props.currentUser;
  };

  componentDidMount() {

  }

  // componentDidUpdate(prevProps) {
  //   //create a function that returns current user from parent(s) upon pressing position

  //   if (prevProps != undefined) {
  //     if (this.user.email !== prevProps.user.email) {
  //       this.user = this.props.currentUser;
  //     }
  //   }
  // }

  renderProject = ({ item }) => (
    <Project
      project={item}
      id={item.id}
      navigation={this.props.navigation}
      isAuthenticated={this.props.isAuthenticated}
      getCurrentUser={this.props.getCurrentUser}
    />
  )

  keyExtractor = (item) => item.id;

  handleRefresh = () => {
    this.setState({
      refreshing: true,

    }, async () => {
      await this.props.fetchProjects();
      this.setState({ refreshing: false });
    })
  }

  renderEmptyList = () => (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>No Projects Available..</Text>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.currentProjects}
          renderItem={this.renderProject}
          keyExtractor={this.keyExtractor}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          ListEmptyComponent={this.renderEmptyList}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    color: 'gray',
    fontSize: 17,
    padding: 20,
  }
})

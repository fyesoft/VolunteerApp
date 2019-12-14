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

  renderProject = ({ item }) => (
    <Project
      project={item}
      id={item.key}
      navigation={this.props.navigation}
      isAuthenticated={this.props.isAuthenticated}
      getCurrentUser={this.props.getCurrentUser}
      setCurrentUser={this.props.setCurrentUser}
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

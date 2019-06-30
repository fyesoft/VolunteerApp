import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Button, FlatList } from 'react-native';
import * as firebase from 'firebase';

import Project from '../components/Project';
import CurrentProject from './CurrentProject';

export default class CurrentProjects extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentProjects: [{ message: "empty" }]
    };
    this.projects = firebase.firestore().collection('projects');
  };

  renderProject = ({ item }) => (
    <Project project={item} key={item.index} navigation={this.props.navigation}/>
  )

  keyExtractor = (item, index) => item.index;

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.props.currentProjects}
          renderItem={this.renderProject}
          keyExtractor={this.keyExtractor}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})


import React from 'react'
import { getProjects, getIssues } from '../services/Api'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: [],
      issues: [],
      apiKey: ''

    }
  }

  componentDidMount () {
    getProjects()
      .then(response => {
        console.log('123')
        this.setState({
          projects: response.data.projects
        })
      })
      .catch(error => {
        console.log(error)
      })
    getIssues()
      .then(response => {
        console.log(response.data.issues)
        this.setState({
          issues: response.data.issues
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render () {
    return (

      <View style={styles.body}>
        <ScrollView>
          <View style={styles.profile}>
            
            <View style={styles.profileText}>
              <Text style={styles.TextProjects}>Issues</Text>
            </View>
          </View>

          {this.state.issues.map((issues, index) => {
            return (
              <View style={styles.issues} key={index}>
                <Text>{issues.project.name}</Text>
                <Text style={styles.subject}>{issues.subject}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>

    )
  }
}
const styles = StyleSheet.create({

  body: {
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,
    width: '100%',
    textAlign: 'center'

  },
  subject: {
    textAlign: 'center',
    padding: 3
  },
  issues: {
    backgroundColor: '#f7f4df',
    height: 130,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: Colors.black,
    borderBottomWidth: 1
  },
  profile: {
    backgroundColor: 'goldenrod',
    height: 130,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: Colors.black,
    borderBottomWidth: 1

  },
  TextProjects: {
    fontSize: 35
  },
  image: {
    width: '30%',
    borderRadius: 10,
    height: 100,
    borderStyle: 'solid',

    backgroundColor: '#FFF'
  },
  profileText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: 100

  },
  name: {
    fontSize: 25
  }

})

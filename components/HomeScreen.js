
import React from 'react'
import { getProjects, getIssues, getUsers } from '../services/Api'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { TextInput } from 'react-native-gesture-handler'

export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: [],
      issues: [],
      user: '',
    }
  }

  componentDidMount () {
    getProjects()
      .then(response => {
        this.setState({
          projects: response.data.projects,
        })
      })
      .catch(error => {
        console.log(error)
      })
    getIssues()
      .then(response => {
        this.setState({
          issues: response.data.issues,
        })
      })
      .catch(error => {
        console.log(error)
      })
    getUsers()
      .then(response => {
        this.setState({
          user: response.data.user,
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
              <Text style={styles.TextProjects}>Projects</Text>
            </View>
          </View>

          {this.state.projects.map((project, index) => {
            return (
              <View style={styles.profile} key={index}>
                <Text>{project.name}</Text>
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
    width: '100%'
  },
  profile: {
    backgroundColor: '#ebe9dd',
    height: 130,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: Colors.black,
    borderBottomWidth: 1
  },
  image: {
    width: '30%',
    borderRadius: 10,
    height: 100,
    borderStyle: 'solid',
    backgroundColor: '#FFF',
  },
  profileText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 130,
    backgroundColor: '#FFF',
    fontSize: 50,
  },
  TextProjects: {
    fontSize: 35,
  },
  name: {
    fontSize: 25,
  },
})

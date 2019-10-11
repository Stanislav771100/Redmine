import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import HomeScreen from './components/HomeScreen'
import MainNavigator from './components/MainNavigator'
import LogTime from './components/LogTime'


class App extends React.Component {
  render () {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <HomeScreen />
      </View>
    )
  }
}

class Issues extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MainNavigator />
      </View>
    )
  }
}

class LogTimeMenu extends React.Component {
  render () {
    return (

      <View style={styles.container}>
        <LogTime />
      </View>

    )
  }
}
const TabNavigator = createBottomTabNavigator({
  Projects: { screen: App },
  Issues: { screen: Issues },
  LogTime: { screen: LogTimeMenu }
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  }
})
export default createAppContainer(TabNavigator)

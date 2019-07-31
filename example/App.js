import React from 'react'
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native'
import { Promise } from 'es6-promise'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const ios = Platform.OS === 'ios'
const statusHeight = ios ? getStatusBarHeight() : StatusBar.currentHeight
const sw = Dimensions.get('window').width

class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
  }

  mock = (data, t) => {
    return new Promise((resolve, reject) => {
      t = t || Math.random() * 1500
      setTimeout(resolve, t, data)
    })
  }

  fetchData = async () => {
  }

  render () {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#ffffff',
            height: statusHeight
          }}
        >
          <StatusBar translucent backgroundColor={'#ffffff'} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Example

// @flow
/* eslint-disable */

import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import CircleNumberSelector from 'react-native-circle-number-selector'

export default class App extends Component<{}> {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.parent}>
          <CircleNumberSelector
            minValue={1}
            maxValue={10}
            initialValue={1}
            onSelect={() => {}}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parent: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

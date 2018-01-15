// @flow
/* eslint-disable */

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import CircleNumberSelector from 'react-native-circle-number-selector'

type State = {
  value: number,
}

const InitialValue = 3

export default class App extends Component<void, State> {
  state: State = {
    value: InitialValue,
  }

  onChange = (value: number) => {
    this.setState({ value })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.parent}>
          <CircleNumberSelector
            minValue={1}
            maxValue={10}
            initialValue={InitialValue}
            onChange={this.onChange}
          >
            <View>
              <Text style={styles.text}>{this.state.value}</Text>
            </View>
          </CircleNumberSelector>
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
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F0FFFF',
  },
})

// @flow
import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

type Props = {
  cx: number,
  cy: number,
  radius: number,
  onPress: ?Function,
  style: StyleObj,
}

export default function Circle (props: Props) {
  const { cx, cy, radius, style, onPress, ...other } = props
  const width = radius * 2
  const height = radius * 2
  const left = cx - radius
  const top = cy - radius

  const Inner = (
    <View
      style={[
        styles.circle,
        style,
        { left, top, width, height, borderRadius: radius },
      ]}
      {...other}
    />
  )

  if (onPress) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {Inner}
      </TouchableWithoutFeedback>
    )
  } else {
    return Inner
  }
}

const styles = StyleSheet.create({
  circle: { position: 'absolute' },
})

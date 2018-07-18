// @flow
import React from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'

type Props = {
  cx: number,
  cy: number,
  radius: number,
  style: ViewPropTypes.style,
}

export default function Circle (props: Props) {
  const { cx, cy, radius, style, ...other } = props
  const width = radius * 2
  const height = radius * 2
  const left = cx - radius
  const top = cy - radius

  return (
    <View
      style={[
        styles.circle,
        style,
        { left, top, width, height, borderRadius: radius },
      ]}
      {...other}
    />
  )
}

const styles = StyleSheet.create({
  circle: { position: 'absolute' },
})

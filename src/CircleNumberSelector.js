// @flow
import * as React from 'react'
import { StyleSheet, View, PanResponder } from 'react-native'
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import Circle from './Circle'
import { range, getDistance } from './Utils'

type Position = { x: number, y: number }
type GestureState = { dx: number, dy: number }

type State = {
  value: number,
  width: number,
  height: number,
  resizing: boolean,
}

type Props = {
  minValue: number,
  maxValue: number,
  initialValue: number,
  showGraduationLinesOnResizing: boolean,
  onChange: (value: number) => void,
  onSelected: (value: number) => void,
  outermostCircleStyle: StyleObj,
  graduationLineCircleStyle: StyleObj,
  currentValueCircleStyle: StyleObj,
  resizingCurrentValueCircleStyle: StyleObj,
  children?: React.Node,
}

type DefaultProps = {
  showGraduationLinesOnResizing: boolean,
  onChange: (value: number) => void,
  onSelected: (value: number) => void,
  outermostCircleStyle: StyleObj,
  graduationLineCircleStyle: StyleObj,
  currentValueCircleStyle: StyleObj,
  resizingCurrentValueCircleStyle: StyleObj,
}

const defaultStyles = StyleSheet.create({
  outermostCircle: {
    borderWidth: 2,
    borderColor: 'rgb(240, 240, 240)',
    backgroundColor: 'rgb(247, 247, 247)',
  },
  graduationLineCircle: {
    borderWidth: 1,
    borderColor: 'rgb(230, 230, 230)',
  },
  currentValueCircle: {
    borderWidth: 1,
    borderColor: 'rgb(200, 240, 240)',
    backgroundColor: 'rgba(201, 250, 245, 0.8)',
  },
  resizingCurrentValueCircle: {
    backgroundColor: 'rgba(187, 232, 227, 0.6)',
  },
})

export default class CircleNumberSelector extends React.Component<Props, State> {
  props: Props
  state = {
    value: this.props.initialValue,
    width: 0,
    height: 0,
    resizing: false,
  }

  static defaultProps: DefaultProps = {
    showGraduationLinesOnResizing: true,
    outermostCircleStyle: defaultStyles.outermostCircle,
    graduationLineCircleStyle: defaultStyles.graduationLineCircle,
    currentValueCircleStyle: defaultStyles.currentValueCircle,
    resizingCurrentValueCircleStyle: defaultStyles.resizingCurrentValueCircle,
    onChange: () => {},
    onSelected: () => {},
  }

  _panResponder: any
  _value: number
  _tapStartPosition: ?Position
  _previousPosition: ?Position

  get maxArea (): number {
    const radius = this.maxRadius
    return radius * radius * Math.PI
  }

  get maxRadius (): number { return this.state.width / 2 }

  get centerPosition (): Position {
    return { x: this.state.width / 2, y: this.state.height / 2 }
  }

  get valuesInRange (): number[] {
    const { minValue, maxValue } = this.props
    return range(minValue, maxValue)
  }

  get radiusAtCurrentValue (): number {
    return this.radiusAtValue(this.state.value)
  }

  componentWillMount () {
    this._panResponder = this.createPanResponder()
  }

  createPanResponder () {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderTerminate,
      onShouldBlockNativeResponder: () => true,
    })
  }

  radiusAtValue (v: number) {
    const area = this.getAreaAtValue(v)
    return Math.sqrt(area / Math.PI)
  }

  selectValueFromRadius (radius: number) {
    const found = this.valuesInRange.find(v => this.radiusAtValue(v) >= radius)
    if (found != null) { return found }
    return this.props.maxValue
  }

  getAreaAtValue (value: number): number {
    return this.maxArea * (value / this.props.maxValue)
  }

  clear () {
    this._previousPosition = null
    this._tapStartPosition = null
    this.setState({ resizing: false })
  }

  onLayout = (e: Object) => {
    const { width, height } = e.nativeEvent.layout
    this.setState({ width, height })
  }

  onPanResponderGrant = (e: Object, gestureState: GestureState) => {
    const { locationX, locationY } = e.nativeEvent
    this.setState({ resizing: true })
    const center = this.centerPosition
    const leftTop = {
      x: center.x - this.radiusAtValue(this._value || this.state.value),
      y: center.y - this.radiusAtValue(this._value || this.state.value),
    }
    this._tapStartPosition = {
      x: leftTop.x + locationX,
      y: leftTop.y + locationY,
    }
    console.log('tapStartPosition:', this._tapStartPosition)
  }

  onPanResponderMove = (e: Object, gestureState: GestureState) => {
    const { dx, dy } = gestureState
    if (this._tapStartPosition == null) {
      throw new Error('_tapStartPosition is null')
    }
    const position = {
      x: this._tapStartPosition.x + dx,
      y: this._tapStartPosition.y + dy,
    }
    if (this._previousPosition == null) {
      this._previousPosition = position
      return
    }
    const previousRadius = getDistance(
      this.centerPosition, this._previousPosition)
    const radius = getDistance(this.centerPosition, position)

    const expanding = radius >= previousRadius

    const value = this.selectValueFromRadius(radius)
    this._value = value
    this._previousPosition = position
    if (expanding && value <= this.state.value) { return }
    if (!expanding && value >= this.state.value) { return }
    this.setState({ value })
    this.props.onChange(value)
  }

  onPanResponderRelease = () => {
    this.clear()
    this.props.onSelected(this.state.value)
  }

  onPanResponderTerminate = () => {
    this.clear()
  }

  render () {
    const { resizing } = this.state
    const {
      outermostCircleStyle,
      graduationLineCircleStyle,
      currentValueCircleStyle,
      resizingCurrentValueCircleStyle,
    } = this.props
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        {this.valuesInRange.reverse().map((v, i) => {
          const radius = this.radiusAtValue(v)
          const isOutermost = v === this.props.maxValue
          const shouldShowGraduationLine = resizing && this.props.showGraduationLinesOnResizing
          return (
            <Circle
              key={`circle-${i}`}
              cx={this.centerPosition.x}
              cy={this.centerPosition.y}
              radius={radius}
              style={[
                shouldShowGraduationLine && graduationLineCircleStyle,
                isOutermost && outermostCircleStyle,
              ]}
            />
          )
        })}
        <Circle
          key={'circle-current-value'}
          cx={this.centerPosition.x}
          cy={this.centerPosition.y}
          radius={this.radiusAtCurrentValue}
          style={[
            currentValueCircleStyle,
            resizing && resizingCurrentValueCircleStyle,
          ]}
          {...this._panResponder.panHandlers}
        />
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

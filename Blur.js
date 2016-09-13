
import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Animated,
  Easing,
  View,
} from 'react-native'

import { DEFAULT_SHADOW_COLOR, DEFAULT_SHADOW_OPACITY, DEFAULT_SHADOW_ANIMATED, DEFAULT_SHADOW_DURATION } from './constants'

export default class Blur extends Component {

  static defaultProps = {
    shadowColor: DEFAULT_SHADOW_COLOR,
    shadowOpacity: DEFAULT_SHADOW_OPACITY,
    animated: DEFAULT_SHADOW_ANIMATED,
    duration: DEFAULT_SHADOW_DURATION
  }

  static propTypes = {
    show: PropTypes.bool.isRequired,
    //textDimension: PropTypes.shape({
    //    width: PropTypes.number.isRequired,
    //    height: PropTypes.number.isRequired,
    //}),
    containerDimension: PropTypes.object.isRequired,
    shadowOpacity: PropTypes.number,
    shadowColor: PropTypes.string,
    animated: PropTypes.bool,
    duration: PropTypes.number,
  }

  // 构造
    constructor(props) {
      super(props)
      // 初始状态
      this.state = {
        opacity: props.animated ? new Animated.Value(0) : 0,
      }
    }

  componentWillReceiveProps (nextProps) {
    if(this._boxDimension == null && nextProps.containerDimension != null) {
      this._boxDimension = this._getBoxDimension(nextProps.containerDimension)
      this._boxOffset = this._getBoxOffset(this._boxDimension)
      this._shadowOffset = this._getShadowOffset(nextProps.containerDimension, this._boxDimension)
      this._shadowRadius = this._getShadowRadius(this._boxDimension)
    }
    this._toogleBlur(nextProps)
  }

  render() {
      if(this._boxDimension == null) {
        return null
      }
      else {
        return this.props.animated ? (
          <Animated.View
            style={{
              opacity: this.state.opacity,
              position: 'absolute',
              width: this._boxDimension.width,
              height: this._boxDimension.height,
              left: this._boxOffset.x,
              top: this._boxOffset.y,
              borderRadius: this._shadowRadius,
              shadowColor: this.props.shadowColor,
              shadowOpacity: this.props.shadowOpacity,
              shadowOffset: this._shadowOffset,
              shadowRadius: this._shadowRadius,
             }}
          ></Animated.View>
        ) : (
          <View
            style={{
              opacity: this.state.opacity,
              position: 'absolute',
              width: this._boxDimension.width,
              height: this._boxDimension.height,
              left: this._boxOffset.x,
              top: this._boxOffset.y,
              borderRadius: this._shadowRadius,
              shadowColor: this.props.shadowColor,
              shadowOpacity: this.props.shadowOpacity,
              shadowOffset: this._shadowOffset,
              shadowRadius: this._shadowRadius,
             }}
          ></View>
        )
      }
  }

  _getBoxDimension(containerDimension) {
    return {
      //width: textDimension.width,
      width: containerDimension.height,
      height: containerDimension.height,
    }
  }

  _getBoxOffset(boxDimension) {
    return {
      x: -boxDimension.width,
      y: -boxDimension.height,
    }
  }

  _getShadowOffset(containerDimension, boxDimension) {
    return {
      width: containerDimension.width / 2 + boxDimension.width / 2,
      height: containerDimension.height / 2 + boxDimension.height / 2,
    }
  }

  _getShadowRadius(boxDimension) {
    return ( Math.min(boxDimension.width, boxDimension.height) / 2 ) * 0.5
  }

  _toogleBlur = (nextProps) => {
    if(this.props.animated) {
      Animated.timing(
        this.state.opacity,
        {
          toValue: nextProps.show ? 1 : 0,
          duration: nextProps.duration,
        }
      ).start()
    }
    else {
      this.setState({
        opacity: nextProps.show ? 1 : 0,
      })
    }

  }
}


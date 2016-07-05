
import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Animated,
  Easing,
  View,
} from 'react-native'


const DEFAULT_SHADOW_COLOR = '#fff'
const DEFAULT_SHADOW_OPACITY = 1
const DEFAULT_SHADOW_ANIMATED = true
const DEFAULT_SHADOW_DURATION = 150

export default class Blur extends Component {

  static defaultProps = {
    shadowColor: DEFAULT_SHADOW_COLOR,
    shadowOpacity: DEFAULT_SHADOW_OPACITY,
    animated: DEFAULT_SHADOW_ANIMATED,
    duration: DEFAULT_SHADOW_DURATION
  }

  static PropTypes = {
    show: PropTypes.bool,
    textDimension: PropTypes.object,
    containerDimension: PropTypes.object,
    shadowOpacity: PropTypes.number,
    shadowColor: PropTypes.color,
    animated: PropTypes.bool,
    duration: PropTypes.number,
  }

  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
        opacity: props.animated ? new Animated.Value(0) : 0,
      };
    }

  componentWillReceiveProps (nextProps) {
    if(this.boxDimension == null) {
      this.boxDimension = this._getBoxDimension(nextProps.textDimension, nextProps.containerDimension)
      this.boxOffset = this._getBoxOffset(this.boxDimension)
      this.shadowOffset = this._getShadowOffset(nextProps.containerDimension, this.boxDimension)
      this.shadowRadius = this._getShadowRadius(this.boxDimension)
    }
    this._toogleBlur(nextProps)
  }

  render() {
      if(this.boxDimension == null) {
        return null
      }
      else {
        return this.props.animated ? (
          <Animated.View
            style={{
              opacity: this.state.opacity,
              position: 'absolute',
              width: this.boxDimension.width,
              height: this.boxDimension.height,
              left: this.boxOffset.x,
              top: this.boxOffset.y,
              borderRadius: this.shadowRadius,
              shadowColor: this.props.shadowColor,
              shadowOpacity: this.props.shadowOpacity,
              shadowOffset: this.shadowOffset,
              shadowRadius: this.shadowRadius,
             }}
          ></Animated.View>
        ) : (
          <View
            style={{
              opacity: this.state.opacity,
              position: 'absolute',
              width: this.boxDimension.width,
              height: this.boxDimension.height,
              left: this.boxOffset.x,
              top: this.boxOffset.y,
              borderRadius: this.shadowRadius,
              shadowColor: this.props.shadowColor,
              shadowOpacity: this.props.shadowOpacity,
              shadowOffset: this.shadowOffset,
              shadowRadius: this.shadowRadius,
             }}
          ></View>
        )
      }
  }

  //componentDidUpdate() {
  //  this._toogleBlur()
  //}

  _getBoxDimension(textDimension, containerDimension) {
    return {
      width: textDimension.width,
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
    return Math.min(boxDimension.width, boxDimension.height) / 2
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


/*
 * A smart button for react-native apps
 * https://github.com/react-native-component/react-native-smart-button/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */

import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'

import Blur from './blur'

const SYSTEM_OPACITY = 0.2
const TOUCH_TYPE = 'opacity'

export default class Button extends Component {

  static defaultProps = {
    touchableType: TOUCH_TYPE,
    activeOpacity: SYSTEM_OPACITY,
  }

  static PropTypes = {
      testID: PropTypes.string,
      touchableType: PropTypes.string,
      activeOpacity: PropTypes.number,
      underlayColor: PropTypes.color,
      style: PropTypes.style,
      textStyle: PropTypes.style,
      onPressIn: PropTypes.func,
      onPressOut: PropTypes.func,
      onPress: PropTypes.func,
      disabled: PropTypes.bool,
      icon: PropTypes.element,
      badge: PropTypes.element,
      shadowOpacity: PropTypes.number,
      shadowColor: PropTypes.color,
  }

    // 构造
    constructor(props, context) {
      super(props);
      // 初始状态
      this.state = {
         pressIn: false,
      };
    }

  render() {
      let touchableProps = {},
          touchableType = this.props.touchableType
      if(!this.props.disabled) {
        if(this.props.onPress) {
          touchableProps.onPress = this.props.onPress
        }
        if(this.props.onPressIn) {
          touchableProps.onPressIn = this.props.onPressIn
        }
        if(this.props.onPressOut) {
          touchableProps.onPressOut = this.props.onPressOut
        }
      }
      switch (touchableType) {
          case 'highlight':
              touchableProps.activeOpacity = 1
              touchableProps.underlayColor = this.props.underlayColor
              return (
                <TouchableHighlight
                  style={[this.props.style]}
                  {...touchableProps}
                  testID={this.props.testID}>
                  <View>
                    {this.props.icon}
                    <Text style={[styles.text, this.props.disabled ? styles.disabledText : null, this.props.textStyle]}>
                      {this.props.children}
                    </Text>
                    {this.props.badge}
                  </View>
                </TouchableHighlight>
              )
           case 'opacityContent':
             touchableProps.activeOpacity = this.props.activeOpacity
             return (
               <View style={this.props.style}>
                 <TouchableOpacity
                   style={[styles.touchContainer]}
                   {...touchableProps}
                   testID={this.props.testID}>
                   {this.props.icon}
                   <Text style={[styles.text, this.props.disabled ? styles.disabledText : null, this.props.textStyle]}>
                     {this.props.children}
                   </Text>
                   {this.props.badge}
                 </TouchableOpacity>
               </View>
             )
           case 'blur': //experimental feature
             touchableProps.activeOpacity = this.props.activeOpacity
             touchableProps.onPressIn = this._onBlurPressIn
             touchableProps.onPressOut = this._onBlurPressOut
             return (
               <View onLayout={this._onButtonLayout} style={[this.props.style, {position: 'relative', overflow: 'hidden',}]}>
                 <TouchableOpacity
                   style={styles.touchContainer}
                   {...touchableProps}
                   testID={this.props.testID}>
                   {this.props.icon}
                   <Text
                     onLayout={this._onTextLayout}
                     style={[styles.text, this.props.disabled ? styles.disabledText : null, this.props.textStyle]}
                   >
                     {this.props.children}
                   </Text>
                   {this.props.badge}
                 </TouchableOpacity>
                 {this._renderBlur()}
               </View>
             )
           case 'opacity':
           default:
             touchableProps.activeOpacity = this.props.activeOpacity
             return (
                 <TouchableOpacity
                   style={[this.props.style]}
                   {...touchableProps}
                   testID={this.props.testID}>
                   {this.props.icon}
                   <Text style={[styles.text, this.props.disabled ? styles.disabledText : null, this.props.textStyle]}>
                     {this.props.children}
                   </Text>
                   {this.props.badge}
                 </TouchableOpacity>
               )
      }
  }

  _renderBlur() {
      return  (
          <Blur
            show={this.state.pressIn}
            textDimension={this.textDimension}
            containerDimension={this.boxDimension}
            shadowOpacity={this.props.shadowOpacity}
            shadowColor={this.props.shadowColor}
          />
      )
  }

  _onBlurPressIn = (e) => {
      this.setState({
        pressIn: true,
      })
      this.props.onPressIn.call(this, e)
  }

  _onBlurPressOut = (e) => {
    this.setState({
      pressIn: false,
    })
    this.props.onPressOut.call(this, e)
  }

  _onButtonLayout = (e) => {
    this.boxDimension = {
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    }
  }

  _onTextLayout = (e) => {
     this.textDimension = {
       width: e.nativeEvent.layout.width,
       height: e.nativeEvent.layout.height,
     }
  }

}

const styles = StyleSheet.create({
  text: {
    color: '#007aff',
    fontFamily: '.HelveticaNeueInterface-MediumP4',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledText: {
    color: '#dcdcdc',
  },
  touchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
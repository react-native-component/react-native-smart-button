/*
 * A smart button for react-native apps
 * https://github.com/react-native-component/react-native-smart-button/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */

import React, {
  Component,
  PropTypes,
  isValidElement,
} from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'

import Blur from './Blur'

const SYSTEM_OPACITY = 0.2
const TOUCH_TYPE = 'opacity'

export default class Button extends Component {

  static defaultProps = {
    touchableType: TOUCH_TYPE,
    activeOpacity: SYSTEM_OPACITY,
    onPress: () => {},
    onPressIn: () => {},
    onPressOut: () => {},
  }

  static PropTypes = {
      testID: PropTypes.string,
      touchableType: PropTypes.string,
      activeOpacity: PropTypes.number,
      underlayColor: PropTypes.color,
      style: View.propTypes.style,
      textStyle: Text.propTypes.style,
      onPressIn: PropTypes.func,
      onPressOut: PropTypes.func,
      onPress: PropTypes.func,
      disabled: PropTypes.bool,
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
        touchableProps.onPress = this.props.onPress
        touchableProps.onPressIn = this.props.onPressIn
        touchableProps.onPressOut = this.props.onPressOut
      }
      switch (touchableType) {
          case 'highlight':
              touchableProps.activeOpacity = 1
              touchableProps.underlayColor = this.props.underlayColor
              return (
                <TouchableHighlight
                  style={[this.props.style]}
                  {...touchableProps}
                  testID={this.props.testID}
                >
                 {this._renderChildren()}
                </TouchableHighlight>
              )
           case 'opacityContent':
             touchableProps.activeOpacity = this.props.activeOpacity
             return (
               <View style={this.props.style}>
                 <TouchableOpacity
                   style={[styles.touchContainer]}
                   {...touchableProps}
                   testID={this.props.testID}
                 >
                   {this._renderChildren()}
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
                   testID={this.props.testID}
                 >
                   {this._renderChildren()}
                 </TouchableOpacity>
                 {this._renderBlur()}
               </View>
             )
           case 'opacity':
           default:
             touchableProps.activeOpacity = this.props.activeOpacity
             return (
                 <TouchableOpacity
                   style={[this.props.style, ]}
                   {...touchableProps}
                   testID={this.props.testID}
                 >
                   {this._renderChildren()}
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

  _renderChildren() {
     let children = React.Children.map(this.props.children, (child) => {
       if(!React.isValidElement(child)) {
         return (
           <Text
             onLayout={this._onTextLayout}
             style={[styles.text, this.props.disabled ? styles.disabledText : null, this.props.textStyle]}>
             {child}
           </Text>
         )
       }
       return child
     })
     return (
       <View style={styles.contentContainer}>
         {children}
       </View>
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

  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
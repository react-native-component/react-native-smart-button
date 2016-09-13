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

import constants, { touchableTypes, SYSTEM_OPACITY, NOOP, EMPTY_OBJECT } from './constants'
import Blur from './Blur'

export default class Button extends Component {

    static constants = constants

    static defaultProps = {
        touchableType: touchableTypes.fade,
        activeOpacity: SYSTEM_OPACITY,
        loading: false,
        onPress: NOOP,
        onPressIn: NOOP,
        onPressOut: NOOP,
        onLayout: NOOP,
    }

    static propTypes = {
        testID: PropTypes.string,
        touchableType: PropTypes.oneOf([ touchableTypes.highlight, touchableTypes.fadeContent, touchableTypes.blur, touchableTypes.fade, ]),
        activeOpacity: PropTypes.number,
        underlayColor: PropTypes.string,
        style: View.propTypes.style,
        disabledStyle: View.propTypes.style,
        textStyle: Text.propTypes.style,
        disabledTextStyle: Text.propTypes.style,
        onPressIn: PropTypes.func,
        onPressOut: PropTypes.func,
        onPress: PropTypes.func,
        onLayout: PropTypes.func,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        loadingComponent: PropTypes.element,
        shadowOpacity: PropTypes.number,
        shadowColor: PropTypes.string,
    }

    // 构造
    constructor (props, context) {
        super(props)
        // 初始状态
        this.state = {
            pressIn: false,
            disabled: props.disabled,
            loading: props.loading,
        }
        this._boxDimension = EMPTY_OBJECT

    }

    render () {
        let touchableProps = EMPTY_OBJECT,
            touchableType = this.props.touchableType

        touchableProps.onPress = this.props.onPress
        touchableProps.onPressIn = this.props.onPressIn
        touchableProps.onPressOut = this.props.onPressOut

        switch (touchableType) {
            case touchableTypes.highlight:
                touchableProps.activeOpacity = 1
                touchableProps.underlayColor = this.props.underlayColor
                return (
                    <TouchableHighlight
                        onLayout={this.props.onLayout}
                        disabled={this.state.disabled || this.state.loading}
                        style={[this.props.style, this.state.disabled ? this.props.disabledStyle : null,]}
                        {...touchableProps}
                        testID={this.props.testID}
                    >
                        {this._renderChildren()}
                    </TouchableHighlight>
                )
            case touchableTypes.fadeContent:
                touchableProps.activeOpacity = this.props.activeOpacity
                return (
                    <View
                        onLayout={this.props.onLayout}
                        style={[this.props.style, this.state.disabled ? this.props.disabledStyle : null,]}>
                        <TouchableOpacity
                            disabled={this.state.disabled || this.state.loading}
                            style={[styles.touchContainer]}
                            {...touchableProps}
                            testID={this.props.testID}
                        >
                            {this._renderChildren()}
                        </TouchableOpacity>
                    </View>
                )
            case touchableTypes.blur: //experimental feature
                touchableProps.activeOpacity = this.props.activeOpacity
                touchableProps.onPressIn = this._onBlurPressIn
                touchableProps.onPressOut = this._onBlurPressOut
                return (
                    <View
                        onLayout={this._onButtonLayout}
                        style={[ {position: 'relative', overflow: 'hidden',}, this.props.style, this.state.disabled ? this.props.disabledStyle : null, ]}>
                        <TouchableOpacity
                            disabled={this.state.disabled || this.state.loading}
                            style={styles.touchContainer}
                            {...touchableProps}
                            testID={this.props.testID}
                        >
                            {this._renderChildren()}
                        </TouchableOpacity>
                        {this._renderBlur()}
                    </View>
                )
            case touchableTypes.fade:
            default:
                touchableProps.activeOpacity = this.props.activeOpacity
                return (
                    <TouchableOpacity
                        onLayout={this.props.onLayout}
                        disabled={this.state.disabled || this.state.loading}
                        style={[this.props.style, this.state.disabled ? this.props.disabledStyle : null, ]}
                        {...touchableProps}
                        testID={this.props.testID}
                    >
                        {this._renderChildren()}
                    </TouchableOpacity>
                )
        }
    }

    _renderBlur () {
        return (
            <Blur
                show={this.state.pressIn}
                //textDimension={this.textDimension}
                containerDimension={this._boxDimension}
                shadowOpacity={this.props.shadowOpacity}
                shadowColor={this.props.shadowColor}
            />
        )
    }

    _renderChildren () {
        if(this.state.loading) {
            return (
                <View style={styles.contentContainer}>
                    {this.props.loadingComponent}
                </View>
            )
        }
        else {
            let children = React.Children.map(this.props.children, (child) => {
                if (!React.isValidElement(child)) {
                    return (
                        <Text
                            //onLayout={this._onTextLayout}
                            style={[styles.text, this.props.textStyle, this.state.disabled ? (this.props.disabledTextStyle || styles.disabledText) : null, ]}>
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
    }

    _onBlurPressIn = (e) => {
        this.setState({
            pressIn: true,
        })
        this.props.onPressIn(e)
    }

    _onBlurPressOut = (e) => {
        this.setState({
            pressIn: false,
        })
        this.props.onPressOut(e)
    }

    _onButtonLayout = (e) => {
        this._boxDimension = {
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        }
        this.props.onLayout(e)
    }

    //_onTextLayout = (e) => {
    //   this.textDimension = {
    //     width: e.nativeEvent.layout.width,
    //     height: e.nativeEvent.layout.height,
    //   }
    //}

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
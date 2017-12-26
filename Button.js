/*
 * A smart button for react-native apps
 * https://github.com/react-native-component/react-native-smart-button/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */

import React, {
    PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import {
    View,
    ViewPropTypes,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

import constants, {touchableTypes, SYSTEM_OPACITY, NOOP, EMPTY_OBJECT,} from './constants'
import Blur from './Blur'

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
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default class Button extends PureComponent {

    static constants = constants

    static defaultProps = {
        touchableType: touchableTypes.fade,
        activeOpacity: SYSTEM_OPACITY,
        loading: false,
        disabled: false,
        onPress: NOOP,
        onPressIn: NOOP,
        onPressOut: NOOP,
        onLayout: NOOP,
        renderLoadingComponent: NOOP,
    }

    static propTypes = {
        testID: PropTypes.string,
        touchableType: PropTypes.oneOf([
            touchableTypes.highlight,
            touchableTypes.fadeContent,
            touchableTypes.blur,
            touchableTypes.fade,
        ]),
        activeOpacity: PropTypes.number,
        underlayColor: PropTypes.string,
        style: ViewPropTypes.style,
        disabledStyle: ViewPropTypes.style,
        textStyle: Text.propTypes.style,
        disabledTextStyle: Text.propTypes.style,
        onPressIn: PropTypes.func,
        onPressOut: PropTypes.func,
        onPress: PropTypes.func,
        onLayout: PropTypes.func,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        renderLoadingComponent: PropTypes.func,
        shadowOpacity: PropTypes.number,
        shadowColor: PropTypes.string,
    }

    constructor(props) {
        super(props)
        this.state = {
            pressIn: false,
            disabled: props.disabled,
            loading: props.loading,
        }
        this._boxDimension = EMPTY_OBJECT
    }

    render() {
        const touchableProps = EMPTY_OBJECT
        const {touchableType,} = this.props

        touchableProps.onPress = this.props.onPress
        touchableProps.onPressIn = this.props.onPressIn
        touchableProps.onPressOut = this.props.onPressOut

        let renderView = null

        switch (touchableType) {
            case touchableTypes.highlight:
                renderView = this._renderHighlightView(touchableProps)
                break
            case touchableTypes.fadeContent:
                renderView = this._renderFadeContentView(touchableProps)
                break
            case touchableTypes.blur: // experimental feature
                renderView = this._renderBlurView(touchableProps)
                break
            case touchableTypes.fade:
            default:
                renderView = this._renderFadeView(touchableProps)
                break
        }
        return renderView
    }

    componentWillReceiveProps(nextProps) {
        const { disabled: nextDisabled, loading: nextLoading, } = nextProps
        const { disabled, loading, } = this.props
        const newState = {}
        if (nextDisabled !== disabled) {
            newState.disabled = nextDisabled
        } else if (nextLoading !== loading) {
            newState.loading = nextLoading
        }
        if (Object.keys(newState).length > 0) {
            this.setState(newState)
        }
    }

    _renderHighlightView(touchableProps) {
        const reassignedProps = {
            ...touchableProps,
            activeOpacity: 1,
            underlayColor: this.props.underlayColor,
        }
        return (
            <TouchableHighlight
                onLayout={this.props.onLayout}
                disabled={this.state.disabled || this.state.loading}
                style={[
                    this.props.style,
                    this.state.disabled ? this.props.disabledStyle : null,
                ]}
                {...reassignedProps}
                testID={this.props.testID}
            >
                {this._renderChildren()}
            </TouchableHighlight>
        )
    }

    _renderFadeContentView(touchableProps) {
        const reassignedProps = {
            ...touchableProps,
            activeOpacity: this.props.activeOpacity,
        }
        return (
            <View
                onLayout={this.props.onLayout}
                style={[
                    this.props.style,
                    this.state.disabled ? this.props.disabledStyle : null,
                ]}>
                <TouchableOpacity
                    disabled={this.state.disabled || this.state.loading}
                    style={[styles.touchContainer,]}
                    {...reassignedProps}
                    testID={this.props.testID}
                >
                    {this._renderChildren()}
                </TouchableOpacity>
            </View>
        )
    }

    _renderBlurView(touchableProps) {
        const reassignedProps = {
            ...touchableProps,
            activeOpacity: this.props.activeOpacity,
            onPressIn: this._onBlurPressIn,
            onPressOut: this._onBlurPressOut,
        }
        return (
            <View
                onLayout={this._handleButtonLayout}
                style={[
                    {
                        position: 'relative',
                        overflow: 'hidden',
                    },
                    this.props.style,
                    this.state.disabled ? this.props.disabledStyle : null,
                ]}>
                <TouchableOpacity
                    disabled={this.state.disabled || this.state.loading}
                    style={styles.touchContainer}
                    {...reassignedProps}
                    testID={this.props.testID}
                >
                    {this._renderChildren()}
                </TouchableOpacity>
                {this._renderBlur()}
            </View>
        )
    }

    _renderFadeView(touchableProps) {
        const reassignedProps = {
            ...touchableProps,
            activeOpacity: this.props.activeOpacity,
        }
        return (
            <TouchableOpacity
                onLayout={this.props.onLayout}
                disabled={this.state.disabled || this.state.loading}
                style={[
                    this.props.style,
                    this.state.disabled ? this.props.disabledStyle : null,
                ]}
                {...reassignedProps}
                testID={this.props.testID}
            >
                {this._renderChildren()}
            </TouchableOpacity>
        )
    }

    _renderBlur() {
        return (
            <Blur
                show={this.state.pressIn}
                // textDimension={this.textDimension}
                containerDimension={this._boxDimension}
                shadowOpacity={this.props.shadowOpacity}
                shadowColor={this.props.shadowColor}
            />
        )
    }

    _renderChildren() {
        let childView = null
        if (this.state.loading) {
            childView = (
                <View style={styles.contentContainer}>
                    {this.props.renderLoadingComponent()}
                </View>
            )
        } else {
            const children = React.Children.map(this.props.children, (child) => {
                if (!React.isValidElement(child)) {
                    return (
                        <Text
                            // onLayout={this._onTextLayout}
                            style={[
                                styles.text,
                                this.props.textStyle,
                                this.state.disabled ? (this.props.disabledTextStyle || styles.disabledText) : null,
                            ]}>
                            {child}
                        </Text>
                    )
                }
                return child
            })
            childView = (
                <View style={styles.contentContainer}>
                    {children}
                </View>
            )
        }
        return childView
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

    _handleButtonLayout = (e) => {
        this._boxDimension = {
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        }
        this.props.onLayout(e)
    }

    // _onTextLayout = (e) => {
    //    this.textDimension = {
    //      width: e.nativeEvent.layout.width,
    //      height: e.nativeEvent.layout.height,
    //    }
    // }

}

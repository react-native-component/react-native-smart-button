# react-native-smart-button

[![npm](https://img.shields.io/npm/v/react-native-smart-button.svg)](https://www.npmjs.com/package/react-native-smart-button)
[![npm](https://img.shields.io/npm/dm/react-native-smart-button.svg)](https://www.npmjs.com/package/react-native-smart-button)
[![npm](https://img.shields.io/npm/dt/react-native-smart-button.svg)](https://www.npmjs.com/package/react-native-smart-button)
[![npm](https://img.shields.io/npm/l/react-native-smart-button.svg)](https://github.com/react-native-component/react-native-smart-button/blob/master/LICENSE)

A smart button for react-native apps, written in JS for cross-platform support.
It works on iOS and Android.

This component is compatible with React Native 0.25 and newer.

Inspired by [react-native-button][6]

## Preview

![react-native-smart-button-preview-ios][5]
![react-native-smart-button-preview-android][8]

## Installation

```
npm install react-native-smart-button --save
```

## Full Demo

see [ReactNativeComponentDemos][0]

## Usage

Install the package from npm with `npm install react-native-smart-button --save`.
Then, require it from your app's JavaScript files with `import Button from 'react-native-smart-button'`.

If you need use badge button, Install the badge from npm with `npm install react-native-smart-badge --save`.
Then, require it from your app's JavaScript files with `import Badge from 'react-native-smart-badge'`.

```js
import React, {Component} from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    Image,
    Text,
    ActivityIndicator,
    ActivityIndicatorIOS,
    ProgressBarAndroid,
    Platform,
} from 'react-native'

import TimerEnhance from 'react-native-smart-timer-enhance'
import Button from 'react-native-smart-button'
import image_liking from '../images/liking.png'
import Badge from 'react-native-smart-badge'

const styles = StyleSheet.create({
    buttonStyle: {
        margin: 10,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 3,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'red',
        justifyContent: 'center',
    },
    buttonTextStyle: {
        fontSize: 17,
        color: 'white'
    },
    buttonDisabledStyle: {
        backgroundColor: '#DDDDDD',
        borderWidth: 0,
    },
    buttonDisabledTextStyle: {
        color: '#BCBCBC',
    },
});

class AllButton extends Component {

    // 构造
    constructor (props) {
        super(props)
        // 初始状态
        this.state = {
            btn_1_loading: false,
            btn_2_loading: false,
            btn_3_loading: false,
            btn_1_disabled: false,
            btn_2_disabled: false,
            btn_3_disabled: false,
        }
    }

    render () {
        return (
            <ScrollView style={{flex: 1, marginTop: 20 + 44, }}>

                <Button
                    disabled={true}
                    style={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}
                    disabledStyle={styles.buttonDisabledStyle}
                    disabledTextStyle={styles.buttonDisabledTextStyle}>
                    disabled (按钮禁用)
                </Button>

                <Button
                    style={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}>
                    opacity all (按钮透明)
                </Button>

                <Button
                    touchableType={Button.constants.touchableTypes.fadeContent}
                    style={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}>
                    opacity content (内容透明)
                </Button>

                <Button
                    touchableType={Button.constants.touchableTypes.highlight}
                    underlayColor={'#C90000'}
                    style={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}>
                    highlight (背景高亮)
                </Button>

                <Button
                    touchableType={Button.constants.touchableTypes.blur}
                    style={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}>
                    blur for ios (模糊阴影)
                </Button>

                <Button
                    loading={this.state.btn_1_loading}
                    disabled={this.state.btn_1_disabled}
                    touchableType={Button.constants.touchableTypes.fade}
                    style={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}
                    renderLoadingComponent={this._renderLoadingComponent_1}
                    onPress={this._handlePress_1}>
                    loading (加载器)
                </Button>

                <Button
                    loading={this.state.btn_2_loading}
                    disabled={this.state.btn_2_disabled}
                    touchableType={Button.constants.touchableTypes.fadeContent}
                    style={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}
                    renderLoadingComponent={this._renderLoadingComponent_2}
                    onPress={this._handlePress_2}>
                    loading (加载器+文字)
                </Button>

                <Button
                    touchableType={Button.constants.touchableTypes.highlight}
                    underlayColor={'#C90000'}
                    style={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}>
                    <Image source={image_liking} style={{width: 40, height: 40, marginRight: 3, }}/>
                    icon (图标)
                </Button>

                <Button
                    touchableType={Button.constants.touchableTypes.blur}
                    style={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}>
                    badge (徽章)
                    <Badge
                        style={{ backgroundColor: '#00AAEF', marginLeft: 6, }}
                        textStyle={{ color: '#fff', fontSize: 12, }}>
                        8
                    </Badge>
                </Button>

            </ScrollView>
        )
    }

    _handlePress_1 = () => {
        this.setState({
            btn_1_loading: true,
            // btn_1_disabled: true,
        })
        this.setTimeout(() => {
            this.setState({
                btn_1_loading: false,
                // btn_1_disabled: false
            })
        }, 3000)
    }

    _handlePress_2 = () => {
        this.setState({
            btn_2_loading: true,
            // btn_2_disabled: true,
        })
        this.setTimeout(() => {
            this.setState({
                btn_2_loading: false,
                // btn_2_disabled: false
            })
        }, 3000)
    }

    _renderLoadingComponent_1 = () => {
        return this._renderActivityIndicator()
    }

    _renderLoadingComponent_2 = () => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {this._renderActivityIndicator()}
                <Text style={{
                    fontSize: 17,
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily: '.HelveticaNeueInterface-MediumP4',
                }}>loading</Text>
            </View>
        )
    }

    _renderActivityIndicator() {
        return ActivityIndicator ? (
            <ActivityIndicator
                style={{margin: 10,}}
                animating={true}
                color={'#fff'}
                size={'small'}/>
        ) : Platform.OS == 'android' ?
            (
                <ProgressBarAndroid
                    style={{margin: 10,}}
                    color={'#fff'}
                    styleAttr={'Small'}/>

            ) :  (
            <ActivityIndicatorIOS
                style={{margin: 10,}}
                animating={true}
                color={'#fff'}
                size={'small'}/>
        )


    }

}

export default TimerEnhance(AllButton)
```

## Props

Prop                    | Type   | Optional | Default        | Description
----------------------- | ------ | -------- | -------------- | -----------
touchableType           | string | Yes      | constants.fade | determines what kind of style of the button should be when touch is active.
activeOpacity           | number | Yes      | 0.2            | see [react-native documents][1]
underlayColor           | color  | Yes      |                | see [react-native documents][1]
style                   | style  | Yes      |                | see [react-native documents][2]
textStyle               | style  | Yes      |                | see [react-native documents][7]
disabledStyle           | style  | Yes      |                | see [react-native documents][2]
disabledTextStyle       | style  | Yes      |                | see [react-native documents][7]
onPressIn               | func   | Yes      |                | see [react-native documents][3]
onPressOut              | func   | Yes      |                | see [react-native documents][3]
onPress                 | func   | Yes      |                | see [react-native documents][3]
onLayout                | func   | Yes      |                | see [react-native documents][3]
disabled                | bool   | Yes      |                | see [react-native documents][3]
loading                 | bool   | Yes      | false          | determines the loading status of the button
renderLoadingComponent  | func   | Yes      |                | determines render function which return the presentation to replaces the content when loading status of the button is true
shadowOpacity           | number | Yes      | 1              | see [react-native documents][4]
shadowColor             | color  | Yes      | '#fff'         | see [react-native documents][4]

[0]: https://github.com/cyqresig/ReactNativeComponentDemos
[1]: https://facebook.github.io/react-native/docs/touchablehighlight.html
[2]: https://facebook.github.io/react-native/docs/style.html
[3]: https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html#props
[4]: https://facebook.github.io/react-native/docs/shadowproptypesios.html
[5]: http://cyqresig.github.io/img/react-native-smart-button-preview-ios-v1.3.0.gif
[6]: https://github.com/ide/react-native-button
[7]: http://facebook.github.io/react-native/docs/text.html#style
[8]: http://cyqresig.github.io/img/react-native-smart-button-preview-android-v1.3.0.gif

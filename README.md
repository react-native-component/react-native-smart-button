# react-native-smart-button
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

Install the button from npm with `npm install react-native-smart-button --save`.
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

class AllButton extends Component {

    // 构造
    constructor (props) {
        super(props)
        // 初始状态
        this.state = {}
    }

    render () {
        return (
            <ScrollView style={{flex: 1, marginTop: 20 + 44, }}>

                <Button
                    disabled={true}
                    style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                    disabledStyle={{backgroundColor: '#DDDDDD', borderWidth: 0,}}
                    disabledTextStyle={{color: '#BCBCBC'}}
                >
                    disabled (按钮禁用)
                </Button>

                <Button
                    style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                >
                    opacity all (按钮透明)
                </Button>

                <Button
                    touchableType={Button.constants.touchableTypes.fadeContent}
                    style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                >
                    opacity content (内容透明)
                </Button>

                <Button
                    touchableType={Button.constants.touchableTypes.highlight}
                    underlayColor={'#C90000'}
                    style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                >
                    highlight (背景高亮)
                </Button>

                <Button
                    touchableType={Button.constants.touchableTypes.blur}
                    style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17,  color: 'white'}}

                >
                    blur for ios (模糊阴影)
                </Button>

                <Button
                    ref={ component => this._button_1 = component }
                    touchableType={Button.constants.touchableTypes.fade}
                    style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                    loadingComponent={
                        this._renderActivityIndicator()
                    }
                    onPress={ () => {
                        this._button_1.setState({
                            loading: true,
                            //disabled: true,
                        })
                        this.setTimeout( () => {
                            this._button_1.setState({
                                loading: false,
                                //disabled: false
                            })
                        }, 3000)
                    }}>
                    loading (加载器)
                </Button>

                <Button
                    ref={ component => this._button_2 = component }
                    touchableType={Button.constants.touchableTypes.fadeContent}
                    style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                    loadingComponent={
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                {this._renderActivityIndicator()}
                                <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold', fontFamily: '.HelveticaNeueInterface-MediumP4',}}>loading</Text>
                            </View>
                    }
                    onPress={ () => {
                        this._button_2.setState({
                            loading: true,
                            //disabled: true,
                        })
                        this.setTimeout( () => {
                            this._button_2.setState({
                                loading: false,
                                //disabled: false
                            })
                        }, 3000)
                    }}>
                    loading (加载器+文字)
                </Button>

                <Button
                    touchableType={Button.constants.touchableTypes.highlight}
                    underlayColor={'#C90000'}
                    style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                >
                    <Image source={image_liking} style={{width: 40, height: 40, marginRight: 3, }}/>
                    icon (图标)
                </Button>

                <Button
                    touchableType={Button.constants.touchableTypes.blur}
                    style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17,  color: 'white'}}
                >
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

Prop              | Type   | Optional | Default        | Description
----------------  | ------ | -------- | -------------- | -----------
touchableType     | string | Yes      | constants.fade | determines what kind of style of the button should be when touch is active.
activeOpacity     | number | Yes      | 0.2            | see [react-native documents][1]
underlayColor     | color  | Yes      |                | see [react-native documents][1]
style             | style  | Yes      |                | see [react-native documents][2]
textStyle         | style  | Yes      |                | see [react-native documents][7]
disabledStyle     | style  | Yes      |                | see [react-native documents][2]
disabledTextStyle | style  | Yes      |                | see [react-native documents][7]
onPressIn         | func   | Yes      |                | see [react-native documents][3]
onPressOut        | func   | Yes      |                | see [react-native documents][3]
onPress           | func   | Yes      |                | see [react-native documents][3]
onLayout          | func   | Yes      |                | see [react-native documents][3]
disabled          | bool   | Yes      |                | see [react-native documents][3]
loading           | bool   | Yes      | false          | determines the loading status of the button
loadingComponent  | element| Yes      |                | determines the presentation which replaces the content when loading status of the button is true
shadowOpacity     | number | Yes      | 1              | see [react-native documents][4]
shadowColor       | color  | Yes      | '#fff'         | see [react-native documents][4]

[0]: https://github.com/cyqresig/ReactNativeComponentDemos
[1]: https://facebook.github.io/react-native/docs/touchablehighlight.html
[2]: https://facebook.github.io/react-native/docs/style.html
[3]: https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html#props
[4]: https://facebook.github.io/react-native/docs/shadowproptypesios.html
[5]: http://cyqresig.github.io/img/react-native-smart-button-preview-ios-v1.3.0.gif
[6]: https://github.com/ide/react-native-button
[7]: http://facebook.github.io/react-native/docs/text.html#style
[8]: http://cyqresig.github.io/img/react-native-smart-button-preview-android-v1.3.0.gif
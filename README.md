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
 } from 'react-native'

 import Button from 'react-native-smart-button'
 import image_liking from '../images/liking.png'
 import Badge from 'react-native-smart-badge'

 export default class AllButton extends Component {

   render() {
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
           touchableType={'opacityContent'}
           style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
           textStyle={{fontSize: 17, color: 'white'}}
         >
           opacity content (内容透明)
         </Button>

         <Button
           touchableType={'highlight'}
           underlayColor={'#C90000'}
           style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
           textStyle={{fontSize: 17, color: 'white'}}
         >
           highlight (背景高亮)
         </Button>

         <Button
           touchableType={'blur'}
           style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
           textStyle={{fontSize: 17,  color: 'white'}}

         >
           blur for ios (模糊阴影)
         </Button>

         <Button
           touchableType={'opacity'}
           style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
           textStyle={{fontSize: 17, color: 'white'}}
         >
           <Image source={image_liking} style={{width: 40, height: 40, marginRight: 3, }}/>
           icon1
         </Button>

         <Button
           touchableType={'opacityContent'}
           style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
           textStyle={{fontSize: 17, color: 'white'}}
         >
           <Image source={image_liking} style={{width: 40, height: 40, marginRight: 3, }}/>
           icon2
         </Button>

         <Button
           touchableType={'highlight'}
           underlayColor={'#C90000'}
           style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
           textStyle={{fontSize: 17, color: 'white'}}
         >
           badge1
           <Badge
             style={{ backgroundColor: '#00AAEF', marginLeft: 6, }}
             textStyle={{ color: '#fff', fontSize: 12, }}>
             8
           </Badge>
         </Button>

         <Button
           touchableType={'blur'}
           style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
           textStyle={{fontSize: 17,  color: 'white'}}
         >
           badge2
           <Badge
             style={{ backgroundColor: '#00AAEF', marginLeft: 6, }}
             textStyle={{ color: '#fff', fontSize: 12, }}>
             18
           </Badge>
         </Button>

       </ScrollView>
     )
   }

 }
```

## Props

Prop              | Type   | Optional | Default   | Description
----------------  | ------ | -------- | --------- | -----------
touchableType     | string | Yes      | 'opacity' | determines what kind of style of the button should be when touch is active.
activeOpacity     | number | Yes      | 0.2       | see [react-native documents][1]
underlayColor     | color  | Yes      |           | see [react-native documents][1]
style             | style  | Yes      |           | see [react-native documents][2]
textStyle         | style  | Yes      |           | see [react-native documents][7]
disabledStyle     | style  | Yes      |           | see [react-native documents][2]
disabledTextStyle | style  | Yes      |           | see [react-native documents][7]
onPressIn         | func   | Yes      |           | see [react-native documents][3]
onPressOut        | func   | Yes      |           | see [react-native documents][3]
onPress           | func   | Yes      |           | see [react-native documents][3]
disabled          | bool   | Yes      |           | see [react-native documents][3]
shadowOpacity     | number | Yes      | 1         | see [react-native documents][4]
shadowColor       | color  | Yes      | '#fff'    | see [react-native documents][4]

[1]: https://facebook.github.io/react-native/docs/touchablehighlight.html
[2]: https://facebook.github.io/react-native/docs/style.html
[3]: https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html#props
[4]: https://facebook.github.io/react-native/docs/shadowproptypesios.html
[5]: http://cyqresig.github.io/img/react-native-smart-button-preview-ios-v1.2.1.gif
[6]: https://github.com/ide/react-native-button
[7]: http://facebook.github.io/react-native/docs/text.html#style
[8]: http://cyqresig.github.io/img/react-native-smart-button-preview-android-v1.2.1.gif
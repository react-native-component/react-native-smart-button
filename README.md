# react-native-smart-button
A smart button for react-native apps, written in JS for cross-platform support.
It works on iOS and Android.

This component is compatible with React Native 0.25 and newer.

Inspired by [react-native-button][6]

## Preview

![react-native-smart-button-preview][5]

## Installation

```
npm install @react-native-component/react-native-smart-button --save
```

## Usage

Install the button from npm with `npm install @react-native-component/react-native-smart-button --save`.
Then, require it from your app's JavaScript files with `import Button from '@react-native-component/react-native-smart-button'`.

```js
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
  underlayColor={'#C90000'}
  style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
  textStyle={{fontSize: 17,  color: 'white'}}

>
  blur for ios (模糊阴影)
</Button>
```

## Props

Prop            | Type   | Optional | Default   | Description
--------------- | ------ | -------- | --------- | -----------
touchableType   | string | Yes      | 'opacity' | determines what kind of style of the button should be when touch is active.
activeOpacity   | number | Yes      | 0.2       | see [react-native documents][1]
underlayColor   | color  | Yes      |           | see [react-native documents][1]
style           | style  | Yes      |           | see [react-native documents][2]
onPressIn       | func   | Yes      |           | see [react-native documents][3]
onPressOut      | func   | Yes      |           | see [react-native documents][3]
onPress         | func   | Yes      |           | see [react-native documents][3]
disabled        | bool   | Yes      |           | see [react-native documents][3]
shadowOpacity   | number | Yes      | 1         | see [react-native documents][4]
shadowColor     | color  | Yes      | '#fff'    | see [react-native documents][4]

[1]: https://facebook.github.io/react-native/docs/touchablehighlight.html
[2]: https://facebook.github.io/react-native/docs/style.html
[3]: https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html#props
[4]: https://facebook.github.io/react-native/docs/shadowproptypesios.html
[5]: http://cyqresig.github.io/img/react-native-smart-button-preview.gif
[6]: https://github.com/ide/react-native-button
# react-native-orzhtml-htmlview
A React Native component which renders HTML content as native views

![](https://raw.githubusercontent.com/orzhtml/react-native-orzhtml-htmlview/master/screenshots/1.gif)


## Install

`npm install react-native-orzhtml-htmlview --save` or `yarn add react-native-orzhtml-htmlview`

`npm install react-native-video --save` or `yarn add react-native-video`

**For React Native 0.60.0 or higher.**

`npm install react-native-fast-image --save` or `yarn add react-native-fast-image`

**For React Native <= 0.59.x use version 6.1.1 or lower**

`npm install react-native-fast-image@6.1.1 --save` or `yarn add react-native-fast-image@6.1.1`

## Mostly automatic installation

```
react-native link react-native-video

react-native link react-native-fast-image
```

## Example
In the react-native-orzhtml-htmlview package directory:


```
cd example

npm install or yarn

react-native link
```

To run example on iOS:

`react-native run-ios`

To run example on Android:

`react-native run-android`

## Props

Prop | Description | Type | Required/Default
------ | ------ | ------ | ------
`onError`|错误|`func`|`console.error.bind(console)`
`RootComponent`|根组件|`func`|`element => <View {...element} />`
`style`|父容器样式|`style`
`stylesheet`|html标签样式|`object`
`html`|html|`string`
`fontSize`|字体大小|`string`|`normal`
`imagesMaxWidth`|图片最大宽度|`number`|`Dimensions.get('window').width`
`popover`|长按文本段落显示pop|`array`|`[]`
`onImagePress`|点击图片|`func`|`() => {}`
`onLongPress`|长按文本段落|`func`|`() => {}`
`onMarkPress`|点击标记|`func`|`() => {}`
`debug`|调试模式|`bool`|`false`
`globalColor`|默认字体样式|`string`|`#222`



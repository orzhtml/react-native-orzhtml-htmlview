# react-native-orzhtml-htmlview

A React Native component which renders HTML content as native views。
Welcome everybody fork！！！

## screenshots

![](https://raw.githubusercontent.com/orzhtml/react-native-orzhtml-htmlview/master/screenshots/1.gif)


## Install

`npm install react-native-orzhtml-htmlview --save` or `yarn add react-native-orzhtml-htmlview`

**For React Native 0.60.0 or higher.**

`npm install react-native-fast-image --save` or `yarn add react-native-fast-image`

`npm install teaset --save` or `yarn add teaset`

**For React Native <= 0.59.x use version 6.1.1 or lower**

`npm install react-native-fast-image@6.1.1 --save` or `yarn add react-native-fast-image@6.1.1`

`npm install teaset@0.6.3 --save` or `yarn add teaset@0.6.3`

## Mostly automatic installation

```
react-native link react-native-fast-image
```

## Example

In the react-native-orzhtml-htmlview package directory:

```
cd example

npm install // or yarn

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
`globalColor`|默认字体样式|`string`|`#222`
`style`|父容器样式|`style`
`stylesheet`|html标签样式|`object`
`html`|html|`string`
`fontSize`|字体大小|`string`|`normal`
`imagesMaxWidth`|图片最大宽度|`number`|`Dimensions.get('window').width`
`popover`|长按文本段落显示pop|`array`|`[]`
`onImagePress`|点击图片|`func`|`() => {}`
`onLongPress`|长按文本段落|`func`|`() => {}`
`onMarkPress`|点击标记|`func`|`() => {}`
`onVideoPlay`|点击视频回调|`func`|`() => {} / 返回视频 url 地址`
`errorImgSource`|图片加载失败|`object`|`{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png' }`
`debug`|调试模式|`bool`|`false`

## 说明

当前 v2.0.0 版本已经移除 video 组件，文章需要显示 video，只会显示 video 的 poster 图片，点击视频播放按钮，会返回视频的 url，在 example 里面有对应的例子。

需要在文章内直接播放视频，请安装 v1.0.11 版本。
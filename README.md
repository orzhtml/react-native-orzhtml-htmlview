# react-native-orzhtml-htmlview
A React Native component which renders HTML content as native views

## Install

`npm install react-native-orzhtml-htmlview --save
npm install react-native-video --save`

or

`yarn add react-native-orzhtml-htmlview
yarn add react-native-video`

## Mostly automatic installation

`react-native link react-native-video`

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



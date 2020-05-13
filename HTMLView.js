import React from 'react'
import { Dimensions, StyleSheet, View, ViewPropTypes, Platform } from 'react-native'
import PropTypes from 'prop-types'

import { setSpText, scaleSize } from './libs/SetSize'
import HtmlToElement from './HtmlToElement'

const boldStyle = { fontWeight: 'bold' }
const italicStyle = { fontStyle: 'italic' }
const underlineStyle = { textDecorationLine: 'underline' }
const strikethroughStyle = { textDecorationLine: 'line-through' }
const fontSize = 'normal' // 最小(smallest)、小(small)、正常(normal)、大(big)、最大(largest)
const imagesMaxWidth = Dimensions.get('window').width
const codeStyle = { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' }

class HtmlView extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      ...props,
      styles: {
        ...baseStyles,
        ...props.htmlStyles
      }
    }
  }

  componentDidMount () {
    this.mounted = true
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (
      this.state.html !== nextProps.html ||
      this.state.fontSize !== nextProps.fontSize
    ) {
      this.setState({
        ...nextProps,
        styles: {
          ...baseStyles,
          ...nextProps.htmlStyles
        }
      })
    }
  }

  componentWillUnmount () {
    this.mounted = false
  }

  render () {
    const { RootComponent, style } = this.props || {}
    const { html, styles, fontSize } = this.state
    if (html) {
      return (
        <HtmlToElement {...this.props} html={html} fontSize={fontSize} styles={styles} />
      )
    }
    return (<RootComponent style={style} />)
  }
}

HtmlView.propTypes = {
  onError: PropTypes.func,
  RootComponent: PropTypes.func,
  style: ViewPropTypes.style,
  htmlStyles: PropTypes.object,
  html: PropTypes.string,
  fontSize: PropTypes.string,
  imagesMaxWidth: PropTypes.number,
  globalColor: PropTypes.string,
  popover: PropTypes.array,
  onImagePress: PropTypes.func,
  onLongPress: PropTypes.func,
  onMarkPress: PropTypes.func,
  onVideoPlay: PropTypes.func,
  errorImgSource: PropTypes.object,
  videoBg: PropTypes.object,
  debug: PropTypes.bool
}

HtmlView.defaultProps = {
  onError: console.error.bind(console),
  // eslint-disable-next-line react/display-name
  RootComponent: element => <View {...element} />,
  html: '',
  fontSize: fontSize,
  imagesMaxWidth: imagesMaxWidth,
  globalColor: '#222',
  popover: [],
  onImagePress: () => {},
  onLongPress: () => {},
  onMarkPress: () => {},
  onVideoPlay: () => {},
  errorImgSource: { uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png' },
  videoBg: null,
  debug: false
}

// 以后做标签样式对照表
const baseStyles = StyleSheet.create({
  b: boldStyle,
  i: italicStyle,
  em: italicStyle,
  u: underlineStyle,
  s: strikethroughStyle,
  strong: boldStyle,
  span: { fontWeight: 'normal' },
  pre: codeStyle,
  code: codeStyle,
  a: { fontWeight: 'normal' },
  h1: { fontWeight: 'bold', fontSize: setSpText(28), lineHeight: scaleSize(34) },
  h2: { fontWeight: 'bold', fontSize: setSpText(24), lineHeight: scaleSize(30) },
  h3: { fontWeight: 'bold', fontSize: setSpText(20), lineHeight: scaleSize(26) },
  h4: { fontWeight: 'bold', fontSize: setSpText(16), lineHeight: scaleSize(24) },
  h5: { fontWeight: 'bold', fontSize: setSpText(14), lineHeight: scaleSize(22) },
  h6: { fontWeight: 'bold', fontSize: setSpText(12), lineHeight: scaleSize(20) },
  video: { minHeight: 260 },
  ul: {},
  ol: {},
  li: {},
  table: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#333'
  },
  caption: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: scaleSize(5),
    paddingVertical: scaleSize(3),
    fontSize: setSpText(14)
  },
  thead: {
  },
  tbody: {
  },
  tfoot: {
  },
  tr: {
  },
  th: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleSize(5),
    paddingVertical: scaleSize(3)
  },
  td: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
    paddingHorizontal: scaleSize(5),
    paddingVertical: scaleSize(3)
  },
  thTxt: {
    fontSize: setSpText(14),
    fontWeight: 'bold'
  },
  tdTxt: {
    fontSize: setSpText(12)
  },
  mt: {
    marginTop: scaleSize(10)
  },
  mb: {
    marginBottom: scaleSize(30)
  },
  smallest: {
    fontSize: setSpText(16),
    lineHeight: scaleSize(23),
    textAlign: 'justify',
    letterSpacing: 1
  },
  small: {
    fontSize: setSpText(17),
    lineHeight: scaleSize(25),
    textAlign: 'justify',
    letterSpacing: 1
  },
  normal: {
    fontSize: setSpText(18),
    lineHeight: scaleSize(27),
    textAlign: 'justify',
    letterSpacing: 1
  },
  big: {
    fontSize: setSpText(19),
    lineHeight: scaleSize(28.5),
    textAlign: 'justify',
    letterSpacing: 1
  },
  largest: {
    fontSize: setSpText(20),
    lineHeight: scaleSize(30),
    textAlign: 'justify',
    letterSpacing: 1
  }
})

export default HtmlView

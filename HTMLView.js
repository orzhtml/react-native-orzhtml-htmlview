import React from 'react'
import { Dimensions, StyleSheet, View, ViewPropTypes, Platform } from 'react-native'
import PropTypes from 'prop-types'

import htmlToElement from './htmlToElement'
import { setSpText, scaleSize } from './libs/SetSize'

const boldStyle = { fontWeight: 'bold' }
const italicStyle = { fontStyle: 'italic' }
const underlineStyle = { textDecorationLine: 'underline' }
const strikethroughStyle = { textDecorationLine: 'line-through' }
const fontSize = 'normal' // 最小(smallest)、小(small)、正常(normal)、大(big)、最大(largest)
const imagesMaxWidth = Dimensions.get('window').width
const codeStyle = { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' }
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

class HtmlView extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      element: null
    }
  }

  componentDidMount () {
    this.mounted = true
    const { html, fontSize, globalColor } = this.props
    this.startHtmlRender({
      html,
      globalColor,
      size: fontSize
    })
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (
      this.props.html !== nextProps.html ||
      this.props.stylesheet !== nextProps.stylesheet ||
      this.props.fontSize !== nextProps.fontSize ||
      this.props.globalColor !== nextProps.globalColor
    ) {
      this.startHtmlRender({
        html: nextProps.html,
        style: nextProps.stylesheet,
        size: nextProps.fontSize,
        globalColor: nextProps.globalColor
      })
    }
  }

  componentWillUnmount () {
    this.mounted = false
  }

  startHtmlRender = ({ html, style, size, globalColor }) => {
    const {
      stylesheet,
      onError,
      imagesMaxWidth,
      popover,
      onImagePress,
      onLongPress,
      onMarkPress,
      debug
    } = this.props

    if (!html) {
      this.setState({ element: null })
    }

    const opts = {
      styles: { ...baseStyles, ...stylesheet, ...style },
      size: size,
      imgMaxW: imagesMaxWidth,
      popover,
      onImagePress,
      onLongPress,
      onMarkPress,
      debug,
      globalColor
    }

    htmlToElement(html, opts, (err, element) => {
      if (err) {
        onError(err)
      }

      if (this.mounted) {
        this.setState({ element })
      }
    })
  };

  render () {
    const { RootComponent, style } = this.props || {}
    const { element } = this.state

    if (element) {
      return <RootComponent style={style}>{element}</RootComponent>
    }
    return <RootComponent style={style} />
  }
}

HtmlView.propTypes = {
  onError: PropTypes.func,
  RootComponent: PropTypes.func,
  style: ViewPropTypes.style,
  stylesheet: PropTypes.object,
  html: PropTypes.string,
  fontSize: PropTypes.string,
  imagesMaxWidth: PropTypes.number,
  popover: PropTypes.array,
  onImagePress: PropTypes.func,
  onLongPress: PropTypes.func,
  onMarkPress: PropTypes.func,
  debug: PropTypes.bool,
  globalColor: PropTypes.string
}

HtmlView.defaultProps = {
  onError: console.error.bind(console),
  // eslint-disable-next-line react/display-name
  RootComponent: element => <View {...element} />,
  fontSize: fontSize,
  imagesMaxWidth: imagesMaxWidth,
  popover: [],
  onImagePress: () => {},
  onLongPress: () => {},
  onMarkPress: () => {},
  debug: false,
  globalColor: '#222'
}

export default HtmlView

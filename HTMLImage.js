import React, { PureComponent } from 'react'
import { Image, View } from 'react-native'
import PropTypes from 'prop-types'

import { CustomImage } from './widget'

export default class HTMLImage extends PureComponent {
  static propTypes = {
    source: PropTypes.object.isRequired,
    alt: PropTypes.string,
    style: Image.propTypes.style,
    errorImgSource: PropTypes.object,
    imagesMaxWidth: PropTypes.number,
    imagesInitialDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  };

  static defaultProps = {
    imagesInitialDimensions: {
      width: 100,
      height: 100
    }
  };

  constructor (props) {
    super(props)
    this.state = {
      width: props.imagesInitialDimensions.width,
      height: props.imagesInitialDimensions.height,
      indeterminate: !props.style || !props.style.width || !props.style.height
    }
  }

  componentDidMount () {
    this.getImageSize()
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.getImageSize(nextProps)
  }

  get errorImage () {
    const { imagesMaxWidth, errorImgSource } = this.props
    return (
      <Image
        style={{
          width: imagesMaxWidth,
          height: imagesMaxWidth * 9 / 16
        }}
        source={errorImgSource}
      />
    )
  }

  get placeholderImage () {
    return (
      <View
        style={{
          width: this.props.imagesInitialDimensions.width,
          height: this.props.imagesInitialDimensions.height
        }}
      />
    )
  }

  getDimensionsFromStyle = (style, height, width) => {
    let styleWidth
    let styleHeight

    if (height) {
      styleHeight = height
    }
    if (width) {
      styleWidth = width
    }
    if (Array.isArray(style)) {
      style.forEach(styles => {
        if (!width && styles['width']) {
          styleWidth = styles['width']
        }
        if (!height && styles['height']) {
          styleHeight = styles['height']
        }
      })
    } else {
      if (!width && style['width']) {
        styleWidth = style['width']
      }
      if (!height && style['height']) {
        styleHeight = style['height']
      }
    }

    return { styleWidth, styleHeight }
  };

  getImageSize = (props = this.props) => {
    const { source, imagesMaxWidth } = props
    // Fetch image dimensions only if they aren't supplied or if with or height is missing
    Image.getSize(
      source.uri,
      (originalWidth, originalHeight) => {
        if (originalWidth === 0 || originalHeight === 0) {
          return this.setState({ error: true })
        }
        if (!imagesMaxWidth) {
          return this.setState({
            width: originalWidth,
            height: originalHeight
          })
        }
        const optimalWidth = originalWidth === 0 ? 0 : imagesMaxWidth <= originalWidth ? imagesMaxWidth : originalWidth
        const optimalHeight = originalHeight === 0 ? 0 : (optimalWidth * originalHeight) / originalWidth

        this.setState({
          width: optimalWidth,
          height: optimalHeight,
          indeterminate: false,
          error: false
        })
      },
      () => {
        this.setState({ error: true })
      }
    )
  };

  validImage = (
    source,
    style,
    onLoad,
    onLoadEnd,
    errorImgSource
  ) => {
    return (
      <CustomImage
        source={source}
        resizeMode='cover'
        style={[
          style,
          {
            width: this.state.width,
            height: this.state.height
          }
        ]}
        onLoad={onLoad}
        onLoadEnd={onLoadEnd}
        errorImgSource={errorImgSource}
      />
    )
  };

  render () {
    const { source, style, onLoad, onLoadEnd, errorImgSource } = this.props
    if (this.state.error) {
      return this.errorImage
    }
    if (this.state.indeterminate) {
      return this.placeholderImage
    }
    return this.validImage(source, style, onLoad, onLoadEnd, errorImgSource)
  }
}

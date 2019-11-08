import React, { PureComponent } from 'react'
import { Image, View, Text } from 'react-native'
import PropTypes from 'prop-types'

import { CustomImage } from './widget'

export default class HTMLImage extends PureComponent {
  static propTypes = {
    source: PropTypes.object.isRequired,
    alt: PropTypes.string,
    style: Image.propTypes.style,
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

  componentWillReceiveProps (nextProps) {
    this.getImageSize(nextProps)
  }

  get errorImage () {
    return (
      <View
        style={{
          width: 50,
          height: 50,
          borderWidth: 1,
          borderColor: 'lightgray',
          overflow: 'hidden',
          justifyContent: 'center'
        }}
      >
        {this.props.alt ? (
          <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>
            {this.props.alt}
          </Text>
        ) : (
          false
        )}
      </View>
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
        if (!imagesMaxWidth) {
          return this.setState({
            width: originalWidth,
            height: originalHeight
          })
        }
        const optimalWidth =
          imagesMaxWidth <= originalWidth ? imagesMaxWidth : originalWidth
        const optimalHeight = (optimalWidth * originalHeight) / originalWidth
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
    onLoadEnd
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
      />
    )
  };

  render () {
    const { source, style, onLoad, onLoadEnd, imagesMaxWidth } = this.props
    if (this.state.error) {
      return this.errorImage
    }
    if (this.state.indeterminate) {
      return this.placeholderImage
    }
    return this.validImage(source, style, onLoad, onLoadEnd)
  }
}

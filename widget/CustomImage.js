import React from 'react'

import FastImage from 'react-native-fast-image'

class Image extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imageLoading: true
    }
  }

  imageLoadError = () => {
    console.log('onError')
    this.setState({ imageLoading: false })
    this.props.onError && this.props.onError()
  }

  render () {
    let { source, errorImgSource } = this.props
    const { style, resizeMode } = this.props
    const { imageLoading } = this.state
    source = imageLoading ? source : errorImgSource

    return (
      <FastImage
        {...this.props}
        style={style}
        source={source}
        resizeMode={imageLoading ? resizeMode : 'contain'}
        onError={this.imageLoadError}
      />
    )
  }
}

export default Image

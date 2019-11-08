import React from 'react'

import FastImage from 'react-native-fast-image'
import { StyleSheet } from 'react-native'

class Image extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imageLoading: true
    }
    this.errorImgUrl = 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png'
  }

  imageLoadError = () => {
    console.log('onError')
    this.setState({ imageLoading: false })
    this.props.onError && this.props.onError()
  }

  render () {
    let { source } = this.props
    const { style, resizeMode } = this.props
    const { imageLoading } = this.state

    source = imageLoading ? source : {
      uri: this.errorImgUrl
    }

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

const styles = StyleSheet.create({
  imageView: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default Image

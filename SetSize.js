import { Dimensions, PixelRatio } from 'react-native'
const { width, height } = Dimensions.get('window')
const fontScale = PixelRatio.getFontScale()
const defaultPixel = 2
const w2 = 750 / defaultPixel
const h2 = 1334 / defaultPixel
const scale = Math.min(height / h2, width / w2)
const setSpText = size => {
  const _size = Math.round(((size * scale + 0.5) * defaultPixel) / fontScale)
  return Math.floor(_size / defaultPixel)
}

const scaleSize = size => {
  const _size = Math.round(size * scale + 0.5)
  return _size
}

const scaleSizeFool = size => {
  return Math.floor(scaleSize(size))
}

export { setSpText, scaleSize, scaleSizeFool }

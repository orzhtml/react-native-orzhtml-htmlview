import { StyleSheet } from 'react-native'

/** css 转换为 rn-css */
export function inheritedStyle (style) {
  const styleJson = {}
  if (!style) return null
  if (typeof style === 'string') {
    style = style.replace(/;\s+/g, ';').replace(/:\s+/g, ':')
    const styleArray = style.split(';')
    styleArray.map(item => {
      if (!item) {
        return null
      }
      const arr = item.split(':')
      if (checkCssName(arr[0])) {
        styleJson[resetPropertyName(arr[0])] = resetCssValue(arr[1])
      }
    })
    return styleJson
  } else if (typeof style === 'object') {
    for (const name in style) {
      if (checkCssName(name)) {
        styleJson[resetPropertyName(name)] = resetCssValue(style[name])
      }
    }
    return styleJson
  }
  return null
}
/** 重置 css val */
export function resetCssValue (text) {
  let num = 0
  if (/^\d+(.+)?(px|em|rem)$/.test(text)) {
    num = text.replace(/(px|em|rem)/g, '') * 1
    if (/(em|rem)$/.test(text)) {
      num = num * 10
    }
    text = num
  }
  return text
}
/** turn things like 'align-items' into 'alignItems' */
export function resetPropertyName (name) {
  name = name.replace(/(-.)/g, function (v) {
    return v[1].toUpperCase()
  })
  return name
}
/** 过滤不要的 css */
export function checkCssName (cssName) {
  return (
    cssName !== 'margin' &&
    cssName !== 'padding' &&
    cssName !== 'border' &&
    cssName !== 'font' &&
    cssName !== 'list-style' &&
    cssName !== 'background' &&
    cssName !== 'text-decoration'
  )
}
/** 过滤 html */
export function resetHtml (html) {
  const regAnnotation = /<!--.*?-->/g
  const regBr = /<br><\/br>/gi
  const regBr2 = /<(br|p|div)[^>]*>(\s*|<br\s*?\/?>)?<\/\1>/gi
  const regSpace = /[\r\n\s]*</g
  const regSpace2 = />[\r\n\s]*/g
  const regSpace3 = />[\r\n\s]*</g

  return html
    .replace(regAnnotation, '')
    .replace(regBr, '<br/>')
    .replace(regBr2, '<br/>')
    .replace(regSpace, '<')
    .replace(regSpace2, '>')
    .replace(regSpace3, '><')
}
/** 获取随机数 */
export function MathRand (n) {
  let Num = ''
  for (let i = 0; i < n; i++) {
    Num += Math.floor(Math.random() * 10)
  }
  return Num
}
/** 检查是否 p 标签有 img 嵌套 */
export function checkIsTag (dom) {
  let isBlock = true
  dom.map(item => {
    if (item.type === 'tag') {
      switch (item.name) {
        case 'strong':
        case 'span':
        case 'a':
        case 'i':
        case 'b':
        case 'em':
        case 'code':
          isBlock = false
          break
        default:
          isBlock = true
          break
      }
    } else if (item.type === 'text') {
      isBlock = false
    }
  })
  return isBlock
}
/** 检索标签获取对应的 css */
export function filtersCss (styles, parent) {
  if (!parent) return null
  const style = StyleSheet.flatten(styles[parent.name]) || {}
  return { ...style }
}

/** 根据宽度显示图片高度 */
export function getImageSize (imagesMaxWidth, defaultWidth = 700, defaultHeight = 368) {
  const optimalWidth = imagesMaxWidth <= defaultWidth ? imagesMaxWidth : defaultWidth
  const optimalHeight = (optimalWidth * defaultHeight) / defaultWidth

  return {
    width: optimalWidth,
    height: optimalHeight
  }
}

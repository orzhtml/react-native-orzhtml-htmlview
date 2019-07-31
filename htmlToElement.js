import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import htmlparser2 from 'htmlparser2'
import entities from 'entities'
import Video from 'react-native-video'
import { ActionPopover } from 'teaset'

import { setSpText, scaleSize } from './SetSize'
import * as util from './util'
import HTMLImage from './HTMLImage'

const defaultOpts = {
  lineBreak: '\n',
  paragraphBreak: '\n\n',
  bullet: '\u2022 '
}

const styles = StyleSheet.create({
  mt: {
    marginTop: scaleSize(10)
  },
  smallest: {
    fontSize: setSpText(16),
    lineHeight: scaleSize(23),
    letterSpacing: 2
  },
  small: {
    fontSize: setSpText(17),
    lineHeight: scaleSize(25),
    letterSpacing: 2
  },
  normal: {
    fontSize: setSpText(18),
    lineHeight: scaleSize(27),
    letterSpacing: 2
  },
  big: {
    fontSize: setSpText(19),
    lineHeight: scaleSize(28.5),
    letterSpacing: 2
  },
  largest: {
    fontSize: setSpText(20),
    lineHeight: scaleSize(30),
    letterSpacing: 2
  }
})

export default function htmlToElement (rawHtml, customOpts = {}, done) {
  const opts = {
    ...defaultOpts,
    ...customOpts
  }
  // 操作气泡
  function showActionPopover ({ view, content }) {
    if (!opts.popover || opts.popover.length <= 0) {
      return false
    }
    view.measure((x, y, width, height, pageX, pageY) => {
      const items = []
      opts.popover.map(item => {
        items.push({
          title: item.title,
          onPress: () => {
            item.onPress &&
              item.onPress({
                type: item.type,
                title: item.title,
                content
              })
          }
        })
      })
      ActionPopover.show({ x: pageX, y: pageY, width, height }, items)
    })
  }
  // dom 转 rn
  function domToElement (dom, parent) {
    if (!dom) return null
    return dom.map((node, index) => {
      let NodeComponent = null
      let ShareNewsTextParagraphRand = util.MathRand(6)
      const nodeKey = 'nodeKey-' + index

      if (node.type === 'text') {
        if (checkSpace(node.data)) {
          return null
        }
        return (
          <Text
            ref={v =>
              (this[
                'ShareNewsTextParagraph' + index + ShareNewsTextParagraphRand
              ] = v)
            }
            key={nodeKey}
            style={[styles[opts.size], { color: opts.globalColor }, styles.mt]}
            onLongPress={() => {
              const text = entities.decodeHTML(node.data)
              // 长按
              opts.onLongPress && opts.onLongPress(text)
              // 长按显示弹窗
              showActionPopover({
                view: this[
                  'ShareNewsTextParagraph' + index + ShareNewsTextParagraphRand
                ],
                content: text
              })
            }}
          >
            {entities.decodeHTML(node.data)}
          </Text>
        )
      }

      if (node.type === 'tag') {
        switch (node.name) {
          case 'br':
            if (
              parent &&
              (parent.name === 'span' ||
                parent.name === 'strong' ||
                parent.name === 'a')
            ) {
              NodeComponent = <Text key={nodeKey}>{opts.paragraphBreak}</Text>
            } else {
              NodeComponent = <View key={nodeKey} style={{ height: 10 }} />
            }
            break
          case 'img':
            NodeComponent = (
              <TouchableOpacity
                key={nodeKey}
                onPress={() => {
                  opts.onImagePress(node.attribs.src)
                }}
                style={styles.mt}
              >
                <HTMLImage
                  source={{ uri: node.attribs.src }}
                  imagesMaxWidth={opts.imgMaxW}
                />
              </TouchableOpacity>
            )
            break
          case 'span':
          case 'strong':
          case 'a':
            ShareNewsTextParagraphRand = util.MathRand(7)
            NodeComponent = (
              <Text
                ref={v =>
                  (this[
                    'ShareNewsTagParagraph' + index + ShareNewsTextParagraphRand
                  ] = v)
                }
                key={nodeKey}
                style={[
                  styles[opts.size],
                  { color: opts.globalColor },
                  util.filtersCss(opts.styles, node)
                ]}
                onLongPress={() => {
                  const text = lineLabelMap(node.children)
                  // 长按
                  opts.onLongPress && opts.onLongPress(text)
                  // 长按显示弹窗
                  showActionPopover({
                    view: this[
                      'ShareNewsTagParagraph' +
                        index +
                        ShareNewsTextParagraphRand
                    ],
                    content: text
                  })
                }}
              >
                {labelTextView(node.children, node)}
              </Text>
            )
            break
          case 'p':
            if (util.checkIsTag(node.children)) {
              NodeComponent = domToElement(node.children, node)
            } else {
              const ShareNewsTagPParagraphRand = util.MathRand(8)
              NodeComponent = (
                <View key={nodeKey} style={[styles.mt]}>
                  <Text
                    ref={v =>
                      (this[
                        'ShareNewsTagPParagraph' +
                          index +
                          ShareNewsTagPParagraphRand
                      ] = v)
                    }
                    style={[styles[opts.size], { color: opts.globalColor }]}
                    onLongPress={() => {
                      const text = lineLabelMap(node.children)
                      // 长按
                      opts.onLongPress && opts.onLongPress(text)
                      // 长按显示弹窗
                      showActionPopover({
                        view: this[
                          'ShareNewsTagPParagraph' +
                            index +
                            ShareNewsTagPParagraphRand
                        ],
                        content: text
                      })
                    }}
                  >
                    {labelTextView(node.children, node)}
                  </Text>
                </View>
              )
            }
            break
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            ShareNewsTextParagraphRand = util.MathRand(5)
            NodeComponent = (
              <Text
                ref={v =>
                  (this[
                    'ShareNewsTagHParagraph' +
                      index +
                      ShareNewsTextParagraphRand
                  ] = v)
                }
                key={nodeKey}
                onLongPress={() => {
                  const text = lineLabelMap(node.children)
                  // 长按
                  opts.onLongPress && opts.onLongPress(text)
                  // 长按显示弹窗
                  showActionPopover({
                    view: this[
                      'ShareNewsTagHParagraph' +
                        index +
                        ShareNewsTextParagraphRand
                    ],
                    content: text
                  })
                }}
                style={[
                  styles.mt,
                  { color: opts.globalColor },
                  util.filtersCss(opts.styles, node)
                ]}
              >
                {labelTextView(node.children, node)}
              </Text>
            )
            break
          case 'video':
            NodeComponent = (
              <View key={nodeKey} style={util.filtersCss(opts.styles, node)}>
                <Video
                  controls={true}
                  source={{ uri: node.attribs.src }}
                  style={{ flex: 1 }}
                  paused={true}
                  onBuffer={e => {
                    console.log('onBuffer: ', e)
                  }}
                  onError={e => {
                    console.log('onError: ', e)
                  }}
                />
              </View>
            )
            break
          case 'mark':
            NodeComponent = (
              <View
                key={nodeKey}
                style={[styles.mt, util.inheritedStyle(node.attribs.style)]}
              >
                {node.children.map((item, idx) => {
                  const ShareNewsTagMarkParagraphRand = util.MathRand(4)
                  const childrenKey = 'childrenKey-' + idx
                  if (item.name === 'author') {
                    return (
                      <View
                        key={childrenKey}
                        style={[{ alignItems: 'flex-end' }, styles.mt]}
                      >
                        <Text
                          style={[
                            styles[opts.size],
                            util.inheritedStyle(item.attribs.style)
                          ]}
                        >
                          {entities.decodeHTML(item.children[0].data)}
                        </Text>
                      </View>
                    )
                  }
                  return (
                    <View key={childrenKey}>
                      <Text
                        ref={v =>
                          (this[
                            'ShareNewsTagMarkParagraph' +
                              index +
                              ShareNewsTagMarkParagraphRand
                          ] = v)
                        }
                        style={[
                          styles[opts.size],
                          util.inheritedStyle(item.attribs.style)
                        ]}
                        onPress={() => {
                          const text = entities.decodeHTML(item.children[0].data)
                          opts.onMarkPress && opts.onMarkPress(text)
                        }}
                        onLongPress={() => {
                          const text = entities.decodeHTML(item.children[0].data)
                          // 长按
                          opts.onLongPress && opts.onLongPress(text)
                          // 长按显示弹窗
                          showActionPopover({
                            view: this[
                              'ShareNewsTagMarkParagraph' +
                                index +
                                ShareNewsTagMarkParagraphRand
                            ],
                            content: text
                          })
                        }}
                      >
                        {entities.decodeHTML(item.children[0].data)}
                      </Text>
                    </View>
                  )
                })}
              </View>
            )
            break
          default:
            NodeComponent = (
              <View key={nodeKey} style={[styles.mt]}>
                {domToElement(node.children, node)}
              </View>
            )
        }

        return NodeComponent
      }
    })
  }
  // 循环嵌套 text
  function labelTextView (dom, parent) {
    return dom.map((item, index) => {
      const tagKey = 'tagKey-' + index
      if (item.type === 'text') {
        return (
          <Text
            key={tagKey}
            style={[
              styles[opts.size],
              { color: opts.globalColor },
              util.filtersCss(opts.styles, parent)
            ]}
          >
            {entities.decodeHTML(item.data)}
          </Text>
        )
      } else if (item.type === 'tag') {
        if (item.name !== 'br' && item.name !== 'img') {
          return labelTextView(item.children, item)
        }
      }
    })
  }
  // 循环读取 文本内容
  function lineLabelMap (dom) {
    const textArray = []
    dom.map(item => {
      textArray.push(labelText(item))
    })
    return entities.decodeHTML(textArray.join(',').replace(/,/g, ''))
  }
  // 返回文本内容
  function labelText (dom) {
    if (dom.type === 'text') {
      return dom.data
    } else if (dom.type === 'tag') {
      if (dom.name !== 'br' && dom.name !== 'img') {
        return dom.children.map(item => {
          return labelText(item)
        })
      }
    }
  }
  // 检查空格
  function checkSpace (text) {
    let isSpace = false
    if (entities.decodeHTML(text).replace(/[\s\r\n]/g, '') === '') {
      isSpace = true
    }
    return isSpace
  }
  const handler = new htmlparser2.DomHandler((err, dom) => {
    if (err) done(err)
    done(null, domToElement(dom))
    if (opts.debug) {
      console.log('DOMNodes from htmlparser2', dom)
    }
  })
  const parser = new htmlparser2.Parser(handler, {
    decodeEntities: true
  })
  parser.write(rawHtml ? util.resetHtml(rawHtml) : '')
  parser.done()
}

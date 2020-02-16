import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import htmlparser2 from 'htmlparser2'
import * as entities from 'entities'
import { ActionPopover } from 'teaset'

import { scaleSize } from './libs/SetSize'
import * as util from './libs/util'
import HTMLImage from './HTMLImage'

const defaultOpts = {
  lineBreak: '\n',
  paragraphBreak: '\n\n',
  bullet: '\u2022 '
}

class HtmlToElement extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      ...defaultOpts,
      ...props,
      dom: null
    }
    this.nodeIndex = -1
  }

  componentDidMount () {
    this._DomHandler(this.state.html)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (this.state.html !== nextProps.html) {
      this.nodeIndex = -1
      this._DomHandler(nextProps.html, nextProps)
    } else if (this.state.fontSize !== nextProps.fontSize) {
      this.nodeIndex = -1
      this.setState({
        ...nextProps
      })
    }
  }

  componentWillUnmount () {
  }

  _DomHandler = (html, nextProps = {}) => {
    const { debug, onError } = this.state
    let __html__ = ''
    const handler = new htmlparser2.DomHandler((err, dom) => {
      if (err) {
        console.log('err:', err)
        onError && onError(err)
      } else {
        this.setState({
          dom,
          ...nextProps
        })
      }
      if (debug) {
        console.log('DOMNodes from htmlparser2', dom)
      }
    })
    const parser = new htmlparser2.Parser(handler, {
      decodeEntities: true
    })
    if (html) {
      __html__ = util.resetHtml(html)
      parser.write(__html__)
      parser.done()
    } else {
      onError && onError('没有 html 内容')
    }
  }

  // 操作气泡
  showActionPopover = ({ view, content }) => {
    const { popover } = this.state
    if (!popover || popover.length <= 0) {
      return false
    }
    view.measure((x, y, width, height, pageX, pageY) => {
      const items = []
      popover.map(item => {
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

  // 循环嵌套 text
  labelTextView = (dom, parent) => {
    const { styles, fontSize, globalColor } = this.state
    return dom.map((item, index) => {
      const key = 'tagKey-' + index
      if (item.type === 'text') {
        return (
          <Text
            key={key}
            style={[
              styles[fontSize],
              { color: globalColor },
              util.filtersCss(styles, parent)
            ]}
          >
            {entities.decodeHTML(item.data)}
          </Text>
        )
      } else if (item.type === 'tag') {
        if (item.name !== 'br' && item.name !== 'img') {
          return this.labelTextView(item.children, item)
        }
      }
    })
  }

  // 循环读取 文本内容
  lineLabelMap = (dom) => {
    const textArray = []
    dom.map(item => {
      textArray.push(this.labelText(item))
    })
    return entities.decodeHTML(textArray.join(',').replace(/,/g, ''))
  }

  // 返回文本内容
  labelText = (dom) => {
    if (dom.type === 'text') {
      return dom.data
    } else if (dom.type === 'tag') {
      if (dom.name !== 'br' && dom.name !== 'img') {
        return dom.children.map(item => {
          return this.labelText(item)
        })
      }
    }
  }

  // 检查空格
  checkSpace = (text) => {
    let isSpace = false
    if (entities.decodeHTML(text).replace(/[\s\r\n]/g, '') === '') {
      isSpace = true
    }
    return isSpace
  }

  domText = (node, index) => {
    const { styles, fontSize, globalColor, popover, onLongPress } = this.state
    const nodeIndex = this.nodeIndex + 1
    const key = 'node_text_' + nodeIndex + '_' + index

    if (!this.checkSpace(node.data)) {
      this.nodeIndex = nodeIndex
      return (
        <Text
          ref={v => (this[key] = v)}
          key={key}
          style={[styles[fontSize], { color: globalColor }, styles.mt]}
          suppressHighlighting={!popover || popover.length <= 0}
          onLongPress={() => {
            const text = entities.decodeHTML(node.data)
            // 长按
            onLongPress && onLongPress(text)
            // 长按显示弹窗
            this.showActionPopover({
              view: this[key],
              content: text
            })
          }}
        >
          {entities.decodeHTML(node.data)}
        </Text>
      )
    }
  }

  domBr = (parent, index) => {
    const { paragraphBreak } = this.state
    const key = 'node_br_' + this.nodeIndex + '_' + index
    if (parent && (parent.name === 'span' || parent.name === 'strong' || parent.name === 'a')) {
      return (<Text key={key}>{paragraphBreak}</Text>)
    } else {
      return (<View key={key} style={{ height: 10 }} />)
    }
  }

  domImg = (node, index) => {
    const { onImagePress, styles, imagesMaxWidth, errorImgSource } = this.state
    const key = 'node_img_' + this.nodeIndex + '_' + index
    return (
      <TouchableOpacity
        key={key}
        activeOpacity={1}
        onPress={() => {
          onImagePress && onImagePress(node.attribs.src)
        }}
        style={styles.mt}
      >
        <HTMLImage
          source={{ uri: entities.decodeHTML(node.attribs.src) }}
          errorImgSource={errorImgSource}
          imagesMaxWidth={imagesMaxWidth}
        />
      </TouchableOpacity>
    )
  }

  domLineText = (node, index) => {
    const { styles, fontSize, globalColor, popover, onLongPress } = this.state
    const nodeIndex = this.nodeIndex + 1
    const key = 'node_line_text_' + nodeIndex + '_' + index

    this.nodeIndex = nodeIndex

    return (
      <Text
        key={key}
        ref={v => (this[key] = v)}
        style={[
          styles[fontSize],
          { color: globalColor },
          util.filtersCss(styles, node)
        ]}
        suppressHighlighting={!popover || popover.length <= 0}
        onLongPress={() => {
          const text = this.lineLabelMap(node.children)
          // 长按
          onLongPress && onLongPress(text)
          // 长按显示弹窗
          this.showActionPopover({
            view: this[key],
            content: text
          })
        }}
      >
        {this.labelTextView(node.children, node)}
      </Text>
    )
  }

  domP = (node, index) => {
    const { styles, fontSize, globalColor, popover, onLongPress } = this.state
    const nodeIndex = this.nodeIndex + 1
    const key = 'node_p_' + nodeIndex + '_' + index
    const keyText = 'node_p_text_' + nodeIndex + '_' + index

    if (util.checkIsTag(node.children)) {
      return this.domToElement(node.children, node)
    } else {
      this.nodeIndex = nodeIndex
      return (
        <View key={key} style={styles.mt}>
          <Text
            ref={v => (this[keyText] = v)}
            style={[styles[fontSize], { color: globalColor }]}
            suppressHighlighting={!popover || popover.length <= 0}
            onLongPress={() => {
              const text = this.lineLabelMap(node.children)
              // 长按
              onLongPress && onLongPress(text)
              // 长按显示弹窗
              this.showActionPopover({
                view: this[keyText],
                content: text
              })
            }}
          >
            {this.labelTextView(node.children, node)}
          </Text>
        </View>
      )
    }
  }

  domH123456 = (node, index) => {
    const { styles, globalColor, popover, onLongPress } = this.state
    const nodeIndex = this.nodeIndex + 1
    const key = 'node_h123456_' + nodeIndex + '_' + index
    return (
      <Text
        ref={v => (this[key] = v)}
        key={key}
        suppressHighlighting={!popover || popover.length <= 0}
        onLongPress={() => {
          const text = this.lineLabelMap(node.children)
          // 长按
          onLongPress && onLongPress(text)
          // 长按显示弹窗
          this.showActionPopover({
            view: this[key],
            content: text
          })
        }}
        style={[
          styles.mt,
          { color: globalColor },
          util.filtersCss(styles, node)
        ]}
      >
        {this.labelTextView(node.children, node)}
      </Text>
    )
  }

  domVideo = (node, index) => {
    const { styles, onVideoPlay, imagesMaxWidth, videoBg } = this.state
    const key = 'node_video_' + index
    let source = videoBg || imgSource.video_bg

    if (node.attribs.poster) {
      if (node.attribs.poster.length > 1) {
        source = { uri: node.attribs.poster }
      }
    }

    return (
      <View
        key={key}
        style={styles.mt}
      >
        <Image
          source={source}
          style={util.getImageSize(imagesMaxWidth)}
        />
        <TouchableOpacity
          onPress={() => {
            onVideoPlay && onVideoPlay(node.attribs.src)
          }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            source={imgSource.icon_video_play}
            style={{
              width: 50,
              height: 50
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  domMark = (node, index) => {
    const { styles, fontSize, popover, onLongPress, onMarkPress } = this.state
    const key = 'node_mark_' + index

    return (
      <View
        key={key}
        style={[styles.mt, util.inheritedStyle(node.attribs.style)]}
      >
        {node.children.map((item, idx) => {
          let childrenKey = 'node_mark_child_' + idx
          if (item.name === 'author') {
            return (
              <View
                key={childrenKey}
                style={[{ alignItems: 'flex-end' }, styles.mt]}
              >
                <Text
                  style={[
                    styles[fontSize],
                    util.inheritedStyle(item.attribs.style)
                  ]}
                >
                  {entities.decodeHTML(item.children[0].data)}
                </Text>
              </View>
            )
          }

          const nodeIndex = this.nodeIndex + 1
          const childrenKeyText = 'node_mark_child_text_' + nodeIndex + '_' + idx
          childrenKey = 'node_mark_child_' + nodeIndex + '_' + idx

          this.nodeIndex = nodeIndex

          return (
            <View key={childrenKey}>
              <Text
                ref={v => (this[childrenKeyText] = v)}
                style={[
                  styles[fontSize],
                  util.inheritedStyle(item.attribs.style)
                ]}
                onPress={() => {
                  const text = entities.decodeHTML(item.children[0].data)
                  onMarkPress && onMarkPress(text)
                }}
                suppressHighlighting={!popover || popover.length <= 0}
                onLongPress={() => {
                  const text = entities.decodeHTML(item.children[0].data)
                  // 长按
                  onLongPress && onLongPress(text)
                  // 长按显示弹窗
                  this.showActionPopover({
                    view: this[childrenKeyText],
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
  }

  domUlOl = (node, index) => {
    const { styles, fontSize, globalColor, popover, onLongPress } = this.state
    const key = 'node_ul_ol_' + index
    let orderedListCounter = 1

    return (
      <View
        key={key}
        style={[styles.mt, util.filtersCss(styles, node)]}
      >
        {
          node.children.map((item, idx) => {
            const nodeIndex = this.nodeIndex + 1
            const childrenKey = 'node_' + node.name + '_li_' + nodeIndex + '_' + idx
            const listItemPrefix = node.name === 'ul' ? (
              <View style={{
                marginRight: scaleSize(10),
                width: styles[fontSize].fontSize / 2.8,
                height: styles[fontSize].fontSize / 2.8,
                marginTop: styles[fontSize].fontSize / 2,
                borderRadius: styles[fontSize].fontSize / 2.8,
                backgroundColor: 'black'
              }} />
            ) : (
              <View style={{ marginRight: scaleSize(5) }}>
                <Text
                  style={[
                    styles[fontSize],
                    { color: globalColor },
                    util.filtersCss(styles, item)
                  ]}
                >{ orderedListCounter++ }.</Text>
              </View>
            )

            return (
              <View
                key={childrenKey}
                ref={v => (this[childrenKey] = v)}
                style={{ flexDirection: 'row', marginTop: scaleSize(5) }}
              >
                {listItemPrefix}
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles[fontSize],
                      { color: globalColor },
                      util.filtersCss(styles, item)
                    ]}
                    suppressHighlighting={!popover || popover.length <= 0}
                    onLongPress={() => {
                      const text = this.lineLabelMap(item.children)
                      // 长按
                      onLongPress && onLongPress(text)
                      // 长按显示弹窗
                      this.showActionPopover({
                        view: this[childrenKey],
                        content: text
                      })
                    }}
                  >
                    { this.labelTextView(item.children, item) }
                  </Text>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  domToElement = (dom, parent) => {
    const { styles } = this.state
    if (!dom) {
      return null
    }
    return dom.map((node, index) => {
      let NodeComponent = null
      const nodeKey = 'node_key_' + index
      if (node.type === 'text') {
        return this.domText(node, index)
      }

      if (node.type === 'tag') {
        switch (node.name) {
          case 'br':
            NodeComponent = this.domBr(parent, index)
            break
          case 'img':
            NodeComponent = this.domImg(node, index)
            break
          case 'span':
          case 'strong':
          case 'a':
            NodeComponent = this.domLineText(node, index)
            break
          case 'p':
            NodeComponent = this.domP(node, index)
            break
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            NodeComponent = this.domH123456(node, index)
            break
          case 'video':
            NodeComponent = this.domVideo(node, index)
            break
          case 'mark':
            NodeComponent = this.domMark(node, index)
            break
          case 'ul':
          case 'ol':
            NodeComponent = this.domUlOl(node, index)
            break
          case 'table':
            NodeComponent = (
              <TableView key={nodeKey} opts={{ ...this.state }} node={node} />
            )
            break
          default:
            NodeComponent = (
              <View key={nodeKey} style={styles.mt}>
                {this.domToElement(node.children, node)}
              </View>
            )
        }
      }

      return NodeComponent
    })
  }

  render () {
    const { style } = this.props
    const { dom } = this.state
    return (
      <View style={style}>
        {
          this.domToElement(dom)
        }
      </View>
    )
  }
}

const imgSource = {
  icon_video_play: require('./image/icon_video_play.png'),
  video_bg: require('./image/video_bg.png')
}

/** 渲染 table */
class TableView extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      tableWidth: null,
      tableHeight: null
    }

    this.first = true
  }

  _onLayout = (event) => {
    //获取根View的宽高，以及左上角的坐标值
    const { width, height } = event.nativeEvent.layout
    // console.log('通过onLayout得到的宽度：', x, y);
    // console.log('通过onLayout得到的宽度：', width);
    // console.log('通过onLayout得到的高度：', height);
    if (this.first) {
      this.first = false
      this.setState({
        tableWidth: Math.ceil(width),
        tableHeight: Math.ceil(height)
      })
    }
  }

  render () {
    const { opts, node } = this.props
    const { tableWidth } = this.state

    return (
      <ScrollView
        horizontal={true}
        style={opts.styles.mt}
        contentContainerStyle={{
          paddingVertical: scaleSize(4)
        }}
      >
        <View
          style={[
            { flex: 1 },
            util.filtersCss(opts.styles, node)
          ]}
          onLayout={this._onLayout}
        >
          {
            node.children.map((item, idx) => {
              const childrenKey = 'children_key_table_' + idx
              let tableItemView = null

              switch (item.name) {
                case 'caption':
                  tableItemView = (
                    <View
                      key={childrenKey}
                      style={[util.filtersCss(opts.styles, item)]}
                    >
                      <Text style={[
                        {
                          color: opts.globalColor
                        },
                        util.filtersCss(opts.styles, item)
                      ]}>
                        { entities.decodeHTML(item.children[0].data) }
                      </Text>
                    </View>
                  )
                  break
                case 'thead':
                case 'tbody':
                case 'tfoot':
                  tableItemView = (
                    <View
                      key={childrenKey}
                      style={[util.filtersCss(opts.styles, item)]}
                    >
                      {
                        item.children.map((itm, ix) => {
                          const childrenTrKey = 'children_tr_key_' + ix
                          return (
                            <View
                              key={childrenTrKey}
                              style={[
                                {
                                  flexDirection: 'row'
                                },
                                util.filtersCss(opts.styles, itm)
                              ]}
                            >
                              {
                                itm.children.map((m, i) => {
                                  const childrenTdKey = 'children_td_key_' + i
                                  return (
                                    <View
                                      key={childrenTdKey}
                                      style={[
                                        tableWidth !== null && {
                                          width: Math.ceil(tableWidth / itm.children.length) + 5
                                        },
                                        util.filtersCss(opts.styles, m)
                                      ]}
                                    >
                                      <Text
                                        style={[
                                          {
                                            color: opts.globalColor
                                          },
                                          opts.styles[m.name + 'Txt']
                                        ]}
                                        suppressHighlighting={!opts.popover || opts.popover.length <= 0}
                                        onLongPress={() => {
                                          const text = entities.decodeHTML(m.children[0].data)
                                          // 长按
                                          opts.onLongPress && opts.onLongPress(text)
                                        }}
                                      >
                                        { entities.decodeHTML(m.children[0].data) }
                                      </Text>
                                    </View>
                                  )
                                })
                              }
                            </View>
                          )
                        })
                      }
                    </View>
                  )
                  break
                case 'tr':
                  tableItemView = (
                    <View
                      key={childrenKey}
                      style={[
                        {
                          flexDirection: 'row'
                        },
                        util.filtersCss(opts.styles, item)
                      ]}
                    >
                      {
                        item.children.map((itm, i) => {
                          const childrenTdKey = 'children_td_key-' + i
                          return (
                            <View
                              key={childrenTdKey}
                              style={[
                                tableWidth !== null && {
                                  width: Math.ceil(tableWidth / item.children.length) + 5
                                },
                                util.filtersCss(opts.styles, itm)
                              ]}
                            >
                              <Text
                                style={[
                                  {
                                    color: opts.globalColor
                                  },
                                  opts.styles[itm.name + 'Txt']
                                ]}
                                suppressHighlighting={!opts.popover || opts.popover.length <= 0}
                                onLongPress={() => {
                                  const text = entities.decodeHTML(itm.children[0].data)
                                  // 长按
                                  opts.onLongPress && opts.onLongPress(text)
                                }}
                              >
                                { entities.decodeHTML(itm.children[0].data) }
                              </Text>
                            </View>
                          )
                        })
                      }
                    </View>
                  )
                  break
              }

              return tableItemView
            })
          }
        </View>
      </ScrollView>
    )
  }
}

export default HtmlToElement

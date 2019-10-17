import React from 'react'
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native'
import { Promise } from 'es6-promise'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import HTMLView from 'react-native-orzhtml-htmlview'

const ios = Platform.OS === 'ios'
const statusHeight = ios ? getStatusBarHeight() : StatusBar.currentHeight
const sw = Dimensions.get('window').width

let htmlSource = '<mark>'
htmlSource +=
  '<text id="abscasd" style="color: red">朝鲜大型团体操和艺术演出《人民的国家》6月3日晚在平壤五一体育场举行首场表演，朝鲜最高领导人金正恩和数万名观众观看。</text>'
htmlSource += '<author style="color: #f0f;">——kavt 标注</author>'
htmlSource += '</mark>'
htmlSource +=
  '<div class="content-container" style="width: 100%"><!--content-container-->'
htmlSource += '<div class="main-container"><!--main-->'
htmlSource += '<div class="article-view">'
htmlSource +=
  '<div class="article-header"><h1>航海王巡展亮相上海，值得粉丝去打卡吗？</h1></div>'
htmlSource += '<div class="video-view">'
htmlSource +=
  '<div class="video-main" id="gddflvplayer" style="height:380px;">'
htmlSource +=
  '<video src="https://kavt.oss-cn-shanghai.aliyuncs.com/VIDEO/1.mp4" controls="controls" poster="https://img3.jiemian.com/101/original/20190603/155956386599084700.jpg" webkit-playsinline style="width:100%;max-height:100%;"></video>'
htmlSource += '</div>'
htmlSource +=
  '\r\n\r\n\r\n\r\n\r\n航海王巡展亮相上海，值得粉丝去打卡吗？\r\n\r\n\r\n'
htmlSource += 
  '<video src="https://kavt.oss-cn-shanghai.aliyuncs.com/VIDEO/HK9.mp4" controls="controls" poster="https://kavt.oss-cn-shanghai.aliyuncs.com/VIDEO/667.png" webkit-playsinline style="width:100%;max-height:100%;"></video>'
htmlSource +=
  '<p>新华社报道说，在一个半小时的演出中，数万名朝鲜演员通过体操、舞蹈、声乐、杂技等形式多样的表演，展现出朝鲜革命与战争、政治和军队建设、民生与经济发展以及对外交往等历史画卷，赢得观众的热烈掌声。</p>'
htmlSource +=
  '\r\n\r\n<p>按照朝中社6月4日报道的描述，“表演者以美丽优雅的律动、充满气魄的体操、丰富的民族情趣和艺术形象、千变万化的大规模背景台画幅为观众奉献了一场文艺盛宴。”演出结束时，全体表演者和观众再次向金正恩爆发出“万岁！”</p>'
htmlSource +=
  '\r\n\r\n\r\n<img style="width:100px;height:50px;" src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946291-5a4c893e552f2f6bbb62abc6ec7ed72a.jpg">'
htmlSource += '\r\n图片来源：朝中社\r\n\r\n\r\n\r\n'
htmlSource +=
  '<p>不过朝中社称，演出结束后，金正恩召见大型团体操与艺术表演主创人员，“指点作品内容和形式中存在的缺点，对他们错误的创作作风、不负责任的工作态度提出严厉批评”。</p>'
htmlSource +=
  '\r\n\r\n<p>金正恩说，文艺部门创作家和艺术家在社会主义文化建设中肩负的任务非常重要，并就正确地执行贯彻党的革命性文艺政策提出了重要任务。</p>'
htmlSource +=
  '<p class="report-view"><img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946291-79f84ef8941a146fc915c3da74ee4c0d.jpg"></p>'
htmlSource +=
  '\r\n\r\n<p>朝鲜有组织举行大型团体操的传统，曾以参演人数载入吉尼斯世界纪录的大型团体操《阿里郎》是朝鲜团体操的代表作之一。'
htmlSource +=
  '2018年，朝鲜为庆祝建国70周年打造了名为《辉煌的祖国》的大型团体操和艺术演出，反映朝鲜建国以来在各领域取得的成就。</p>'
htmlSource +=
  '\r\n\r\n<p>6月3日的活动中，金正恩胞妹、朝鲜劳动党中央委员会第一副部长金与正陪同观看了表演。此外，劳动党副委员长金英哲当天也现身观演。</p>'
htmlSource +=
  '\r\n\r\n<p>此前曾有韩国媒体报道说，为追究越南河内金特会无果而终的责任，“金与正被勒令停职反省”，金英哲“被肃清”、接受“劳改”，'
htmlSource +=
  '而两人的现身让这些传言不攻自破。6月2日，金英哲还陪同金正恩一同观看了朝鲜人民军第二届第七次军属艺术小组竞赛获奖节目演出。</p>'
htmlSource +=
  '\n     \n     <img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-09f81db1206deee70da8e7f96d2a8319.jpg">'
htmlSource += '\n     科比和詹姆斯\n    '
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　2008-2011</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　彼时巅峰的老大</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　连续三年带队总决赛</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　斩获2冠</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-8b9efb6074df52c162652a2a6053983c.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　2011-2018年</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　从南海岸到克利夫兰</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　如日中天的老汉</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　七闯总决赛大门</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　3捧奥布莱杯</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-0323d809762e5755e6cdcd2da52ba28b.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　这么些年过去了<br></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　虽然老汉在33岁之际</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　选择再一次将天赋移至加利福尼亚</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　然而在紫金国度</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　俩人始终没能相遇</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-4dae49546b3ce7097f39d93aee4ad9b2.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　如今</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　41岁的老大正在叱咤商业圈</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　34的阿king反手拿起渔具</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>23 vs 24</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　已然成为一个最美的遗憾</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-3ca4eac8caaeb9d7bbcf41f41f514df0.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　不过近日</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　尘封了10余年的历史</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　终于被打破了！！</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-63c185109b9ec41c245b89a764ffbcf1.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　这一次的场外“联手”</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　比起篮球层面上的对决</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　更具代表性也更加令人为之动容</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-1c5fea0ac96dcc06fd5a7cf8dfa3a956.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　众所皆知</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>此前詹姆斯在家乡俄亥俄州阿克伦市创办了I Promise学校</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　作为一所公立的非特许学校</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　老汉的目的就是帮助那些处于困境的儿童</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　都能接受良好的教育</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-22858269ff2aa1a7c808fe7a7d8331e8.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>然而近日科比向詹姆斯的学校</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>捐赠了一批由他联合出版的小说</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>这批名为《威兹纳德系列》的著作</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>是科比联手一些作家朋友一同创作的</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>适合年轻人阅读的励志小说集</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>其中融合了不少体育元素</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>由此激励孩子们成为一名优秀的体育运动员</strong></p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-2adbe6533dae30dc19d8c5ec15d8255a.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　而这一举动</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　同时被洛杉矶湖人官宣为</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>“詹科联手造福下一代”</strong></p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-23fab09a3280e8b08b2877e0cd6b0352.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　之所以这俩哥们被人们赞以“伟大”</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　绝非一朝一夕的成就</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　这其中</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　俩人在赛场之外皆大有贡献</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-8f327a578c3c25a3b4044ead42e3be00.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>科比退役后最先开始的工作</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>就是成立一家公司——Kobeⅰnc</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>开启新生活的同时做起了霸道总裁</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>而该公司主要投资的是那些有思想有能力的人</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>老大想利用自己的退役薪资进行投资</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>而非部分球员去挥霍</strong></p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-a801af707a73a724889448b7dd214542.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　除此之外</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　《曼巴精神》《detail》等一系列创作</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　便是从篮球层面出发</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　激励一众热爱篮球的运动员</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-33edce63d61800c14617b14cb85de106.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　而老汉自2015年</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　<strong>先后投入将近</strong><strong>1.3亿</strong><strong>美元创建詹姆斯家庭基金会</strong></p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　创立学校的同时挽救了无数身处水深火热的迷途少年</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　可以说 在职业生涯步入巅峰后</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　他的生涯合同总收入高达接近3亿美元</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　但却将近拿出了一半的金钱来做慈善</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-91470df3bce36a1519eeb387457cca8f.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　此番合作</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　引得球迷们纷纷赞叹</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　更是被称之为</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　两个洛杉矶之王的联手</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-497556e303104b2baac99f40acf69f8e.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　转眼一想</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　老汉拥有一儿</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　老大育有一女</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　前者为年轻一代佼佼者欲大放光芒</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　后者正处貌美年华同样身手不凡</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-94bc88692f07306fbd9d692db4d19e2d.jpg">\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　不如</p>\n'
htmlSource +=
  '<p style="text-align: center; letter-spacing: 1.5px; line-height: 2em;">　　。。。</p>\n'
htmlSource +=
  '<img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946287-0ff234bc51d7939650a682d836952080.jpg">\n'
htmlSource +=
  '<p style="letter-spacing: 1.5px; text-align: right;">　　<strong>来来来 同意这门亲事的 在看↓↓↓</strong></p>'
htmlSource +=
  '\n     \n     \n                    \n                    \n                        \n\n                    '
htmlSource += '<p><span>测试数据文本</span><span>测试数据文本测试数据文本2</span></p>'
htmlSource += '<table border="1" style="width: 100%;">'
htmlSource += '<thead>'
htmlSource += '<tr>'
htmlSource += '<th>thead th 测试</th>'
htmlSource += '<th>thead th2 测试测试测试</th>'
htmlSource += '<th>thead th3 测试</th>'
htmlSource += '<th>thead th4 测试</th>'
htmlSource += '<th>thead th5 测试</th>'
htmlSource += '</tr>'
htmlSource += '</thead>'
htmlSource += '<tbody>'
htmlSource += '<tr>'
htmlSource += '<td>tbody td 测试</td>'
htmlSource += '<td>tbody td2 测试</td>'
htmlSource += '<td>tbody td3 测试测试测试测试测试</td>'
htmlSource += '<td>tbody td4 测试测试测试测试测试</td>'
htmlSource += '<td>tbody td5 测试测试测试测试测试</td>'
htmlSource += '</tr>'
htmlSource += '</tbody>'
htmlSource += '<tfoot>'
htmlSource += '<tr>'
htmlSource += '<td>tfoot td 测试测试测</td>'
htmlSource += '<td>tfoot td2 测试</td>'
htmlSource += '<td>tfoot td3 测试</td>'
htmlSource += '<td>tfoot td4 测试</td>'
htmlSource += '<td>tfoot td5 测试</td>'
htmlSource += '</tr>'
htmlSource += '</tfoot>'
htmlSource += '</table>'
htmlSource += '<table border="1">'
htmlSource += '<caption>我的标题</caption>'
htmlSource += '<tr>'
htmlSource += '<th>姓名</th>'
htmlSource += '<td>Bill Gates</td>'
htmlSource += '<td>Bill Gates</td>'
htmlSource += '</tr>'
htmlSource += '<tr>'
htmlSource += '<th>电话</th>'
htmlSource += '<td>555 77 854</td>'
htmlSource += '<td>555 77 854</td>'
htmlSource += '</tr>'
htmlSource += '<tr>'
htmlSource += '<th>电话</th>'
htmlSource += '<td>555 77 855</td>'
htmlSource += '<td>555 77 855</td>'
htmlSource += '</tr>'
htmlSource += '</table>'
htmlSource += '<ul>'
htmlSource += '<li>'
htmlSource += 'ul > li-1 无序列表测试无序列表测试无序列表测试无序列表测试'
htmlSource += '</li>'
htmlSource += '<li>'
htmlSource += 'ul > li-2'
htmlSource += '</li>'
htmlSource += '</ul>'
htmlSource += '<ol>'
htmlSource += '<li>'
htmlSource += 'ol > li-1 有序列表测试有序列表测试有序列表测试有序列表测试有序列表测试'
htmlSource += '</li>'
htmlSource += '<li>'
htmlSource += 'ol > li-2'
htmlSource += '</li>'
htmlSource += '</ol>'
htmlSource +=
  '<p style="color:blue; font-size: 18px;">这是p<span style="color:red;">这是p里面的span嵌套<strong>这是span里面的strong嵌套</strong></span></p>'
htmlSource +=
  '<span style="color:blue;">这是span标签<a href="https://hao123.com/">这是span嵌套a</a></span>'
htmlSource +=
  '<span><strong style="color:red;">这是span嵌套的strong</strong></span>'
htmlSource += '没标签测试0'
htmlSource += '<p style="padding-left: 5px; padding-right: 5px;">'
htmlSource += '<a href="https://baidu.com/">这是p嵌套a标签测试</a>'
htmlSource += '<span style="color:red;">这是p嵌套span标签测试</span>'
htmlSource += '<strong>这是p嵌套strong标签测试</strong>'
htmlSource += '</p>'
htmlSource += '<div style="height: 300px; background-color:#0ff;">'
htmlSource +=
  '<span style="color: red;font-size: 18px;">这是div套span测试</span>'
htmlSource +=
  '<strong style="font-size: 16px;">这是div嵌套strong测试</strong>'
htmlSource +=
  '<p><strong style="font-size: 16px;color:red;">这是div嵌套p嵌套strong测试</strong>这是div嵌套p测试</p>'
htmlSource += '<h1>这是div嵌套h1</h1>'
htmlSource += '<h2>这是div嵌套h2</h2>'
htmlSource += '<h3>这是div嵌套h3</h3>'
htmlSource += '<h4>这是div嵌套h4</h4>'
htmlSource += '<h5>这是div嵌套h5</h5>'
htmlSource += '<h6>这是div嵌套h6</h6>'
htmlSource += '</div>'
htmlSource += '<p>这是p标签测试</p>'

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      htmlSource: null,
      fontSize: 'smallest'
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  mock = (data, t) => {
    return new Promise((resolve, reject) => {
      t = t || Math.random() * 1500
      setTimeout(resolve, t, data)
    })
  }

  fetchData = async () => {
    const res = await this.mock(htmlSource)
    this.setState({
      htmlSource: res
    })
  }

  onImagePress = url => {
    console.log(url)
  }

  onLongPress = text => {
    console.log('onLongPress: ', text)
  }

  onMarkPress = id => {
    console.log('onMarkPress: ', id)
  }

  render() {
    const { htmlSource, fontSize } = this.state
    // console.log(entities.decodeHTML(htmlSource))
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#ffffff',
            height: statusHeight
          }}
        >
          <StatusBar translucent backgroundColor={'#ffffff'} />
        </View>
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              marginRight: 10
            }}
            onPress={() => {
              this.setState({
                fontSize: 'smallest' // 最小(smallest)、小(small)、正常(normal)、大(big)、最大(largest)
              })
            }}
          >
            <Text style={{ fontSize: 15, color: 'black' }}>最小</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              marginRight: 10
            }}
            onPress={() => {
              this.setState({
                fontSize: 'small' // 最小(smallest)、小(small)、正常(normal)、大(big)、最大(largest)
              })
            }}
          >
            <Text style={{ fontSize: 15, color: 'black' }}>小</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              marginRight: 10
            }}
            onPress={() => {
              this.setState({
                fontSize: 'normal' // 最小(smallest)、小(small)、正常(normal)、大(big)、最大(largest)
              })
            }}
          >
            <Text style={{ fontSize: 15, color: 'black' }}>正常</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              marginRight: 10
            }}
            onPress={() => {
              this.setState({
                fontSize: 'big' // 最小(smallest)、小(small)、正常(normal)、大(big)、最大(largest)
              })
            }}
          >
            <Text style={{ fontSize: 15, color: 'black' }}>大</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              marginRight: 10
            }}
            onPress={() => {
              this.setState({
                fontSize: 'largest' // 最小(smallest)、小(small)、正常(normal)、大(big)、最大(largest)
              })
            }}
          >
            <Text style={{ fontSize: 15, color: 'black' }}>最大</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ paddingHorizontal: 15 }}>
          <HTMLView
            style={{
              flex: 1
            }}
            debug={true}
            html={htmlSource}
            fontSize={fontSize}
            imagesMaxWidth={sw - 30}
            onImagePress={this.onImagePress}
            onLongPress={this.onLongPress}
            onMarkPress={this.onMarkPress}
            popover={[
              {
                title: '微信',
                type: 'wechar',
                onPress: data => {
                  console.log('微信: ', data)
                }
              },
              {
                title: '朋友圈',
                type: 'circleFriends',
                onPress: data => {
                  console.log('朋友圈: ', data)
                }
              }
            ]}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
})

export default Example

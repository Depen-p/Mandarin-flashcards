let currentWords = []; // The current word list in use
let savedFiles = []; // Array to store saved word lists
let currentIndex = null; // Store the index of the currently loaded saved file

// Predefined word list templates for demonstration purposes
const templates = {
    hsk1m: ['爱', '八', '爸爸', '杯子', '北京', '本', '不客气', '不', '菜', '茶', '吃', '出租车', '打电话', '大', '的', '点', '电脑', '电视', '电影', '东西', '都', '读', '对不起', '多', '多少', '儿子', '二', '饭店', '飞机', '分钟', '高兴', '个', '工作', '狗', '汉语', '好', '号', '喝', '和', '很', '后面', '回', '会', '几', '家', '叫', '今天', '九', '开', '看', '看见', '块', '来', '老师', '了', '冷', '里', '六', '吗', '妈妈', '买', '猫', '没关系', '没有', '米饭', '名字', '明天', '哪', '哪儿', '那', '呢', '能', '你', '年', '女儿', '朋友', '漂亮', '苹果', '七', '前面', '钱', '请', '去', '热', '人', '认识', '三', '商店', '上', '上午', '少', '谁', '什么', '十', '时候', '是', '书', '水', '水果', '睡觉', '说', '四', '岁', '他', '她', '太', '天气', '听', '同学', '喂', '我', '我们', '五', '喜欢', '下', '下午', '下雨', '先生', '现在', '想', '小', '小姐', '些', '写', '谢谢', '星期', '学生', '学习', '学校', '一', '一点儿', '医生', '医院', '衣服', '椅子', '有', '月', '再见', '在', '怎么', '怎么样', '这', '中国', '中午', '住', '桌子', '字', '昨天', '做', '坐'],
    hsk1p: ['ài', 'bā', 'bà ba', 'bēi zi', 'běi jīng', 'běn', 'bú kè qi', 'bù', 'cài', 'chá', 'chī', 'chū zū chē', 'dǎ diàn huà', 'dà', 'de', 'diǎn', 'diàn nǎo', 'diàn shì', 'diàn yǐng', 'dōng xi', 'dōu', 'dú', 'duì bu qǐ', 'duō', 'duō shǎo', 'ér zi', 'èr', 'fàn diàn', 'fēi jī', 'fēn zhōng', 'gāo xìng', 'gè', 'gōng zuò', 'gǒu', 'hàn yǔ', 'hǎo', 'hào', 'hē', 'hé', 'hěn', 'hòu miàn', 'huí', 'huì', 'jǐ', 'jiā', 'jiào', 'jīn tiān', 'jiǔ', 'kāi', 'kàn', 'kàn jiàn', 'kuài', 'lái', 'lǎo shī', 'le', 'lěng', 'lǐ', 'liù', 'ma', 'mā ma', 'mǎi', 'māo', 'méi guān xi', 'méi yǒu', 'mǐ fàn', 'míng zi', 'míng tiān', 'nǎ', 'nǎ er', 'nà', 'ne', 'néng', 'nǐ', 'nián', 'nǚ ér', 'péng you', 'piào liang', 'píng guǒ', 'qī', 'qián miàn', 'qián', 'qǐng', 'qù', 'rè', 'rén', 'rèn shi', 'sān', 'shāng diàn', 'shàng', 'shàng wǔ', 'shǎo', 'shéi', 'shén me', 'shí', 'shí hou', 'shì', 'shū', 'shuǐ', 'shuǐguǒ', 'shuì jiào', 'shuō', 'sì', 'suì', 'tā', 'tā', 'tài', 'tiān qì', 'tīng', 'tóng xué', 'wèi', 'wǒ', 'wǒ men', 'wǔ', 'xǐ huan', 'xià', 'xià wǔ', 'xià yǔ', 'xiān sheng', 'xiàn zài', 'xiǎng', 'xiǎo', 'xiǎo jie', 'xiē', 'xiě', 'xiè xie', 'xīng qī', 'xué sheng', 'xué xí', 'xué xiào', 'yī', 'yī diǎn er', 'yī shēng', 'yī yuàn', 'yī fu', 'yǐ zi', 'yǒu', 'yuè', 'zài jiàn', 'zài', 'zěn me', 'zěn me yàng', 'zhè', 'zhōng guó', 'zhōng wǔ', 'zhù', 'zhuō zi', 'zì', 'zuó tiān', 'zuò', 'zuò'],
    hsk2m: ['吧', '白', '百', '帮助', '报纸', '比', '别', '宾馆', '长', '唱歌', '出', '穿', '次', '从', '错', '打篮球', '大家', '到', '得', '等', '弟弟', '第一', '懂', '对', '对', '房间', '非常', '服务员', '高', '告诉', '哥哥', '给', '公共汽车', '公司', '贵', '过', '孩子', '还', '好吃', '黑', '红', '火车站', '机场', '鸡蛋', '件', '教室', '姐姐', '介绍', '近', '进', '就', '觉得', '咖啡', '开始', '考试', '可能', '可以', '课', '快', '快乐', '累', '离', '两', '零', '路', '旅游', '卖', '慢', '忙', '每', '妹妹', '门', '面条', '男', '您', '牛奶', '女', '旁边', '跑步', '便宜', '票', '妻子', '起床', '千', '铅笔', '晴', '去年', '让', '日', '上班', '身体', '生病', '生日', '时间', '事情', '手表', '手机', '说话', '送', '虽然…但是…', '它', '踢足球', '题', '跳舞', '外', '完', '玩', '晚上', '往', '为什么', '问', '问题', '希望', '西瓜', '洗', '小时', '笑', '新', '姓', '休息', '雪', '颜色', '眼睛', '羊肉', '药', '要', '也', '一下', '已经', '一起', '意思', '因为…所以…', '阴', '游泳', '右边', '鱼', '远', '运动', '再', '早上', '丈夫', '找', '着', '真', '正在', '知道', '准备', '走', '最', '左边'],
    hsk2p: ['ba', 'bái', 'bǎi', 'bāng zhù', 'bào zhǐ', 'bǐ', 'bié', 'bīn guǎn', 'cháng', 'chàng gē', 'chū', 'chuān', 'cì', 'cóng', 'cuò', 'dǎ lán qiú', 'dà jiā', 'dào', 'de', 'děng', 'dì di', 'dì yī', 'dǒng', 'duì', 'duì', 'fáng jiān', 'fēi cháng', 'fú wù yuán', 'gāo', 'gào su', 'gē ge', 'gěi', 'gōng gòng qì chē', 'gōng sī', 'guì', 'guo', 'hái zi', 'hái', 'hǎo chī', 'hēi', 'hóng', 'huǒ chē zhàn', 'jī chǎng', 'jī dàn', 'jiàn', 'jiào shì', 'jiě jie', 'jiè shào', 'jìn', 'jìn', 'jiù', 'jué de', 'kā fēi', 'kāi shǐ', 'kǎo shì', 'kě néng', 'kě yǐ', 'kè', 'kuài', 'kuài lè', 'lèi', 'lí', 'liǎng', 'líng', 'lù', 'lv3 yóu', 'mài', 'màn', 'máng', 'měi', 'mèi mei', 'mén', 'miàn tiáo', 'nán', 'nín', 'niú nǎi', 'nǚ', 'páng biān', 'pǎo bù', 'pián yi', 'piào', 'qī zi', 'qǐ chuáng', 'qiān', 'qiān bǐ', 'qíng', 'qù nián', 'ràng', 'rì', 'shàng bān', 'shēn tǐ', 'shēng bìng', 'shēng rì', 'shí jiān', 'shì qing', 'shǒu biǎo', 'shǒu jī', 'shuō huà', 'sòng', 'suī rán …dàn shì …', 'tā', 'tī zú qiú', 'tí', 'tiào wǔ', 'wài', 'wán', 'wán', 'wǎn shang', 'wǎng', 'wèi shén me', 'wèn', 'wèn tí', 'xī wàng', 'xī guā', 'xǐ', 'xiǎo shí', 'xiào', 'xīn', 'xìng', 'xiū xi', 'xuě', 'yán sè', 'yǎn jing', 'yáng ròu', 'yào', 'yào', 'yě', 'yī xià', 'yǐ jīng', 'yī qǐ', 'yì si', 'yīn wèi …suǒ yǐ …', 'yīn', 'yóu yǒng', 'yòu bian', 'yú', 'yuǎn', 'yùn dòng', 'zài', 'zǎo shang', 'zhàng fu', 'zhǎo', 'zhe', 'zhēn', 'zhèng zài', 'zhī dào', 'zhǔn bèi', 'zǒu', 'zuì', 'zuǒ bian'],
    hsk3m: ['啊', '阿姨', '矮', '爱好', '安静', '把', '搬', '班', '办法', '办公室', '半', '帮忙', '包', '饱', '北方', '被', '鼻子', '比较', '比赛', '笔记本', '必须', '变化', '别人', '冰箱', '不但…而且…', '菜单', '参加', '草', '层', '差', '超市', '衬衫', '城市', '成绩', '迟到', '除了', '船', '春', '词典', '聪明', '打扫', '打算', '带', '担心', '蛋糕', '当然', '地', '灯', '地方', '地铁', '地图', '电梯', '电子邮件', '东', '冬', '动物', '短', '段', '锻炼', '多么', '饿', '耳朵', '发', '发烧', '发现', '方便', '放', '放心', '分', '复习', '附近', '干净', '感冒', '感兴趣', '刚才', '个子', '根据', '跟', '更', '公斤', '公园', '故事', '刮风', '关', '关系', '关心', '关于', '国家', '过', '过去', '还是', '害怕', '黑板', '后来', '护照', '花', '花', '画', '坏', '欢迎', '环境', '还', '换', '黄河', '回答', '会议', '或者', '几乎', '机会', '极', '季节', '记得', '检查', '简单', '健康', '见面', '讲', '教', '脚', '角', '接', '街道', '结婚', '结束', '节目', '节日', '解决', '借', '经常', '经过', '经理', '久', '旧', '句子', '决定', '可爱', '渴', '刻', '客人', '空调', '口', '哭', '裤子', '筷子', '蓝', '老', '离开', '礼物', '历史', '脸', '练习', '辆', '聊天', '了解', '邻居', '留学', '楼', '绿', '马', '马上', '满意', '帽子', '米', '面包', '明白', '拿', '奶奶', '南', '难', '难过', '年级', '年轻', '鸟', '努力', '爬山', '盘子', '胖', '啤酒', '皮鞋', '瓶子', '其实', '其他', '奇怪', '骑', '起飞', '起来', '清楚', '请假', '秋', '裙子', '然后', '热情', '认为', '认真', '容易', '如果', '伞', '上网', '声音', '生气', '世界', '试', '瘦', '叔叔', '舒服', '数学', '树', '刷牙', '双', '水平', '司机', '太阳', '特别', '疼', '提高', '体育', '甜', '条', '同事', '同意', '头发', '突然', '图书馆', '腿', '完成', '碗', '万', '忘记', '为', '为了', '位', '文化', '西', '习惯', '洗手间', '洗澡', '夏', '先', '相信', '香蕉', '像', '向', '小心', '校长', '新闻', '新鲜', '信用卡', '行李箱', '熊猫', '需要', '选择', '要求', '爷爷', '一直', '一定', '一共', '一会儿', '一样', '以前', '一般', '一边', '音乐', '银行', '饮料', '应该', '影响', '用', '游戏', '有名', '又', '遇到', '元', '愿意', '月亮', '越', '站', '张', '长', '着急', '照顾', '照片', '照相机', '只', '只', '只有…才…', '中间', '中文', '终于', '种', '重要', '周末', '主要', '注意', '自己', '自行车', '总是', '嘴', '最后', '最近', '作业'],
    hsk3p: ['a', 'ā yí', 'ǎi', 'ài hào', 'ān jìng', 'bǎ', 'bān', 'bān', 'bàn fǎ', 'bàn gōng shì', 'bàn', 'bāng máng', 'bāo', 'bǎo', 'běi fāng', 'bèi', 'bí zi', 'bǐ jiào', 'bǐ sài', 'bǐ jì běn', 'bì xū', 'biàn huà', 'bié rén', 'bīng xiāng', 'bù dàn ér qiě', 'cài dān', 'cān jiā', 'cǎo', 'céng', 'chà', 'chāo shì', 'chèn shān', 'chéng shì', 'chéng jì', 'chí dào', 'chú le', 'chuán', 'chūn', 'cí diǎn', 'cōng ming', 'dǎ sǎo', 'dǎ suàn', 'dài', 'dān xīn', 'dàn gāo', 'dāng rán', 'de', 'dēng', 'dì fang', 'dì tiě', 'dì tú', 'diàn tī', 'diàn zǐ yóu jiàn', 'dōng', 'dōng', 'dòng wù', 'duǎn', 'duàn', 'duàn liàn', 'duō me', 'è a', 'ěr duo', 'fā', 'fā shāo', 'fā xiàn', 'fāng biàn', 'fàng', 'fàng xīn', 'fēn', 'fù xí', 'fù jìn', 'gān jìng', 'gǎn mào', 'gǎn xìng qù', 'gāng cái', 'gè zi', 'gēn jù', 'gēn', 'gèng', 'gōng jīn', 'gōng yuán', 'gù shi', 'guā fēng', 'guān', 'guān xì', 'guān xīn', 'guān yú', 'guó jiā', 'guò', 'guò qu', 'hái shì', 'hài pà', 'hēi bǎn', 'hòu lái', 'hù zhào', 'huā', 'huā', 'huà', 'huài', 'huān yíng', 'huán jìng', 'huán', 'huàn', 'huáng hé', 'huí dá', 'huì yì', 'huò zhě', 'jī hū', 'jī huì', 'jí', 'jì jié', 'jì de', 'jiǎn chá', 'jiǎn dān', 'jiàn kāng', 'jiàn miàn', 'jiǎng', 'jiào', 'jiǎo', 'jiǎo', 'jiē', 'jiē dào', 'jié hūn', 'jié shù', 'jié mù', 'jié rì', 'jiě jué', 'jiè', 'jīng cháng', 'jīng guò', 'jīng lǐ', 'jiǔ', 'jiù', 'jù zi', 'jué dìng', 'kě ài', 'kě', 'kè', 'kè rén', 'kōng tiáo', 'kǒu', 'kū', 'kù zi', 'kuài zi', 'lán', 'lǎo', 'lí kāi', 'lǐ wù', 'lì shǐ', 'liǎn', 'liàn xí', 'liàng', 'liáo tiān', 'liǎo jiě', 'lín jū', 'liú xué', 'lóu', 'mǎ', 'mǎ shàng', 'mǎn yì', 'mào zi', 'mǐ', 'miàn bāo', 'míng bai', 'ná', 'nǎi nai', 'nán', 'nán', 'nán guò', 'nián jí', 'nián qīng', 'niǎo', 'nǔ lì', 'pá shān', 'pán zi', 'pàng', 'pí jiǔ', 'pí xié', 'píng zi', 'qí shí', 'qí tā', 'qí guài', 'qí', 'qǐ fēi', 'qǐ lái', 'qīng chu', 'qǐng jià', 'qiū', 'qún zi', 'rán hòu', 'rè qíng', 'rèn wéi', 'rèn zhēn', 'róng yì', 'rú guǒ', 'sǎn', 'shàng wǎng', 'shēng yīn', 'shēng qì', 'shì jiè', 'shì', 'shòu', 'shū shu', 'shū fu', 'shù xué', 'shù', 'shuā yá', 'shuāng', 'shuǐ píng', 'sī jī', 'tài yáng', 'tè bié', 'téng', 'tí gāo', 'tǐ yù', 'tián', 'tiáo', 'tóng shì', 'tóng yì', 'tóu fa', 'tū rán', 'tú shū guǎn', 'tuǐ', 'wán chéng', 'wǎn', 'wàn', 'wàng jì', 'wèi', 'wèi le', 'wèi', 'wén huà', 'xī', 'xí guàn', 'xǐ shǒu jiān', 'xǐ zǎo', 'xià', 'xiān', 'xiāng xìn', 'xiāng jiāo', 'xiàng', 'xiàng', 'xiǎo xīn', 'xiào zhǎng', 'xīn wén', 'xīn xiān', 'xìn yòng kǎ', 'xíng lǐ xiāng', 'xióng māo', 'xū yào', 'xuǎn zé', 'yāo qiú', 'yé ye', 'yī zhí', 'yí dìng', 'yī gòng', 'yī huì er', 'yī yàng', 'yǐ qián', 'yī bān', 'yī biān', 'yīn yuè', 'yín háng', 'yǐn liào', 'yīng gāi', 'yǐng xiǎng', 'yòng', 'yóu xì', 'yǒu míng', 'yòu', 'yù dào', 'yuán', 'yuàn yì', 'yuè liang', 'yuè', 'zhàn', 'zhāng', 'zhǎng', 'zháo jí', 'zhào gu', 'zhào piàn', 'zhào xiàng jī', 'zhǐ', 'zhǐ', 'zhǐ yǒu …cái …', 'zhōng jiān', 'zhōng wén', 'zhōng yú', 'zhǒng', 'zhòng yào', 'zhōu mò', 'zhǔ yào', 'zhù yì', 'zì jǐ', 'zì xíng chē', 'zǒng shì', 'zuǐ', 'zuì hòu', 'zuì jìn', 'zuò yè'],
    hsk4m: ['爱情', '安排', '安全', '按时', '按照', '百分之', '棒', '包子', '保护', '保证', '报名', '抱', '抱歉', '倍', '本来', '笨', '比如', '毕业', '遍', '标准', '表格', '表示', '表演', '表扬', '饼干', '并且', '博士', '不过', '不得不', '不管', '不仅', '部分', '擦', '猜', '材料', '参观', '餐厅', '厕所', '差不多', '尝', '长城', '长江', '场', '超过', '乘坐', '成功', '成为', '诚实', '吃惊', '重新', '抽烟', '出差', '出发', '出生', '出现', '厨房', '传真', '窗户', '词语', '从来', '粗心', '存', '错误', '答案', '打扮', '打扰', '打印', '打招呼', '打折', '打针', '大概', '大使馆', '大约', '大夫', '戴', '当', '当时', '刀', '导游', '倒', '到处', '到底', '道歉', '得', '得意', '登机牌', '等', '低', '底', '地点', '地球', '地址', '掉', '调查', '丢', '动作', '堵车', '肚子', '短信', '对话', '对面', '对于', '儿童', '而', '发生', '发展', '法律', '翻译', '烦恼', '反对', '方法', '方面', '方向', '房东', '放弃', '放暑假', '放松', '份', '丰富', '否则', '符合', '付款', '复印', '复杂', '富', '父亲', '负责', '改变', '干杯', '感动', '感觉', '感情', '感谢', '敢', '赶', '干', '刚', '高速公路', '胳膊', '各', '公里', '功夫', '工资', '共同', '够', '购物', '估计', '鼓励', '故意', '顾客', '挂', '关键', '观众', '管理', '光', '广播', '广告', '逛', '规定', '国籍', '国际', '果汁', '过程', '海洋', '害羞', '寒假', '汗', '航班', '好处', '好像', '号码', '合格', '合适', '盒子', '厚', '后悔', '互联网', '互相', '护士', '怀疑', '回忆', '活动', '活泼', '火', '获得', '基础', '激动', '积极', '积累', '即使', '及时', '寄', '技术', '既然', '继续', '计划', '记者', '加班', '加油站', '家具', '假', '价格', '坚持', '减肥', '减少', '建议', '将来', '奖金', '降低', '降落', '交', '交流', '交通', '郊区', '骄傲', '饺子', '教授', '教育', '接受', '接着', '结果', '节', '节约', '解释', '尽管', '紧张', '禁止', '进行', '京剧', '精彩', '经济', '经历', '经验', '景色', '警察', '竞争', '竟然', '镜子', '究竟', '举', '举办', '举行', '拒绝', '聚会', '距离', '开玩笑', '开心', '看法', '烤鸭', '考虑', '棵', '科学', '咳嗽', '可怜', '可是', '可惜', '客厅', '肯定', '空', '空气', '恐怕', '苦', '矿泉水', '困', '困难', '垃圾桶', '拉', '辣', '来不及', '来得及', '来自', '懒', '浪费', '浪漫', '老虎', '冷静', '理发', '理解', '理想', '礼拜天', '礼貌', '例如', '力气', '厉害', '俩', '联系', '连', '凉快', '零钱', '另外', '流利', '流行', '留', '旅行', '乱', '律师', '麻烦', '马虎', '满', '毛', '毛巾', '美丽', '梦', '迷路', '密码', '免费', '秒', '民族', '母亲', '目的', '耐心', '难道', '难受', '内', '内容', '能力', '年龄', '弄', '暖和', '偶尔', '排队', '排列', '判断', '陪', '批评', '皮肤', '脾气', '篇', '骗', '乒乓球', '平时', '破', '葡萄', '普遍', '普通话', '其次', '其中', '气候', '千万', '签证', '敲', '桥', '巧克力', '亲戚', '轻', '轻松', '情况', '穷', '区别', '取', '全部', '缺点', '缺少', '却', '确实', '然而', '热闹', '任何', '任务', '扔', '仍然', '日记', '入口', '散步', '森林', '沙发', '伤心', '商量', '稍微', '勺子', '社会', '深', '申请', '甚至', '生活', '生命', '生意', '省', '剩', '失败', '失望', '师傅', '十分', '实际', '实在', '使', '使用', '世纪', '是否', '适合', '适应', '收', '收入', '收拾', '首都', '首先', '受不了', '受到', '售货员', '输', '熟悉', '数量', '数字', '帅', '顺便', '顺利', '顺序', '说明', '硕士', '死', '塑料袋', '速度', '酸', '随便', '随着', '孙子', '所有', '台', '抬', '态度', '弹钢琴', '谈', '汤', '糖', '躺', '趟', '讨论', '讨厌', '特点', '提', '提供', '提前', '提醒', '填空', '条件', '停', '挺', '通过', '通知', '同情', '同时', '推', '推迟', '脱', '袜子', '完全', '往往', '网球', '网站', '危险', '卫生间', '味道', '温度', '文章', '污染', '无', '无聊', '无论', '误会', '吸引', '西红柿', '咸', '现金', '羡慕', '相反', '相同', '香', '详细', '响', '橡皮', '消息', '小吃', '小伙子', '小说', '效果', '笑话', '心情', '辛苦', '信封', '信息', '信心', '兴奋', '行', '醒', '幸福', '性别', '性格', '修理', '许多', '学期', '呀', '压力', '牙膏', '亚洲', '严格', '严重', '盐', '研究', '演出', '演员', '眼镜', '阳光', '养成', '样子', '邀请', '要是', '钥匙', '也许', '叶子', '页', '一切', '以', '以为', '意见', '艺术', '因此', '引起', '印象', '赢', '应聘', '勇敢', '永远', '优点', '优秀', '幽默', '尤其', '由', '由于', '邮局', '友好', '友谊', '有趣', '于是', '愉快', '与', '羽毛球', '语法', '语言', '预习', '原来', '原谅', '原因', '约会', '阅读', '云', '允许', '杂志', '咱们', '暂时', '脏', '责任', '增加', '占线', '招聘', '照', '真正', '整理', '正常', '正好', '正确', '正式', '证明', '之', '支持', '知识', '值得', '植物', '直接', '职业', '只好', '只要', '指', '至少', '质量', '重', '重点', '重视', '周围', '主意', '祝贺', '著名', '专门', '专业', '转', '赚', '准确', '准时', '仔细', '自然', '自信', '总结', '租', '最好', '尊重', '左右', '作家', '作用', '作者', '座', '座位'],
    hsk4p: ['ài qíng', 'ān pái', 'ān quán', 'àn shí', 'àn zhào', 'bǎi fēn zhī', 'bàng', 'bāo zi', 'bǎo hù', 'bǎo zhèng', 'bào míng', 'bào', 'bào qiàn', 'bèi', 'běn lái', 'bèn', 'bǐ rú', 'bì yè', 'biàn', 'biāo zhǔn', 'biǎo gé', 'biǎo shì', 'biǎo yǎn', 'biǎo yáng', 'bǐng gān', 'bìng qiě', 'bó shì', 'bú guò', 'bù dé bù', 'bù guǎn', 'bù jǐn', 'bù fen', 'cā', 'cāi', 'cái liào', 'cān guān', 'cān tīng', 'cè suǒ', 'chà bu duō', 'cháng', 'cháng chéng', 'cháng jiāng', 'chǎng', 'chāo guò', 'chéng zuò', 'chéng gōng', 'chéng wéi', 'chéng shí', 'chī jīng', 'chóng xīn', 'chōu yān', 'chū chāi', 'chū fā', 'chū shēng', 'chū xiàn', 'chú fáng', 'chuán zhēn', 'chuāng hu', 'cí yǔ', 'cóng lái', 'cū xīn', 'cún', 'cuò wù', 'dá àn', 'dǎ ban', 'dǎ rǎo', 'dǎ yìn', 'dǎ zhāo hu', 'dǎ zhé', 'dǎ zhēn', 'dà gài', 'dà shǐ guǎn', 'dà yuē', 'dài fu', 'dài', 'dāng', 'dāng shí', 'dāo', 'dǎo yóu', 'dào', 'dào chù', 'dào dǐ', 'dào qiàn', 'dé', 'dé yì', 'dēng jī pái', 'děng', 'dī', 'dǐ', 'dì diǎn', 'dì qiú', 'dì zhǐ', 'diào', 'diào chá', 'diū', 'dòng zuò', 'dǔ chē', 'dù zi', 'duǎn xìn', 'duì huà', 'duì miàn', 'duì yú', 'ér tóng', 'ér', 'fā shēng', 'fā zhǎn', 'fǎ lv4', 'fān yì', 'fán nǎo', 'fǎn duì', 'fāng fǎ', 'fāng miàn', 'fāng xiàng', 'fáng dōng', 'fàng qì', 'fàng shǔ jià', 'fàng sōng', 'fèn', 'fēng fù', 'fǒu zé', 'fú hé', 'fù kuǎn', 'fù yìn', 'fù zá', 'fù', 'fù qīn', 'fù zé', 'gǎi biàn', 'gān bēi', 'gǎn dòng', 'gǎn jué', 'gǎn qíng', 'gǎn xiè', 'gǎn', 'gǎn', 'gàn', 'gāng', 'gāo sù gōng lù', 'gē bo', 'gè', 'gōng lǐ', 'gōng fu', 'gōng zī', 'gòng tóng', 'gòu', 'gòu wù', 'gū jì', 'gǔ lì', 'gù yì', 'gù kè', 'guà', 'guān jiàn', 'guān zhòng', 'guǎn lǐ', 'guāng', 'guǎng bō', 'guǎng gào', 'guàng', 'guī dìng', 'guó jí', 'guó jì', 'guǒ zhī', 'guò chéng', 'hǎi yáng', 'hài xiū', 'hán jià', 'hàn', 'háng bān', 'hǎo chu', 'hǎo xiàng', 'hào mǎ', 'hé gé', 'hé shì', 'hé zi', 'hòu', 'hòu huǐ', 'hù lián wǎng', 'hù xiāng', 'hù shi', 'huái yí', 'huí yì', 'huó dòng', 'huó po', 'huǒ', 'huò dé', 'jī chǔ', 'jī dòng', 'jī jí', 'jī lěi', 'jí shǐ', 'jí shí', 'jì', 'jì shù', 'jì rán', 'jì xù', 'jì huà', 'jì zhě', 'jiā bān', 'jiā yóu zhàn', 'jiā jù', 'jiǎ', 'jià gé', 'jiān chí', 'jiǎn féi', 'jiǎn shǎo', 'jiàn yì', 'jiāng lái', 'jiǎng jīn', 'jiàng dī', 'jiàng luò', 'jiāo', 'jiāo liú', 'jiāo tōng', 'jiāo qū', 'jiāo ào', 'jiǎo zi', 'jiào shòu', 'jiào yù', 'jiē shòu', 'jiē zhe', 'jié guǒ', 'jié', 'jié yuē', 'jiě shì', 'jǐn guǎn', 'jǐn zhāng', 'jìn zhǐ', 'jìn xíng', 'jīng jù', 'jīng cǎi', 'jīng jì', 'jīng lì', 'jīng yàn', 'jǐng sè', 'jǐng chá', 'jìng zhēng', 'jìng rán', 'jìng zi', 'jiū jìng', 'jǔ', 'jǔ bàn', 'jǔ xíng', 'jù jué', 'jù huì', 'jù lí', 'kāi wán xiào', 'kāi xīn', 'kàn fǎ', 'kǎo yā', 'kǎo lv4', 'kē', 'kē xué', 'ké sou', 'kě lián', 'kě shì', 'kě xī', 'kè tīng', 'kěn dìng', 'kōng', 'kōng qì', 'kǒng pà', 'kǔ', 'kuàng quán shuǐ', 'kùn', 'kùn nan', 'lā jī tǒng', 'lā', 'là', 'lái bu jí', 'lái de jí', 'lái zì', 'lǎn', 'làng fèi', 'làng màn', 'lǎo hǔ', 'lěng jìng', 'lǐ fà', 'lǐ jiě', 'lǐ xiǎng', 'lǐ bài tiān', 'lǐ mào', 'lì rú', 'lì qi', 'lì hai', 'liǎ', 'lián xì', 'lián', 'liáng kuai', 'líng qián', 'lìng wài', 'liú lì', 'liú xíng', 'liú', 'lǚ xíng', 'luàn', 'lv4 shī', 'má fan', 'mǎ hu', 'mǎn', 'máo', 'máo jīn', 'měi lì', 'mèng', 'mí lù', 'mì mǎ', 'miǎn fèi', 'miǎo', 'mín zú', 'mǔ qīn', 'mù dì', 'nài xīn', 'nán dào', 'nán shòu', 'nèi', 'nèi róng', 'néng lì', 'nián líng', 'nòng', 'nuǎn huo', 'ǒu ěr', 'pái duì', 'pái liè', 'pàn duàn', 'péi', 'pī píng', 'pí fū', 'pí qi', 'piān', 'piàn', 'pīng pāng qiú', 'píng shí', 'pò', 'pú tao', 'pǔ biàn', 'pǔ tōng huà', 'qí cì', 'qí zhōng', 'qì hòu', 'qiān wàn', 'qiān zhèng', 'qiāo', 'qiáo', 'qiǎo kè lì', 'qīn qi', 'qīng', 'qīng sōng', 'qíng kuàng', 'qióng', 'qū bié', 'qǔ', 'quán bù', 'quē diǎn', 'quē shǎo', 'què', 'què shí', 'rán ér', 'rè nao', 'rèn hé', 'rèn wu', 'rēng', 'réng rán', 'rì jì', 'rù kǒu', 'sàn bù', 'sēn lín', 'shā fā', 'shāng xīn', 'shāng liang', 'shāo wēi', 'sháo zi', 'shè huì', 'shēn', 'shēn qǐng', 'shèn zhì', 'shēng huó', 'shēng mìng', 'shēng yì', 'shěng', 'shèng', 'shī bài', 'shī wàng', 'shī fu', 'shí fēn', 'shí jì', 'shí zài', 'shǐ', 'shǐ yòng', 'shì jì', 'shì fǒu', 'shì hé', 'shì yìng', 'shōu', 'shōu rù', 'shōu shi', 'shǒu dū', 'shǒu xiān', 'shòu bù liǎo', 'shòu dào', 'shòu huò yuán', 'shū', 'shú xī', 'shù liàng', 'shù zì', 'shuài', 'shùn biàn', 'shùn lì', 'shùn xù', 'shuō míng', 'shuò shì', 'sǐ', 'sù liào dài', 'sù dù', 'suān', 'suí biàn', 'suí zhe', 'sūn zi', 'suǒ yǒu', 'tái', 'tái', 'tài du', 'tán gāng qín', 'tán', 'tāng', 'táng', 'tǎng', 'tàng', 'tǎo lùn', 'tǎo yàn', 'tè diǎn', 'tí', 'tí gōng', 'tí qián', 'tí xǐng', 'tián kòng', 'tiáo jiàn', 'tíng', 'tǐng', 'tōng guò', 'tōng zhī', 'tóng qíng', 'tóng shí', 'tuī', 'tuī chí', 'tuō', 'wà zi', 'wán quán', 'wǎng wǎng', 'wǎng qiú', 'wǎng zhàn', 'wēi xiǎn', 'wèi shēng jiān', 'wèi dào', 'wēn dù', 'wén zhāng', 'wū rǎn', 'wú', 'wú liáo', 'wú lùn', 'wù huì', 'xī yǐn', 'xī hóng shì', 'xián', 'xiàn jīn', 'xiàn mù', 'xiāng fǎn', 'xiāng tóng', 'xiāng', 'xiáng xì', 'xiǎng', 'xiàng pí', 'xiāo xi', 'xiǎo chī', 'xiǎo huǒ zi', 'xiǎo shuō', 'xiào guǒ', 'xiào huà', 'xīn qíng', 'xīn kǔ', 'xìn fēng', 'xìn xī', 'xìn xīn', 'xīng fèn', 'xíng', 'xǐng', 'xìng fú', 'xìng bié', 'xìng gé', 'xiū lǐ', 'xǔ duō', 'xué qī', 'ya', 'yā lì', 'yá gāo', 'yà zhōu', 'yán gé', 'yán zhòng', 'yán', 'yán jiū', 'yǎn chū', 'yǎn yuán', 'yǎn jìng', 'yáng guāng', 'yǎng chéng', 'yàng zi', 'yāo qǐng', 'yào shi', 'yào shi', 'yě xǔ', 'yè zi', 'yè', 'yī qiè', 'yǐ', 'yǐ wéi', 'yì jiàn', 'yì shù', 'yīn cǐ', 'yǐn qǐ', 'yìn xiàng', 'yíng', 'yìng pìn', 'yǒng gǎn', 'yǒng yuǎn', 'yōu diǎn', 'yōu xiù', 'yōu mò', 'yóu qí', 'yóu', 'yóu yú', 'yóu jú', 'yǒu hǎo', 'yǒu yì', 'yǒu qù', 'yú shì', 'yú kuài', 'yǔ', 'yǔ máo qiú', 'yǔ fǎ', 'yǔ yán', 'yù xí', 'yuán lái', 'yuán liàng', 'yuán yīn', 'yuē huì', 'yuè dú', 'yún', 'yǔn xǔ', 'zá zhì', 'zán men', 'zàn shí', 'zāng', 'zé rèn', 'zēng jiā', 'zhàn xiàn', 'zhāo pìn', 'zhào', 'zhēn zhèng', 'zhěng lǐ', 'zhèng cháng', 'zhèng hǎo', 'zhèng què', 'zhèng shì', 'zhèng míng', 'zhī', 'zhī chí', 'zhī shi', 'zhí de', 'zhí wù', 'zhí jiē', 'zhí yè', 'zhǐ hǎo', 'zhǐ yào', 'zhǐ', 'zhì shǎo', 'zhì liàng', 'zhòng', 'zhòng diǎn', 'zhòng shì', 'zhōu wéi', 'zhǔ yi', 'zhù hè', 'zhù míng', 'zhuān mén', 'zhuān yè', 'zhuǎn', 'zhuàn', 'zhǔn què', 'zhǔn shí', 'zǐ xì', 'zì rán', 'zì xìn', 'zǒng jié', 'zū', 'zuì hǎo', 'zūn zhòng', 'zuǒ yòu', 'zuò jiā', 'zuò yòng', 'zuò zhě', 'zuò', 'zuò wèi'],
};

// Save the word list as a "save file"
function saveWordList() {
    const inputText = document.getElementById('wordInput').value;
    if (inputText.trim() === '') {
        alert("Please enter some words.");
        return;
    }

    const words = inputText.split('\n').map(word => word.trim()).filter(word => word !== '');

    // Prompt the user for a name for the save file
    const fileName = prompt("Enter a name for this word list:");
    if (fileName) {
        // If editing an existing list, update it
        if (currentIndex !== null) {
            savedFiles[currentIndex].name = fileName;
            savedFiles[currentIndex].words = words;
        } else {
            // If it's a new list, save it
            savedFiles.push({ name: fileName, words: words });
        }

        localStorage.setItem('savedFiles', JSON.stringify(savedFiles)); // Save to local storage
        displaySavedFiles(); // Update the saved files list
        resetInput(); // Reset the input area
    }
}

// Generate a random word from the current word list
function generateRandomWord() {
    if (currentWords.length === 0) {
        document.getElementById('word').innerText = 'Please input some words or load a word list first!';
        return;
    }

    const randomIndex = Math.floor(Math.random() * currentWords.length);
    const randomWord = currentWords.splice(randomIndex, 1)[0];
    document.getElementById('word').innerText = randomWord;

    if (currentWords.length === 0) {
        document.getElementById('word').innerText = 'All words have been used!';
    }
}

// Display the list of saved word files
function displaySavedFiles() {
    const savedFilesList = document.getElementById('savedFilesList');
    savedFilesList.innerHTML = ''; // Clear the existing list

    const files = JSON.parse(localStorage.getItem('savedFiles') || '[]');

    files.forEach((file, index) => {
        const div = document.createElement('div');
        div.classList.add('saved-file-item');
        div.innerHTML = `
            <span>${file.name}</span>
            <div>
                <button onclick="loadWordList(${index})">Load</button>
                <button onclick="renameWordList(${index})">Rename</button>
                <button onclick="deleteWordList(${index})">Delete</button>
            </div>
        `;
        savedFilesList.appendChild(div);
    });
}

// Load a saved word list into the input textarea for editing
function loadWordList(index) {
    const file = savedFiles[index];
    currentWords = file.words.slice(); // Copy the words to the currentWords array
    document.getElementById('wordInput').value = file.words.join('\n'); // Populate the textarea
    currentIndex = index; // Store the index of the loaded list for editing
}

// Rename a saved word list
function renameWordList(index) {
    const newName = prompt('Enter a new name for the word list:');
    if (newName) {
        savedFiles[index].name = newName;
        localStorage.setItem('savedFiles', JSON.stringify(savedFiles));
        displaySavedFiles();
    }
}

// Delete a saved word list
function deleteWordList(index) {
    savedFiles.splice(index, 1);
    localStorage.setItem('savedFiles', JSON.stringify(savedFiles));
    displaySavedFiles();
}

// Clear all saved files
function clearAllSavedFiles() {
    savedFiles = [];
    localStorage.removeItem('savedFiles');
    displaySavedFiles();
}

// Reset the input area and current index
function resetInput() {
    document.getElementById('wordInput').value = '';
    currentIndex = null; // Reset the index
}

// Load a predefined word list template
function loadTemplate(templateName) {
    if (templates[templateName]) {
        currentWords = [...templates[templateName]]; // Copy the template to currentWords
        document.getElementById('wordInput').value = currentWords.join('\n'); // Populate the textarea
    }
}

// Load the saved files on page load
window.onload = function () {
    const saved = JSON.parse(localStorage.getItem('savedFiles') || '[]');
    savedFiles = saved; // Load saved files from local storage
    displaySavedFiles(); // Display them on the left side
};

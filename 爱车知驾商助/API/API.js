const Promise = require('HttpRequest.js')
const Url = require('URl.js')

/**
 * 接口请求
 */
export const api = {
    /**
     * @param paramObj
     * @returns {Promise}
     */

    // 获取openid
    getOpenId: function (paramObj) {
        return Promise.post(Url.default.getOpenIdUrl(), paramObj);
    },
    // 微信登录
    wxLogin: function (paramObj) {
        return Promise.post(Url.default.wxLoginUrl(), paramObj);
    },
    // 获取手机号
    analysisUserPhone: function (paramObj) {
        return Promise.post(Url.default.analysisUserPhoneUrl(), paramObj);
    },
    // 首页图片
    getShopHomeData: function (paramObj) {
        return Promise.post(Url.default.getShopHomeDataUrl(), paramObj);
    },
    // 获取社区帖子列表
    getPostingsList: function (paramObj) {
        return Promise.post(Url.default.getPostingsListUrl(), paramObj);
    },
    // 获取订单列表
    getOrderList: function (paramObj) {
        return Promise.post(Url.default.getOrderListUrl(), paramObj);
    },
    // 获取订单详情
    orderDetail: function (paramObj) {
        return Promise.post(Url.default.orderDetailUrl(), paramObj);
    },
    // 订单退款
    setOrderRefund: function (paramObj) {
        return Promise.post(Url.default.setOrderRefundUrl(), paramObj);
    },
    // 订单拒绝退款
    setOrderNoRefund: function (paramObj) {
        return Promise.post(Url.default.setOrderNoRefundUrl(), paramObj);
    },
    // 订单发货
    setOrderSend: function (paramObj) {
        return Promise.post(Url.default.setOrderSendUrl(), paramObj);
    },
    // 添加分类商品
    getGoodsType: function (paramObj) {
        return Promise.post(Url.default.getGoodsTypeUrl(), paramObj);
    },
    // 获取分类列表
    getTypeGoods: function (paramObj) {
        return Promise.post(Url.default.getTypeGoodsUrl(), paramObj);
    },
    // 添加商品
    addShopGoods: function (paramObj) {
        return Promise.post(Url.default.addShopGoodsUrl(), paramObj);
    },
    // 获取订单列表
    getOrderList: function (paramObj) {
        return Promise.post(Url.default.getOrderListUrl(), paramObj);
    },
    // 保存注册信息
    saveShopInfo: function (paramObj) {
        return Promise.post(Url.default.saveShopInfoUrl(), paramObj);
    },
    // 设置消息模板权限
    setSubscribeMessage: function (paramObj) {
        return Promise.post(Url.default.setSubscribeMessageUrl(), paramObj);
    },
    // 获取店铺信息
    getShopInfo: function (paramObj) {
        return Promise.post(Url.default.getShopInfoUrl(), paramObj);
    },
    // 获取技师列表
    getShopJishi: function (paramObj) {
        return Promise.post(Url.default.getShopJishiUrl(), paramObj);
    },
    // 同意-拒绝 技师
    setShopJishi: function (paramObj) {
        return Promise.post(Url.default.setShopJishiUrl(), paramObj);
    },
    // 消息通知
    noticeList: function (paramObj) {
        return Promise.post(Url.default.noticeListUrl(), paramObj);
    },
    // 消息详情
    noticeInfo: function (paramObj) {
        return Promise.post(Url.default.noticeInfoUrl(), paramObj);
    },
    // 消息已读
    noticeRead: function (paramObj) {
        return Promise.post(Url.default.noticeReadUrl(), paramObj);
    },
    // 消息订阅状态
    messagePower: function (paramObj) {
        return Promise.post(Url.default.messagePowerUrl(), paramObj);
    },
    // 获取创建商品数量
    getShopGoodsNum: function (paramObj) {
        return Promise.post(Url.default.getShopGoodsNumUrl(), paramObj);
    },
    // 红包-优惠卷-活动列表
    getShopActivitie: function (paramObj) {
        return Promise.post(Url.default.getShopActivitieUrl(), paramObj);
    },
    // 添加-红包-优惠卷-活动列表
    addShopActivitie: function (paramObj) {
        return Promise.post(Url.default.addShopActivitieUrl(), paramObj);
    },
    // 奖励
    getShopTaskInfo: function (paramObj) {
        return Promise.post(Url.default.getShopTaskInfoUrl(), paramObj);
    },
    // 领取奖励
    getShopScore: function (paramObj) {
        return Promise.post(Url.default.getShopScoreUrl(), paramObj);
    },
    // 商品热搜词
    getSearchWords: function (paramObj) {
        return Promise.post(Url.default.getSearchWordsUrl(), paramObj);
    },
    // 商品列表
    getShopGoodsList: function (paramObj) {
        return Promise.post(Url.default.getShopGoodsListUrl(), paramObj);
    },
    // 获取商品信息
    getShopGoods: function (paramObj) {
        return Promise.post(Url.default.getShopGoodsUrl(), paramObj);
    },
    // 删除商品
    setShopGoodsStatus: function (paramObj) {
        return Promise.post(Url.default.setShopGoodsStatusUrl(), paramObj);
    },
    // 账户资金
    getBillHomeData: function (paramObj) {
        return Promise.post(Url.default.getBillHomeDataUrl(), paramObj);
    },
    // 货款列表
    getBillList: function (paramObj) {
        return Promise.post(Url.default.getBillListUrl(), paramObj);
    },
    // 银行卡列表
    getBankCardList: function (paramObj) {
        return Promise.post(Url.default.getBankCardListUrl(), paramObj);
    },
    // 添加银行卡
    addBankCard: function (paramObj) {
        return Promise.post(Url.default.addBankCardUrl(), paramObj);
    },
    // 删除银行卡
    delBankCard: function (paramObj) {
        return Promise.post(Url.default.delBankCardUrl(), paramObj);
    },
    // 商家客服
    customerHome: function (paramObj) {
        return Promise.post(Url.default.customerHomeUrl(), paramObj);
    },
    // 商家客服列表
    customerList: function (paramObj) {
        return Promise.post(Url.default.customerListUrl(), paramObj);
    },
    // 推广概况
    promotionHomeData: function (paramObj) {
        return Promise.post(Url.default.promotionHomeDataUrl(), paramObj);
    },
    // 店铺进宝
    shopJinbaoData: function (paramObj) {
        return Promise.post(Url.default.shopJinbaoDataUrl(), paramObj);
    },
    // 数据分析
    operateData: function (paramObj) {
        return Promise.post(Url.default.operateDataUrl(), paramObj);
    },
    // 内容详情
    getSysContentInfo: function (paramObj) {
        return Promise.post(Url.default.getSysContentInfoUrl(), paramObj);
    },
    // 舍友圈
    communityHomeData: function (paramObj) {
        return Promise.post(Url.default.communityHomeDataUrl(), paramObj);
    },
    // 社区列表
    postingsList: function (paramObj) {
        return Promise.post(Url.default.postingsListUrl(), paramObj);
    },
    // 帖子详情
    postingsInfo: function (paramObj) {
        return Promise.post(Url.default.postingsInfoUrl(), paramObj);
    },
    // 获取评论列表
    postingsComment: function (paramObj) {
        return Promise.post(Url.default.postingsCommentUrl(), paramObj);
    },
    // 添加评论
    addPostingsComment: function (paramObj) {
        return Promise.post(Url.default.addPostingsCommentUrl(), paramObj);
    },
    // 点赞
    postingsZan: function (paramObj) {
        return Promise.post(Url.default.postingsZanUrl(), paramObj);
    },
    // 收藏
    postingsCollection: function (paramObj) {
        return Promise.post(Url.default.postingsCollectionUrl(), paramObj);
    },
    // 评论赞
    postingsCommentZan: function (paramObj) {
        return Promise.post(Url.default.postingsCommentZanUrl(), paramObj);
    },
    // 评论赞
    collectionPostings: function (paramObj) {
        return Promise.post(Url.default.collectionPostingsUrl(), paramObj);
    },
    // 发布帖子
    addPostings: function (paramObj) {
        return Promise.post(Url.default.addPostingsUrl(), paramObj);
    },
    // 服务体验
    shopScoreList: function (paramObj) {
        return Promise.post(Url.default.shopScoreListUrl(), paramObj);
    },
    // 车品推荐
    ortherShopAct: function (paramObj) {
        return Promise.post(Url.default.ortherShopActUrl(), paramObj);
    },
    // 店长推荐
    ortherShop: function (paramObj) {
        return Promise.post(Url.default.ortherShopUrl(), paramObj);
    },
    // 获取二维码
    QRcode: function (paramObj) {
        return Promise.post(Url.default.QRcodeUrl(), paramObj);
    },
    // 可提现余额
    getAccountBalance: function (paramObj) {
        return Promise.post(Url.default.getAccountBalanceUrl(), paramObj);
    },
    // 添加提现记录
    addCashLog: function (paramObj) {
        return Promise.post(Url.default.addCashLogUrl(), paramObj);
    },
}
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
    analysisUserPhone: function (paramObj){
        return Promise.post(Url.default.analysisUserPhoneUrl(), paramObj);
    },
    // 保存信息
    saveUserInfo: function (paramObj){
        return Promise.post(Url.default.saveUserInfoUrl(), paramObj);
    },
    // 获取技师信息
    getUserInfo: function (paramObj){
        return Promise.post(Url.default.getUserInfoUrl(), paramObj);
    },
    // 订单列表
    orderList: function (paramObj){
        return Promise.post(Url.default.orderListUrl(), paramObj);
    },
    // 订单详情
    getOrderInfo: function (paramObj){
        return Promise.post(Url.default.getOrderInfoUrl(), paramObj);
    },
    // 接单详情
    getWillOrder: function (paramObj){
        return Promise.post(Url.default.getWillOrderUrl(), paramObj);
    },
    // 选择维修店铺
    getJishiShop: function (paramObj){
        return Promise.post(Url.default.getJishiShopUrl(), paramObj);
    },
    // 确认接单
    acceptOrder: function (paramObj){
        return Promise.post(Url.default.acceptOrderUrl(), paramObj);
    },
    // 搜索服务-商品
    getGoodsService: function (paramObj){
        return Promise.post(Url.default.getGoodsServiceUrl(), paramObj);
    },
    // 生成订单
    creatSubOrder: function (paramObj){
        return Promise.post(Url.default.creatSubOrderUrl(), paramObj);
    },
    // 提交内容
    addOrderContent: function (paramObj){
        return Promise.post(Url.default.addOrderContentUrl(), paramObj);
    },
    // 提交授权状态
    setSubscribeMessage: function (paramObj){
        return Promise.post(Url.default.setSubscribeMessageUrl(), paramObj);
    },
    // 店铺列表
    getJishiShop: function (paramObj){
        return Promise.post(Url.default.getJishiShopUrl(), paramObj);
    },
    // 店铺列表
    getJishiShop: function (paramObj){
        return Promise.post(Url.default.getJishiShopUrl(), paramObj);
    },
    // 店铺搜索
    searchShop: function (paramObj){
        return Promise.post(Url.default.searchShopUrl(), paramObj);
    },
    // 保存店铺
    saveJishiShop: function (paramObj){
        return Promise.post(Url.default.saveJishiShopUrl(), paramObj);
    },
    // 回显店铺信息
    getJishiShopInfo: function (paramObj){
        return Promise.post(Url.default.getJishiShopInfoUrl(), paramObj);
    },
    // 消息列表
    noticeList: function (paramObj){
        return Promise.post(Url.default.noticeListUrl(), paramObj);
    },
    // 消息详情
    noticeInfo: function (paramObj){
        return Promise.post(Url.default.noticeInfoUrl(), paramObj);
    },
    // 消息已读
    noticeRead: function (paramObj) {
        return Promise.post(Url.default.noticeReadUrl(), paramObj);
    },
    // 我的累计登录-发帖-评论-获赞
    getCenterData: function (paramObj) {
        return Promise.post(Url.default.getCenterDataUrl(), paramObj);
    },
    // 立即加入保险
    jishiInsurance: function (paramObj) {
        return Promise.post(Url.default.jishiInsuranceUrl(), paramObj);
    },
    // 完成订单
    setOrderFinish: function (paramObj) {
        return Promise.post(Url.default.setOrderFinishUrl(), paramObj);
    },
    // 我的邀请
    getInviteAward: function (paramObj) {
        return Promise.post(Url.default.getInviteAwardUrl(), paramObj);
    },
    // 我的钱包
    getAccountBalance: function (paramObj) {
        return Promise.post(Url.default.getAccountBalanceUrl(), paramObj);
    },
    // 规则详情
    getContentInfo: function (paramObj) {
        return Promise.post(Url.default.getContentInfoUrl(), paramObj);
    },
    // 维师故事
    getRecommend: function (paramObj) {
        return Promise.post(Url.default.getRecommendUrl(), paramObj);
    },
    // 常见问题
    getContentList: function (paramObj) {
        return Promise.post(Url.default.getContentListUrl(), paramObj);
    },
    // 添加提现记录
    addCashLog: function (paramObj) {
        return Promise.post(Url.default.addCashLogUrl(), paramObj);
    },
    // 维师圈
    getPostingsList: function (paramObj) {
        return Promise.post(Url.default.getPostingsListUrl(), paramObj);
    },
    // 点赞
    postingsZan: function (paramObj) {
        return Promise.post(Url.default.postingsZanUrl(), paramObj);
    },
    // 圈子内容详情
    postingsInfo: function (paramObj) {
        return Promise.post(Url.default.postingsInfoUrl(), paramObj);
    },
    // 评论
    postingsComment: function (paramObj) {
        return Promise.post(Url.default.postingsCommentUrl(), paramObj);
    },
    // 提交评论
    addPostingsComment: function (paramObj) {
        return Promise.post(Url.default.addPostingsCommentUrl(), paramObj);
    },
    // 点赞评论
    postingsCommentZan: function (paramObj) {
        return Promise.post(Url.default.postingsCommentZanUrl(), paramObj);
    },
    
}
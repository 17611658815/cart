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
    // 首页图片
    getShopHomeData: function (paramObj) {
        return Promise.post(Url.default.getShopHomeDataUrl(), paramObj);
    },
    // 获取社区帖子列表
    getPostingsList: function (paramObj) {
        return Promise.post(Url.default.getPostingsListUrl(), paramObj);
    },
    // 商品分类列表
    getGoodsType: function (paramObj) {
        return Promise.post(Url.default.getGoodsTypeUrl(), paramObj);
    },
    // 项目详情
    getShopdetails: function (paramObj) {
        return Promise.post(Url.default.getShopdetailsUrl(), paramObj);
    },
    // 项目详情
    getcommentList: function (paramObj) {
        return Promise.post(Url.default.getcommentListUrl(), paramObj);
    },
    // 项目服务时间
    getShopTime: function (paramObj) {
        return Promise.post(Url.default.getShopTimeUrl(), paramObj);
    },
    // 所在地区列表
    getArea: function (paramObj) {
        return Promise.post(Url.default.getAreaUrl(), paramObj);
    },
    // 购物车列表
    getcartList: function (paramObj) {
        return Promise.post(Url.default.getcartListUrl(), paramObj);
    },
    // 添加购物车
    addCart: function (paramObj) {
        return Promise.post(Url.default.addCartUrl(), paramObj);
    },
    // 修改购物车内容
    changeCart: function (paramObj) {
        return Promise.post(Url.default.changeCartUrl(), paramObj);
    },
    // 删除购物车项目
    delCartMsg: function (paramObj) {
        return Promise.post(Url.default.delCartMsgUrl(), paramObj);
    },
    // 订单确认页
    instantBuy: function (paramObj) {
        return Promise.post(Url.default.instantBuyUrl(), paramObj);
    },
    // 收获地址
    addresList: function (paramObj) {
        return Promise.post(Url.default.addresListUrl(), paramObj);
    },
    // 保存收获地址
    saveaddres: function (paramObj) {
        return Promise.post(Url.default.saveaddresUrl(), paramObj);
    },
    // 修改请求地址
    detailsAddres: function (paramObj) {
        return Promise.post(Url.default.detailsAddresUrl(), paramObj);
    },
    // 修改收获地址
    changeAddres: function (paramObj) {
        return Promise.post(Url.default.changeAddresUrl(), paramObj);
    },
    // 修改收获地址
    removeAddres: function (paramObj) {
        return Promise.post(Url.default.removeAddresUrl(), paramObj);
    },
    // 修改默认地址
    modifystatus: function (paramObj) {
        return Promise.post(Url.default.modifystatusUrl(), paramObj);
    },
    // 立即购买
    purchase: function (paramObj) {
        return Promise.post(Url.default.purchaseUrl(), paramObj);
    },
    // 微信支付
    wxpay: function (paramObj) {
        return Promise.post(Url.default.wxpayUrl(), paramObj);
    },
    // 微信支付回调
    paybac: function (paramObj) {
        return Promise.post(Url.default.paybackUrl(), paramObj);
    },
    // 优惠卷列表
    couponList: function (paramObj) {
        return Promise.post(Url.default.couponUrl(), paramObj);
    },
    // 订单列表
    getorderList: function (paramObj) {
        return Promise.post(Url.default.getorderListUrl(), paramObj);
    },
    // 订单详情
    otherDetails: function (paramObj) {
        return Promise.post(Url.default.otherDetailsUrl(), paramObj);
    },
    // 取消订单
    removeOther: function (paramObj) {
        return Promise.post(Url.default.removeOtherUrl(), paramObj);
    },
    // 我的评价
    comments: function (paramObj) {
        return Promise.post(Url.default.commentsUrl(), paramObj);
    },
    // 我的订单评价详情页
    comdetails: function (paramObj) {
        return Promise.post(Url.default.comdetailsUrl(), paramObj);
    },
    // 提交评价
    created: function (paramObj) {
        return Promise.post(Url.default.createdUrl(), paramObj);
    },
    // 购物车提交订单
    buycart: function (paramObj) {
        return Promise.post(Url.default.buycartUrl(), paramObj);
    },
    // 评论详情
    commDetails: function (paramObj) {
        return Promise.post(Url.default.commDetailsUrl(), paramObj);
    },
    // 我的收藏
    collect: function (paramObj) {
        return Promise.post(Url.default.collectUrl(), paramObj);
    },
    // 添加收藏
    collectCreated: function (paramObj) {
        return Promise.post(Url.default.collectCreatedUrl(), paramObj);
    },
}
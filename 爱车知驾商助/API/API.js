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
   
}
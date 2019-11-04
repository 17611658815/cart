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
    getShopListByLocation: function (paramObj) {
        return Promise.post(Url.default.getShopListByLocationUrl(), paramObj);
    },
    // 店铺信息
    getShopInfo: function (paramObj) {
        return Promise.post(Url.default.getShopInfoUrl(), paramObj);
    },
    // 店铺信息
    createOrder: function (paramObj) {
        return Promise.post(Url.default.createOrderUrl(), paramObj);
    },
    // 订单列表
    orderList: function (paramObj) {
        return Promise.post(Url.default.orderListUrl(), paramObj);
    },
    // 订单详情
    orderDetail: function (paramObj) {
        return Promise.post(Url.default.orderDetailUrl(), paramObj);
    },
    
}
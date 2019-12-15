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
    // 存车辆信息
    saveCar: function (paramObj) {
        return Promise.post(Url.default.saveCarUrl(), paramObj);
    },
    // 我的车辆信息
    carList: function (paramObj) {
        return Promise.post(Url.default.carListUrl(), paramObj);
    },
    // 删除车辆信息
    carDel: function (paramObj) {
        return Promise.post(Url.default.carDelUrl(), paramObj);
    },
    // 搜索服务
    serviceList: function (paramObj) {
        return Promise.post(Url.default.serviceListUrl(), paramObj);
    },
    // 选择服务
    showService: function (paramObj) {
        return Promise.post(Url.default.showServiceUrl(), paramObj);
    },
    // 判断是否有车
    isHaveCar: function (paramObj) {
        return Promise.post(Url.default.isHaveCarUrl(), paramObj);
    },
    // 服务详情
    showServiceDetail: function (paramObj) {
        return Promise.post(Url.default.showServiceDetailUrl(), paramObj);
    },
    // 获取区域id
    getAreaId: function (paramObj) {
        return Promise.post(Url.default.getAreaIdUrl(), paramObj);
    },
    // 生成订单支付
    createServiceOrder: function (paramObj) {
        return Promise.post(Url.default.createServiceOrderUrl(), paramObj);
    },
    // 获取订单状态
    getOrderStatus: function (paramObj) {
        return Promise.post(Url.default.getOrderStatusUrl(), paramObj);
    },
    
}
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
    getOpenId: function(paramObj) {
        return Promise.post(Url.default.getOpenIdUrl(), paramObj);
    },
    // 微信登录
    wxLogin: function(paramObj) {
        return Promise.post(Url.default.wxLoginUrl(), paramObj);
    },
    // 首页图片
    getShopListByLocation: function(paramObj) {
        return Promise.post(Url.default.getShopListByLocationUrl(), paramObj);
    },
    // 店铺信息
    getShopInfo: function(paramObj) {
        return Promise.post(Url.default.getShopInfoUrl(), paramObj);
    },
    // 店铺信息
    createOrder: function(paramObj) {
        return Promise.post(Url.default.createOrderUrl(), paramObj);
    },
    // 订单列表
    orderList: function(paramObj) {
        return Promise.post(Url.default.orderListUrl(), paramObj);
    },
    // 订单详情
    orderDetail: function(paramObj) {
        return Promise.post(Url.default.orderDetailUrl(), paramObj);
    },
    // 存车辆信息
    saveCar: function(paramObj) {
        return Promise.post(Url.default.saveCarUrl(), paramObj);
    },
    // 我的车辆信息
    carList: function(paramObj) {
        return Promise.post(Url.default.carListUrl(), paramObj);
    },
    // 删除车辆信息
    carDel: function(paramObj) {
        return Promise.post(Url.default.carDelUrl(), paramObj);
    },
    // 搜索服务
    serviceList: function(paramObj) {
        return Promise.post(Url.default.serviceListUrl(), paramObj);
    },
    // 选择服务
    showService: function(paramObj) {
        return Promise.post(Url.default.showServiceUrl(), paramObj);
    },
    // 判断是否有车
    isHaveCar: function(paramObj) {
        return Promise.post(Url.default.isHaveCarUrl(), paramObj);
    },
    // 服务详情
    showServiceDetail: function(paramObj) {
        return Promise.post(Url.default.showServiceDetailUrl(), paramObj);
    },
    // 获取区域id
    getAreaId: function(paramObj) {
        return Promise.post(Url.default.getAreaIdUrl(), paramObj);
    },
    // 生成订单支付
    createServiceOrder: function(paramObj) {
        return Promise.post(Url.default.createServiceOrderUrl(), paramObj);
    },
    // 获取订单状态
    getOrderStatus: function(paramObj) {
        return Promise.post(Url.default.getOrderStatusUrl(), paramObj);
    },
    // 优惠卷列表
    couponList: function(paramObj) {
        return Promise.post(Url.default.couponListUrl(), paramObj);
    },
    // 获取用户手机号
    analysisUserPhone: function(paramObj) {
        return Promise.post(Url.default.analysisUserPhoneUrl(), paramObj);
    },
    // 保存用户手机号
    phoneLogin: function(paramObj) {
        return Promise.post(Url.default.phoneLoginUrl(), paramObj);
    },
    // 取消订单
    cancelOrder: function(paramObj) {
        return Promise.post(Url.default.cancelOrderUrl(), paramObj);
    },
    // 申请退货
    refundOrder: function(paramObj) {
        return Promise.post(Url.default.refundOrderUrl(), paramObj);
    },
    // 子订单支付
    paySubOrder: function(paramObj) {
        return Promise.post(Url.default.paySubOrderUrl(), paramObj);
    },
    // 消息已读
    noticeRead: function(paramObj) {
        return Promise.post(Url.default.noticeReadUrl(), paramObj);
    },
    // 消息列表
    noticeList: function(paramObj) {
        return Promise.post(Url.default.noticeListUrl(), paramObj);
    },
    // 消息详情
    noticeInfo: function(paramObj) {
        return Promise.post(Url.default.noticeInfoUrl(), paramObj);
    },
    // 订单评价
    appraiseServiceOrder: function(paramObj) {
        return Promise.post(Url.default.appraiseServiceOrderUrl(), paramObj);
    },
    // 商品评价
    appraiseShopOrder: function(paramObj) {
        return Promise.post(Url.default.appraiseShopOrderUrl(), paramObj);
    },
    // 车主服务列表
    getRecommend: function(paramObj) {
        return Promise.post(Url.default.getRecommendUrl(), paramObj);
    },
    // 法律条款
    getContentList: function(paramObj) {
        return Promise.post(Url.default.getContentListUrl(), paramObj);
    },
    // 法律条款详情
    getContentInfo: function(paramObj) {
        return Promise.post(Url.default.getContentInfoUrl(), paramObj);
    },
    // 来店服务
    getCarAdapterProduct: function(paramObj) {
        return Promise.post(Url.default.getCarAdapterProductUrl(), paramObj);
    },
    // 商品列表
    getGoodsList: function(paramObj) {
        return Promise.post(Url.default.getGoodsListUrl(), paramObj);
    },
    // 分享二维码
    QRcode: function(paramObj) {
        return Promise.post(Url.default.QRcodeUrl(), paramObj);
    },
    // 获取订单状态
    checkAssessOrder: function(paramObj) {
        return Promise.post(Url.default.checkAssessOrderUrl(), paramObj);
    },
    // 服务分类
    getCatTreeData: function(paramObj) {
        return Promise.post(Url.default.getCatTreeDataUrl(), paramObj);
    },
    // 客服文案
    getLatestOrder: function(paramObj) {
        return Promise.post(Url.default.getLatestOrderUrl(), paramObj);
    },
    // 我的邀请
    getMyInvite: function(paramObj) {
        return Promise.post(Url.default.getMyInviteUrl(), paramObj);
    },

}
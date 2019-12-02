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
    // 提交内容
    setSubscribeMessage: function (paramObj){
        return Promise.post(Url.default.setSubscribeMessageUrl(), paramObj);
    }
    
}
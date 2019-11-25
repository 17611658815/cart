export default class Url {
    static USER = "https://api.dodo.wiki/appInterface/user"
    static PATH = "https://api.dodo.wiki/appInterface/consumer"
    static ART = "https://api.dodo.wiki/appInterface/artificer"
    // 获取openid
    static getOpenIdUrl() {
        return Url.USER + '/getOpenid';
    };
    // wxLogin
    static wxLoginUrl() {
        return Url.USER + '/wxLogin';
    };
    // 获取手机号
    static analysisUserPhoneUrl() {
        return Url.USER + '/analysisUserPhone';
    };
    // save注册信息
    static saveUserInfoUrl() {
        return Url.ART + '/saveUserInfo';
    };
    // 获取维师信息
    static getUserInfoUrl() {
        return Url.ART + '/getUserInfo';
    };
    // 订单列表
    static orderListUrl() {
        return Url.ART + '/orderList';
    };
    // 订单详情
    static getOrderInfoUrl() {
        return Url.ART + '/getOrderInfo';
    };
    // 派单详情
    static getWillOrderUrl() {
        return Url.ART + '/getWillOrder';
    };
    // 选择维修店铺
    static getJishiShopUrl() {
        return Url.ART + '/getJishiShop';
    };
    // 确定店铺
    static acceptOrderUrl() {
        return Url.ART + '/acceptOrder';
    };
    // 搜索商品-服务
    static getGoodsServiceUrl() {
        return Url.ART + '/getGoodsService';
    };
    // 生成订单
    static creatSubOrderUrl() {
        return Url.ART + '/creatSubOrder';
    };
   
}
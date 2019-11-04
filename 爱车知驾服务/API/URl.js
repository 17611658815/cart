export default class Url {
    static USER = "https://api.dodo.wiki/appInterface/user"
    static PATH = "https://api.dodo.wiki/appInterface/consumer"
    // 获取openid
    static getOpenIdUrl() {
        return Url.USER + '/getOpenid';
    };
    // wxLogin
    static wxLoginUrl() {
        return Url.USER + '/wxLogin';
    };
    // 首页附近店铺
    static getShopListByLocationUrl() {
        return Url.PATH + '/getShopListByLocation';
    };
    // 店铺详情
    static getShopInfoUrl() {
        return Url.PATH + '/getShopInfo';
    };
    // 购买添加购物车
    static createOrderUrl() {
        return Url.PATH + '/createOrder';
    };
    // 订单列表
    static orderListUrl() {
        return Url.PATH + '/orderList';
    };
    // 订单详情
    static orderDetailUrl() {
        return Url.PATH + '/orderDetail';
    };
    
   

}
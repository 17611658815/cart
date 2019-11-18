export default class Url {
    static USER = "https://api.dodo.wiki/appInterface/user"
    static PATH = "https://api.dodo.wiki/appInterface/shop"

    // 获取openid
    static getOpenIdUrl() {
        return Url.USER + '/getOpenid';
    };
    // wxLogin
    static wxLoginUrl() {
        return Url.USER + '/wxLogin';
    };
    // 首页数据接口
    static getShopHomeDataUrl() {
        return Url.PATH + '/getShopHomeData';
    };
    // 获取社区帖子列表
    static getPostingsListUrl() {
        return Url.PATH + '/getPostingsList';
    }
    // 订单列表
    static getOrderListUrl() {
        return Url.PATH + '/getOrderList';
    }
    // 订单详情
    static orderDetailUrl() {
        return Url.PATH + '/orderDetail';
    }
    // 订单退款
    static setOrderRefundUrl() {
        return Url.PATH + '/setOrderRefund';
    }
    // 订单拒绝退款
    static setOrderNoRefundUrl() {
        return Url.PATH + '/setOrderNoRefund';
    }
    // 订单发货
    static setOrderSendUrl() {
        return Url.PATH + '/setOrderSend';
    }
   

}
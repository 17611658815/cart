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
    // 获取手机号
    static analysisUserPhoneUrl() {
        return Url.USER + '/analysisUserPhone';
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
    // 选择添加商品
    static getGoodsTypeUrl() {
        return Url.PATH + '/getGoodsType';
    }
    // 分类列表
    static getTypeGoodsUrl() {
        return Url.PATH + '/getTypeGoods';
    }
    // 添加商品
    static addShopGoodsUrl() {
        return Url.PATH + '/addShopGoods';
    }
    // 获取订单列表
    static getOrderListUrl() {
        return Url.PATH + '/getOrderList';
    }
    // 存储注册信息
    static saveShopInfoUrl() {
        return Url.PATH + '/saveShopInfo';
    }
    // 设置消息模板权限
    static setSubscribeMessageUrl() {
        return Url.USER + '/setSubscribeMessage';
    }
    // 获取商铺信息
    static getShopInfoUrl() {
        return Url.PATH + '/getShopInfo';
    }
    // 获取技师列表
    static getShopJishiUrl() {
        return Url.PATH + '/getShopJishi';
    }
    // 同意-拒绝技师
    static setShopJishiUrl() {
        return Url.PATH + '/setShopJishi';
    }
   

}
export default class Url {
    static PATH = "https://api.dodo.wiki/appInterface"
    // https://api.dodo.wiki/appInterface/shop/getShopHomeData?appid=10

    // 获取openid
    static getOpenIdUrl() {
        return 'https://api.weixin.qq.com/sns/jscode2session';
    };
    // wxLogin
    static wxLoginUrl() {
        return Url.PATH + '/api/login';
    };
    // 首页数据接口
    static getindexImgUrl() {
        return Url.PATH + '/api/index';
    };
    // 分类标题
    static getClassTitleUrl() {
        return Url.PATH + '/api/type';
    };
    // 项目列表
    static getTypeListUrl() {
        return Url.PATH + '/api/type/list';
    };
    // 项目详情
    static getShopdetailsUrl() {
        return Url.PATH + '/api/details';
    };
    // 评论列表
    static getcommentListUrl() {
        return Url.PATH + '/api/comments';
    };
    // 评论详细
    static commDetailsUrl() {
        return Url.PATH + '/api/comments/details';
    };
    // 项目服务时间
    static getShopTimeUrl() {
        return Url.PATH + '/api/details/datetime';
    };
    // 所在地区列表
    static getAreaUrl() {
        return Url.PATH + '/api/area';
    };
    // 购物车列表
    static getcartListUrl() {
        return Url.PATH + '/api/cart';
    };
    // 添加购物车
    static addCartUrl() {
        return Url.PATH + '/api/cart/created';
    };
    // 修改购物车内容
    static changeCartUrl() {
        return Url.PATH + '/api/cart/modify';
    };
    // 删除购物车项目
    static delCartMsgUrl() {
        return Url.PATH + '/api/cart/remove';
    };
    // 立即购买
    static instantBuyUrl() {
        return Url.PATH + '/api/order';
    };
    // 收货地址
    static addresListUrl() {
        return Url.PATH + '/api/address';
    };
    // 保存收货地址
    static saveaddresUrl() {
        return Url.PATH + '/api/address/created';
    };
    // 修改请求地址
    static detailsAddresUrl() {
        return Url.PATH + '/api/address/details';
    };
    // 修改收获地址
    static changeAddresUrl() {
        return Url.PATH + '/api/address/modify';
    };
    // 删除收获地址
    static removeAddresUrl() {
        return Url.PATH + '/api/address/remove';
    };
    // 修改默认地址
    static modifystatusUrl() {
        return Url.PATH + '/api/address/modifystatus';
    };
    //  立即购买
    static purchaseUrl() {
        return Url.PATH + '/api/order/created';
    };
    //  微信支付
    static wxpayUrl() {
        return Url.PATH + '/api/pay';
    };
    //  微信支付回调
    static paybackUrl() {
        return Url.PATH + '/api/pay/payback';
    };
    //  优惠卷列表
    static couponUrl() {
        return Url.PATH + '/api/coupon';
    };
    //  订单列表
    static getorderListUrl() {
        return Url.PATH + '/api/home/order';
    };
    //  订单详情
    static otherDetailsUrl() {
        return Url.PATH + '/api/home/order/details';
    };
    //  取消订单
    static removeOtherUrl() {
        return Url.PATH + '/api/home/order/remove';
    };
    //  我的订单评价
    static commentsUrl() {
        return Url.PATH + '/api/home/comments';
    };
    //  我的订单评价详情页
    static comdetailsUrl() {
        return Url.PATH + '/api/home/comdetails';
    };
    //  提交评价
    static createdUrl() {
        return Url.PATH + '/api/comments/created';
    };
    //  购物车下单
    static buycartUrl() {
        return Url.PATH + '/api/order/buycart';
    };
    //  我的收藏列表
    static collectUrl() {
        return Url.PATH + '/api/collect';
    };
    //  添加收藏
    static collectCreatedUrl() {
        return Url.PATH + '/api/collect/created';
    };
   

}
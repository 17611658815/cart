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
        return Url.PATH + '/getOrderInfo';
    };
    // 存车辆信息
    static saveCarUrl() {
        return Url.PATH + '/saveCar';
    };
    // 车辆列表
    static carListUrl() {
        return Url.PATH + '/carList';
    };
    // 删除车辆信息
    static carDelUrl() {
        return Url.PATH + '/carDel';
    };
    // 搜索服务
    static serviceListUrl() {
        return Url.PATH + '/serviceList';
    };
    // 搜索服务
    static showServiceUrl() {
        return Url.PATH + '/showService';
    };
    // 搜索服务
    static isHaveCarUrl() {
        return Url.PATH + '/isHaveCar';
    };
    // 服务详情
    static showServiceDetailUrl() {
        return Url.PATH + '/showServiceDetail';
    };
    // 区域id
    static getAreaIdUrl() {
        return Url.PATH + '/getAreaId';
    };
    // 
    static createServiceOrderUrl() {
        return Url.PATH + '/createServiceOrder';
    };
    // 订单状态
    static getOrderStatusUrl() {
        return Url.PATH + '/getOrderStatus';
    };
    // 优惠卷列表
    static couponListUrl() {
        return Url.PATH + '/couponList';
    };
    // 获取用户手机号
    static analysisUserPhoneUrl() {
        return Url.USER + '/analysisUserPhone';
    };
    // 保存用户手机号
    static phoneLoginUrl() {
        return Url.USER + '/phoneLogin';
    };
    // 取消订单
    static cancelOrderUrl() {
        return Url.PATH + '/cancelOrder';
    };
    // 子订单支付
    static paySubOrderUrl() {
        return Url.PATH + '/paySubOrder';
    };
    // 消息已读
    static noticeReadUrl() {
        return Url.USER + '/noticeRead';
    }
    // 消息列表
    static noticeListUrl() {
        return Url.PATH + '/noticeList';
    }
    // 消息详情
    static noticeInfoUrl() {
        return Url.PATH + '/noticeInfo';
    }
    // 订单评价
    static appraiseServiceOrderUrl() {
        return Url.PATH + '/appraiseServiceOrder';
    }
    // 店铺评价
    static appraiseShopOrderUrl() {
        return Url.PATH + '/appraiseShopOrder';
    }
    // 车主服务
    static getRecommendUrl() {
        return Url.PATH + '/getRecommend';
    }
    // 法律条款
    static getContentListUrl() {
        return Url.PATH + '/getContentList';
    }
    // 法律条款详情
    static getContentInfoUrl() {
        return Url.PATH + '/getContentInfo';
    }
    //  来店服务
    static getCarAdapterProductUrl() {
        return Url.PATH + '/getCarAdapterProduct';
    }
    //  商品列表
    static getGoodsListUrl() {
        return Url.PATH + '/getGoodsList';
    }
  
}
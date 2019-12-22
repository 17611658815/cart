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
        return Url.PATH + '/saveShopGoods';
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
    // 消息通知
    static noticeListUrl() {
        return Url.PATH + '/noticeList';
    }
    // 消息详情
    static noticeInfoUrl() {
        return Url.PATH + '/noticeInfo';
    }
    // 消息已读
    static noticeReadUrl() {
        return Url.USER + '/noticeRead';
    }
    // 消息是否订阅
    static messagePowerUrl() {
        return Url.PATH + '/messagePower';
    }
    // 获取创建商品数量
    static getShopGoodsNumUrl() {
        return Url.PATH + '/getShopGoodsNum';
    }
    // 红包-优惠卷-活动列表
    static getShopActivitieUrl() {
        return Url.PATH + '/getShopActivitie';
    }
    // 添加-红包-优惠卷-活动
    static addShopActivitieUrl() {
        return Url.PATH + '/addShopActivitie'; 
    }
    // 奖励
    static getShopTaskInfoUrl() {
        return Url.PATH + '/getShopTaskInfo';
    }
    // 领取奖励
    static getShopScoreUrl() {
        return Url.PATH + '/getShopScore';
    }
    // 商品热搜词
    static getSearchWordsUrl() {
        return Url.PATH + '/getSearchWords';
    }
    // 商品列表
    static getShopGoodsListUrl() {
        return Url.PATH + '/getShopGoodsList';
    }
    // 获取商品信息
    static getShopGoodsUrl() {
        return Url.PATH + '/getShopGoods';
    }
    // 删除商品
    static setShopGoodsStatusUrl() {
        return Url.PATH + '/setShopGoodsStatus';
    }
    // 账户资金
    static getBillHomeDataUrl() {
        return Url.PATH + '/getBillHomeData';
    }
    // 贷款明细
    static getBillListUrl() {
        return Url.PATH + '/getBillList';
    }
    // 银行卡列表
    static getBankCardListUrl() {
        return Url.PATH + '/getBankCardList';
    }
    // 添加银行卡
    static addBankCardUrl() {
        return Url.PATH + '/addBankCard';
    }
    // 删除银行卡
    static delBankCardUrl() {
        return Url.PATH + '/delBankCard';
    }
    // 商家客服数据
    static customerHomeUrl() {
        return Url.PATH + '/customerHome';
    }
    // 商家客服列表
    static customerListUrl() {
        return Url.PATH + '/customerList';
    }
    // 推广概况
    static promotionHomeDataUrl() {
        return Url.PATH + '/promotionHomeData';
    }
    // 店铺进宝
    static shopJinbaoDataUrl() {
        return Url.PATH + '/shopJinbaoData';
    }
    // 数据分析
    static operateDataUrl() {
        return Url.PATH + '/operateData';
    }
    // 内容详情
    static getSysContentInfoUrl() {
        return Url.PATH + '/getSysContentInfo';
    }
    // 舍友圈
    static communityHomeDataUrl() {
        return Url.PATH + '/communityHomeData';
    }
    // 社区列表
    static postingsListUrl() {
        return Url.PATH + '/postingsList';
    }
    // 帖子详情
    static postingsInfoUrl() {
        return Url.PATH + '/postingsInfo';
    }
    // 获取评论列表
    static postingsCommentUrl() {
        return Url.PATH + '/postingsComment';
    }
    // 提交评论
    static addPostingsCommentUrl() {
        return Url.PATH + '/addPostingsComment';
    }
    // 点赞
    static postingsZanUrl() {
        return Url.PATH + '/postingsZan';
    }
    // 收藏
    static postingsCollectionUrl() {
        return Url.PATH + '/postingsCollection';
    }
    // 评论赞
    static postingsCommentZanUrl() {
        return Url.PATH + '/postingsCommentZan';
    }
    // 收藏文章列表
    static collectionPostingsUrl() {
        return Url.PATH + '/collectionPostings';
    }
    // 发布帖子
    static addPostingsUrl() {
        return Url.PATH + '/addPostings';
    };

}

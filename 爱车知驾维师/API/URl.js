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
    // 进度-照片-视频提交
    static addOrderContentUrl() {
        return Url.ART + '/addOrderContent';
    };
    // 保存订阅消息状态
    static setSubscribeMessageUrl() {
        return Url.USER + '/setSubscribeMessage';
    };
    // 店铺列表
    static getJishiShopUrl() {
        return Url.ART + '/getJishiShop';
    };
    // 添加店铺搜索
    static searchShopUrl() {
        return Url.ART + '/searchShop';
    };
    // 保存店铺
    static saveJishiShopUrl() {
        return Url.ART + '/saveJishiShop';
    };
    // 回显店铺信息
    static getJishiShopInfoUrl() {
        return Url.ART + '/getJishiShopInfo';
    };
    // 消息列表
    static noticeListUrl() {
        return Url.ART + '/noticeList';
    };
    // 消息详情
    static noticeInfoUrl() {
        return Url.ART + '/noticeInfo';
    };
    // 消息已读
    static noticeReadUrl() {
        return Url.USER + '/noticeRead';
    }
    // 我的累计登录-发帖-评论-获赞
    static getCenterDataUrl() {
        return Url.ART + '/getCenterData';
    }
    // 立即加入保险
    static jishiInsuranceUrl() {
        return Url.ART + '/jishiInsurance';
    }
    // 我的邀请
    static getInviteAwardUrl() {
        return Url.ART + '/getInviteAward';
    }
    // 我的钱包
    static getAccountBalanceUrl() {
        return Url.ART + '/getAccountBalance';
    }
    // 规则详情
    static getContentInfoUrl() {
        return Url.ART + '/getContentInfo';
    }
    // 维师故事
    static getRecommendUrl() {
        return Url.ART + '/getRecommend';
    }
    // 常见问题
    static getContentListUrl() {
        return Url.ART + '/getContentList';
    }
    // 添加提现记录
    static addCashLogUrl() {
        return Url.ART + '/addCashLog';
    };
    // 维师圈
    static getPostingsListUrl() {
        return Url.ART + '/getPostingsList';
    };
    // 点赞
    static postingsZanUrl() {
        return Url.ART + '/postingsZan';
    };
    // 圈子内容详情
    static postingsInfoUrl() {
        return Url.ART + '/postingsInfo';
    };
    // 评论
    static postingsCommentUrl() {
        return Url.ART + '/postingsComment';
    };
   
    // 提交评论
    static addPostingsCommentUrl() {
        return Url.ART + '/addPostingsComment';
    };
    // 点赞评论
    static postingsCommentZanUrl() {
        return Url.ART + '/postingsCommentZan';
    };
    // 获取银行卡列表
    static getBankCardListUrl() {
        return Url.ART + '/getBankCardList';
    };
    // 获取评论列表
    static getMyPostingsCommentUrl() {
        return Url.ART + '/getMyPostingsComment';
    };
    // 发布文章
    static addPostingsUrl() {
        return Url.ART + '/addPostings';
    };
    // 赞列表
    static getMyPostingsZanUrl() {
        return Url.ART + '/getMyPostingsZan';
    };
    // 添加银行卡
    static addBankCardUrl() {
        return Url.ART + '/addBankCard';
    };
   
}
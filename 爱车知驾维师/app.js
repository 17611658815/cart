//app.js
const Api = require('API/API.js');
App({
    onLaunch: function () {

        wx.getSystemInfo({
            success: (res) => {
                console.log(res)
                if (res.model.search('iPhone X') != -1) {
                    this.globalData.isIphoneX = true
                }
            }
        })
    },
    //检查登录
    checkLogin: function () {
        let userInfo = wx.getStorageSync('userinfo') || '';
        if (userInfo == "") {
            wx.navigateTo({
                url: '/pages/login/login',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
            })
        }
    },
    // 推荐位
    getRecommend(id, limit, recommend) {
        let that = this,
            params = new Object();
        params.appid = that.globalData.appid;
        params.recommend_catid = id;
        params.limit = limit;
        params.recommend = recommend;
        return new Promise((resolve, reject) => {
            that.net.$Api.getRecommend(params).then((res) => {
                resolve(res.data.data)
            })

        })
    },
    // 获取消息未读数量
    getUnreadMsgNum(id) {
        let that = this,
            params = new Object();
        params.appid = that.globalData.appid;
        params.member_id = id;
        return new Promise((resolve, reject) => {
            that.net.$Api.getUnreadMsgNum(params).then((res) => {
                console.log(res)
                resolve(res.data)
            })

        })
    },
    //挂载网络请求api
    net: {
        $Api: Api.api,
    },
    globalData: {

        userInfo: null,
        isIphoneX: false,
        appid: '9'
    },
    loading: function (content) {
        wx.showLoading({
            mask: true,
            title: content,
            icon: 'loading',
        })
    },
    alert: function (content) {
        wx.showModal({
            title: '温馨提示',
            content: content,
            showCancel: false
        })
        return this
    },
    setTitle: function (content) {
        wx.setNavigationBarTitle({
            title: content
        })
    },
    setStorage(key, data){
        wx.setStorage({
            key: key,
            data: data,
        })
    }
     

})
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
//app.js
const Api = require('API/API.js');
App({
    onLaunch: function () {
        let userInfo = wx.getStorageSync('userinfo') || '';
        if (userInfo == "") {
            wx.navigateTo({
                url: '/pages/wxLogin/wxLogin',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
            })
        }
        wx.getSystemInfo({
            success: (res) => {
                console.log(res)
                if (res.model.search('iPhone X') != -1) {
                    this.globalData.isIphoneX = true
                }
            }
        })
    },
    //挂载网络请求api
    net: {
        $Api: Api.api,
    },
    globalData: {
        userInfo: null,
        isIphoneX: false,
        appid: '10',
        logistics:''
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
})
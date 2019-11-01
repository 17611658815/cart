//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad: function() {

    },
    godataCenter() {
        wx.navigateTo({
            url: '/pages/dataCenter/dataCenter',
        })
    },
    // 订单管理
    gootherType() {
        wx.navigateTo({
            url: '/pages/otherType/otherType',
        })
    },
    // 商家社区
    gocommunity() {
        wx.navigateTo({
            url: '/pages/community/community',
        })
    },
    // 获取首页图片
    // getindexImg() {
    //     let that = this,
    //         params = {}
    //     app.net.$Api.getindexImg(params).then((res) => {
    //         that.setData({
    //             homePicData: res.data
    //         })
    //     })
    // },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
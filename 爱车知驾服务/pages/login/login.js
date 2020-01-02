// pages/login/login.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid:''
    },
    getUserInfo: function() {
        var that = this;
        wx.login({
            success: function(loginCode) {
                app.loading('登陆中')
                //获取用户信息
                wx.getUserInfo({
                    lang:'zh_CN',
                    success: function(res) { // 当用户授权成功的时候，保存用户的登录信息 
                        console.log(res)
                        app.globalData.userInfo = res.userInfo;
                        that.getOpenid(loginCode);
                    },
                    fail: function(res) { //用户点了“拒绝” 
                        wx.navigateBack();
                        console.log('用户点了“拒绝” ')
                        wx.hideLoading();
                    },
                    complete: function(res) {
                        console.log('res', res);
                    }
                })
            }
        })
    },
    //用户拒绝授权,返回上层页面
    userRefuse: function () {
        wx.navigateBack();
    },
    getOpenid: function(loginCode) {
        let that = this,
            params = {
                appid: app.globalData.appid,
                code: loginCode.code
            }
        app.net.$Api.getOpenId(params).then((res) => {
            console.log(res)
            that.saveUserInfo(res.data.openid)
        })
    },
    saveUserInfo: function (openid) {
        var that = this;
        let params = {
            appid: app.globalData.appid,
            userInfo: app.globalData.userInfo,
            openid: openid
        }
        console.log(app.globalData.userInfo)
        app.net.$Api.wxLogin(params).then((res) => {
            console.log(res.data)
            wx.setStorageSync("userinfo", res.data);
            wx.hideLoading();
            wx.reLaunch({
                url: '/pages/index/index',
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
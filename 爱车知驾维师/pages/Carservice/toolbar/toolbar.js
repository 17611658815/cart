// pages/Carservice/toolbar/toolbar.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:0,
        navList: ['首页', '知驾服务'],
        currentTab: 1,
        btnNavcurrent: 2,
    },
    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {
        let userInfo = wx.getStorageSync('userinfo') || {};
        this.setData({
            member_id: userInfo.id,
            userInfo: userInfo
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    gomessageList() {
        if (!this.data.member_id) {
            app.checkLogin();
        } else {
            wx.navigateTo({
                url: '/pages/messageList/messageList',
            })
        }
    },
    // 导航tab切换
    goIndex(e) {
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    goCircle() {
        wx.reLaunch({
            url: "/pages/Carservice/circle/circle",
        })
    },
    gomaycenter() {
        wx.navigateTo({
            url: '/pages/Carservice/maycenter/maycenter',
        })
    },
    goOtherList(){
        console.log('1111')
        wx.navigateTo({
            url: '/pages/otherList/otherList',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

   

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
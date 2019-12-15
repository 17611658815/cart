// pages/Carservice/circle/circle.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: ['首页', '知驾服务'],
        currentTab: 1,//顶部切换
        btnNavcurrent: 1,//底部切换
        circle_Nav: [{ name: '我的', icon: '' }, { name: '排行榜', icon: '' },{ name: '技能证书', icon: '' }],
        circle_Tab:['本地推荐','最新','全国热点','知驾随行'],
        circleTabNum:0,//内容切换

    },
    gomessageList() {
        wx.navigateTo({
            url: '/pages/messageList/messageList',
        })
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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
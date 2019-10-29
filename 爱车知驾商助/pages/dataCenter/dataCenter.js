// pages/dataCenter/dataCenter.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab:0,//头部导航
        tractionTab:0,//实时-日报-周报-月报
        navList: ['首页', '流量', '商品', '客服', '送货', '售后'],
        traction:['实时','日报','周报','月报']
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index
        })
    },
    // 交易数据切换
    tractionTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            tractionTab: index
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
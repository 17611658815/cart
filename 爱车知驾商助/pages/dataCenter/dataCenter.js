// pages/dataCenter/dataCenter.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:0,
        onload:1,
        type:1,
        currentTab:0,//头部导航
        tractionTab:0,//实时-日报-周报-月报
        navList: ['首页', '流量', '商品', '客服', '送货', '售后'],
        traction:['实时','日报','周报','月报'],
        dataObj:{}
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index,
            onload:0,
        })
        this.operateData()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            member_id: userInfo.id
        })
        this.operateData()
    },
    operateData() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.onload = that.data.onload;
        params.type = that.data.currentTab;
        app.net.$Api.operateData(params).then((res) => {
            that.setData({
                dataObj:res.data
            })
        })
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
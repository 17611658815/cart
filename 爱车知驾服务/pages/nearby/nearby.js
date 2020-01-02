// pages/nearby/nearby.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        top: 0,
        city: '',
        currentTab: 0,
        searchData: [],
        searchDatalength: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        this.setData({
            city: app.globalData.city
        })
        this.getMarkersList()
    },
    onPageScroll: function(e) {
        var that = this;
        that.setData({
            top: e.scrollTop
        })
    },
    // 获取附近店铺
    getMarkersList() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            // lat: '39.905277252197266',
            // lng: '116.51362609863281',
            lat: app.globalData.latitude,
            lng: app.globalData.longitude,
        }
        app.loading('加载中')
        app.net.$Api.getShopListByLocation(params).then((res) => {
            console.log(res)
            wx.hideLoading()
            that.setData({
                searchData: res.data,
                searchDatalength: res.data.length,
            })

        })
    },
    goShopDetaile(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/shopDetaile/shopDetaile?id='+id,
        })
    },
    switchTab(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.index
        })
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
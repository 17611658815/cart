// pages/joinRecruit/joinRecruit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        city:'',
        isShow:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    gojoinReq(){
        wx.navigateTo({
            url: '/pages/joinReq/joinReq',
        })
    },
    gosetAddress(){
        wx.navigateTo({
            url: '/pages/setAddress/setAddress',
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
        let city = wx.getStorageSync('city');
        console.log(city,41)
        this.setData({
            city: city
        })
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
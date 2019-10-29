// pages/recommend/recommend.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab:0,
        msgList: [
            { url: "url", title: "多地首套房贷利率上浮 热点城市渐迎零折扣时代" },
            { url: "url", title: "交了20多年的国内漫游费将取消 你能省多少话费？" },
            { url: "url", title: "北大教工合唱团出国演出遇尴尬:被要求给他人伴唱" }
        ],
    },
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index
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
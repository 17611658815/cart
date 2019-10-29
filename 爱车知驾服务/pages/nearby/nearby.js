// pages/nearby/nearby.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab:0,
        searchData:[{
            key: '汽车服务店',
            name: '汽车服务店（华创生活广场店）',
            id: '1'
        },
            {
                key: '汽车服务店',
                name: '汽车服务店（华创生活广场店）',
                id: '1'
            }, {
                key: '汽车服务店',
                name: '汽车服务店（华创生活广场店）',
                id: '1'
            }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    goShopDetaile(){
        wx.navigateTo({
            url: '/pages/shopDetaile/shopDetaile',
        })
    },
    switchTab(e){
        this.setData({
            currentTab: e.currentTarget.dataset.index
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
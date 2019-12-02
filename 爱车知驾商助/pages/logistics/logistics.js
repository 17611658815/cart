// page/order/pages/newAddress/newAddress.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logisticsName: '', // 物流名称
        logisticsNum: '', //物流单号
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        let address = wx.getStorageSync('address') || {};
        that.setData({
            addresMsg: address.addresMsg || '',
            username: address.name || '',
            mobile: address.mobile || '',
        })
    },
    // 物流单号
    mobileInpt(e) {
        this.setData({
            logisticsNum: e.detail.value
        })
    },
    // 物流名称
    usernameInpt(e) {
        this.setData({
            logisticsName: e.detail.value
        })
    },
    // 回显数据
    detailsAddres(id) {
        let that = this;

    },
    // 保存新增地址
    saveAddres() {
        let that = this;
        if (that.data.logisticsName == '') {
            app.alert('请完善联物流名称~')
            return;
        }
        if (that.data.logisticsNum == '') {
            app.alert('请输入物流的单号~')
            return;
        }
        app.globalData.logistics = that.data.logisticsName + ',' + that.data.logisticsNum
        wx.navigateBack({
            delta:1
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
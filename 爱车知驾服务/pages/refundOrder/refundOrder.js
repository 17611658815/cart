// pages/refundOrder/refundOrder.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:0,
        message:'',
        logisticsName: '', // 物流名称
        logisticsNum: '', //物流单号
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
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
    ontextareaChange(e){
        this.setData({
            message: e.detail.value
        })
    },
    // 退款
    refundOrder(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            id:that.data.id,
            remark: that.data.message,
            logistics: that.data.logisticsName,
            logistics_num: that.data.logisticsNum,
        }
        app.net.$Api.refundOrder(params).then((res) => {
            if (res.data.code == 200) {
                wx.showToast({
                    title: '申请成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            // that.NeworderList()
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 2000)
                    }
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000,
                })
            }
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
// pages/centerNav/deposit/deposit.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,//页码
        on_off: false,//分页开关
        member_id: 0,//医生id
        loansList: [],//提现记录
        order_type:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userinfo = wx.getStorageSync('userinfo') || null;
        that.setData({
            member_id: userinfo.id,
            order_type: options.type || 0
        })
        console.log(options)
        that.getBillList()
    },
    getBillList() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            page: that.data.page,
            order_type: that.data.order_type
        }
        app.net.$Api.getBillList(params).then((res) => {
            if(res.data.data.length>0){
                that.setData({
                    loansList: that.data.loansList.concat(res.data.data)
                })
            }else{
                that.setData({
                    on_off:true
                })
            }
        })
    },
    
    onReachBottom: function () {
        var that = this;
        if (!that.data.on_off) {
            that.data.page++
            that.getBillList()
        } 
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
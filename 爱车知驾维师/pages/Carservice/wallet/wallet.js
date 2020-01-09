// pages/invite/invite.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userid: 0,
        money: "0:00",
        use: "0:00"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo') || {};
        this.setData({
            userid: userInfo.id,
            userInfo: userInfo,
            share_source: userInfo.share_source

        })
        this.getAccountBalance()
    },
    getAccountBalance() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.userid;
        app.net.$Api.getAccountBalance(params).then((res) => {
            console.log(res)
            that.setData({
                money: res.data.money,
                use: res.data.use,
            })
        })
    },
    gowallet() {
        wx.navigateTo({
            url: '/pages/Carservice/wallet/wallet',
        })
    },
    godepositapply(){
        wx.navigateTo({
            url: '/pages/depositapply/depositapply',
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

})
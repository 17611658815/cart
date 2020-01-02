// pages/noticeInfo/noticeInfo.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:0,
        msg:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            id: options.id
        })
        this.noticeInfo();
        this.noticeRead();
    },
    noticeInfo() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            notice_id: that.data.id,
        }
        app.net.$Api.noticeInfo(params).then((res) => {
            console.log(res)
            that.setData({
                msg:res.data.data
            })
        })
    },
    noticeRead(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            id: that.data.id,
        }
        app.net.$Api.noticeRead(params).then((res) => {
            console.log(res)
          
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
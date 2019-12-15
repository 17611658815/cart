// pages/messageList/messageList.js
const app = getApp()
Page({

    data: {
        member_id: 0,
        page: 1,
        currentTab: 0,//头部导航
        navList: ['重要通知', '订单通知','店铺通知','其他通知'],
        msgList: [],
        on_off: false
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index,
            msgList: [],
            on_off: false,
            page: 1,
        })
        this.noticeList()
    },
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            member_id: userInfo.id,
            currentTab: options.currentTab ? options.currentTab:0
        })
        this.noticeList()
    },
    noticeList() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            type: that.data.currentTab+1,
            page: that.data.page
        }
        app.net.$Api.noticeList(params).then((res) => {
            console.log(res, 38)
            if (res.data.data.length > 0) {
                that.setData({
                    msgList: that.data.msgList.concat(res.data.data)
                })
            } else {
                that.setData({
                    on_off: true
                })
            }
        })
    },
    noticeRead(id, path) {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            id: id,
        }
        app.net.$Api.noticeRead(params).then((res) => {
            console.log(res)
            wx.reLaunch({
                url: path,
            })
        })
    },
    gonoticeInfo(e) {
        let id = e.currentTarget.dataset.id;
        let path = e.currentTarget.dataset.path;
        console.log(id, path)
        if (path) {
            console.log('1')
            this.noticeRead(id, path)
        } else {
            console.log('2')
            wx.navigateTo({
                url: '/pages/noticeInfo/noticeInfo?id=' + id,
            })
        }
    },
    /**
    * 页面上拉触底事件的处理函数
    */
    onReachBottom: function () {
        if (!this.data.on_off) {
            this.data.page++
            this.noticeList()
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
// pages/mayService/mayService.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:0,
        msgList_1:[],
        msgList_2:[],
        msgList_3:[],
        msgList_4:[],
        latestOrder:{},
        statusArr: { 1: "待付款", 2: "派单中", 3: "服务中", 4: "已完成", 5: "退款中", 6: "已退款", 7: "退款拒绝", 8: "取消订单", 9: "未发货", 10: '已发货', 11: "已收货", 12: "已评价" }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad (options) {
        let userinfo = wx.getStorageSync('userinfo') || '';
        this.data.member_id =  userinfo.id;
        this.getLatestOrder()
        let msgList_1 = await this.getContentList(32, 2);
        let msgList_2 = await this.getContentList(33, 2);
        let msgList_3 = await this.getContentList(34, 2);
        let msgList_4 = await this.getContentList(35, 2);
        console.log(msgList_1)
        this.setData({
            member_id: this.data.member_id,
            msgList_1,
            msgList_2,
            msgList_3,
            msgList_4,
        })
    },
    getLatestOrder() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id
        }
        app.net.$Api.getLatestOrder(params).then((res) => {
            console.log(res)
            that.setData({
                latestOrder:res.data.data
            })
        })
    },
    getContentList(id, limit){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            content_catid: id,
            limit: limit,
        }
        return new Promise((resolve, reject) => {
            app.net.$Api.getContentList(params).then((res) => {
                resolve(res.data.data)
            })
        })
    },
    gotextPage(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/textPage/textPage?id=' + id,
        })
    },
    goDetaile(e) {
        let id = e.currentTarget.dataset.id;
        let status = e.currentTarget.dataset.status;
        let type = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: '/pages/otherDetaile/otherDetaile?id=' + id + '&status=' + status,
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
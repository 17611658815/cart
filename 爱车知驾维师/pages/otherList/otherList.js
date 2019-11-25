const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        member_id: '',
        otherList: [],
        otherListLength: 1,
        on_off: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userinfo') || '';
        this.setData({
            member_id: userinfo.id
        })
        this.getOrderList()
    },
    // 购买
    getOrderList() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            page: that.data.page
        }
        app.loading('加载中')
        app.net.$Api.orderList(params).then((res) => {
            if (that.data.page == 1) {
                that.setData({
                    otherListLength: res.data.length,
                })
            }
            if (res.data.length > 0) {
                that.setData({
                    otherList: that.data.otherList.concat(res.data),
                })
            } else {
                that.setData({
                    on_off: true
                })
            }
            wx.hideLoading()
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.on_off) {
            this.data.page++
            this.getOrderList()
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
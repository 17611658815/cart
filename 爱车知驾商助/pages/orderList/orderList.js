const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:0,
        currentTab:0,
        status:0,
        page:1,
        on_off:false,
        // 4.已完成; 5.退款中; 6.已退款; 7.退款拒绝; 9未发货；10已发货
        navList: [{ name: '全部', status: 0 }, { name: '已完成', status: 4 }, { name: '退款中', status: 6 }, { name: '已退款', status: 6 }, { name: '退款拒绝', status: 7 }, { name: '未发货', status: 9 }, { name: '已发货', status:10}],
        orderList:[],
    },
    // 获取订单列表
    getOrderList() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            status: that.data.status,
            page: that.data.page
        };
        app.net.$Api.getOrderList(params).then((res) => {
            if (res.data.data.length>0){
                that.setData({
                    orderList: that.data.orderList.concat(res.data.data),
                })
            }else{
                that.setData({
                    on_off:true
                })
            }
            
            console.log(res)

        })

    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        let status = e.currentTarget.dataset.status;
        this.setData({
            orderList:[],
            status: status,
            currentTab: index
        })
        this.getOrderList()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo') || '';
        this.setData({
            member_id: userInfo.id,
            status: options.status || this.data.status
        })
        this.getOrderList()
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
        if (!this.data.on_off){
            this.data.page++
            this.getOrderList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
// pages/shopList/shopList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_id:0,
        shopList:[],
        status: ['门店待确认','门店已确认','门店已拒绝']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            user_id: userInfo.id,
        })
        this.getJishiShop()
    },
    getJishiShop() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            user_id: that.data.user_id,
        }
        app.net.$Api.getJishiShop(params).then((res) => {
            console.log(res)
            if(res.data.data.length>0) {
                that.setData({
                    shopList: that.data.shopList.concat(res.data.data)
                })
            }
        })

    },
    goAddshop(){
        wx.navigateTo({
            url: '/pages/addShop/addShop',
        })
    },
    setMsg(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/addShop/addShop?id=' + id,
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
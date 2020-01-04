// pages/search/search.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        area_id:0,//区域id
        Carid:0,//汽车id
        searchList:[],
        keyword:'',
        level:0,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            area_id: options.area_id,
            Carid: options.Carid,
            level: options.currentTab/1+1,
        })
        this.getGoodsList()
    },
    getGoodsList(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            keyword: that.data.keyword,
        }
        app.net.$Api.serviceList(params).then((res) => {
            console.log(res)
            that.setData({
                searchList: res.data
            })
        })
    },
    //搜索内容
    searchMsgs(e) {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            keyword: e.detail.value,
        }
        if (e.detail.value.length > 0) {
            app.net.$Api.serviceList(params).then((res) => {
                console.log(res)
                that.setData({
                    searchList: res.data
                })
            })
        }
        if (e.detail.value.length == 0) {
            this.getGoodsList()
            // that.setData({
            //     searchList: []
            // })
        }
    },
    goback(){
        wx.navigateBack({
            delta: 1
        })
    },
    goIndex(e){
        let id = e.currentTarget.dataset.id;
        app.globalData.Goodsid = id,
            app.globalData.authorizationShow2 = false;
        wx.reLaunch({
            url: '/pages/index/index?id='+id,
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
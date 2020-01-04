// pages/carOwnerServer/carOwnerServer.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list1:[],
        list2:[],
        list3:[],
        recommend:0,
        recommend_catid:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getRecommend1()
        this.getRecommend2()
        this.getRecommend3()
    },
    getRecommend1() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.recommend_catid = 12;
        app.net.$Api.getRecommend(params).then((res) => {
            console.log(res)
            that.setData({
                list1:res.data.data
            })
        })
    },
    getRecommend2() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.recommend_catid = 13;
        app.net.$Api.getRecommend(params).then((res) => {
            console.log(res)
            that.setData({
                list2:res.data.data
            })
        })
    },
    getRecommend3() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.recommend_catid = 14;
        app.net.$Api.getRecommend(params).then((res) => {
            console.log(res)
            that.setData({
                list3:res.data.data
            })
        })
    },
    goDetailePage(e){
        let path = e.currentTarget.dataset.path;
        let appid = e.currentTarget.dataset.appid;
        if (appid!=""){
            wx.navigateToMiniProgram({
                appId: appid,
                path: 'pages/index/index',
                extraData: {},
                envVersion: 'release',
                success(res) {
                    // 打开成功
                    console.log('打开了')
                }
            })
        }else{
            wx.navigateTo({
                url: path,
            })
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
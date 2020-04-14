// pages/Carservice/Carservice.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userid:0,
        list:[],
        list2:[],
        navList: ['首页', '知驾服务'],
        currentTab:1,
        btnNavcurrent:0,
        msgNum:0,
        banner:[],
    },
    /**
        * 生命周期函数--监听页面显示
        */
    async onShow () {
        let userInfo = wx.getStorageSync('userinfo') || {};
        let list = await app.getRecommend(0, 0, "7,8,9,10,11,12,13,14,15");
        let list2 = await app.getRecommend(0, 0, "16,17");
        let msgNum = await app.getUnreadMsgNum(userInfo.id);
        console.log(list)
        this.setData({
            list,
            list2,
            userid: userInfo.id,
            msgNum: msgNum.num
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad (options) {
        this.getRotationData()
    },
    getRotationData() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            area_id: app.globalData.area_id,
            id: 2,
        }
        app.net.$Api.getRotationData(params).then((res) => {
            that.setData({
                banner: res.data.list
            })
            console.log(res.data.list, 1213)
        })
    },
    goDetaile(e){
        let path = e.currentTarget.dataset.path;
        let appid = e.currentTarget.dataset.appid;
        if (appid!=""){
            wx.navigateToMiniProgram({
                appId: appid,
                path: path,
                extraData: {},
                envVersion: 'release',
                success(res) {
                    // 打开成功
                    console.log('打开了')
                }
            })
        } else if (path){
            wx.navigateTo({
                url: path,
            })
        }
    },
    gomessageList() {
        if (!this.data.userid) {
            app.checkLogin();
        } else {
            wx.navigateTo({
                url: '/pages/messageList/messageList',
            })
        }
    },
    // 导航tab切换
    goIndex(e) {
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    goCircle() {
        wx.reLaunch({
            url: "/pages/Carservice/circle/circle",
        })
    },
    gomaycenter() {
        wx.navigateTo({
            url: '/pages/Carservice/maycenter/maycenter',
        })
    },
    goallservice(){
        wx.navigateTo({
            url: '/pages/allservice/allservice',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
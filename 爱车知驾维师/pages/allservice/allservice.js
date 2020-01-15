// pages/allservice/allservice.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        list2:[],
        list3:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad (options) {
        let list = await app.getRecommend(8, 0, 0);
        let list2 = await app.getRecommend(9,9 , 0);
        let list3 = await app.getRecommend(10,0 , 0);
        console.log(list)
        this.setData({
            list,
            list2,
            list3,
        })
    },
    goDetaile(e) {
        let path = e.currentTarget.dataset.path;
        let appid = e.currentTarget.dataset.appid;
        if (appid != "") {
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
        } else {
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
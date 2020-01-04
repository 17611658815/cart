// pages/clauseList/clauseList.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list1:[],
        list2:[],
        list3:[],
        list4:[],
        currentTab: 0,
    },
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getContentList1()
        this.getContentList2()
        this.getContentList3()
        this.getContentList4()
    },
    getContentList1() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            content_catid:27         
        }
        app.net.$Api.getContentList(params).then((res) => {
            console.log(res)
            that.setData({
                list1:res.data.data
            })
          
        })
    },
    getContentList2() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            content_catid:28         
        }
        app.net.$Api.getContentList(params).then((res) => {
            console.log(res)
            that.setData({
                list2:res.data.data
            })
          
        })
    },
    getContentList3() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            content_catid:29        
        }
        app.net.$Api.getContentList(params).then((res) => {
            console.log(res)
            that.setData({
                list3:res.data.data
            })
          
        })
    },
    getContentList4() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            content_catid:29        
        }
        app.net.$Api.getContentList(params).then((res) => {
            console.log(res)
            that.setData({
                list4:res.data.data
            })
          
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
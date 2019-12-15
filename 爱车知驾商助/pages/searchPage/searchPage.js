// pages/searchPage/searchPage.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:0,
        index:0,
        keyword:"",
        selctList: ['今日数据', '昨日数据', '最近七天', '最近30天'],
        msgList:[],
        slect_item1: false,
        slect_item2: false,
        iconShow:true,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            member_id: userInfo.id
        })
        this.getSearchWords()
    },
    getSearchWords() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.keyword = that.data.keyword;
        params.date = that.data.index;
        app.net.$Api.getSearchWords(params).then((res) => {
            console.log(res)
           that.setData({
               msgList:res.data.data
           })
        })
    },
    onFocus(){
        this.setData({
            iconShow:false
        })
    },
    onblur(){
        this.setData({
            iconShow: true
        })
    },
    inputSearch(e){
        let that = this;
        that.data.keyword = e.detail.value;
    },
    // 搜索推广
    changeIndex_1(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            selectIndex1: index,
            index: index,
            slect_item1: false,
        })
        this.getSearchWords()
    },
    // 场景展示
    changeIndex_2(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            selectIndex2: index
        })
    },
    // 搜索推广
    slect_1itemShow() {
        this.setData({
            slect_item1: !this.data.slect_item1,
            slect_item2: false
        })
    },
    slect_2itemShow() {
        this.setData({
            slect_item2: !this.data.slect_item2,
            slect_item1: false
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
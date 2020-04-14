// pages/classList/classList.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchVal:'',
        pareTab:0,
        sonTab:0,
        list:[],
        sonList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCatTreeData()
    },
    getCatTreeData(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id:95,
            location:"116.486509,39.90424",
            area_id:38,
            level:1,
            cateId:236
        }
        app.net.$Api.getCatTreeData(params).then((res) => {
            console.log(res)
            that.setData({
                list:res.data.data,
                sonList: res.data.data[0].son[0].son,
            })
        })
    },
    onSearch(e){
        console.log(e)
        this.setData({
            searchVal: e.detail.value
        })
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        let sonindex = e.currentTarget.dataset.sonindex;
        let list = this.data.list;
        console.log(index, sonindex)
        this.setData({
            pareTab: index,
            sonTab: sonindex,
            sonList: list[index].son[sonindex].son,
        })
        console.log(list[index].son[sonindex].son)
    },
    goDetailes(e){
        let path = e.currentTarget.dataset.path;
        console.log(path)
        console.log(e)
        wx.navigateTo({
            url: path,
        })
    },
    gosearch(){
        wx.navigateTo({
            url: '/pages/search/search',
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
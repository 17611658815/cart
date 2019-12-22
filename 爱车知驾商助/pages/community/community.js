// pages/community/community.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        magData:{},
        currentTab:0,
        member_id:0,
        magDataList:[]
    },
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index,
            page:1,
            magDataList:[]
        })
        if(index == 1){
            this.collectionPostings()
        }else{
            this.communityHomeData()
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.communityHomeData()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        let userInfo = wx.getStorageSync('userinfo');
        that.setData({
            member_id: userInfo.id,
        })
    },
    communityHomeData(){
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        app.net.$Api.communityHomeData(params).then((res) => {
            console.log(res)
            that.setData({
                magData:res.data,
                magDataList:res.data.list
            })
           
        }) 
    },
    // 关注列表
    collectionPostings(){
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.page = that.data.page;
        app.net.$Api.collectionPostings(params).then((res) => {
            console.log(res)
            that.setData({
                magDataList:res.data.data
            })
           
        }) 
    },
    postingsZan(e){
        let that = this;
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.postings_id = id;
        app.net.$Api.postingsZan(params).then((res) => {
            if (type == "yes"){
                that.setData({
                    [`magDataList[${index}].zan`]: that.data.magDataList[index].zan / 1 + 1,
                    [`magDataList[${index}].is_zan`]: 1,
                    // magData:res.data
                })
            }else{
                that.setData({
                    [`magDataList[${index}].zan`]: that.data.magDataList[index].zan / 1 - 1,
                    [`magDataList[${index}].is_zan`]: 0,
                    // magData:res.data
                })
            }
           
        }) 
    },
    postingsCollection(e){
        let that = this;
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.postings_id = id;
        app.net.$Api.postingsCollection(params).then((res) => {
            if (type == "yes"){
                that.setData({
                    [`magDataList[${index}].collection`]: that.data.magDataList[index].collection / 1 + 1,
                    [`magDataList[${index}].is_collection`]: 1,
                })
            }else{
                that.setData({
                    [`magDataList[${index}].collection`]: that.data.magDataList[index].collection / 1 - 1,
                    [`magDataList[${index}].is_collection`]: 0,
                })
            }
           
        }) 
    },

    gomsgDetaile(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/msgDetaile/msgDetaile?id='+id,
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
// pages/Carservice/commentList/commentList.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CommentList:[],
        member_id:0,
        page:1,
        on_off:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo') || {};
        this.setData({
            member_id: userInfo.id,
        })
        this.getMyPostingsComment()
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // this.getMyPostingsComment()
    },
    getMyPostingsComment(e) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.page = that.data.page;
        app.net.$Api.getMyPostingsComment(params).then((res) => {
            console.log(res)
            if(res.data.data.length>0){
                that.setData({
                    CommentList: that.data.CommentList.concat(res.data.data)
                })
            }else{
                that.setData({
                    on_off:true
                })
            }
            
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.on_off){
            this.data.page++;
            this.getMyPostingsComment()
        }
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
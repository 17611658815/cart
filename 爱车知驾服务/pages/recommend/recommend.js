// pages/recommend/recommend.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageShow:false,
        imgCode:0,
        imgurl:'',
        member_id:0,
        share_source:0,
        currentTab:0,
        msgList: [
            { url: "url", title: "多地首套房贷利率上浮 热点城市渐迎零折扣时代" },
            { url: "url", title: "交了20多年的国内漫游费将取消 你能省多少话费？" },
            { url: "url", title: "北大教工合唱团出国演出遇尴尬:被要求给他人伴唱" }
        ],
    },

    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index
        })
    },
    QRcode() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
        }
        app.net.$Api.QRcode(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                that.setData({
                    imgurl: res.data.url
                })
            }
            that.setData({
                imgCode: res.data.code
            })
        })
    },
    shareCode() {
        let that = this;
        if (that.data.imgCode !=200){
            app.alert('二维码生成失败')
        }else{
            that.setData({
                imageShow: true
            })
        }
    },
    closeImg(){
        let that = this;
        that.setData({
            imageShow: false
        })
    },
    gotextPage(){
        wx.navigateTo({
            url: '/pages/clauseList/clauseList',
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let userinfo = wx.getStorageSync('userinfo') || '';
        this.setData({
            share_source: userinfo.share_source,
            member_id: userinfo.id
        })
        if (!this.data.member_id) {
            app.checkLogin()
        }else{
            this.QRcode()
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
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
        let that = this;
        return {
            title: "推荐有奖",
            path: '/pages/index/index?share_source=' + that.data.share_source,
        }
    }
})
// pages/otherDetaile/otherDetaile.js
const app = getApp()
var prevV = wx.createVideoContext('video');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: '',
        id: '',
        otherObj: {},
        num: 0,
        videoUrl:'',
        videoPlay:false,
        autoHeight:0,
        isplay:false,
        videoInde:0,
      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    autoHeight: ((res.windowWidth) / 16) * 9
                });
            }
        });
        that.setData({
            id: options.id,
            status: options.status
        })
        that.getorderDetail()
    },
    
    getorderDetail() {
        let that = this;
        let num = 0
        let params = {
            appid: app.globalData.appid,
            id: that.data.id,
        }
        app.loading('加载中')
        app.net.$Api.getOrderInfo(params).then((res) => {
            console.log(res)
            that.setData({
                otherObj:res.data.data
            })
            wx.hideLoading()
        })
    },
    //点击再次播放
    videoPlay() {
        var that = this
        prevV.play()
        that.setData({
            videoPlay: true,
            isplay: true
        })
    },
    play(e){
        let that = this;
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;
        let src = e.currentTarget.dataset.src;
        let item = e.currentTarget.dataset.item;
        if (type == 1){
            wx.previewImage({
                current: src,
                urls: item.img,
                success: function (res) {
                    console.log(res)
                }
            })
        }else{
            that.setData({
                videoUrl: item.video[index],
                videoInde: index
            })
            that.videoPlay()
        }
    },
    bindChange(e){
       
    },
    bindplay(e){
        console.log('开始')
    },
    bindended(e){
        console.log('结束')
    },
    closeVideo(){
        console.log('11111')
        prevV.stop()
        this.setData({
            videoPlay: false,
            isplay: false
        })
    },
    gotechnicianService(){
        wx.navigateTo({
            url: '/pages/technicianService/technicianService',
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
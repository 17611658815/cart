// pages/otherDetaile/otherDetaile.js
const app = getApp()
var prevV = wx.createVideoContext('video');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:0,
        status: '',
        id: '',
        otherObj: {},
        num: 0,
        videoUrl:'',
        videoPlay:false,
        autoHeight:0,
        isplay:false,
        videoInde:0,
        order_id:0,
        videoPath:''
      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userinfo = wx.getStorageSync('userinfo') || '';
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    autoHeight: ((res.windowWidth) / 16) * 9
                });
            }
        });
        that.setData({
            id: options.id,
            member_id: userinfo.id,
            status: options.status
        })
        
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getorderDetail()
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
                otherObj:res.data.data,
                order_id: res.data.data[0].id
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
            isplay: true,
           
        })
    },
    play(e){
        let that = this;
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;
        let src = e.currentTarget.dataset.src;
        let item = e.currentTarget.dataset.item;
        console.log(src)
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
                videoInde: index,
                videoPath: src
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
            url: '/pages/technicianService/technicianService?order_id=' + this.data.order_id,
        })
    },
    goUpImg(){
        wx.navigateTo({
            url: '/pages/progressPic/progressPic?id='+this.data.order_id,
        })
    },
    // 完成服务
    finishService(){
        let that = this;
        let num = 0
        let params = {
            appid: app.globalData.appid,
            id: that.data.id,
            member_id: that.data.member_id
        }
        wx.showModal({
            title: '温馨提示',
            content: '确定完成此订单？',
            success(res) {
                if (res.confirm) {
                    app.net.$Api.setOrderFinish(params).then((res) => {
                        console.log(res)
                        if(res.data.code == 200){
                            wx.showToast({
                                title: '完成',
                                icon: 'success',
                                duration: 2000,
                                success: function () {
                                    setTimeout(function () {
                                      wx.navigateBack({
                                          delta:1
                                      })
                                    }, 2000)
                                }
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
       
    },
    showMap: function (e) {
        var location = e.currentTarget.dataset.location.split(",");
        console.log(location)
        wx.openLocation({
            latitude: parseFloat(location[1]),
            longitude: parseFloat(location[0]),
            scale: 18
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
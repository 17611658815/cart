// pages/otherDetaile/otherDetaile.js
const app = getApp()
var prevV = wx.createVideoContext('video');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status:'',
        id:'',
        otherObj:{},
        num:0,
        videoUrl: '',
        videoPlay: false,
        autoHeight: 0,
        isplay: false,
        videoInde: 0,
        order_id: 0,
        videoPath: ''
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
            status:options.status
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
        app.net.$Api.orderDetail(params).then((res) => {
            console.log(res)
            if (res.data.code!=200){
                wx.navigateTo({
                    url: '/pages/other/other',
                })
            }else{
                that.setData({
                    otherObj: res.data.data
                })
            }
            
            wx.hideLoading()
        })
    },
    // 取消订单
    recallOther(e) {
        let that = this;
        // let data = e.currentTarget.dataset.item;
        wx.showModal({
            title: '温馨提示',
            content: '确定取消订单吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.removeOther()
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    removeOther() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            id: that.data.id
        }
        app.net.$Api.cancelOrder(params).then((res) => {
            if(res.data.code == 200){
                wx.showToast({
                    title: '取消成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            wx.navigateBack({
                                delte:1
                            })
                        }, 2000)
                    }
                })
            }

        })
    },
    paySubOrder(e){
        let that = this;
        console.log(e)
        let params = {
            appid: app.globalData.appid,
            id: that.data.id
        }
        app.net.$Api.paySubOrder(params).then((res) => {
            wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success(res) {
                        wx.requestSubscribeMessage({
                            tmplIds: ['F8TezMCsMq0qdlv-Wm9hGkDGRNyZPKu1PaYo7h8tOvY'],
                            success(r) {
                                console.log(r)
                            },
                            fail() {

                            },
                            complete() {
                                wx.reLaunch({
                                    url: '/pages/index/index',
                                })
                            }
                        })
                },
                fail(res) { }
            })
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
    play(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;
        let src = e.currentTarget.dataset.src;
        let item = e.currentTarget.dataset.item;
        console.log(src)
        if (type == 1) {
            wx.previewImage({
                current: src,
                urls: item.img,
                success: function (res) {
                    console.log(res)
                }
            })
        } else {
            that.setData({
                videoUrl: item.video[index],
                videoInde: index,
                videoPath: src
            })
            that.videoPlay()
        }
    },
    bindChange(e) {

    },
    bindplay(e) {
        console.log('开始')
    },
    bindended(e) {
        console.log('结束')
    },
    closeVideo() {
        console.log('11111')
        prevV.stop()
        this.setData({
            videoPlay: false,
            isplay: false
        })
    },
    goEvaluate(e){
        let id = e.currentTarget.dataset.id;
        let type = e.currentTarget.dataset.type;
        console.log(id)
        wx.navigateTo({
            url: '/pages/evaluate/evaluate?id=' + id + "&type=" + type,
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
const beas64 = require('beas64.js');
const app = getApp()
var prevV = wx.createVideoContext('video');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id: 0,
        status: '',
        id: '',
        num: 0,
        videoUrl: '',
        videoPlay: false,
        autoHeight: 0,
        isplay: false,
        videoInde: 0,
        order_id: 0,
        videoPath: '',
        iconArr1: [], //评星
        iconArr2: [], //评星
        iconArr3: [], //评星
        diagnosisStar1: 3,
        diagnosisStar2: 0,
        diagnosisStar3: 0,
        otherObj: {},//订单详情
        refuse: false,
        message: '',//拒退理由
        logistics: '',
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
            status: options.status,
            iconArr1: beas64, //评星
            iconArr2: beas64, //评星
            iconArr3: beas64, //评星
        })

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            logistics: app.globalData.logistics.split(',')
        })
        this.orderDetail()
    },

    orderDetail() {
        let that = this;
        let num = 0
        let params = {
            appid: app.globalData.appid,
            id: that.data.id,
        }
        app.loading('加载中')
        app.net.$Api.orderDetail(params).then((res) => {
            console.log(res)
            that.setData({
                otherObj: res.data.data,
                order_id: res.data.data[0].id,
                // diagnosisStar1:
            })
            wx.hideLoading()
        })
    },
    // 退款
    setOrderRefund() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            order_id: that.data.id,
            member_id: app.globalData.userInfo.id,
        }
        // app.loading('加载中')
        app.net.$Api.setOrderRefund(params).then((res) => {
            if (res.data.code == 200) {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            // that.NeworderList()
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 2000)
                    }
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000,
                })
            }
        })
    },
    savemessage: function (e) {
        var that = this;
        that.setData({
            message: e.detail.value
        })
    },
    // 拒绝退款
    refuseRefund() {
        this.setData({
            refuse: true
        })
    },
    // 确认拒绝退款
    setOrderNoRefund() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            order_id: that.data.id,
            member_id: app.globalData.userInfo.id,
            msg: that.data.message
        }
        if (that.data.message == "") {
            app.alert('请输入拒绝理由')
        } else {
            app.loading('加载中')
            app.net.$Api.setOrderNoRefund(params).then((res) => {
                console.log(res)
                wx.hideLoading()
            })
        }

    },
    // 确认发货
    setOrderSend() {
        let that = this;
        if (that.data.logistics == "") {
            wx.navigateTo({
                url: '/pages/logistics/logistics',
            })
        } else {
            let params = {
                appid: app.globalData.appid,
                order_id: that.data.id,
                member_id: app.globalData.userInfo.id,
                logistics: that.data.logistics[0],
                logistics_num: that.data.logistics[1],
            }
            app.loading('加载中')
            app.net.$Api.setOrderSend(params).then((res) => {
                wx.hideLoading()
                if (res.data.code == 200) {
                    wx.showToast({
                        title: '发货成功',
                        icon: 'success',
                        duration: 2000,
                        success: function () {
                            setTimeout(function () {
                                app.globalData.logistics = ""
                                wx.navigateBack({
                                    delta: 1
                                })
                            }, 2000)
                        }
                    })
                }

            })
        }

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
    gotechnicianService() {
        wx.navigateTo({
            url: '/pages/technicianService/technicianService?order_id=' + this.data.order_id,
        })
    },
    goUpImg() {
        wx.navigateTo({
            url: '/pages/progressPic/progressPic?id=' + this.data.order_id,
        })
    },
    // 完成服务
    finishService() {
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
                        if (res.data.code == 200) {
                            wx.showToast({
                                title: '完成',
                                icon: 'success',
                                duration: 2000,
                                success: function () {
                                    setTimeout(function () {
                                        wx.navigateBack({
                                            delta: 1
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
    makePhoneCall(e) {
        console.log(e)
        let phone = e.currentTarget.dataset.phone
        wx.makePhoneCall({
            phoneNumber: phone //仅为示例，并非真实的电话号码
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
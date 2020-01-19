const app = getApp()
const beas64 = require('beas64.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: '',//订单状态
        id: '',//订单id
        otherObj: {},//订单详情
        refuse: false,
        message: '',//拒退理由
        logistics:'',
        iconArr1: [], //评星
        iconArr2: [], //评星
        iconArr3: [], //评星
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id,
            // status: options.status
            // status: '5',
            iconArr1: beas64, //评星
            iconArr2: beas64, //评星
            iconArr3: beas64, //评星
        })
        this.getorderDetail()
    },
    getorderDetail() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            id: that.data.id,
        }
        app.loading('加载中')
        app.net.$Api.orderDetail(params).then((res) => {
            that.setData({
                otherObj: res.data,
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
        if (that.data.logistics == ""){
            wx.navigateTo({
                url: '/pages/logistics/logistics',
            })
        }else{
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
                if(res.data.code == 200){
                    wx.showToast({
                        title: '发货成功',
                        icon: 'success',
                        duration: 2000,
                        success: function () {
                            setTimeout(function () {
                                app.globalData.logistics = ""
                               wx.navigateBack({
                                   delta:1
                               })
                            }, 2000)
                        }
                    })
                }
               
            })
        }

    }

    /*
    if(res.data.code == 200){
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            that.NeworderList()
                        }, 2000)
                    }
                })
            }else{
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000,
                })
            }
     wx.showModal({
            title: '温馨提示',
            content: '确定取消订单吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.removeOther(data)
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    
    */
    /**
     * 生命周期函数--监听页面初次渲染完成
     */,
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            logistics: app.globalData.logistics.split(',')
        })
        console.log(this.data.logistics)
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
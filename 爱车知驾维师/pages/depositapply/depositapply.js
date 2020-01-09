// pages/depositapply/depositapply.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        moneyNum: '', //提现金额
        time: '',
        money: 0,
        is: '',
        phone: '',
        member_id: 0,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        let time = that.formatTime(new Date());
        that.setData({
            member_id: userInfo.id,
            time,
        })
        that.getAccountBalance()
    },
    getAccountBalance() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        app.net.$Api.getAccountBalance(params).then((res) => {
            console.log(res)
            that.setData({
                money: res.data.money
            })
        })
    },
    moneyNumFn(e) {
        console.log(e)
        let that = this;
        let time = that.formatTime(new Date());
        that.setData({
            moneyNum: e.detail.value
        })
    },
    //全部提现
    alldepositapply() {
        let that = this;
        if (that.data.money == "0.00"){
            app.alert('您当前可提现余额为0~')
        }else{
            that.setData({
                moneyNum: that.data.money
            })
        }
      
    },
    confirm() {
        wx.navigateTo({
            url: '/pages/schedule/schedule?moneyNum=' + this.data.moneyNum + '&time=' + this.data.time,
        })
    },
    formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        var hours = date.getHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return year + '-' + month + '-' + day + '  ' + hours + ':' + minute
    },
    pushCashOut() {
        let that = this;
        // if (parseInt(that.data.money) < parseInt(that.data.moneyNum)) {
        //     app.alert('您当前可提现金额不足~')
        //     return
        // }
        that.confirm()
      /*   let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            money: that.data.moneyNum
        }
        app.net.$Api.addCashLog(params).then((res) => {
            if (res.data.code == 200) {
                wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                    success: function() {
                        
                    }
                })
            } else if (res.data.code == 402) {
                wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                    success: function() {
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                })
            } else if (res.data.code == 500) {
                wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                })
            }
        }) */


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
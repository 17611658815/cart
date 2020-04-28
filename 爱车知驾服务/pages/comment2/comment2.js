// pages/evaluate/evaluate.js
let app = getApp()
const beas64 = require('beas64.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:0,
        id:0,
        type: 0,
        iconArr3: [], //评星
        diagnosisStar3: 1,//服务评星
        evaluateCurrent3: 0,//评价当前选中
        message: "",
        name:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userinfo') || '';
        this.setData({
            iconArr3:beas64,
            id: options.brand_id,
            member_id: userinfo.id,
            name: options.name || ""
            
        })
        console.log(options)
    },
    getStar3(e) {
        let that = this;
        let star = e.currentTarget.dataset.star;
        switch (star) {
            case 1:
                that.data.diagnosistext = '很差'
                break;
            case 2:
                that.data.diagnosistext = '差'
                break;
            case 3:
                that.data.diagnosistext = '一般'
                break;
            case 4:
                that.data.diagnosistext = '很好'
                break;
            case 5:
                that.data.diagnosistext = '优秀'
                break;
        }
        that.setData({
            diagnosisStar3: star,
        });
        console.log(that.data.diagnosisStar3)
    },
    savemessage: function (e) {
        var that = this;
        that.setData({
            message: e.detail.value
        })
    },
    submit1() {
        let that = this;
        console.log('1')
        let params = {
            appid: app.globalData.appid,
            brand_id: that.data.id,
            name: that.data.name,
            member_id:that.data.member_id,
            content: that.data.message,
            score: that.data.diagnosisStar3,
        }
            app.net.$Api.addBrandCommnet(params).then((res) => {
            console.log(res, 199)
                if (res.data.code == 200) {
                wx.showToast({
                    title: '评论成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            wx.navigateBack({
                                delte: 1
                            })
                        }, 2000)
                    }
                })
            }
        })
    },
    submit2() {
        let that = this;
        console.log('2')
        let params = {
            appid: app.globalData.appid,
            id: that.data.order_id,
            score: that.data.diagnosisStar3,
            score_content: that.data.message
        }
        app.net.$Api.appraiseShopOrder(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                wx.showToast({
                    title: res.data.message,
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            wx.navigateBack({
                                delte: 1
                            })
                        }, 2000)
                    }
                })
            }
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

    onShareAppMessage: function () {
        return {
            title: '知驾车服',
            path: '/pages/index/index'
        }
    }
})
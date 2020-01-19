// pages/evaluate/evaluate.js
let app = getApp()
const beas64 = require('beas64.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type:0,
        order_id:0,
        iconArr1: [], //评星
        iconArr2: [], //评星
        iconArr3: [], //评星
        diagnosisStar1: 1,//服务评星
        diagnosisStar2: 1,//场地评星
        diagnosisStar3: 1,//综合评星
        evaluateCurrent1: 0,//评价当前选中
        evaluateCurrent2: 0,//评价当前选中
        evaluateCurrent3: 0,//评价当前选中
        message:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            type: options.type,
            order_id: options.id,
            iconArr1: beas64, //评星
            iconArr2: beas64, //评星
            iconArr3: beas64, //评星
        })
        console.log(options)
    },
    // 服务平稳
    getStar1(e) {
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
            diagnosisStar1: star,
        });
        console.log(that.data.diagnosisStar1)
    },
    // 场地平稳
    getStar2(e) {
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
            diagnosisStar2: star,
        });
        console.log(that.data.diagnosisStar2)
    },
    // 场地平稳
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
    submit1(){
        let that = this;
        console.log('1')
        let params = {
            appid: app.globalData.appid,
            id: that.data.order_id,
            score_jishi: that.data.diagnosisStar1,
            score_shop: that.data.diagnosisStar2,
            score: that.data.diagnosisStar3,
            score_content: that.data.message
        }
        app.net.$Api.appraiseServiceOrder(params).then((res) => {
            console.log(res, 199)
           
            if(res.data.code == 200){
                wx.showToast({
                    title: res.data.message,
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
    submit2(){
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
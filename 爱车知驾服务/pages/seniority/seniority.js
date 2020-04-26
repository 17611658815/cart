// pages/seniority/seniority.js
const beas64 = require('beas64.js');
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        iconArr: [], //评星
        diagnosisStar: 1,//服务评星
        currentTab:0,
        navArr: [{
            name: "初级维师",
            path: ""
        },
        ],
        kailong:false,
        goosData:{}
    },
    copyShow(e){
        let that = this;
        let taokouling = e.currentTarget.dataset.taokouling;
        console.log(e)
        wx.showModal({
            title: '淘宝',
            content: '旗舰店淘口令',
            cancelText:'关闭',
            confirmText	:'一键复制',
            confirmColor:"#FF0000",
            success(res) {
                if (res.confirm) {
                    wx.setClipboardData({
                        data: taokouling,
                        success(res) {
                            wx.getClipboardData({
                                success(res) {
                                    console.log(res.data) // data
                                }
                            })
                        }
                    })
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            obj_type_id: options.id,
            iconArr: beas64, //评星
        })
        console.log(options)
        this.objTypeRank()
    },
    objTypeRank() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            obj_type_id: that.data.obj_type_id
        }
        app.net.$Api.objTypeRank(params).then((res) => {
            console.log(res)
            that.setData({
                goosData:res.data
            })
            console.log(that.data.goosData)
        })
    },
    setkailong(){
        this.setData({
            kailong: !this.data.kailong
        })
    },
    goPinpaiDetaile(e){
        let id = e.currentTarget.dataset.id; 
        wx.navigateTo({
            url: '/pages/seniorityList/seniorityList?goods_id='+id,
        })
    },
    gotextPage(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/textPage/textPage?id=' + id,
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
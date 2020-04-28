// pages/seniorityList/seniorityList.js
const beas64 = require('beas64.js');
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        brand_id: 354,
        page: 1,
        page2: 1,
        currentTab: 0,
        kailong: false,
        kailong2: false,
        brandData: {},
        brandList: [],
        brandTypeList: [],
        obj_type_id:237,
        no_off2:false,
        no_off:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            iconArr: beas64, //评星
            obj_type_id: options.obj_type_id,
            brand_id: options.brand_id
        })
        this.brandObjTypeDetail()

    },
    onShow() {
        this.data.page = 1;
        this.data.brandData = []
        this.brandObjTypeDetail()
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index,
        })
    },
    setkailong() {
        this.setData({
            kailong: !this.data.kailong
        })
    },
    setkailong2() {
        this.setData({
            kailong2: !this.data.kailong2
        })
    },
    brandObjTypeDetail() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            brand_id: that.data.brand_id,
            name: that.data.obj_type_id,
        }
        app.net.$Api.brandObjTypeDetail(params).then((res) => {
            console.log(res)
            that.setData({
                brandData: res.data
            })
            console.log(that.data.goosData)
        })
    },
    brandObjType() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            brand_id: that.data.brand_id
            // brand_id: 354
        }
        app.net.$Api.brandObjType(params).then((res) => {
            console.log(res)

        })
    },
    brandObjTypeDetailAjax() {
        let that = this;
        if (that.data.no_off) {
            return
        }
        that.data.page++
        let params = {
            appid: app.globalData.appid,
            brand_id: that.data.brand_id,
            // brand_id: 354,
            page: that.data.page
        }
        app.net.$Api.brandObjTypeDetailAjax(params).then((res) => {
            console.log(res)
            if (res.data.length >= 4) {
                that.setData({
                    "brandData.goods": that.data.brandData.goods.concat(res.data)
                })
            } else {
                that.setData({
                    no_off: true
                })
            }
            console.log(that.data.brandList)
        })
    },
    brandObjTypeDetailAjax2() {
        let that = this;
        if (that.data.no_off2) {
            return
        }
        that.data.page2++
        let params = {
            appid: app.globalData.appid,
            brand_id: that.data.brand_id,
            // brand_id: 354,
            page: that.data.page2
        }
        app.net.$Api.getBrandCommnetAjax(params).then((res) => {
            console.log(res)
            if (res.data.length > 0) {
                that.setData({
                    "brandData.comment": that.data.brandData.comment.concat(res.data)
                })
            } else {
                that.setData({
                    no_off2: true
                })
            }
            console.log(that.data.brandList)
        })
    },
    gocomment() {
        wx.navigateTo({
            url: '/pages/comment2/comment2?brand_id=354&obj_type_id=237',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },
    gogoodsDetail(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/goodsDetail/goodsDetail?id=' + id,
        })
    },
    gotextPage(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/textPage/textPage?id=' + id,
        })
    },
    goseniority2(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/seniority2/seniority2?obj_type_id=' + id + "&brand_id=" + this.data.brand_id,
        })
    },
    loadMore() {
        wx.navigateTo({
            url: '/pages/seniorityList/seniorityList?goods_id=' + this.data.brand_id +"&currentTab=1"
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
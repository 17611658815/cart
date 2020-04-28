// pages/seniorityList/seniorityList.js
const beas64 = require('beas64.js');
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        page:1,
        page2:1,
        no_off:false,
        no_off2:false,
        currentTab: 0,
        kailong:false,
        kailong2:false,
        brandData:{},
        brandList:[],
        brandTypeList:[],
        goodsList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            iconArr: beas64,
            id: options.goods_id,
            currentTab: options.currentTab || 0,
        })
        this.brand()
        this.brandObjType()
        this.brandModels()
        
    },
    onShow(){
        this.data.page = 1;
        this.data.brandData = []
        this.brand()
        this.brandObjType()
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
    brand() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            brand_id:that.data.id
        }
        app.net.$Api.brand(params).then((res) => {
            console.log(res)
            that.setData({
                brandData: res.data
            })
            console.log(that.data.goosData)
        })
    },
    brandModels() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            brand_id:that.data.id
        }
        app.net.$Api.brandModels(params).then((res) => {
            console.log(res)
            that.setData({
                goodsList: res.data.list
            })
            console.log(res.data)
        })
    },
    brandObjType() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            brand_id:that.data.id
        }
        app.net.$Api.brandObjType(params).then((res) => {
            console.log(res)
            that.setData({
                brandTypeList:res.data
            })
           
        })
    },
    brandObjTypeDetailAjax(){
        let that = this;
        if (that.data.no_off){
            return
        }
        that.data.page++
        let params = {
            appid: app.globalData.appid,
            brand_id:that.data.id,
            // brand_id: 354,
            page:that.data.page
        }
        app.net.$Api.brandObjTypeDetailAjax(params).then((res) => {
            console.log(res)
            if(res.data.length>=4){
                that.setData({
                    "brandData.objs": that.data.brandData.objs.concat(res.data)
                })
            }else{
                that.setData({
                    no_off:true
                })
            }
            console.log(that.data.brandList)
        })
    },
    brandObjTypeDetailAjax2(){
        let that = this;
        if (that.data.no_off2){
            return
        }
        that.data.page2++
        let params = {
            appid: app.globalData.appid,
            brand_id:that.data.id,
            // brand_id: 354,
            page:that.data.page2
        }
        app.net.$Api.getBrandCommnetAjax(params).then((res) => {
            console.log(res)
            if(res.data.length>=4){
                that.setData({
                    "brandData.comment": that.data.brandData.comment.concat(res.data)
                })
            }else{
                that.setData({
                    no_off2:true
                })
            }
            console.log(that.data.brandList)
        })
    },
    
    gogoodsDetail(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/goodsDetail/goodsDetail?id='+id,
        })
    },
    gocomment(e){
        let name = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: '/pages/comment2/comment2?brand_id=' + this.data.id + "&name=" + name,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    goPinpaiDetaile(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: './seniorityList?goods_id=' + id,
        })
    },
    goseniority2(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/seniority2/seniority2?obj_type_id=' + id +"&brand_id="+this.data.id,
        })
    },
    gotextPage(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/textPage/textPage?id=' + id 
        })
    },
    loadMore(){
        wx.navigateTo({
            url: '/pages/textPage/textPage?id=' + id
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
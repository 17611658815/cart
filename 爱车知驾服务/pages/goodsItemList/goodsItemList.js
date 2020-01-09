// pages/goodsItemList/goodsItemList.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        typeid:0, //分类id
        brandid:0,//商品id
        shop_id:0,
        page:1,
        off_no:false,
        listData:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            typeid: options.typeid,
            brandid: options.brandid || 0
        })
        this.getGoodsList()
    },
    getGoodsList(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            shop_id: that.data.shop_id,
            brandid: that.data.brandid,
            type_id: that.data.typeid,
            page:that.data.page
        }
        app.net.$Api.getGoodsList(params).then((res) => {
            console.log(res)
            if(res.data.data.length>0){
                that.setData({
                    listData:that.data.listData.concat(res.data.data)
                })
            }else{
                that.setData({
                    off_no:true
                })
            }
        })
    },
    goshopDetaile(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/shopDetaile/shopDetaile?id='+id,
        })
    },
    
    /**
    * 页面上拉触底事件的处理函数
    */
    onReachBottom: function () {
        if (!this.data.off_no){
            this.data.page++;
            this.getGoodsList()
        }
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
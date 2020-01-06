const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:0,
        shop_id: 0,
        shopName:'',
        shopPrice:'',
        message:'',
        searchData:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        that.setData({
            member_id: userInfo.id
        })
        if (options.id){
            that.setData({
                shop_id: options.id
            })
            that.getJishiShopInfo()
        }
    },
    shopPriceInpt(e) {
        this.setData({
            shopPrice: e.detail.value
        })
    },
    selectShop(e) {
        let shopItem = e.currentTarget.dataset.item;
        if (shopItem.id == 0){
            return
        }
        else if (shopItem.status == 1){
            app.alert('该店铺已关联~')
            return;
        }else{
            this.setData({
                shopName: shopItem.real_name,
                shop_id: shopItem.id,
                searchData: []
            })
        }
        
    },
    ontextareaChange(e) {
        this.setData({
            message: e.detail.value
        })
    },
    getJishiShopInfo(){
        let that = this,
        params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.shop_id = that.data.shop_id;
        app.net.$Api.getJishiShopInfo(params).then((res) => {
            console.log(res)
            that.setData({
                shop_id: res.data.data.id,
                shopName: res.data.data.real_name,
                shopPrice: res.data.data.money,
                message: '',
            })
        })
    },
     searchInpt(e) {
        let that = this,
            searchVal = e.detail.value,
            params = new Object();
            params.appid = app.globalData.appid;
            params.member_id = that.data.member_id;
            params.name = e.detail.value;
         let searchData = []
        if (e.detail.value.length > 0) {
            app.net.$Api.searchShop(params).then((res) => {
                console.log(res)
                if (res.data.data.length>0){
                     searchData = res.data.data
                 
                }else{
                    searchData = [{
                        id: "0",
                        real_name: "未搜索到相关门店",
                        status: 0,
                    }]
                }
                that.setData({
                    searchData: searchData,
                    searchVal: searchVal
                })
            })
        } else if (e.detail.value == 0) { //如果val为空 清空列表
            this.setData({
                searchData: []
            })
        } 

    },
    addShops(){
        let that = this,
            params = new Object();
            params.appid = app.globalData.appid;
            params.member_id = that.data.member_id;
            params.shop_id = that.data.shop_id;
            params.money = that.data.shopPrice;
            params.msg = that.data.message;
        if (that.data.shopName == ''){
            app.alert('请搜索相关店铺并选中~');
            return;
        }
        if (that.data.shopPrice == ""){
            app.alert('请输入场地费~');
            return;
        }
        app.net.$Api.saveJishiShop(params).then((res) => {
            if (res.data.code == 200) {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            that.setData({
                                shopName: '',
                                shopPrice: '',
                                message: '',
                            })
                          wx.navigateBack({
                              delta:1
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
// pages/goodsList/goodsList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId:0,//用户id
        shopId:0,//店铺id
        total:0,//总计
        CarList:{},//购物车列表
        flage:true,
        address:'',//详细地址
        receiver:'',//收货人
        mobile:'',//收获人手机号
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow(){
        let address = wx.getStorageSync('address')
        this.setData({
            flage: app.globalData.flage,
            address: address.addresMsg,
            mobile: address.mobile,
            receiver: address.name
        })
        console.log(this.data.flage)
    },
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userinfo') || '';
        let CarList = wx.getStorageSync('CarList') || {};
        this.setData({
            CarList: CarList,
            isIphoneX: app.globalData.isIphoneX,
            shopId: options.id,
            userId: userinfo.id
        })
        this.sumTotal(CarList)
    },
    sumTotal(CarList) {
        let total = 0;
        if (JSON.stringify(CarList) != "{}") {
            for (var k in CarList) {
                total += CarList[k].price * CarList[k].num / 1
            }
        }
        wx.setStorage({
            key: 'CarList',
            data: CarList,
        })
        this.setData({
            total: total.toFixed(2)
        })
    },
    add: function (e) {
        let id = e.currentTarget.dataset.id;
        let CarList = this.data.CarList;
        for (var i in CarList){
            if (id == i) {
                CarList[i].num++
            }
        }
        this.sumTotal(CarList)
        wx.setStorage({
            key: 'CarList',
            data: CarList,
        })
        this.setData({
            CarList: CarList
        })
    },
    can(e){
        let id = e.currentTarget.dataset.id;
        let CarList = this.data.CarList;
        for (var i in CarList) {
            if (id == i && CarList[i].num!=1) {
                CarList[i].num--
            }
        }
        this.sumTotal(CarList)
        this.setData({
            CarList: CarList
        })
    },
    goAddres(){
        wx.navigateTo({
            url: '/pages/address/address',
        })
    },
    // 购买
    createOrder() {
        let that = this;
        // let address = wx.getStorageSync('userinfo') || '';
        let params = {
            appid: app.globalData.appid,
            shop_id: that.data.shopId,
            member_id: that.data.userId,
            goods: that.data.CarList,
            address: that.data.address,
            mobile: that.data.mobile,
            receiver: that.data.receiver
        }
        app.loading('加载中')
        app.net.$Api.createOrder(params).then((res) => {
           wx.hideLoading()
        })
    },
    // requestMsg() {
    //     wx.requestSubscribeMessage({
    //         tmplIds: ['h63kyZQSQoQqosVVfkTdD1kvA9x5tMAUwhzoGTrCpS4', 'T1ZvDJPVwlt4FXBMdcIslUF6AzZ_pMhQUwM-r_IYW_k', 'S5tuM0uifn67CiLRqReVZk97GETAzHGoGlQhzGlNF_o', 'F8TezMCsMq0qdlv-Wm9hGkDGRNyZPKu1PaYo7h8tOvY'],
    //         success: (res) => {
    //             // if (res['h63kyZQSQoQqosVVfkTdD1kvA9x5tMAUwhzoGTrCpS4'] === 'accept') {
    //             //     wx.showToast({
    //             //         title: '订阅OK！',
    //             //         duration: 1000,
    //             //         success(data) {
    //             //             //成功
    //             //             resolve()
    //             //         }
    //             //     })
    //             // }
    //             console.log(res)
    //         },
    //         fail(err) {
    //             //失败
    //             console.error(err);
    //         }
    //     })
    // },
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
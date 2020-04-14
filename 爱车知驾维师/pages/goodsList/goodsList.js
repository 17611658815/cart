// pages/goodsList/goodsList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: 0,//用户id
        order_id:0,
        total: 0,//总计
        CarList: {},//购物车列表
        orderMsg:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow() {
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
        let CarList = app.globalData.CarList;
        this.setData({
            CarList: CarList,
            isIphoneX: app.globalData.isIphoneX,
            shopId: options.id,
            userId: userinfo.id,
            order_id: options.id
        })
        this.sumTotal(CarList)
        console.log(options)
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
        console.log(total)
    },
    add: function (e) {
        let id = e.currentTarget.dataset.id;
        let CarList = this.data.CarList;
        for (var i in CarList) {
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
    can(e) {
        let id = e.currentTarget.dataset.id;
        let CarList = this.data.CarList;
        for (var i in CarList) {
            if (id == i && CarList[i].num != 1) {
                CarList[i].num--
            }
        }
        this.sumTotal(CarList)
        this.setData({
            CarList: CarList
        })
    },
    goAddres() {
        wx.navigateTo({
            url: '/pages/address/address',
        })
    },
    ontextareaChange(e){
        console.log(e)
        let orderMsg = e.detail.value
        this.setData({
            orderMsg: orderMsg
        })
    },
    // 购买
    creatSubOrder() {
        let that = this;
        let CarList = that.data.CarList;
        if (that.data.orderMsg == ""){
            app.alert('请输入备注~');
            return
        }
        let goodsData = [],
            serviceData=[];
        for (var i in CarList){
            if (CarList[i].type == 1){
                goodsData.push(CarList[i])
            }
            if (CarList[i].type == 2){
                serviceData.push(CarList[i])
            }
        }
        let params = {
            appid: app.globalData.appid,
            order_id: that.data.order_id,
            member_id: that.data.userId,
            goods: goodsData,
            service: serviceData,
            msg: that.data.orderMsg,
            area_id: app.globalData.area_id
        }
        app.loading('加载中')
        app.net.$Api.creatSubOrder(params).then((res) => {
            if(res.data.code == 200){
                wx.showModal({
                    title: '温馨提示',
                    content: '成功',
                    showCancel: false,
                    success:function(){
                        wx.navigateTo({
                            url: '/pages/otherList/otherList',
                        },()=>{
                            wx.removeStorage({
                                key: 'CarList',
                                success: function(res) {
                                    
                                },
                            })
                        })
                    }
                })
            }
            wx.hideLoading()
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
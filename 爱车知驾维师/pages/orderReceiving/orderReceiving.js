// pages/otherDetaile/otherDetaile.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: '',
        id: '39',//订单id
        otherObj: {},
        num: 0,
        userid:0,//技师id
        dataLength:0,
        dataList:[],
        shop_id:0,//店铺id
        carListShow:false,
        carList:[],
        carindex:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            userid: userInfo.id,
        })
        this.setData({
            id: options.id || this.data.id,
            status: options.status
        })
        this.getWillOrder()
    },
    getWillOrder() {
        let that = this;
        let num = 0
        let params = {
            appid: app.globalData.appid,
            id: that.data.id,
        }
        app.loading('加载中')
        app.net.$Api.getWillOrder(params).then((res) => {
            console.log(res)
            that.setData({
                otherObj: res.data.data,
               
            })
            wx.hideLoading()
        })
    },
    getJishiShop() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            user_id: that.data.userid,
        }
        app.net.$Api.getJishiShop(params).then((res) => {
            if(res.data.data.length == 1){
                that.setData({
                    shop_id: res.data.data[0].id
                })
            }else{
                that.setData({
                    carList: res.data.data,
                    carListShow: true
                })
            }
            console.log(res)
        })
    },
    // 关闭店铺
    onhidesCarlist() {
        this.setData({
            carListShow: false
        })
    },
    // 选择店铺
    selectCar(e) {
        let index = e.currentTarget.dataset.index;
        let carList = this.data.carList
        this.setData({
            carindex: index,
            shop_id: carList[index].id
        })
        console.log(this.data.shop_id)
    },
    // 确定选中店铺
    confirmCar(e) {
        let that = this;
        let index = this.data.carindex;
        let carList = this.data.carList
        this.setData({
            shop_id: carList[index].id,
            carListShow: false
        },()=>{
            that.acceptOrder()
        })
        console.log(that.data.shop_id)
        // app.globalData.area_id = that.data.area_id
        // app.globalData.Carid = id
        // wx.navigateTo({
        //     url: '/pages/search/search?currentTab=' + (that.data.currentTab + 1) + "&Carid=" + id + "&area_id=" + that.data.area_id,
        // })
    },
    // 接单
    acceptOrder(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            order_id: that.data.id,
            jishi_id: that.data.userid,
            shop_id: that.data.shop_id,
        }
        app.net.$Api.acceptOrder(params).then((res) => {
            if(res.data.code==200){
                wx.showModal({
                    title: '温馨提示',
                    content: res.data.msg,
                    showCancel: false,
                    success: function () {
                        wx.reLaunch({
                            url: '/pages/otherList/otherList',
                        })
                    }
                })
            }
            if (res.data.code == 500) {
                wx.showModal({
                    title: '温馨提示',
                    content: res.data.msg,
                    showCancel: false,
                    // success: function () {
                    //     wx.reLaunch({
                    //         url: '/pages/otherList/otherList',
                    //     })
                    // }
                })
            }
            if (res.data.code == 600){
                wx.showModal({
                    title: '温馨提示',
                    content: res.data.msg,
                    showCancel: false,
                    success:function(){
                        wx.reLaunch({
                            url: '/pages/index/index',
                        })
                    }
                })
            }
            console.log(res)
        })
    },
    recallOther(){
        wx.reLaunch({
            url: '/pages/index/index',
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
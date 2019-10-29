// pages/cartList/cartList.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isIphoneX:false,
        total:'0:00',
        CartData1: [{
            "id": "14",
            "member_id": "4",
            "projectid": "1",
            "shopid": "1",
            "price": "70.00",
            "num": "1",
            "project_name": "壳牌机油",
            "project_thumb": "../../images/1570861870.jpg",
            "project_price": "70.00",
            "checked": false,
            "total": "70.00"
        }, {
            "id": "14",
            "member_id": "4",
            "projectid": "1",
            "shopid": "1",
            "price": "90.00",
            "num": "1",
            "project_name": "美孚机油",
            "project_thumb": "../../images/1570861870.jpg",
            "project_price": "90.00",
            "checked": false,
            "total": "90.00"
            }, {
                "id": "14",
                "member_id": "4",
                "projectid": "1",
                "shopid": "1",
                "price": "90.00",
                "num": "1",
                "project_name": "美孚机油",
                "project_thumb": "../../images/1570861870.jpg",
                "project_price": "90.00",
                "checked": false,
                "total": "90.00"
            }],
        CartData2: [{
            "id": "14",
            "member_id": "4",
            "projectid": "1",
            "shopid": "1",
            "price": "70.00",
            "num": "1",
            "project_name": "壳牌机油",
            "project_thumb": "../../images/1570861870.jpg",
            "project_price": "70.00",
            "checked": false,
            "total": "70.00"
        }, {
            "id": "14",
            "member_id": "4",
            "projectid": "1",
            "shopid": "1",
            "price": "90.00",
            "num": "1",
            "project_name": "美孚机油",
            "project_thumb": "../../images/1570861870.jpg",
            "project_price": "90.00",
            "checked": false,
            "total": "90.00"
            }, {
                "id": "14",
                "member_id": "4",
                "projectid": "1",
                "shopid": "1",
                "price": "90.00",
                "num": "1",
                "project_name": "美孚机油",
                "project_thumb": "../../images/1570861870.jpg",
                "project_price": "90.00",
                "checked": false,
                "total": "90.00"
            }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            isIphoneX: app.globalData.isIphoneX,
        })
    },
    // 第一列单选
    firstChecked: function (e) {
        let CartData = this.data.CartData1;
        let index = e.currentTarget.dataset.index;
        let Num = 0;
        let cartStr = []
        for (var i = 0; i < CartData.length; i++) {
            console.log(index,i)
            if (index == i){
                CartData[i].checked = true
                console.log(CartData[i])
            }else{
                CartData[i].checked = false
            }
        }
        // 合计
        var sum = 0
        for (var i = 0; i < CartData.length; i++) {
            if (CartData[i].checked) {
                sum += CartData[i].num * CartData[i].price
            }
        }
        //更新数据
        this.setData({
            total: sum.toFixed(2),
            CartData1: CartData,
            cartStr: cartStr,
        })
        wx.setStorage({
            key: 'CartData1',
            data: CartData,
        })
        console.log('购物车id=>', cartStr)
    },
    // 第二列
    secondChecked(e){
        let CartData = this.data.CartData2;
        let index = e.currentTarget.dataset.index;
        let Num = 0;
        let cartStr = []
        for (var i = 0; i < CartData.length; i++) {
            console.log(index, i)
            if (index == i) {
                CartData[i].checked = true
                console.log(CartData[i])
            } else {
                CartData[i].checked = false
            }
        }
        // 合计
        var sum = 0
        for (var i = 0; i < CartData.length; i++) {
            if (CartData[i].checked) {
                sum += CartData[i].num * CartData[i].price
            }
        }
        //更新数据
        this.setData({
            total: sum.toFixed(2),
            CartData2: CartData,
            cartStr: cartStr,
        })
        wx.setStorage({
            key: 'CartData2',
            data: CartData,
        })
        console.log('购物车id=>', cartStr)
    },
    // 去下单
    placeOther(){
        wx.navigateTo({
            url: '/pages/placeOther/placeOther',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
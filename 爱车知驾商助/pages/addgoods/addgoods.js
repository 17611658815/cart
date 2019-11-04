// page/order/pages/newAddress/newAddress.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        addressid: '', //地址id
        city: [],
        multiArray: [],
        multiIndex: [0, 0], //地址索引

        mobile: '', //收货人手机号
        province: '', //收货人所在省份
        city: '', //收货人城市
        address: '', //收货人详细地址
        typeList:[],
        typeName:'',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        that.getGoodsType()
    },
    // 联系人姓名
    mobileInpt(e) {
        this.setData({
            mobile: e.detail.value
        })
    },
    // 联系人姓名
    usernameInpt(e) {
        this.setData({
            username: e.detail.value
        })
    },
    // 文本域val-change事件
    ontextareaChange(e) {
        this.setData({
            addresMsg: e.detail.value
        })
    },
    // 获取地区数据
    getGoodsType() {
        let that = this;
        let index = that.data.multiIndex,
            params = {
                appid: app.globalData.appid,
            };
        app.net.$Api.getGoodsType(params).then((res) => {
            console.log(res)
            that.data.city = res.data.data;
            that.data.multiArray = [
                [...that.data.city],
                [...that.data.city[index[0]].sonareaData]
            ];
            that.setData({
                multiArray: that.data.multiArray,
            })
            console.log(that.data.multiArray)
        })
    },
    // picker-Change事件
    bindMultiPickerColumnChange: function (e) {
        let city = this.data.city
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                data.multiArray[1] = city[e.detail.value].sonareaData;
                break;
        }
        this.setData({
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        })
    },
    // picker-确定事件
    bindMultiPickerChange: function (e) {
        this.multiIndex = e.detail.value;
        this.setData({
            typeName: this.data.multiArray[1][e.detail.value[1]].name,
            multiIndex: e.detail.value,
            "multiId[0]": this.data.multiArray[0][e.detail.value[0]].id,
            "multiId[1]": this.data.multiArray[1][e.detail.value[1]].id,
        })
        console.log(this.data.multiId)
    },

    //点击默认地址
    selectAcquiescent() {
        this.setData({
            defaultFlag: !this.data.defaultFlag
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
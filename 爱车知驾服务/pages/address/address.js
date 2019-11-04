// page/order/pages/newAddress/newAddress.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        changeBtn: false,
        index: 0,
        addresMsg: '', //详细地址
        username: '', // 收货人姓名
        mobile: '', //收货人手机号
        address: '', //收货人详细地址
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        let address = wx.getStorageSync('address') || {};
        that.setData({
            addresMsg: address.addresMsg || '',
            username: address.name || '',
            mobile: address.mobile || '',
        })
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
    // 回显数据
    detailsAddres(id) {
        let that = this;
           
    },
    // 保存新增地址
    saveAddres() {
        let that = this;
        if (that.data.username == '') {
            app.alert('请完善联系人姓名~')
            return;
        }
        if (that.data.mobile == '' && that.data.mobile.length > 11) {
            app.alert('请输入正确的手机号~')
            return;
        }
        if (that.data.addresMsg == '') {
            app.alert('请输入详细地址~')
            return;
        }
        let addressinfo = {
            name: that.data.username,
            mobile: that.data.mobile,
            addresMsg: that.data.addresMsg,
        }
        app.globalData.flage = false
        wx.setStorage({
            key: 'address',
            data: addressinfo,
            success:function(res){
                wx.navigateBack({
                    delta: 1
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
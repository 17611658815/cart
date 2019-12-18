// pages/addBank/addBank.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:0,
        name:'',//持卡人姓名
        code:'',//银行卡号
        bank_name:'',//开户行名称
        identity:'',//身份证号
        mobile:'',//手机号

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
    },
    addBankCard() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            name:that.data.name,
            code: that.data.code,
            bank_name: that.data.bank_name,
            identity: that.data.identity,
            mobile: that.data.mobile,
        };
        if (that.data.name == "") {
            app.alert("请填写持卡人姓名")
            return
        }
        if (that.data.code == "") {
            app.alert("请填写银行卡号")
            return
        }
        if (that.data.bank_name == "") {
            app.alert("请填写开户行")
            return
        }
        if (that.data.identity == "") {
            app.alert("请填写身份证号")
            return
        }
        if (that.data.mobile == "") {
            app.alert("请填写手机号")
            return
        }
        app.net.$Api.addBankCard(params).then((res) => {
            if (res.data.code == 200) {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            wx.navigateBack({
                                detal: 1
                            })
                        }, 2000)
                    }
                })
            }
        })
    },
    //持卡人名称
    nameInpt(e) {
        this.setData({
            name: e.detail.value
        })
    },
    //银行卡号
    codeInpt(e) {
        this.setData({
            code: e.detail.value
        })
    },
    //开户行名称
    bankNameInpt(e) {
        this.setData({
            bank_name: e.detail.value
        })
    },
    //身份证号
    identityInpt(e) {
        this.setData({
            identity: e.detail.value
        })
    },
    //手机号
    mobileInpt(e) {
        this.setData({
            mobile: e.detail.value
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
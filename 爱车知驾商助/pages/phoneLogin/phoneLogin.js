// pages/phoneLogin/phoneLogin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        noSend:true,
        num:60,
        Length: 4,    //输入框个数 
        isFocus: false,  //聚焦 
        Value: "",    //输入的内容 
        ispassword: true, //是否密文显示 true为密文， false为明文。 
    },
    Focus(e) {
        var that = this;
        console.log(e.detail.value);
        var inputValue = e.detail.value;
        that.setData({
            Value: inputValue,
        })
    },
    Tap() {
        var that = this;
        that.setData({
            isFocus: true,
        })
    },
    formSubmit(e) {
        console.log(e.detail.value.password);
    },
    savePhone: function (e) {
        var that = this;
        that.setData({
            phone: e.detail.value
        })
    },
    checkPhone: function (phone) {
        var that = this;
        if (phone.length == 0) {
            that.alert("请输入手机号");
            return false;
        }
        if (phone.length != 11) {
            that.alert("手机号长度有误！");
            return false;
        }
        return true;
    },
    //获取验证码
    getCode() {
        var that = this;
        var num = that.data.num;
        // var phone = that.data.phone;
        // var params = new Object();
        // params.appid = app.globalData.appid;
        // params.phone = phone;
        // if (that.checkPhone(phone)) {
        //     app.net.$Api.sendSmsCode(params).then((res) => {
        //         console.log(res.data);
        //         if (res.data.code == 500) {
        //             app.alert(res.data.msg)
        //         } else {
                    that.setData({
                        noSend: false
                    });
                    that.data.timer = setInterval(function () {
                        num--;
                        that.setData({
                            num: num,
                        });
                        if (that.data.num == 0) {
                            clearInterval(that.data.timer);
                            that.setData({
                                num: 60,
                                noSend: true
                            });
                        }
                    }, 1000);
                // }
        //     })
        // }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
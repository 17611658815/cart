//app.js
const Api = require('API/API.js');
App({
    onLaunch: function () {
        
        wx.getSystemInfo({
            success: (res) => {
                console.log(res)
                if (res.model.search('iPhone X') != -1) {
                    this.globalData.isIphoneX = true
                }
            }
        })
    },
    //检查登录
    checkLogin:function(){
        let userInfo = wx.getStorageSync('userinfo') || '';
        if (userInfo == "") {
            wx.navigateTo({
                url: '/pages/login/login',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
            })
        }
    },
    //挂载网络请求api
    net: {
        $Api: Api.api,
    },
    globalData: {
        userInfo: null,
        isIphoneX:false,
        appid:'8',
        order_id:'',
        couponType:'', //优惠卷类型
        couponvalue:0,//优惠卷额度
        couponId:'',//优惠卷id
        NewTotal:'',//总价
        order_id:0,//总价
        ak: "sQdSTWiqZ5943Yjz8naByOZ1OcpE7d0u"

    },
    loading: function (content) {
        wx.showLoading({
            mask: true,
            title: content,
            icon: 'loading',
        })
    },
    alert: function (content) {
        wx.showModal({
            title: '温馨提示',
            content: content,
            showCancel: false
        })
        return this
    },
})
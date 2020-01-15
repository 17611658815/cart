//app.js
const Api = require('API/API.js');
App({
    onLaunch: function() {
        wx.getSystemInfo({
            success: (res) => {
                console.log(res)
                if (res.model.search('iPhone X') != -1) {
                    this.globalData.isIphoneX = true
                }
            }
        })
        this.getSysdata()
    },
    //检查登录
    checkLogin: function() {
        let userInfo = wx.getStorageSync('userinfo') || '';
        if (userInfo == "") {
            wx.navigateTo({
                url: '/pages/login/login',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
            })
        }
    },
    //挂载网络请求api
    net: {
        $Api: Api.api,
    },
    //获取系统参数
      getSysdata: function ()  {    
        if  (arguments[0]  !=  undefined)  {      
            that.globalData.callback  =  arguments[0];    
        }    
        var  that  =  this;    
        wx.getSystemInfo({      
            success:   function (e)  {
                console.log(e)        
                that.globalData.window  =  e;        
                if  (that.globalData.callback  !=  undefined  &&  typeof (that.globalData.callback)  ==  'function')  {          
                    console.log('获取系统参数回调');          
                    that.globalData['callback']();        
                }      
            },
                  fail:   function (e)  {        
                console.log(e)      
            }    
        });  
    },
    globalData: {
        userInfo: null,
        isIphoneX: false,
        appid: '8',
        order_id: '',
        couponType: '', //优惠卷类型
        couponvalue: 0, //优惠卷额度
        couponId: '', //优惠卷id
        NewTotal: '', //总价
        order_id: 0, //总价
        ak: "sQdSTWiqZ5943Yjz8naByOZ1OcpE7d0u"

    },
    // 推荐位
    getRecommend(id, limit) {
        let that = this,
            params = new Object();
        params.appid = that.globalData.appid;
        params.recommend_catid = id;
        params.limit = limit;
        return new Promise((resolve, reject) => {
            that.net.$Api.getRecommend(params).then((res) => {
                resolve(res.data.data)
            })

        })
    },
    loading: function(content) {
        wx.showLoading({
            mask: true,
            title: content,
            icon: 'loading',
        })
    },
    alert: function(content) {
        wx.showModal({
            title: '温馨提示',
            content: content,
            showCancel: false
        })
        return this
    },
})
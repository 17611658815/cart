//app.js
const Api = require('API/API.js');
App({
    onLaunch: function () {
        let userInfo = wx.getStorageSync('userinfo') || '';
        if (userInfo == "") {
            wx.navigateTo({
                url: '/pages/wxLogin/wxLogin',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
            })
        }
        wx.getSystemInfo({
            success: (res) => {
                console.log(res)
                if (res.model.search('iPhone X') != -1) {
                    this.globalData.isIphoneX = true
                }
            }
        })
    },
    //挂载网络请求api
    net: {
        $Api: Api.api,
    },
    globalData: {
        userInfo: null,
        isIphoneX: false,
        appid: '10',
        logistics:'',
        ak:"sQdSTWiqZ5943Yjz8naByOZ1OcpE7d0u"
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
    // 显示红点
    showTabBarRedDot:function(index){
        wx.showTabBarRedDot({
            index: index,
            success: function (res) {
                console.log(res)
            }
        })
    },
    // 显示文字
    setTabBarBadge: function (index,num){
        wx.setTabBarBadge({
            index: index,
            text: num
        })
    },
    // 移除 tabBar 某一项右上角的文本
    removeTabBarBadge(index){
        wx.removeTabBarBadge({
            index: index,
        })
    },
    // 隐藏红点
    hideTabBarRedDot(index){
        wx.removeTabBarBadge({
            index: index,
        })
    }
})
//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userid:0,
        navList: ['首页', '知驾服务'],
        currentTab:0,
        userInfo: {},
        hasInfo:0,
        city: "",//当前城市
        address: "",//当前位置
        longitude: 0,
        latitude: 0,

    },
    onLoad: function () {
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            userid: userInfo.id,
            userInfo: userInfo
        })
        this.getUserInfo()
        this.getLocationMsg()
    },
    //获取当前位置
    getLocationMsg() {
        let that = this;
        wx.getLocation({
            type: 'gcj02',
            altitude: true, //高精度定位
            success: function (res) {
                console.log(res)
                wx.request({
                    url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=UYFBZ-ANUWW-Y7GRO-OURNR-G5L7O-PHFMD',
                    success: function (e) {
                        console.log(res)
                        app.globalData.longitude = res.longitude;
                        app.globalData.latitude = res.latitude;
                        app.globalData.city = e.data.result.address_component.city
                        that.setData({
                            city: e.data.result.address_component.city,//当前城市
                            address: e.data.result.address,//当前位置
                            longitude: res.longitude,
                            latitude: res.latitude,
                        })
                    }
                })
            }
        });
    },
    getUserInfo() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            userid: that.data.userid,
        }
        app.net.$Api.getUserInfo(params).then((res) => {
            console.log(res, 38)
            app.globalData.hasInfo = res.data.user;
            app.globalData.num = res.data.hasInfo
            that.setData({
                hasInfo: res.data.hasInfo
            })
        })
    },
    goCarservice(){
        wx.reLaunch({
            url: '/pages/Carservice/Carservice/Carservice',
        })
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index
        })
    },
    gomaycenter() {
        wx.navigateTo({
            url: '/pages/Carservice/maycenter/maycenter',
        })
    },
    // 立即注册
    gosign(){
        wx.navigateTo({
            url: '/pages/photopage/photopage',
        })
    },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
 
})

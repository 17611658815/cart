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
        hasInfoNum:0

    },
    onLoad: function () {
        let userInfo = wx.getStorageSync('userinfo') || {};
        this.setData({
            userid: userInfo.id,
            userInfo: userInfo
        })
        this.getUserInfo()
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
                hasInfo: res.data.hasInfo,
                hasInfoNum: res.data.hasInfo
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
        if (this.data.hasInfoNum == 0){
            wx.navigateTo({
                url: '/pages/photopage/photopage',
            })
        }else{
            wx.navigateTo({
                url: '/pages/Carservice/maycenter/maycenter',
            })
        }
       
    },
    // 立即注册
    gosign(){
        wx.navigateTo({
            url: '/pages/photopage/photopage',
        })
    },
    gomessageList(){
        wx.navigateTo({
            url: '/pages/messageList/messageList',
        })
    },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
 
})

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  onLoad: function () {
   
  },
godataCenter(){
    wx.navigateTo({
        url: '/pages/dataCenter/dataCenter',
    })
} ,
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

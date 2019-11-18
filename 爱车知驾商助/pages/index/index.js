//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        id:0,
        goods:'',//商品
        order:'',//订单
        trade:'',//交易
        list:'',//帖子
    },
    onLoad: function() {
        let userInfo = wx.getStorageSync('userinfo') || '';
        app.globalData.userInfo = userInfo
        this.setData({
            id: userInfo.id
        })
        this.getShopHomeData()
        this.getPostingsList()
    },
    getShopHomeData(){
        let that = this,
            params = {
                appid: app.globalData.appid,
                member_id:that.data.id
            }
        app.net.$Api.getShopHomeData(params).then((res) => {
          console.log(res)
          that.setData({
              goods: res.data.data.goods,
              order: res.data.data.order,
              trade: res.data.data.trade
          })
        })
    },
    // 社区帖子
    getPostingsList(){
        let that = this,
            params = {
                appid: app.globalData.appid,
            }
        app.net.$Api.getPostingsList(params).then((res) => {
            console.log(res.data)
            that.setData({
                list: res.data.data,
            })
        })
    },
    godataCenter() {
        wx.navigateTo({
            url: '/pages/dataCenter/dataCenter',
        })
    },
    // 订单管理
    gootherType(e) {
        let status = e.currentTarget.dataset.status;
        let currenttab = e.currentTarget.dataset.currenttab;
        console.log(e)
        wx.navigateTo({
            url: '/pages/otherType/otherType?status=' + status + '&currentTab=' + currenttab,
        })
    },
    // 订单管理
    goaddgoods() {
        wx.navigateTo({
            url: '/pages/addgoods/addgoods',
        })
    },
    // 商家社区
    gocommunity() {
        wx.navigateTo({
            url: '/pages/community/community',
        })
    },
    // 获取首页图片
    // getindexImg() {
    //     let that = this,
    //         params = {}
    //     app.net.$Api.getindexImg(params).then((res) => {
    //         that.setData({
    //             homePicData: res.data
    //         })
    //     })
    // },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
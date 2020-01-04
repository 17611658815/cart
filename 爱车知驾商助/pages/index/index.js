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
        msgNum:0,
        isIphoneX:false,
        member_id:0
    },
    onLoad: function (options) {
        app.globalData.share_source = options.share_source || 0
        // this.getShopHomeData()
        // this.getPostingsList()
        // this.getLocationMsg()
    },
    onbindcontact(e){
        console.log(e, 27)
    },
    onShow(){
        let userInfo = wx.getStorageSync('userinfo') || '';
        app.globalData.userInfo = userInfo
        this.setData({
            member_id: userInfo.id ? userInfo.id : 0,
            isIphoneX: app.globalData.isIphoneX
        })
        this.getShopHomeData()
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
    getShopHomeData(){
        let that = this,
            params = {
                appid: app.globalData.appid,
                member_id: that.data.member_id
            }
        console.log(params)
        app.net.$Api.getShopHomeData(params).then((res) => {
            console.log(res)
            if (res.data.data.msg>0){
                app.showTabBarRedDot(1)
                app.setTabBarBadge(1, res.data.data.msg + "")
            }
            that.setData({
                goods: res.data.data.goods,
                order: res.data.data.order,
                trade: res.data.data.trade,
                msgNum: res.data.data.msg,
                list: res.data.data.postings
            })
        })
    },
    goGoodsList(e){
        let index = e.currentTarget.dataset.index;
        let status = e.currentTarget.dataset.status;
        console.log(index, status)
        wx.navigateTo({
            url: '/pages/goodsList/goodsList?index=' + index + "&status=" + status,
        })

    },
    gomsgDetaile(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/msgDetaile/msgDetaile?id=' + id,
        })
    },
   /*  // 社区帖子
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
    }, */
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
        if (!app.globalData.userInfo.id) {
            app.checkLogin();

        } else {
            wx.navigateTo({
                url: '/pages/addgoods/addgoods',
            })
        }
    },
    // 商家社区
    gocommunity() {
        wx.navigateTo({
            url: '/pages/community/community',
        })
    },
    goOrderList(){
        wx.navigateTo({
            url: '/pages/orderList/orderList',
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
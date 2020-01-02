// pages/message/message.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow:1,
        member_id:0,
        goodsNum:0,
        msgArr:[{
            title:'重要通知',
            icon:'../../images/icon/icon_11.jpg',
            path:''
        }, {
            title: '订单通知',
                icon: '../../images/icon/icon_12.jpg',
            path: ''
        }, {
            title: '店铺通知',
                icon: '../../images/icon/icon_13.jpg',
            path: ''
        }, {
            title: '其他通知',
                icon: '../../images/icon/icon_14.jpg',
            path: ''
        }],
        msgList:[]
    },
    
    gomessageList(e){
        let currentTab = e.currentTarget.dataset.index;
        console.log(currentTab)
        if (this.data.goodsNum == 0){
            return
        }else{
            wx.navigateTo({
                url: '/pages/messageList/messageList?currentTab=' + currentTab,
            })
        }
    },
    gosetMsg(){
        wx.navigateTo({
            url: '/pages/setMsg/setMsg',
        })
    },
    goaddgoods(){
        wx.navigateTo({
            url: '/pages/addgoods/addgoods',
        })
    },
    // 获取分类
    messagePower() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id
        };
        app.net.$Api.messagePower(params).then((res) => {
            console.log(res)
            that.setData({
                isShow: res.data.power
            })

        })

    },
    // 获取分类
    getShopGoodsNum() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id
        };
        app.net.$Api.getShopGoodsNum(params).then((res) => {
            console.log(res)
            that.setData({
                goodsNum: res.data.goods_num
            })

        })

    },
    noticeList() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            type: 0,
            page: that.data.page
        }
        app.net.$Api.noticeList(params).then((res) => {
            if (res.data.data.length > 0) {
                that.setData({
                    msgList: that.data.msgList.concat(res.data.data)
                })
            } else {
                that.setData({
                    on_off: true
                })
            }
        })
    },
    noticeRead(id, path) {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            id: id,
        }
        app.net.$Api.noticeRead(params).then((res) => {
            console.log(res)
            wx.navigateTo({
                url: path,
            })
        })
    },
    gonoticeInfo(e) {
        let id = e.currentTarget.dataset.id;
        let path = e.currentTarget.dataset.path;
        console.log(id, path)
        if (path) {
            console.log('1')
            this.noticeRead(id, path)
        } else {
            console.log('2')
            wx.navigateTo({
                url: '/pages/noticeInfo/noticeInfo?id=' + id,
            })
        }
    },
    /**
     * 
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userinfo');
        this.setData({
            member_id: userinfo.id,
        })
       
       
        this.messagePower();
        this.getShopGoodsNum();
        
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
        this.data.msgList = []
        this.noticeList()
        app.removeTabBarBadge(1)
        app.hideTabBarRedDot(1)
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
// pages/Carservice/maycenter/maycenter.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: ['累计登录', '发帖', '评论', '获赞'],
        typeListArr: [
            {
                name: '钱包',
                path: '/pages/Carservice/wallet/wallet',
                icon: '../../../images/icon_58.png'
            },
            {
                name: '我的银行卡',
                path: '/pages/bankList/bankList',
                icon: '../../../images/icon_59.png'
            },{
                name: '订单列表',
                path: '/pages/otherList/otherList',
            icon: '../../../images/icon_37.png'
            }, {
                name: '门店列表',
                path: '/pages/shopList/shopList',
                icon: '../../../images/icon_39.png'
            }
            , {
                name: '历史动态',
                path: '',
                icon: '../../../images/mayList_1.png'
            }, {
                name: '接单设置',
                path: '',
                icon: '../../../images/icon_40.png'
            },
            {
                name: '同城排行',
                path: '/pages/Carservice/rankingList/rankingList',
                icon: '../../../images/mayList_2.png'
            }, {
                name: '消息中心',
                path: '/pages/Carservice/msgCenter/msgCenter',
                icon: '../../../images/mayList_3.png'
            }
        ],
        avatar: '',
        real_name: "",
        level: '',
        member_id:0,
        numMsg:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let userInfo = wx.getStorageSync('userinfo') || {};
        this.setData({
            member_id: userInfo.id,
        })
        this.getUserInfo();
        if (userInfo.id){
            this.getCenterData()
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let userInfo = wx.getStorageSync('userinfo') || {};
        this.setData({
            member_id: userInfo.id,
        })
        this.getUserInfo();
        this.getCenterData()
    },
    getUserInfo() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            userid: that.data.member_id,
        }
        app.net.$Api.getUserInfo(params).then((res) => {
            console.log(res, 38)
            app.globalData.hasInfo = res.data.user;
            that.setData({
                avatar: res.data.user.avatar,
                real_name: res.data.user.real_name || "",
                level: res.data.user.level || "",
            })
            console.log(that.data.avatar)
        })
    },
    // 获赞信息
    getCenterData() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
        }
        app.net.$Api.getCenterData(params).then((res) => {
            console.log(res, 79)
            that.setData({
                numMsg:res.data
            })
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    goupPicregister() {
        if (!this.data.member_id){
            app.checkLogin();
        }else{
            wx.navigateTo({
                url: '/pages/photopage/photopage',
            })
        }
    },

    

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
// pages/may/may.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id: 0,
        typeListArr: [{
                name: '店铺等级',
                path: '/pages/shopLevel/shopLevel',
                icon: 'https://img.dodo.wiki/app/icon_16.png'
            },
            {
                name: '账户资金',
                path: '/pages/shopWallet/shopWallet',
                icon: 'https://img.dodo.wiki/app/icon_17.png'
            }, {
                name: '商友圈',
                path: '/pages/community/community',
                icon: 'https://img.dodo.wiki/app/icon_18.png'
            }, {
                name: '维修技师',
                path: '/pages/technicianList/technicianList',
                icon: 'https://img.dodo.wiki/app/icon_19.png'
            }, {
                name: '系统消息',
                path: '/pages/messageList/messageList',
                icon: 'https://img.dodo.wiki/app/icon_23.png'
            }, {
                name: '商家客服',
                path: '/pages/shopService/shopService',
                icon: '../../images/icon/kefu.png'
            }, {
                name: '设置',
                path: '/pages/setMsg/setMsg',
                icon: 'https://img.dodo.wiki/app/icon_22.png'
            }
        ],
        name: '',
        statusOb: ["资质未提交审核未", "店铺营业中", "店铺已下架", "店铺暂停接单"],
        status: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (){
        let userInfo = wx.getStorageSync('userinfo') || {};
        app.globalData.userInfo = userInfo
        this.setData({
            member_id: userInfo.id
        })
        this.getShopInfo();
    },
    onShow: function () {
        let userInfo = wx.getStorageSync('userinfo') || {};
        console.log('onShow', userInfo)
        app.globalData.userInfo = userInfo
        this.setData({
            member_id: userInfo.id
        })
        this.getShopInfo();
    },
    goregister() {
        console.log(app.globalData.userInfo)
        if (!app.globalData.userInfo.id){
            app.checkLogin();
            
        // } else if (this.data.status == 1){
        //     return
        } else{
            wx.navigateTo({
                url: '/pages/register/register',
            })
        }
    },
    getShopInfo() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
        }
        app.net.$Api.getShopInfo(params).then((res) => {
            console.log(res)
            app.globalData.shopInfo = res.data.data
            if (res.data.data.aptitude_photos == "" || res.data.data.work_photos == "") {
                wx.navigateTo({
                    url: '/pages/register/register',
                })
            } else {
                that.setData({
                    name: res.data.data.real_name,
                    status: res.data.data.status,
                    avatar: res.data.data.avatar
                })
            }
            console.log(res.data.data)
            // this.setData({
            //     name
            // })
        })

    },
    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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
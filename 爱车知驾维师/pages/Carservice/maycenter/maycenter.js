// pages/Carservice/maycenter/maycenter.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: ['累计登录', '发帖', '评论', '获赞'],
        typeListArr: [{
                name: '订单列表',
                path: '/pages/otherList/otherList',
                icon: '../../../images/mayList_1.png'
            }, {
                name: '门店列表',
                path: '/pages/shopList/shopList',
                icon: '../../../images/mayList_1.png'
            }
            , {
                name: '历史动态',
                path: '/pages/shopList/shopList',
                icon: '../../../images/mayList_1.png'
            }, {
                name: '接单设置',
                path: '',
                icon: '../../../images/mayList_1.png'
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
        level: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            avatar: app.globalData.hasInfo.avatar || "",
            real_name: app.globalData.hasInfo.real_name || "",
            level: app.globalData.hasInfo.level || "",
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    goupPicregister() {
        wx.navigateTo({
            url: '/pages/photopage/photopage',
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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
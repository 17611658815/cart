// pages/Carservice/maycenter/maycenter.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList:['累计登录','发帖','评论','获赞'],
        typeListArr: [{
            name: '历史动态',
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
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
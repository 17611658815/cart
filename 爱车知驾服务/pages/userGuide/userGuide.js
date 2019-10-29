// pages/userGuide/userGuide.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab:0,
        typeListArr: [{
            name: '初级维师',
            path: '',
            icon: '../../../images/mayList_1_1.png'
        },
        {
            name: '中级维师',
            path: '',
            icon: '../../../images/mayList_1_2.png'
        }, {
            name: '高级维师',
            path: '/pages/Carservice/msgCenter/msgCenter',
            icon: '../../../images/mayList_1_3.png'
        }, {
            name: '技师维师',
            path: '/pages/Carservice/msgCenter/msgCenter',
            icon: '../../../images/mayList_1_4.png'
            }, {
                name: '高级技师维师',
                path: '/pages/Carservice/msgCenter/msgCenter',
                icon: '../../../images/mayList_1_4.png'
            }]
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index
        })
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
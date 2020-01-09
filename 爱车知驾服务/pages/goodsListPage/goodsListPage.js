// pages/goodsListPage/goodsListPage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: "",
        listData: []
    },

    /**
     * 生命周期函数--监听页面加载  大灯、保险杠、冲压件、冷凝器
     */
    onLoad: function(options) {
        let listData = []
        if (options.type == 1) {
            listData = [{
                name: "机油",
                id: 10,
                img: "https://img.dodo.wiki/app/img20.jpg"
            }, {
                name: "刹车液",
                id: 13,
                img: "https://img.dodo.wiki/app/img21.jpg"
            }, {
                name: "冷媒",
                id: 225,
                img: "https://img.dodo.wiki/app/img22.jpg"
            }, {
                name: "过滤器",
                id: 62,
                img: "https://img.dodo.wiki/app/img23.jpg"
            }]
        } else if (options.type == 2) {
            listData = [{
                name: "轮胎",
                id: 222,
                img: "https://img.dodo.wiki/app/img24.jpg"
            }, {
                name: "蓄电池",
                id: 224,
                img: "https://img.dodo.wiki/app/img25.jpg"
            }, {
                name: "刹车片",
                id: 210,
                img: "https://img.dodo.wiki/app/img26.jpg"
            }, {
                name: "雨刷",
                id: 145,
                img: "https://img.dodo.wiki/app/img27.jpg"
            }]
        } else if (options.type == 3) {
            listData = [{
                name: "启动机",
                id: 226,
                img: "https://img.dodo.wiki/app/img29.jpg"
            }, {
                name: "发电机",
                id: 227,
                img: "https://img.dodo.wiki/app/img28.jpg"
            }, {
                name: "减震器",
                id: 228,
                img: "https://img.dodo.wiki/app/img30.jpg"
            }, {
                name: "离合器",
                id: 229,
                img: "https://img.dodo.wiki/app/img31.jpg"
            }]
        } else {
            listData = [{
                name: "大灯",
                id: 230,
                img: "https://img.dodo.wiki/app/img32.jpg"
            }, {
                name: "保险杠",
                id: 231,
                img: "https://img.dodo.wiki/app/img33.jpg"
            }, {
                name: "冲压件",
                id: 232,
                img: "https://img.dodo.wiki/app/img34.jpg"
            }, {
                name: "冷凝器",
                id: 233,
                img: "https://img.dodo.wiki/app/img35.jpg"
            }]
        }
        this.setData({
            listData,
            type: options.type
        })
    },
    godsItemList(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/goodsItemList/goodsItemList?id=' + id,
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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
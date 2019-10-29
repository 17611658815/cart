// pages/promotionCenter/promotionCenter.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,//头部导航
        dataTab: 0,//头部导航
        navList:['推广概况','搜索推广','场景展示'],
        tabArr:['搜索推广数据','场景展示数据'],
        selectIndex1:0,
        selectIndex2:0,
        selctList:['全部','商品推广','店铺推广','服务推广'],
        slect_item1:false,
        slect_item2:false,
        slect_item3:false,
        slect_item4:false,
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index
        })
    },
    // 搜索推广
    changeIndex_1(e){
        let index = e.currentTarget.dataset.index;
        this.setData({
            selectIndex1: index
        })
    },
    // 场景展示
    changeIndex_2(e){
        let index = e.currentTarget.dataset.index;
        this.setData({
            selectIndex2: index
        })
    },
    // 搜索推广数据
    dataSwatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            dataTab: index,
            slect_item1: false,
            slect_item2: false,
            slect_item3: false,
            slect_item4: false,
        })
    },
    // 搜索推广
    slect_1itemShow(){
        this.setData({
            slect_item1: !this.data.slect_item1,
             slect_item2: false
        })
    },
    slect_2itemShow(){
        this.setData({
            slect_item2: !this.data.slect_item2,
            slect_item1: false
        })
    },
    // 场景展示
    slect_3itemShow(){
        this.setData({
            slect_item3: !this.data.slect_item3,
             slect_item4: false
        })
    },
    slect_4itemShow(){
        this.setData({
            slect_item4: !this.data.slect_item4,
            slect_item3: false
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
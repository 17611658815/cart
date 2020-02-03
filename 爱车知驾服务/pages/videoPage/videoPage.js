// pages/videoPage/videoPage.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:0,
        page:1,
        currentTab: 0,//头部导航
        navList: ['推荐', '信息','知道','故事征集','公众评议'],
        navid:['36','37','38','39','40'],
        on_off:false,
        contentList:[]

    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            page:1,
            on_off: false,
            contentList:[],
            currentTab: index,
        })
        this.getContentList()
    },
    gotextPage(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/textPage/textPage?id='+id,
        })
    },
    getContentList(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            content_catid: that.data.navid[that.data.currentTab],
            limit: 10,
            page: that.data.page,
        }
        app.net.$Api.getContentList(params).then((res) => {
            if(res.data.data.length>0){
                that.setData({
                    contentList: that.data.contentList.concat(res.data.data),
                })
            }else{
                that.setData({
                    on_off: true,
                })
            }
        })
    },
    /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom: function () {
        if (!this.data.on_off){
            this.data.page++;
            this.getContentList()
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getContentList()
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
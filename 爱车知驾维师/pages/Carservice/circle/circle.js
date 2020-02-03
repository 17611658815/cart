// pages/Carservice/circle/circle.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page:1,
        member_id:0,
        navList: ['首页', '知驾服务'],
        currentTab: 1,//顶部切换
        btnNavcurrent: 1,//底部切换
        circle_Nav: [{ name: '我的', icon: '' }, { name: '排行榜', icon: '',  },{ name: '技能证书', icon: '' }],
        circle_Tab:['本地推荐','最新','全国热点','知驾随行'],
        circleTabNum:0,//内容切换,
        magDataList:[],
        no_off:false,
        msgNum:0

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo') || {};
        this.setData({
            member_id: userInfo.id,
        })
    },
    postingsZan(e) {
        let that = this;
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.postings_id = id;
        app.net.$Api.postingsZan(params).then((res) => {
            if (type == "yes") {
                that.setData({
                    [`magDataList[${index}].zan`]: that.data.magDataList[index].zan / 1 + 1,
                    [`magDataList[${index}].is_zan`]: 1,
                })
            } else {
                that.setData({
                    [`magDataList[${index}].zan`]: that.data.magDataList[index].zan / 1 - 1,
                    [`magDataList[${index}].is_zan`]: 0,
                })
            }

        })
    },
    gomsgDetaile(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/msgDetaile/msgDetaile?id=' + id,
        })
    },
    gomayCenter(){
        wx.navigateTo({
            url: '/pages/maycenter/maycenter',
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        let userInfo = wx.getStorageSync('userinfo') || {};
        this.data.page = 1;
        this.data.magDataList = [];
        this.getPostingsList();
        let msgNum = await app.getUnreadMsgNum(userInfo.id);
        this.setData({
            msgNum: msgNum.num
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.no_off){
            this.data.page++;
            this.getPostingsList()
        }
    },
    getPostingsList(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            page: that.data.page,
            type: that.data.circleTabNum/1+1,
            city: app.globalData.city
        }
        return new Promise((resolve, reject) => {
            app.net.$Api.getPostingsList(params).then((res) => {
               console.log(res)
                if (res.data.list.length>0){
                   that.setData({
                       magDataList: that.data.magDataList.concat(res.data.list)
                   })
               }else{
                   that.setData({
                       no_off:true
                   })
               }
                console.log(that.data.magDataList)
                resolve(res)
            })
        })
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            page:1,
            magDataList:[],
            circleTabNum: index
        })
        this.getPostingsList()
    },
    
    gomessageList() {
        if (!this.data.member_id) {
            app.checkLogin();
        } else {
            wx.navigateTo({
                url: '/pages/messageList/messageList',
            })
        }
    },
    // 导航tab切换
    goIndex(e) {
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    goCircle() {
        wx.reLaunch({
            url: "/pages/Carservice/circle/circle",
        })
    },
    gomaycenter() {
       wx.navigateTo({
           url: '/pages/Carservice/maycenter/maycenter',
       })
    },
    

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
// pages/community/community.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:0,
        magData: {},
        currentTab: 0,
        catid:0,
        page:1,
        on_off:false
    },
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index,
           
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userinfo') || '';
        this.setData({
            member_id: userinfo.id,
            catid: options.id
        })
        this.onLoadList()
    },
    onLoadList(){
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.cat = that.data.catid;
        params.page = that.data.page;
        params.member_id = that.data.member_id;
        app.net.$Api.postingsList(params).then((res) => {
            console.log(res)
            that.setData({
                magData: res.data
            })

        })
    },
    postingsList() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.cat = that.data.catid;
        params.page = that.data.page;
        app.net.$Api.postingsList(params).then((res) => {
            console.log(res)
            if (res.data.length>0){
                that.setData({
                    magData: that.data.magData.concat(res.data) 
                })
            }else{
                that.setData({
                    on_off:true
                })
            }
        })
    },
    onReachBottom: function () {
        if (!this.data.on_off) {
            this.data.page++;
            this.postingsList();
        }
    },
    gomsgDetaile(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/msgDetaile/msgDetaile?id=' + id,
        })
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
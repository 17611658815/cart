const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_id:0,
        jiShiList:[],
        isfocus:false,
        message:'',
        bottom:0,
        jishi_id:0,
        status:0,
        statusArr: ['待确认', '已确认', '已拒绝']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        that.setData({
            user_id: userInfo.id
        })
        that.getShopJishi();
    },
    getShopJishi() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            user_id: that.data.user_id,
        }
        app.net.$Api.getShopJishi(params).then((res) => {
            console.log(res)
            if(res.data.data.length>0){
                that.setData({
                    jiShiList: res.data.data
                })
            }else{

            }
        })
    },
    setShopJishi(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            user_id: that.data.user_id,
            jishi_id: that.data.jishi_id,
            msg: that.data.message,
            status: that.data.status
        }
        app.net.$Api.setShopJishi(params).then((res) => {
            wx.showToast({
                title: '完成',
                icon: 'success',
                duration: 2000,
                success: function () {
                    setTimeout(function () {
                        that.getShopJishi()
                    }, 2000)
                }
            })
        })
    },
    // 拒绝提交
    onbindconfirm() {
        this.setShopJishi()
    },
    // 同意
    confirm(e){
        let that = this;
        let item = e.currentTarget.dataset.item;
        let status = e.currentTarget.dataset.status;
        wx.showModal({
            title: '温馨提示',
            content: '确定接收此技师吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.setData({
                        status: status,
                        jishi_id: item.id,
                    })
                    that.setShopJishi()
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
      
       
    },
    // 拒绝
    refuse(e) {
        let that = this;
        let item = e.currentTarget.dataset.item;
        let status = e.currentTarget.dataset.status;
        wx.showModal({
            title: '温馨提示',
            content: '确定取拒绝吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.setData({
                        status: status,
                        jishi_id: item.id,
                        isfocus: true
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //获取焦点
    onbindfocus(e) {
        console.log(e)
        this.setData({
            bottom: e.detail.height
        })
    },
    // 失去焦点
    onbindblur() {
        this.setData({
            isfocus: false,
            bottom: 0
        })
    },
    // 文本框内容
    oncommentMsg(e){
        console.log(e)
        this.setData({
            message: e.detail.value
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
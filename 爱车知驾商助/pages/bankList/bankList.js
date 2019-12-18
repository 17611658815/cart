// pages/bankList/bankList.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bankList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            member_id: userInfo.id
        })

    },
    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {
        this.loadList();
    },
    loadList(){
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.page = that.data.page;
        app.net.$Api.getBankCardList(params).then((res) => {
            console.log(res)
            that.setData({
                bankList: res.data.data
            })
        })
    },
    getBankCardList() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.page = that.data.page;
        app.net.$Api.getBankCardList(params).then((res) => {
            console.log(res)
            if (res.data.data.length > 0) {
                that.setData({
                    bankList: that.data.bankList.concat(res.data.data)
                })
            } else {
                that.setData({
                    on_off: true
                })
            }
        })
    },
    delBank(e){
        let that = this;
        let id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '温馨提示',
            content: '确定删除此银行卡吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.delBankCard(id)
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    delBankCard(id){
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.id = id;
        app.net.$Api.delBankCard(params).then((res) => {
            if (res.data.code == 200) {
                wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            that.loadList()
                        }, 2000)
                    }
                })
            }
        })
    },
    /**
    * 页面上拉触底事件的处理函数
    */
    onReachBottom: function () {
        if (!this.data.on_off) {
            this.data.page++;
            this.getBankCardList()
        }
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
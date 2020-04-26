// pages/mayCarList/mayCarList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id: '',
        carList: [],
        page: 1,
    },
    // 确认信息
    getCarlist() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
        }
        app.loading('加载中')
        app.net.$Api.carList(params).then((res) => {
            console.log(res)
            that.setData({
                carList:res.data
            })
            wx.hideLoading()
        })
    },
    delCarInfo(e){
        let that = this;
        let carid = e.currentTarget.dataset.carid;
        wx.showModal({
            title: '温馨提示',
            content: '确定删除爱车信息吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.carDel(carid)
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    // 删除车辆信息
    carDel(carid){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            id: carid,
        }
        app.loading('加载中')
        app.net.$Api.carDel(params).then((res) => {
            console.log(res)
            if(res.data.code==200){
                wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            that.getCarlist()
                        }, 2000)
                    }
                })
            }
            wx.hideLoading()
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userinfo') || '';
        this.setData({
            member_id: userinfo.id
        })
        
    },
    gouploadPic(){
        wx.navigateTo({
            url: '/pages/uploadPic/uploadPic',
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
        this.data.carList = [];
        this.data.page=1;
        this.getCarlist()
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
// pages/shopLevel/shopLevel.js
let app =getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num:0,
        member_id:0,
        statusData:{}
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
        this.getShopTaskInfo()
    },

    // 获取分类
    getShopTaskInfo() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id
        };
        app.net.$Api.getShopTaskInfo(params).then((res) => {
            console.log(res)
            let num = 0;
            if (res.data.data[6] && res.data.data[6].status == 0){
                num++
            }
            if (res.data.data[7] && res.data.data[7].status == 0) {
                num++
            }
            that.setData({
                statusData:res.data.data,
                num
            })

        })

    },
    getShopScore(e){
        let that = this;
        let type = e.currentTarget.dataset.type;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            type: type
        };
        app.net.$Api.getShopScore(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                wx.showToast({
                    title: '领取成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            that.getShopTaskInfo()
                        }, 2000)
                    }
                })
            } else if (res.data.code == 400) {
                app.alert(res.data.msg)
            }
        })
    },
    goredPacketList(e){
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: '/pages/promotionCenter/promotionCenter?type=' + type + "&index=" + index,
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
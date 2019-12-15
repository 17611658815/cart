// pages/setMsg/setMsg.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:0,
        text1: '未授权',
        text2: '未授权',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userinfo');
        this.setData({
            member_id: userinfo.id,
        })
        this.getShopInfo()
    },
    getShopInfo() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
        }
        app.net.$Api.getShopInfo(params).then((res) => {
            this.setData({
                text1: (res.data.data.subscribe_message['5Bk34iK5EBCkW1-rDRwepXPdTfL3TgtipfMubCGvv40']
                    != undefined && res.data.data.subscribe_message['5Bk34iK5EBCkW1-rDRwepXPdTfL3TgtipfMubCGvv40'] == 'accept') ? '已授权' : '未授权',
                text2: (res.data.data.subscribe_message['Fy899cypwva2oUVilULgO7BJp3z7IY4qI8Tkicnus2k']
                    != undefined && res.data.data.subscribe_message['5Bk34iK5EBCkW1-rDRwepXPdTfL3TgtipfMubCGvv40'] == 'accept') ? '已授权' : '未授权',
            })
        })

    },
    requestMsg1() {
        let that = this;
        wx.requestSubscribeMessage({
            tmplIds: ['5Bk34iK5EBCkW1-rDRwepXPdTfL3TgtipfMubCGvv40'],
            success(res) {
                if (res['5Bk34iK5EBCkW1-rDRwepXPdTfL3TgtipfMubCGvv40'] === 'accept') {
                    delete res.errMsg
                    that.setSubscribeMessage(res)
                    that.setData({
                        text1: '已授权'
                    })
                } else {
                    app.alert('拒绝授权')
                }
                console.log(res)
            }
        })
    },
    requestMsg2() {
        let that = this;
        wx.requestSubscribeMessage({
            tmplIds: ['Fy899cypwva2oUVilULgO7BJp3z7IY4qI8Tkicnus2k'],
            success(res) {
                if (res['Fy899cypwva2oUVilULgO7BJp3z7IY4qI8Tkicnus2k'] === 'accept') {
                    delete res.errMsg
                    that.setSubscribeMessage(res)
                    that.setData({
                        text2: '已授权'
                    })
                } else {
                    app.alert('拒绝授权')
                }
                console.log(res)
            }
        })
    },
    setSubscribeMessage(power) {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            power: power
        }
        app.net.$Api.setSubscribeMessage(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                wx.showToast({
                    title: '授权成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        // setTimeout(function () {
                        //     that.NeworderList()
                        // }, 2000)
                    }
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000,
                })
            }
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
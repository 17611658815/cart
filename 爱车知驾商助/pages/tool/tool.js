// pages/tool/tool.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgurl:'',
        member_id:0,
        imageShow:false,
        imgCode:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
    },
    goredPacketList(e) {
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: '/pages/promotionCenter/promotionCenter?type=' + type + "&index=" + index,
        })
    },
    gocouponList(){
       wx.navigateTo({
           url: '/pages/couponList/couponList',
       })
    },
    QRcode() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
        }
        app.net.$Api.QRcode(params).then((res) => {
            console.log(res)
            if(res.data.code == 200){
                that.setData({
                    imgurl: res.data.url
                })
            }
            that.setData({
                imgCode: res.data.code
            })
        })
    },
    hideImg(){
        this.setData({
            imageShow: false
        })
    },
    shareCode(){
        let that = this;
        if (!app.globalData.userInfo.id) {
            app.checkLogin()
        }
        else if (that.data.imgCode == 200){
            that.setData({
                imageShow:true
            })
        }else{
            console.log('44')
            wx.navigateToMiniProgram({
                appId: 'wx9a340b49c24a080a',
                path: 'pages/shopDetaile/shopDetaile?id=' + that.data.member_id,
                extraData: {},
                envVersion: 'release',
                success(res) {
                    // 打开成功
                    console.log('打开了')
                }
            })
        }

    },
    saveImg(){
        let that = this;
            wx.downloadFile({
                url: that.data.imgurl,
                success: function (res) {
                    console.log(res);
                    //图片保存到本地
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: function (data) {
                            wx.showToast({
                                title: '保存成功',
                                icon: 'success',
                                duration: 2000
                            })
                        },
                        fail: function (err) {
                            console.log(err);
                            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                                console.log("当初用户拒绝，再次发起授权")
                                wx.openSetting({
                                    success(settingdata) {
                                        console.log(settingdata)
                                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                            console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                        } else {
                                            console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                        }
                                    }
                                })
                            }
                        },
                        complete(res) {
                            that.setData({
                                imageShow: false
                            })
                            console.log(res);
                        }
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
        let userInfo = wx.getStorageSync('userinfo');
        app.globalData.userInfo = userInfo
        this.setData({
            member_id: userInfo.id
        })
        this.QRcode()
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
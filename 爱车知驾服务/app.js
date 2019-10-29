//app.js
App({
    onLaunch: function() {
        let userInfo = wx.getStorageSync('userinfo') || "";
        // if (userInfo == ""){
        //     wx.navigateTo({
        //         url: '/pages/login/login',
        //     })
        // }
        wx.getSystemInfo({
            success: (res) => {
                console.log(res)
                if (res.model.search('iPhone X') != -1) {
                    this.globalData.isIphoneX = true
                }
            }
        })
    },
    globalData: {
        userInfo: null
    }
})
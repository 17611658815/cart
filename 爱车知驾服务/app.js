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
        userInfo: null,
        ak: "jTvAgQfAwt9QHpu2DocWiOg7mR1UQI8A", //填写申请到的ak  
    }
})
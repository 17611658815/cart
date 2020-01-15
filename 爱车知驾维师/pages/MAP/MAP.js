// 引用百度地图微信小程序JSAPI模块 
const app = getApp()
Page({
    data: {
        location:[],
        city: '',
        latitude: "",//经度
        longitude: "",//纬度
        sugData: '',
        loactioninfo: {},
        LocateName: '',
        iszoom: true,//false是否支持缩放
        isscroll: true,//是否支持拖动
        markers: [{
            iconPath: '../../images/icon/location.png',
            id: 0,
            longitude: '',
            latitude: '',
            width: 50,
            height: 50,
        }],
        windowH: ""
    },
    onLoad: function (options) {
        var that = this;
        let location = 
        wx.getSystemInfo({
            success: (res) => {
                console.log(res)
                that.setData({
                    windowH: res.windowHeight - 150
                })
            }
        })
        that.setData({
            latitude: app.globalData.shopInfo.lat,
            longitude: app.globalData.shopInfo.lng,
            city: app.globalData.city,
            "markers[0].longitude": app.globalData.shopInfo.lng,
            "markers[0].latitude": app.globalData.shopInfo.lat
        })
        that.getLocationMsg()
    },
    //获取当前位置
    getLocationMsg() {
        let that = this;
        wx.getLocation({
            type: 'gcj02',
            altitude: true, //高精度定位
            success: function (res) {
                that.setData({
                    "markers[0].longitude": app.globalData.shopInfo.lng,
                    "markers[0].latitude": app.globalData.shopInfo.lat,
                    longitude: res.longitude,
                    latitude: res.latitude,
                })
            }
        });
    },
    onLocation(e) {
        let that = this;
        console.log(e.detail.longitude + ',' + e.detail.latitude)
        that.setData({
            "markers[0].longitude": e.detail.longitude,
            "markers[0].latitude": e.detail.latitude,
            sugData: [],
        })
    },
    // 选择附近位置
    selectAddres(res) {
        let that = this;
        let Res = res.currentTarget.dataset.location;
        that.setData({
            "markers[0].longitude": Res.lng,
            "markers[0].latitude": Res.lat,
            latitude: Res.lat,//经度
            longitude: Res.lng,//纬度
            sugData: [],
        })
    },
    saveShopInfo() {
        let that = this,
            params = {
                appid: app.globalData.appid,
                member_id: app.globalData.userInfo.id,
                lat: that.data.markers[0].latitude,
                lng: that.data.markers[0].longitude
            }
        app.net.$Api.saveShopInfo(params).then((res) => {
            if (res.data.code == 200) {
                console.log(app.globalData)
                app.globalData.shopInfo.lng = that.data.markers[0].longitude;
                app.globalData.shopInfo.lat = that.data.markers[0].latitude
                wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 2000)
                    }
                })
            }
        })
    },

})
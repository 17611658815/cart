// 引用百度地图微信小程序JSAPI模块 
const bmap = require('../../utils/bmap-wx.min.js');
const app = getApp()
Page({
    data: {
        city:'',
        latitude: "",//经度
        longitude: "",//纬度
        sugData: '',
        loactioninfo: {},
        LocateName: '',
        iszoom: true,//false是否支持缩放
        isscroll: true,//是否支持拖动
        markers:[{
            iconPath:'../../images/icon/location.png',
            id:0,
            longitude:'',
            latitude:'',
            width: 50,
            height: 50,
        }],
        windowH:""
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: (res) => {
                console.log(res)
               that.setData({
                   windowH: res.windowHeight-150
               })
            }
        })
        that.setData({
            latitude: app.globalData.shopInfo.lat,
                longitude: app.globalData.shopInfo.lng,
            city: app.globalData.city,
            "markers[0].longitude": app.globalData.shopInfo.lng,
            "markers[0].latitude":  app.globalData.shopInfo.lat
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
                wx.request({
                    url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=UYFBZ-ANUWW-Y7GRO-OURNR-G5L7O-PHFMD',
                    success: function (e) {
                        console.log(res)
                        app.globalData.longitude = res.longitude;
                        app.globalData.latitude = res.latitude;
                        app.globalData.city = e.data.result.address_component.city
                        that.setData({
                            city: e.data.result.address_component.city,//当前城市
                            address: e.data.result.address,//当前位置
                            longitude: res.longitude,
                            latitude: res.latitude,
                        })
                    }
                })
            }
        });
    },
    // 绑定input输入 
    bindKeyInput: function (e) {
        var that = this;
        // 新建百度地图对象 
        if (e.detail.value.length > 0) {
            clearTimeout(that.data.illness_t);
            that.data.illness_t = setTimeout(function () {
            var BMap = new bmap.BMapWX({
                ak: app.globalData.ak
            });
            var fail = function (data) {
                console.log(data)
            };
            var success = function (data) {
                that.setData({
                    sugData: data.result
                });
            }
            // 发起suggestion检索请求 
            BMap.suggestion({
                query: e.detail.value,
                region: that.data.city,
                city_limit: true,
                fail: fail,
                success: success
            });
            }, 1000);
        } else {
            that.setData({
                sugData: []
            });
        }

    },
    onLocation(e){
        let that = this;
        console.log(e.detail.longitude + ',' + e.detail.latitude)
        // console.log(that.data.markers[0].longitude + ',' + that.data.markers[0].latitude)
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
            sugData:[],
        })
    },
    saveShopInfo(){
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
                                delta:1
                            })
                        }, 2000)
                    }
                })
            }
        })
    },
   
})
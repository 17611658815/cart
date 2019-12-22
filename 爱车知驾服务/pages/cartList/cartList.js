// pages/cartList/cartList.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        member_id: 0,
        area_id: 0,
        serviceId: 0,
        transfer_type: 1, //服务类型 1来店 2取车
        level: 1, //技师级别
        appointment_date: '', //预约时间
        isIphoneX: false,
        serviceData: {},
        goodsItem: {},
        total: 0, //总价
        Carid: 0, //车辆id
        servetab: 1,
        transfer_price: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        let userinfo = wx.getStorageSync('userinfo') || '';
        this.setData({
            isIphoneX: app.globalData.isIphoneX,
            member_id: userinfo.id,
            area_id: app.globalData.area_id,
            Carid: app.globalData.Carid,
            serviceId: options.serviceId,
            transfer_type: options.serveType / 1 + 1,
            level: options.level / 1 + 1,
            appointment_date: options.time,
            servetab: options.serveType / 1 + 1,
        })
        console.log(options.level / 1 + 1)
        this.getAreaId();
        this.showServiceDetail()
    },
    // 获取区域id
    getAreaId() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            name: app.globalData.city
        }
        app.net.$Api.getAreaId(params).then((res) => {
            that.setData({
                area_id: res.data.id
            })
            console.log(res, 199)
        })
    },
    // 服务详情
    showServiceDetail() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            area_id: app.globalData.area,
            id: that.data.serviceId,
            transfer_type: that.data.transfer_type,
            level: that.data.level,
            car_id: that.data.Carid,
            // location: app.globalData.longitude + "," + app.globalData.latitude
            location: "116.520616,39.911792"
        }
        app.net.$Api.showServiceDetail(params).then((res) => {
            let data = res.data;
            for (var i in data.service[0].items) {
                for (var k in data.service[0].items[i].brands) {
                    console.log(data.service[0].items[i].brands[k])
                    data.service[0].items[i].brands[k].goods[0].checked = false
                }
            }
            res.data.sub_service.forEach((item)=>{
                item.checked = false
                item.nums = 1
            })
            that.setData({
                serviceData: data,
                transfer_price: res.data.transfer_price
            })
            console.log(that.data.serviceData)
        })
    },
    // 生成订单
    createServiceOrder() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            area_id: that.data.area_id,
            service_id: that.data.serviceId,
            transfer_type: that.data.servetab,
            level: that.data.level,
            car_id: that.data.Carid,
            goods: that.data.goodsid,
            location: app.globalData.longitude + "," + app.globalData.latitude
            // app.globalData.longitude = res.longitude;
            // app.globalData.latitude = res.latitude;
        }
        if (that.data.goodsid.length < 4) {
            app.alert('请选择服务~')
            return
        }
        app.net.$Api.createServiceOrder(params).then((res) => {
            app.globalData.order_id = res.data.id
            wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success(res) {
                    console.log(res)
                    wx.requestSubscribeMessage({
                        tmplIds: ['F8TezMCsMq0qdlv-Wm9hGkDGRNyZPKu1PaYo7h8tOvY'],
                        success(r) {
                            console.log(r)
                            // wx.reLaunch({
                            //     url: '/pages/index/index?typeNum=2',
                            // })
                        },
                        fail() {
                            // wx.reLaunch({
                            //     url: '/pages/index/index?typeNum=2',
                            // })
                        },
                        complete() {
                            wx.reLaunch({
                                url: '/pages/index/index?typeNum=2',
                            })
                        }
                    })
                },
                fail(res) {}
            })
            console.log(res)
        })
    },
    SingChecked(e) {
        let that = this;
        let total = 0;
        let goodsItem = that.data.goodsItem;
        let serviceData = that.data.serviceData;
        let key1 = e.currentTarget.dataset.index; //一级索引
        let key2 = e.currentTarget.dataset.key; //二级索引
        for (var i in serviceData.service[0].items) {
            if (key1 == i) {
                for (var j in serviceData.service[0].items[i].brands) {
                    if (j == key2) {
                        serviceData.service[0].items[i].brands[j].goods[0].checked = true
                        if (serviceData.service[0].items[i].brands[j].goods[0].checked == true){
                            goodsItem[key1] = serviceData.service[0].items[i].brands[j].goods;
                            for (var k in goodsItem){
                                for (var v = 0; v < goodsItem[k].length;v++){
                                    console.log(goodsItem[k][v])
                                    total += goodsItem[k][v].price / 1 * goodsItem[k][v].nums / 1
                                }
                            }
                        }
                           
                    } else {
                        serviceData.service[0].items[i].brands[j].goods[0].checked = false;
                    }
                }
            }
        }
        that.setData({
            serviceData: serviceData,
            goodsItem: goodsItem,
            total: total.toFixed(2)
        })
        console.log(goodsItem)
    },
    // 选择子服务
    SonChecked(e){
        let that = this;
        let total = 0;
        let serviceData = that.data.serviceData;
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;
        let goodsItem = that.data.goodsItem;
        if (type == "nochecked"){
            console.log(1)
            goodsItem[index] = [serviceData.sub_service[index]];
            serviceData.sub_service[index].checked = true;
        }else{
            delete goodsItem[index]
            serviceData.sub_service[index].checked = false;
        }
        for (var k in goodsItem) {
            for (var v = 0; v < goodsItem[k].length; v++) {
                console.log(goodsItem[k][v])
                total += goodsItem[k][v].price / 1 * goodsItem[k][v].nums / 1
            }
        }
        that.setData({
            [`serviceData.sub_service[${index}].checked`]: serviceData.sub_service[index].checked,
            goodsItem: goodsItem,
            total: total.toFixed(2)
        })
        console.log(goodsItem)

    },
    /*  // 第一列单选
     firstChecked: function (e) {
         let CartData = this.data.CartData1;
         let index = e.currentTarget.dataset.index;
         let Num = 0;
         let cartStr = []
         for (var i = 0; i < CartData.length; i++) {
             console.log(index,i)
             if (index == i){
                 CartData[i].checked = true
                 console.log(CartData[i])
             }else{
                 CartData[i].checked = false
             }
         }
         // 合计
         var sum = 0
         for (var i = 0; i < CartData.length; i++) {
             if (CartData[i].checked) {
                 sum += CartData[i].num * CartData[i].price/1
             }
         }
         //更新数据
         this.setData({
             total: sum.toFixed(2),
             CartData1: CartData,
             cartStr: cartStr,
         })
         wx.setStorage({
             key: 'CartData1',
             data: CartData,
         })
         console.log('购物车id=>', cartStr)
     },
     // 第二列
     secondChecked(e){
         let CartData = this.data.CartData2;
         let index = e.currentTarget.dataset.index;
         let Num = 0;
         let cartStr = []
         for (var i = 0; i < CartData.length; i++) {
             console.log(index, i)
             if (index == i) {
                 CartData[i].checked = true
                 console.log(CartData[i])
             } else {
                 CartData[i].checked = false
             }
         }
         // 合计
         var sum = 0
         for (var i = 0; i < CartData.length; i++) {
             if (CartData[i].checked) {
                 sum += CartData[i].num * CartData[i].price
             }
         }
         //更新数据
         this.setData({
             total: sum.toFixed(2),
             CartData2: CartData,
             cartStr: cartStr,
         })
         wx.setStorage({
             key: 'CartData2',
             data: CartData,
         })
         console.log('购物车id=>', cartStr)
     }, */
    // 去下单
    placeOther() {
        wx.navigateTo({
            url: '/pages/placeOther/placeOther',
        })
    },
    changeServce(e) {
        let index = e.currentTarget.dataset.index;
        let total = this.data.total;
        if (index == this.data.servetab) {
            return
        }
        if (index == 2) {
            total = total - this.data.transfer_price[1] + this.data.transfer_price[2] / 1
        } else {
            total = total - this.data.transfer_price[2] + this.data.transfer_price[1] / 1
        }
        this.setData({
            total: total.toFixed(2),
            servetab: index
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
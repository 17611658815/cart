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
        goodsid:[],//产品id
        NewTotal: 0, //现总价
        OldTotal: 0, //原总价
        economize:0,//节省
        Carid: 0, //车辆id
        servetab: 1,
        transfer_price: [],
        balance:0,
        sub_service:'',//服务id
        coupon_id:0,//优惠卷id
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
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let NeTotal 
        console.log(app.globalData.couponType, app.globalData.couponvalue, app.globalData.couponId)
        if (app.globalData.couponType != 0 && app.globalData.couponType == 1 || app.globalData.couponType == 3){
            this.setData({
                coupon_id: app.globalData.couponid,
                NewTotal: parseInt(app.globalData.NewTotal) - app.globalData.couponvalue / 1
            })
        } else if (app.globalData.couponType != 0 && app.globalData.couponType == 2){
            this.setData({
                coupon_id: app.globalData.couponid,
                NewTotal: parseInt(app.globalData.NewTotal) * app.globalData.couponvalue / 100 
            })
        }
       
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
        let NewTotal = 0;
        let OldTotal = 0;
        let goodsid = [];
        let goodsItem = that.data.goodsItem;
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
        app.loading('加载中')
        app.net.$Api.showServiceDetail(params).then((res) => {
            let data = res.data;
            for (var i in data.service[0].items) {
                var ss =0;
                for (var j in data.service[0].items[i].brands) {
                    ss++;
                    if(ss==1)
                    {
                        data.service[0].items[i].brands[j].goods[0].checked = true;
                        goodsItem[i] = data.service[0].items[i].brands[j].goods;
                       
                    }else{
                        data.service[0].items[i].brands[j].goods[0].checked = false;
                    }
                    // data.service[0].items[i].brands[j].goods[0].id_service = 2;
                }
            }
            for (var k in goodsItem) {
                for (var v = 0; v < goodsItem[k].length; v++) {
                    console.log(goodsItem[k][v])
                    goodsid.push({
                        id: goodsItem[k][v].id,
                        num: goodsItem[k][v].nums,
                    })
                    NewTotal += goodsItem[k][v].price / 1 * goodsItem[k][v].nums / 1
                    OldTotal += goodsItem[k][v].original_price / 1 * goodsItem[k][v].nums / 1
                }
            } 
            res.data.sub_service.forEach((item)=>{
                item.checked = false
                item.is_service = 1
            })
            NewTotal = (res.data.transfer_price[that.data.servetab] / 1 + NewTotal - res.data.balance).toFixed(2);
            OldTotal = (res.data.transfer_price[that.data.servetab] / 1 + OldTotal - res.data.balance).toFixed(2);
            that.setData({
                balance: res.data.balance,
                serviceData: data,
                transfer_price: res.data.transfer_price,
                goodsItem: goodsItem,
                goodsid: goodsid,
                NewTotal: NewTotal,//现价
                OldTotal: OldTotal,//原价
                economize: parseInt(OldTotal) - parseInt(NewTotal)
            })
            app.globalData.NewTotal = NewTotal
            wx.hideLoading()
            console.log(that.data.goodsid)
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
            coupon_id: that.data.coupon_id,
            location: app.globalData.longitude + "," + app.globalData.latitude
            // app.globalData.longitude = res.longitude;
            // app.globalData.latitude = res.latitude;
        }
        app.net.$Api.createServiceOrder(params).then((res) => {
            app.globalData.order_id = res.data.id;
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
                        },
                        fail() {
                          
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
        let NewTotal = 0;
        let OldTotal = 0;
        let goodsid = [];
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
                                    goodsid.push({
                                        id: goodsItem[k][v].id,
                                        num: goodsItem[k][v].nums,
                                        is_service: goodsItem[k][v].is_service == 1 ? goodsItem[k][v].is_service : 2
                                    })
                                    NewTotal += goodsItem[k][v].price / 1 * goodsItem[k][v].nums / 1
                                    OldTotal += goodsItem[k][v].original_price / 1 * goodsItem[k][v].nums / 1
                                }
                            }
                        }
                           
                    } else {
                        serviceData.service[0].items[i].brands[j].goods[0].checked = false;
                    }
                }
            }
        }
        NewTotal = (serviceData.transfer_price[that.data.servetab] / 1 + NewTotal - that.data.balance).toFixed(2);
        OldTotal = (serviceData.transfer_price[that.data.servetab] / 1 + OldTotal - that.data.balance).toFixed(2);
        that.setData({
            goodsid: goodsid,
            serviceData: serviceData,
            goodsItem: goodsItem,
            NewTotal: NewTotal < 0 ? 0 : NewTotal,//现价
            OldTotal: OldTotal,//原价
            economize: parseInt(OldTotal) - parseInt(NewTotal)
        })
        app.globalData.NewTotal = NewTotal
        console.log(NewTotal, OldTotal + "OldTotal-NewTotal=", OldTotal - NewTotal)
        console.log(goodsItem, goodsid)
    },
    // 选择子服务
    SonChecked(e){
        let that = this;
        let NewTotal = 0;
        let OldTotal = 0;
        let goodsid = [];
        let serviceData = that.data.serviceData;
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;
        let goodsItem = that.data.goodsItem;
        if (type == "nochecked"){
            goodsItem[index] = [serviceData.sub_service[index]];
            serviceData.sub_service[index].checked = true;
        }else{
            delete goodsItem[index]
            serviceData.sub_service[index].checked = false;
        }
        for (var k in goodsItem) {
            for (var v = 0; v < goodsItem[k].length; v++) {
                console.log(goodsItem[k][v])
                goodsid.push({
                    id: goodsItem[k][v].id,
                    num: goodsItem[k][v].nums,
                    is_service: goodsItem[k][v].is_service == 1 ? goodsItem[k][v].is_service : 2
                })
                NewTotal += goodsItem[k][v].price / 1 * goodsItem[k][v].nums / 1
                OldTotal += goodsItem[k][v].original_price / 1 * goodsItem[k][v].nums / 1
            }
        }
        NewTotal = (serviceData.transfer_price[that.data.servetab] / 1 + NewTotal - that.data.balance).toFixed(2)
        OldTotal = (serviceData.transfer_price[that.data.servetab] / 1 + OldTotal - that.data.balance).toFixed(2)
        that.setData({
            [`serviceData.sub_service[${index}].checked`]: serviceData.sub_service[index].checked,
            goodsItem: goodsItem,
            goodsid: goodsid,
            NewTotal: NewTotal < 0 ? 0 : NewTotal,//现价
            OldTotal: OldTotal,//原价
            economize: parseInt(OldTotal) - parseInt(NewTotal)
        })
        app.globalData.NewTotal = NewTotal
        console.log(goodsItem, goodsid)
    },
    // 去下单
    placeOther() {
        wx.navigateTo({
            url: '/pages/placeOther/placeOther',
        })
    },
    //去选择优惠卷
    gocouponList(){
        wx.navigateTo({
            url: '/pages/couponList/couponList?NewTotal=' + this.data.NewTotal,
        })
    },
    changeServce(e) {
        let index = e.currentTarget.dataset.index;
        let NewTotal = this.data.NewTotal;
        if (index == this.data.servetab) {
            return
        }
        if (index == 2) {
            NewTotal = NewTotal - this.data.transfer_price[1] + this.data.transfer_price[2] / 1
        } else {
            NewTotal = NewTotal - this.data.transfer_price[2] + this.data.transfer_price[1] / 1
        }
        this.setData({
            NewTotal: NewTotal.toFixed(2),
            servetab: index
        })
    },
})
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
        goodsid: [], //产品id
        NewTotal: 0, //现总价
        OldTotal: 0, //原总价
        economize: 0, //节省
        Carid: 0, //车辆id
        servetab: 1,
        transfer_price: [],
        balance1: 0,
        balance2: 0,
        sub_service: '', //服务id
        couponid: 0, //优惠卷id,
        phone: "",
        session_key: '',
        openid: '',
        userid: 0,
        serverPrice: 0,
        type_id: 0,
        car_id: 0,
        serverId: {},
        goodsIdArr: [],
        cateId: 0,
        service_sub: [],
        service_price: {
            1: [0, 0],
            2: [0, 0],
            3: [0, 0],
            4: [0, 0],
            5: [0, 0],
        },
        showList:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options, 44)
        let userinfo = wx.getStorageSync('userinfo') || '';
        console.log(options)
        let setData = {
            isIphoneX: app.globalData.isIphoneX,
            member_id: userinfo.id,
            Carid: app.globalData.Carid,
            serviceId: options.serviceId,
            car_id: options.cateId,
            // transfer_type: options.serveType / 1 + 1,
            // level: options.level / 1 + 1,
            cateId: options.cateId,
            appointment_date: options.time,
            // servetab: options.serveType / 1 + 1,
            phone: userinfo.phone || ""
        };
        if (options.serveType != undefined) {
            setData.transfer_type = options.serveType / 1 + 1;
            setData.servetab = options.serveType / 1 + 1;
        }
        if (options.level != undefined) {
            setData.level = options.level / 1 + 1;
        }
        if (options.time != undefined) {
            setData.appointment_date = options.time;
        }
        this.setData(setData)
        console.log(userinfo.id)
        this.getAreaId();

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let that = this;
        // console.log(app.globalData.couponType, app.globalData.couponvalue, app.globalData.couponId)
        if (app.globalData.couponType != 0 && app.globalData.couponType == 1 || app.globalData.couponType == 3) {
            let NewTotal = (parseInt(app.globalData.NewTotal) - app.globalData.couponvalue / 1).toFixed(2);;
            that.setData({
                couponid: app.globalData.couponId,
                NewTotal: NewTotal,
                economize: that.data.OldTotal - NewTotal
            })
        } else if (app.globalData.couponType != 0 && app.globalData.couponType == 2) {
            let NewTotal = (parseInt(app.globalData.NewTotal) * app.globalData.couponvalue / 100).toFixed(2);
            that.setData({
                couponid: app.globalData.couponId,
                NewTotal: NewTotal,
                economize: that.data.OldTotal - NewTotal
            })
            console.log(NewTotal)
        }

    },
    // 获取区域id
    getAreaId() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            name: app.globalData.cityObj
        }
        app.net.$Api.getAreaId(params).then((res) => {
            console.log(res)
            that.setData({
                area_id: res.data.id
            })
            that.showServiceDetail()
        })
    },
    // 服务详情
    showServiceDetail() {
        let that = this;
        let NewTotal = 0;
        let OldTotal = 0;
        let goodsid = [];
        let goodsItem = that.data.goodsItem;
        let service_price = []
        console.log(that.data.area_id)
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            area_id: that.data.area_id,
            cateId: that.data.cateId,
            level: that.data.level,
            // car_id: 23,
            car_id: that.data.Carid,
            // location: "116.486509,39.90424"
            location: app.globalData.longitude + "," + app.globalData.latitude
        }

        app.loading('加载中')
        app.net.$Api.showCateDetail(params).then((res) => {
            wx.hideLoading()
            let data = res.data;
            for (var r = 0; r < data.length; r++) {
                for (var i in data[r].service[0].items) {
                    var ss = 0;
                    for (var j in data[r].service[0].items[i].brands) {
                        ss++;
                        if (ss == 1) {
                            data[r].service[0].items[i].brands[j].goods[0].checked = true;
                            goodsItem[i] = data[r].service[0].items[i].brands[j].goods;

                        } else {
                            data[r].service[0].items[i].brands[j].goods[0].checked = false;
                        }
                    }
                    that.data.goodsIdArr.push(i)
                   
                }
                that.data.service_sub.push({
                    name: data[r].service[0].name,
                    price: data[r].service[0].price[that.data.level][that.data.servetab / 1 - 1],
                    priceArr: {
                        1: [0, 0],
                        2: [0, 0],
                        3: [0, 0],
                        4: [0, 0],
                        5: [0, 0],
                    },
                    id: data[r].service[0].id,
                    original_price: data[r].service[0].original_price,
                    thumb: data[r].service[0].thumb,
                    checked: false,
                    nums: 1,
                    key: r,
                })
            }
            for (var k in goodsItem) {
                for (var v = 0; v < goodsItem[k].length; v++) {
                    console.log(goodsItem[k][v])
                    goodsid.push({
                        id: goodsItem[k][v].id,
                        num: goodsItem[k][v].nums,
                    })
                    NewTotal += goodsItem[k][v].price / 1 * goodsItem[k][v].nums / 1;
                    OldTotal += goodsItem[k][v].original_price / 1 * goodsItem[k][v].nums / 1;
                    console.log(NewTotal, OldTotal)
                    if (app.globalData.couponType != 0 && app.globalData.couponType == 1 || app.globalData.couponType == 3) {
                        NewTotal = NewTotal - app.globalData.couponvalue - data[r].balance
                        // this.setData({
                        //     couponid: app.globalData.couponId,
                        //     NewTotal: parseInt(NewTotal) - app.globalData.couponvalue / 1
                        // })
                    } else if (app.globalData.couponType != 0 && app.globalData.couponType == 2) {
                        NewTotal = NewTotal * app.globalData.couponvalue / 100 - data[r].balance
                    }
                }
            }
            console.log(that.data.serverId)
            that.setData({
                service_sub: that.data.service_sub,
                goodsIdArr: that.data.goodsIdArr,
                type_id: that.data.type_id,
                balance1: data[0].balance,
                balance2: data[1].balance,
                serviceData: data,
                transfer_price: data.transfer_price,
                goodsItem: goodsItem,
                goodsid: goodsid,
                NewTotal: NewTotal, //现价
                OldTotal: OldTotal, //原价
                economize: parseInt(OldTotal - NewTotal) < 0 ? "0.00" : (OldTotal - NewTotal).toFixed(2),
                // serverPrice: data.service[0].price,
            })
            console.log(that.data.serviceData)
            app.globalData.NewTotal = NewTotal
            console.log(that.data.service_sub)
        })
    },
    // 选择技师
    selesct_level(e) {
        let that = this;
        let NewTotal = 0;
        let OldTotal = 0;
        let data = that.data.serviceData;
        let level = e.currentTarget.dataset.level; //技师等级
        let service_sub = that.data.service_sub;
        let servetab = that.data.servetab;
        let service_price = that.data.service_price;
        let goodsItem = that.data.goodsItem;
        console.log(goodsItem)
        for (var i = 0; i < service_sub.length;i++){
            service_sub[i].price = service_sub[i].priceArr[level][servetab]
        }
        for (var k in goodsItem) {
            for (var v = 0; v < goodsItem[k].length; v++) {
                NewTotal += goodsItem[k][v].price / 1 * goodsItem[k][v].nums / 1
                OldTotal += goodsItem[k][v].original_price / 1 * goodsItem[k][v].nums / 1
            }
        }
        that.setData({
            NewTotal:NewTotal.toFixed(2),
            OldTotal: OldTotal.toFixed(2),
            level: level, //技师等级
            service_sub: service_sub
        })
    },
    gocheckLogin() {
        if (!app.globalData.userinfo.id) {
            app.checkLogin()
        }
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
            coupon_id: that.data.couponid,
            location: app.globalData.longitude + "," + app.globalData.latitude,
            service: that.data.serverId,
            cateId: that.data.cateId
            // app.globalData.longitude = res.longitude;
            // app.globalData.latitude = res.latitude;
        }
        console.log(that.data.goodsid)
        if (parseInt(that.data.NewTotal) == 0) {
            app.alert('请选择您要购买的商品！')
        } else {
            console.log(JSON.stringify(params))
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
                        app.globalData.couponType = '', //优惠卷类型
                            app.globalData.couponvalue = 0, //优惠卷额度
                            app.globalData.couponId = '', //优惠卷id
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
        }
    },
    SingChecked(e) {
        let that = this;
        let NewTotal = 0;
        let OldTotal = 0;
        let goodsid = [];
        let goodsItem = that.data.goodsItem;
        let serverId = that.data.serverId;
        let serviceData = that.data.serviceData;
        let sindex = e.currentTarget.dataset.sindex; //一级索引
        let key1 = e.currentTarget.dataset.index; //一级索引
        let key2 = e.currentTarget.dataset.key; //二级索引
        let serverNum = 0
        for (var r = 0; r < serviceData.length; r++) {
            for (var i in serviceData[r].service[0].items) {
                if (key1 == i) {
                    for (var j in serviceData[r].service[0].items[i].brands) {
                        if (j == key2) {
                            serviceData[r].service[0].items[i].brands[j].goods[0].checked = !serviceData[r].service[0].items[i].brands[j].goods[0].checked
                            if (serviceData[r].service[0].items[i].brands[j].goods[0].checked == true) {
                                goodsItem[key1] = serviceData[r].service[0].items[i].brands[j].goods;
                            } else {
                                delete goodsItem[key1]
                            }
                        } else {
                            serviceData[r].service[0].items[i].brands[j].goods[0].checked = false;
                        }
                    }
                }
            }
        }
        for (var k in goodsItem) {
            console.log(goodsItem[k].price)
            for (var v = 0; v < goodsItem[k].length; v++) {
                console.log(goodsItem[k][v])
                goodsid.push({
                    id: goodsItem[k][v].id,
                    num: goodsItem[k][v].nums,
                    is_service: goodsItem[k][v].is_service == 1 ? goodsItem[k][v].is_service : 2
                })
                serverNum += goodsItem[k].price
                NewTotal += goodsItem[k][v].price / 1 * goodsItem[k][v].nums / 1
                OldTotal += goodsItem[k][v].original_price / 1 * goodsItem[k][v].nums / 1
            }
            console.log(NewTotal, goodsItem[k].price)
        }

        // NewTotal = (serviceData.transfer_price[that.data.servetab] / 1 + NewTotal + serviceData.service[0].price);
        // OldTotal = (serviceData.transfer_price[that.data.servetab] / 1 + OldTotal + serviceData.service[0].price);
        if (app.globalData.couponType != 0 && app.globalData.couponType == 1 || app.globalData.couponType == 3) {
            NewTotal = (NewTotal - app.globalData.couponvalue - that.data.balance1).toFixed(2);
        } else if (app.globalData.couponType != 0 && app.globalData.couponType == 2) {
            NewTotal = (NewTotal * app.globalData.couponvalue / 100).toFixed(2);
        }
        NewTotal = (NewTotal - that.data.balance1).toFixed(2);
        OldTotal = OldTotal.toFixed(2);
        console.log(NewTotal, OldTotal)
        that.setData({
            serverId: serverId,
            goodsid: goodsid,
            serviceData: serviceData,
            goodsItem: goodsItem,
            NewTotal: NewTotal < 0 ? 0 : NewTotal / 1,
            OldTotal: OldTotal, //原价
            economize: parseInt(OldTotal - NewTotal) < 0 ? "0.00" : (OldTotal - NewTotal).toFixed(2),
        })
        app.globalData.NewTotal = NewTotal
        // console.log(NewTotal, OldTotal + "OldTotal-NewTotal=", OldTotal - NewTotal)
        // console.log(goodsItem, goodsid)
        console.log(that.data.serverId, 403)
    },
    // 选择子服务
    SonChecked(e) {
        let that = this;
        let NewTotal = 0;
        let OldTotal = 0;
        // let goodsid = [];
        let serverId = that.data.serverId;
        let data = that.data.serviceData;
        let service_sub = that.data.service_sub;
        let level = that.data.level;
        let service_price = {
            1: [0, 0],
            2: [0, 0],
            3: [0, 0],
            4: [0, 0],
            5: [0, 0],
        };
        let index = e.currentTarget.dataset.index;
        let key = e.currentTarget.dataset.key;
        let type = e.currentTarget.dataset.type;
        let goodsItem = that.data.goodsItem;
        if (type == "nochecked") {
            goodsItem[index] = [service_sub[index]];
            service_sub[index].checked = true;
            serverId[index] = service_sub[index].id
            service_sub[index].priceArr = data[index].service[0].price;
            service_sub[index].price = service_sub[index].priceArr[level][that.data.servetab / 1 - 1];
        } else {
            delete goodsItem[index]
            delete serverId[index]
            service_sub[index].checked = false;
            service_sub[index].priceArr = {
                1: [0, 0],
                2: [0, 0],
                3: [0, 0],
                4: [0, 0],
                5: [0, 0],
            };
        }
        
        for (var k in goodsItem) {
            for (var v = 0; v < goodsItem[k].length; v++) {
                console.log(goodsItem[k][v])
                // goodsid.push({
                //     id: goodsItem[k][v].id,
                //     num: goodsItem[k][v].nums,
                //     is_service: goodsItem[k][v].is_service == 1 ? goodsItem[k][v].is_service : 2
                // })
                NewTotal += goodsItem[k][v].price / 1 * goodsItem[k][v].nums / 1
                OldTotal += goodsItem[k][v].original_price / 1 * goodsItem[k][v].nums / 1
            }
        }
        for (var i = 0; i < service_sub.length; i++) {
            service_price[1][0] += service_sub[i].priceArr[1][0];
            service_price[1][1] += service_sub[i].priceArr[1][1];
            service_price[2][0] += service_sub[i].priceArr[2][0];
            service_price[2][1] += service_sub[i].priceArr[2][1];
            service_price[3][0] += service_sub[i].priceArr[3][0];
            service_price[3][1] += service_sub[i].priceArr[3][1];
            service_price[4][0] += service_sub[i].priceArr[4][0];
            service_price[4][1] += service_sub[i].priceArr[4][1];
            service_price[5][0] += service_sub[i].priceArr[5][0];
            service_price[5][1] += service_sub[i].priceArr[5][1];
        }
        // console.log(NewTotal, service_price[level][that.data.servetab / 1 - 1])
        // NewTotal = NewTotal + service_price[level][that.data.servetab / 1 - 1]
       
        /*  if (app.globalData.couponType != 0 && app.globalData.couponType == 1 || app.globalData.couponType == 3) {
            NewTotal = (NewTotal - app.globalData.couponvalue).toFixed(2)
        } else if (app.globalData.couponType != 0 && app.globalData.couponType == 2) {
            NewTotal = (NewTotal * app.globalData.couponvalue / 100).toFixed(2)
        } */
        that.setData({
            serverId: serverId,
            service_sub: service_sub,
            service_price: service_price,
            goodsItem: goodsItem,
            // goodsid: goodsid,
            NewTotal: NewTotal < 0 ? 0 : NewTotal.toFixed(2),
            OldTotal: OldTotal, //原价
            economize: parseInt(OldTotal - NewTotal) < 0 ? "0.00" : (OldTotal - NewTotal).toFixed(2),
        })
        app.globalData.NewTotal = NewTotal
        console.log(serverId)
    },
    changeServce(e) {
        let index = e.currentTarget.dataset.index;
        let NewTotal = this.data.NewTotal;
        let price = e.currentTarget.dataset.price;
        if (index == this.data.servetab) {
            return
        }
        if (index == 2) {
            NewTotal = NewTotal - this.data.serviceData[0].service[0].arrival_price + this.data.serviceData[0].service[0].door_price / 1
        } else {
            NewTotal = NewTotal - this.data.serviceData[0].service[0].door_price + this.data.serviceData[0].service[0].arrival_price / 1
        }
        this.setData({
            NewTotal: NewTotal.toFixed(2),
            servetab: index
        })
    },
    // 去下单
    placeOther() {
        wx.navigateTo({
            url: '/pages/placeOther/placeOther',
        })
    },
    //去选择优惠卷
    gocouponList() {
        wx.navigateTo({
            url: '/pages/couponList/couponList?NewTotal=' + this.data.NewTotal,
        })
    },
    getOpenid: function(loginCode, detail) {
        let that = this,
            params = {
                appid: app.globalData.appid,
                code: loginCode.code
            }
        app.net.$Api.getOpenId(params).then((res) => {
            console.log(res)
            that.setData({
                openid: res.data.openid
            })
            that.analysisUserPhone(res.data.session_key, detail)
        })
    },
    // 解析手机号
    analysisUserPhone(session_key, detail) {
        let that = this;
        console.log(detail.encryptedData)
        console.log(encodeURIComponent(detail.encryptedData))
        let params = {
            appid: app.globalData.appid,
            sessionKey: session_key,
            encryptedData: detail.encryptedData,
            iv: detail.iv,
        }
        app.net.$Api.analysisUserPhone(params).then((res) => {
            console.log(res)
            let data = JSON.parse(res.data.data)
            let userinfo = wx.getStorageSync('userinfo');
            userinfo.phone = data.phoneNumber;
            wx.setStorage({
                key: 'userinfo',
                data: userinfo,
            })
            that.setData({
                phone: data.phoneNumber
            })
            that.phoneLogin()
        })
    },
    // 获取用户手机号
    getUserPhone(e) {
        var that = this;
        let detail = e.detail

        if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
            app.alert('请授权手机号')
        } else {
            wx.login({
                success: function(loginCode) {
                    console.log(loginCode, 400)
                    //获取用户信息
                    // wx.getUserInfo({
                    //     lang: 'zh_CN',
                    //     success: function (res) { // 当用户授权成功的时候，保存用户的登录信息 
                    //         console.log(res, 384)
                    //         app.globalData.userInfo = res.userInfo;

                    //     },
                    // })
                    that.getOpenid(loginCode, detail);
                }
            })
        }
    },
    // 保存用户手机号
    phoneLogin() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            openid: that.data.openid,
            mobile: that.data.phone,
        }
        app.net.$Api.phoneLogin(params).then((res) => {

            if (res.data.code == 200) {

                // wx.showModal({
                //     title: '温馨提示',
                //     content: '提交成功',
                //     showCancel: false,
                //     success: function () {
                that.createServiceOrder()
                // }

                // })
            }
        })
    },
    // 替换产品
    setGoods(){
        let that = this;
        that.setData({
            showList: !that.data.showList
        })
    },
    goPaihangList() {
        wx.navigateTo({
            url: '/pages/seniority/seniority?type_id=' + this.data.type_id,
        })
    },
    // 品牌排行
    goSeniority(e) {
        let index = e.currentTarget.dataset.index;
        let goods_id = e.currentTarget.dataset.id;
        console.log(e.currentTarget.dataset)
        wx.navigateTo({
            url: '/pages/seniorityList/seniorityList?id=' + this.data.goodsIdArr[index] + '&goods_id=' + goods_id,
        })
    }
})
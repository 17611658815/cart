//index.js
//获取应用实例
const app = getApp()
const bmap = require('../../utils/bmap-wx.min.js');
const beas64 = require('beas64.js');
Page({
    data: {
        userInfo:{},
        city:'',//当前城市
        address:'',//当前位置
        emShow:false,//急救中心模块
        isShadeShow: false, //遮罩1
        slideNav: false, //遮罩2
        currentTab: 0, //技师等级tab切换
        serveCurrent: 0, //服务tab切换
        serveType: 0, //服务类型
        navArr: [{
                name: "初级维师",
                path: ""
            },
            {
                name: "中级维师",
                path: ""
            },
            {
                name: "高级维师",
                path: ""
            },
            {
                name: "技师维师",
                path: ""
            },
            {
                name: "到家服务",
                path: ""
            },
            {
                name: "来店服务",
                path: ""
            },
            {
                name: "随行服务",
                path: ""
            },
            {
                name: "附近店铺",
                path: "/pages/nearby/nearby"
            },
            {
                name: "活动推荐",
                path: ""
            },
            {
                name: "车生活",
                path: ""
            },
            {
                name: "车朋圈",
                path: ""
            },
            {
                name: "周边活动",
                path: ""
            }
        ],
        serveList: ['现在', '预约', '代叫', '急叫'],
        scrollLeft: 0,
        typeNum: 0, //显示不同的状态 0 选择服务 1点击预约选择时间 2等在师傅接单
        question: '',
        iconArr: [], //评星
        diagnosisStar: 1,//默认一星
        evaluateCurrent: 0,//评价当前选中
        authorizationShow:false,//展示授权框
        colorStyle:'#4EB113',
        fixTop:500,//据顶部距离
        fined:false,//定位
        scrollTop:0,
        // 标记点对象
        markers : [],
        imgArr: ['https://img.dodo.wiki/app/js1.png', 
        'https://img.dodo.wiki/app/js2.png', 
        'https://img.dodo.wiki/app/js3.png',
        'https://img.dodo.wiki/app/js4.png'],
        iszoom: true,//false是否支持缩放
        isscroll: true,//是否支持拖动
        longitude:'',
        latitude: '',
        goodsId:'',
        member_id:0,
        isHaveCar:0,
        service:{},//来店 取车 计算
        num1:0,//来店
        num2:0,//取车
        technician:['初级技师','中级技师','高级技师','技师维师'],
        technicianName:'选择维师',
        technicianinde:0,//级别id
        isselectTime:false,//选择时间
        date:'',//预约如期
        time:'',//预约时间
        dateTime:'',
        day:'', //pick时间限制
        endDay:'',//pack时间限制
        serviceId:0,
        car_id:0,
        carListShow:false,
        carList:[],
        carindex:0,
        area_id:0,
        playId:0,
        times:null,
        jishi_info:{}
    },
    requestMsg(){
        wx.requestSubscribeMessage({
            tmplIds: ['F8TezMCsMq0qdlv-Wm9hGkDGRNyZPKu1PaYo7h8tOvY'],
            success(res) { }
        })
    },
    formatTime(date,type) {
        var year = date.getFullYear();
        if (type==1){
            var year = date.getFullYear()+1;
        }else{
            var year = date.getFullYear();
        }
        var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds();
        return [year + "-" + month + "-" + day, hour + 1 + ":" + minute].map(this.formatNumber);
    },
    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    onLoad: function (options) {
        let that = this;
        let startTime = that.formatTime(new Date(),2)
        let endTime = that.formatTime(new Date(),1)
        let userinfo = wx.getStorageSync('userinfo') || '';
        app.globalData.userinfo = wx.getStorageSync('userinfo') || '';
        that.setData({
            iconArr:beas64,
            member_id: userinfo.id,
            goodsId: options.id || '',
            day: startTime[0],
            endDay: endTime[0],
            date: startTime[0],
            time: startTime[1],
            userinfo: userinfo
        })
        // 
        if (options.typeNum){
            that.setData({
                typeNum: options.typeNum
            })
        }
        if (options.id){
            that.showService()
        }
        if(app.globalData.order_id!=0){
            that.getOrderStatus(app.globalData.order_id)
        }
        that.getLocationMsg();
        that.getAreaId()
        console.log(userinfo)
    },
    // 
    showService(){
        let that = this;
        let serveType = that.data.serveType;
        let currentTab = that.data.currentTab;
        let params = {
            appid: app.globalData.appid,
            id: that.data.goodsId
        }
        app.net.$Api.showService(params).then((res) => {
            let service = res.data;
            let num1 = service.price[currentTab + 1][0] / 1 + service.service.price / 1
            let num2 = service.price[currentTab + 1][1] / 1 + service.service.price / 1
            that.setData({
                typeNum: 1,
                service: service,
                num1: num1,
                num2: num2,
                serviceId: service.service.id
            })
            console.log(that.data.service)
        })
    },
    // 获取订单状态
    getOrderStatus(id){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            id: app.globalData.order_id
        }
        app.net.$Api.getOrderStatus(params).then((res) => {
            console.log(res)
            clearTimeout(that.data.times)
            if(res.data.status>2){
                that.setData({
                    typeNum: 3,
                    jishi_info: res.data.member_info
                })
                app.globalData.order_id = 0;

            }else{
                // that.setData({
                //     typeNum: 2,
                // })
                that.data.times = setTimeout(()=>{
                    that.getOrderStatus(app.globalData.order_id)
                    console.log(that.data.times)
                },3000)
            }
        })
    },
    open(){
        let that = this;
        that.data.times = setInterval(() => {
            console.log(that.data.times)
        }, 1000)
    },
    del(){
        console.log(this.data.times)
        clearInterval(this.data.times)
    },
    // 判断是否有车
    isHaveCar(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id
        }
        app.net.$Api.isHaveCar(params).then((res) => {
            if (res.data.num){
                that.setData({
                    isHaveCar: res.data.num,
                    car_id: res.data.list[0].id,
                    carList: res.data.list
                })
            }
          
            console.log(res)
        })
    },
    // 获取区域id
    getAreaId(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            name: that.data.city
        }
        app.net.$Api.getAreaId(params).then((res) => {
            app.globalData.area = res.data.id;
            that.setData({
                area_id: res.data.id
            })
            console.log(res,199)
        })
    },
    // 获取附近店铺
    getMarkersList(){
        let that = this;
        let markers = that.data.markers;
        let params = {
            appid: app.globalData.appid,
            lat: that.data.latitude,
            lng: that.data.longitude,
            // lat: '39.905277252197266',
            // lng: '116.51362609863281',
            level: that.data.currentTab/1+1
        }
        app.net.$Api.getShopListByLocation(params).then((res) => {
            res.data.forEach((item) => {
                markers.push({
                    iconPath: that.data.imgArr[that.data.currentTab],
                    id: item.id,
                    latitude: item.lat,
                    longitude: item.lng,
                    width: 60,
                    height: 60,
                })
            })
            that.setData({
                markers: markers
            })
        })
    },
    //顶部吸附效果
    onShow: function () {
        let that = this;
        let userinfo = wx.getStorageSync('userinfo') || '';
        that.setData({
            userinfo: userinfo,
            member_id: userinfo.id,
        })
        console.log()
        if (userinfo!=""){
            that.isHaveCar(userinfo);
        }
        wx.createSelectorQuery().select('#list').boundingClientRect(function (rect) {
            that.setData({
                fixTop: rect.top
            })
        }).exec()
    },
    onPageScroll: function (e) {
        var that = this
        if (that.data.fixTop < e.scrollTop) {
            that.setData({
                fined: true,
                scrollTop: e.scrollTop
            })
        } else {
            that.setData({
                fined: false,
                fixTop: 500, //区域离顶部的高度 设置一下防抖
                scrollTop: 0, //滑动条离顶部的距离
            })
        }
    },
    // 下拉刷新
    onPullDownRefresh: function () {
        var that = this;
        wx.vibrateShort();
        wx.showNavigationBarLoading(); //在标题栏中显示加载
        setTimeout(function () {
            wx.hideNavigationBarLoading(); //完成停止加载
            wx.stopPullDownRefresh(); //停止下拉刷新
            that.setData({
             
            });
            that.onLoad();
        }, 1500);
    },
    // 获取点击的星位
    getStar(e) {
        let that = this;
        let star = e.currentTarget.dataset.star;
        switch (star) {
            case 1:
                that.data.diagnosistext = '很差'
                break;
            case 2:
                that.data.diagnosistext = '差'
                break;
            case 3:
                that.data.diagnosistext = '一般'
                break;
            case 4:
                that.data.diagnosistext = '很好'
                break;
            case 5:
                that.data.diagnosistext = '优秀'
                break;
        }
        that.setData({
            diagnosisStar: star,
            diagnosistext: that.data.diagnosistext
        });
    },
  
    //获取当前位置
    getLocationMsg(){
        let that = this;
        wx.getLocation({
            type: 'gcj02',
            altitude: true, //高精度定位
            success: function (res) {
                console.log(res)
                wx.request({
                    url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude+'&key=UYFBZ-ANUWW-Y7GRO-OURNR-G5L7O-PHFMD',
                    success:function(e) {
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
                        that.getMarkersList()
                    }
                })
            }
        });
    },
    bindMultiPickerColumnChange: function(e) {
        console.log(e,243)
    },
    bindMultiPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    // 获取元素位置
    handleScroll(selectedId) {
        var that = this;
        var query = wx.createSelectorQuery();
        query.select('#item-' + selectedId).boundingClientRect(); 
        query.select('#scroll-view').boundingClientRect(); 
        //获取滚动位置
        query.select('#scroll-view').scrollOffset();
        query.exec(function(res) {
            that.setData({
                scrollLeft: res[2].scrollLeft + res[0].left + res[0].width / 2 - res[1].width / 2
            });
        });
    },
    // 导航tab切换
    swatchTab(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        this.handleScroll(index);
        that.setData({
            markers:[],
            isShadeShow:false,
            currentTab: index
        })
        if (that.data.currentTab<4){
            that.getMarkersList()
        }
    },
    // 服务切换
    servetab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            serveCurrent: index
        })
    },
    // 选择维师
    bindPickerChange(e){
        let that = this;
        let serveType = that.data.serveType;
        let service = that.data.service;
        let index = e.detail.value;
        let num1 = service.price[index/1 + 1][0] / 1 + service.service.price / 1
        let num2 = service.price[index/1 + 1][1] / 1 + service.service.price / 1
        this.setData({
            technicianName: that.data.technician[index],//技师名字
            technicianinde: index/1+1,
            currentTab: index,
            num1: num1,
            num2: num2
        })
    },
    // 选择时间
    showSleTime(){
        this.setData({
            isselectTime: !this.data.isselectTime,
            dateTime: this.data.date + '-' + this.data.time
        })
    },
    // 选择日期
    bindDateChange(e){
        console.log(e)
        this.setData({
            date: e.detail.value
        })
    },
    // 选择时间
    bindTimeChange(e){
        this.setData({
            time: e.detail.value
        })
    },
    // 预约维师
    gocartList(){
        wx.navigateTo({
            url: '/pages/cartList/cartList?serviceId=' + this.data.serviceId + '&area_id=2' + '&serveType=' + this.data.serveType + "&level=" + this.data.currentTab/1 + '&time=' + this.data.dateTime,
        })
    },
    onshowslideNav() {
        this.setData({
            slideNav: true,
        })
    },
    onhideslideNav() {
        this.setData({
            slideNav: false,
            isShadeShow: false
        })
    },
    // 关闭爱车列表
    onhidesCarlist() {
        this.setData({
            carListShow: false
        })
    },
    // 选择
    selectCar(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            carindex: index
        })
    },
    // 确定选中爱车
    confirmCar(e) {
        let that = this;
        let id = that.data.carList[that.data.carindex].id
        app.globalData.area_id = that.data.area_id
        app.globalData.Carid = id
        wx.navigateTo({
            url: '/pages/search/search?currentTab=' + (that.data.currentTab/1 + 1) + "&Carid=" + id + "&area_id=" +that.data.area_id,
        })
    },
    //全部服务
    allserveShow() {
        this.setData({
            isShadeShow: !this.data.isShadeShow
        })
    },
    // 切换服务类型 到店-取车
    serveType(e) {
        let that = this;
        let serveType = e.currentTarget.dataset.index;
        this.setData({
            serveType: serveType
        })
    },
    delmodel(){
        app.globalData.order_id = 0;
        this.setData({
            typeNum:0
        })
        clearTimeout(that.data.times)
    },
    onbindfocus() {
        let that = this;
        if (!app.globalData.userinfo.id){
            app.checkLogin();
        }else if (that.data.isHaveCar==0){
            wx.navigateTo({
                url: '/pages/uploadPic/uploadPic',
            })
        } else if (that.data.isHaveCar == 1){
            app.globalData.area_id = that.data.area_id
            app.globalData.Carid = that.data.car_id
            wx.navigateTo({
                url: '/pages/search/search?currentTab=' + that.data.currentTab + "&area_id=" + that.data.area_id,
            })
        } else if (that.data.isHaveCar > 1){
            this.setData({
                carListShow: true
            })
        }
    },
    // 取消订单
    recallOther(e) {
        let that = this;
        // let data = e.currentTarget.dataset.item;
        wx.showModal({
            title: '温馨提示',
            content: '确定取消订单吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.removeOther()
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    removeOther(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            id: app.globalData.order_id
        }
        app.net.$Api.cancelOrder(params).then((res) => {
            clearTimeout(that.data.times)
            app.globalData.order_id = 0;
            that.setData({
                typeNum: 0
            })
            
        })
    },
    // 感谢红包
    redPacket(){
        wx.showModal({
            title: '感谢红包',
            content: '您可以通过感谢红包表达对技师的感谢,感谢红包及那个全额赠与师傅,不支持退款及开具发票',
            cancelText:'下次再说',
            confirmText:'去发红包',
            confirmColor:"#f27c1f",
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    goMessageList(){
        wx.navigateTo({
            url: '/pages/messageList/messageList',
        })
    },
    // 急救中心
    selecEmergency(){
        this.setData({
            emShow: !this.data.emShow
        })
    },

    goShopApp(e) {
        wx.navigateToMiniProgram({
            appId: 'wxd74f8d61561db250',
            path: 'pages/index/index',
            extraData: {},
            envVersion: 'release',
            success(res) {
                // 打开成功
                console.log('打开了')
            }
        })
    },
   
    // 授权
    bindgetUserInfo(res) {
        let that = this,
            userInfo = res.detail.userInfo;
        if (res.detail.userInfo) {
            wx.login({
                success: function (res) {
                    console.log(res)
                    that.setData({
                        authorizationShow:false
                    })
                    // that.getOpenid(res.code, userInfo)
                },
                fail: function (res) {
                    app.alert('信息获取失败')
                },
                complete: function (res) {
                    wx.hideToast()
                },
            })
        } else {
            // 拒绝授权登录
            wx.showModal({
                title: '提示',
                icon: 'success',
                content: '请确认授权登录',
                showCancel: false,
                success: function () {
                    console.log('确定')
                }
            })
        }

    },

})
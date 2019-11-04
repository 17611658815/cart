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
        multiArray: [
            ['无脊柱动物', '脊柱动物'],
            ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
            ['猪肉绦虫', '吸血虫']
        ],
        objectMultiArray: [
            [{
                    id: 0,
                    name: '无脊柱动物'
                },
                {
                    id: 1,
                    name: '脊柱动物'
                }
            ],
            [{
                    id: 0,
                    name: '扁性动物'
                },
                {
                    id: 1,
                    name: '线形动物'
                },
                {
                    id: 2,
                    name: '环节动物'
                },
                {
                    id: 3,
                    name: '软体动物'
                },
                {
                    id: 3,
                    name: '节肢动物'
                }
            ],
            [{
                    id: 0,
                    name: '猪肉绦虫'
                },
                {
                    id: 1,
                    name: '吸血虫'
                }
            ]
        ],
        multiIndex: [0, 0, 0],
        array: [1, 2, 3, 4, 5, 6, 7],
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
        imgArr: ['https://img.dodo.wiki/app/js1.png', 'https://img.dodo.wiki/app/js2.png', 'https://img.dodo.wiki/app/js3.png','https://img.dodo.wiki/app/js4.png'],
        iszoom: true,//false是否支持缩放
        isscroll: true,//是否支持拖动
         longitude:'',
        latitude: '',

    },
    callouttap(e){
        console.log(e,1)
    },
    markertap(e){
        console.log(e,2)
    },
    labeltap(e){
        console.log(e,3)
    },
    // http://img.dodo.wiki/js1.png
    onLoad: function () {
        let that = this;
        that.getLocationMsg()
    },
    // 获取附近店铺
    getMarkersList(){
        let that = this;
        let markers = that.data.markers;
        let params = {
            appid: app.globalData.appid,
            // lat: that.data.latitude,
            // lng: that.data.longitude,
            lat: '39.905277252197266',
            lng: '116.51362609863281',
            level: that.data.currentTab+1
        }
        app.net.$Api.getShopListByLocation(params).then((res) => {
            res.data.forEach((item) => {
                console.log(item)
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
            userinfo: userinfo
        })
        wx.createSelectorQuery().select('#list').boundingClientRect(function (rect) {
            that.setData({
                fixTop: rect.top
            })
            console.log(rect.top)
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
        wx.vibrateShort()
        wx.showNavigationBarLoading() //在标题栏中显示加载
        setTimeout(function () {
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            that.setData({
             
            })
            that.onLoad()
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
        this.setData({
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
        var query = wx.createSelectorQuery(); //创建节点查询器
        query.select('#item-' + selectedId).boundingClientRect(); //选择id='#item-' + selectedId的节点，获取节点位置信息的查询请求
        query.select('#scroll-view').boundingClientRect(); //获取滑块的位置信息
        //获取滚动位置
        query.select('#scroll-view').scrollOffset(); //获取页面滑动位置的查询请求
        query.exec(function(res) {
            console.log("res:", res)
            that.setData({
                scrollLeft: res[2].scrollLeft + res[0].left + res[0].width / 2 - res[1].width / 2
            });
            console.log(that.data.scrollLeft)
        });
    },
    // 导航tab切换
    swatchTab(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        this.handleScroll(index);
        switch (index) {
            case '0':
                break;
            case '1':
                break;
            case '2':
                break;
            case '3':
                break;
        } 
        that.setData({
            markers:[],
            isShadeShow:false,
            currentTab: index
        })
        that.getMarkersList()
    },
    // 服务切换
    servetab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            serveCurrent: index
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
    //全部服务
    allserveShow() {
        this.setData({
            isShadeShow: !this.data.isShadeShow
        })
    },
    // 切换服务类型 到店-取车
    serveType(e) {
        this.setData({
            serveType: e.currentTarget.dataset.index
        })
    },
    onbindfocus() {
        wx.navigateTo({
            url: '/pages/search/search',
        })
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
                    // that.removeOther(data)
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
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
    // 急救中心
    selecEmergency(){
        this.setData({
            emShow: !this.data.emShow
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
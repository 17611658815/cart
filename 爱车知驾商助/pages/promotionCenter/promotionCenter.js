// pages/promotionCenter/promotionCenter.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataTab: 0,//头部导航
        currentTab: 0,//头部导航
        type:0,
        navList:['推广概况','发起活动','赠优惠卷','发红包'],
        tabArr:['搜索推广数据','场景展示数据'],
        selectIndex1:0,
        selectIndex2:0,
        selctList1:['全部','满减','折扣','代金卷'],
        selctList2:['全部','未开始','生效中','已失效'],
        slect_item1:false,
        slect_item2:false,
        slect_item3:false,
        slect_item4:false,
        member_id:0,
        page: 1,
        packetList: [],
        on_off: false,
        youhui_type:0,
        status:0,
        name1:'优惠卷类型',
        name2:'状态',
        name3:'状态',
        msgData:{}

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            member_id: userInfo.id,
            currentTab: options.index || 0,
            type: options.type || 0,
        })
    },

    /**
       * 生命周期函数--监听页面显示
       */
    onShow: function () {
        if(this.data.currentTab == 0){
            this.promotionHomeData()
        }else{
            this.loadList();
        }
    },

    getShopActivitie() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.page = that.data.page;
        params.type = that.data.type;
        params.youhui_type = that.data.youhui_type;
        params.status = that.data.status;
        app.net.$Api.getShopActivitie(params).then((res) => {
            console.log(res)
            if (res.data.data.length > 0) {
                that.setData({
                    packetList: that.data.packetList.concat(res.data.data)
                })
            } else {
                that.setData({
                    on_off: true
                })
            }
        })
    },
    // 推广概况
    promotionHomeData() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        app.net.$Api.promotionHomeData(params).then((res) => {
            console.log(res)
            that.setData({
                msgData:res.data
            })
        })
    },

    loadList() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.page = that.data.page;
        params.type = that.data.type;
        params.youhui_type = that.data.youhui_type;
        params.status = that.data.status;
        app.net.$Api.getShopActivitie(params).then((res) => {
            console.log(res)
            that.setData({
                packetList: res.data.data
            })
        })
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;
        console.log(e)
        this.setData({
            currentTab: index,
            type: type,
            packetList:[],
            page:1,
            youhui_type: 0,
            status: 0,
            name1: '优惠卷类型',
            name2: '状态',
        })
        if (index == 0){
            this.promotionHomeData()
        }else{
            this.loadList()
        }
        
    },
    // 优惠卷选择类型
    changeIndex_1(e){
        let index = e.currentTarget.dataset.index;
        this.setData({
            selectIndex1: index,
            youhui_type: index,
            slect_item1:false,
            name1: this.data.selctList1[index]
        })
        this.loadList()
        console.log(index,1)
    },
    // 优惠卷选择状态
    changeIndex_2(e){
        let index = e.currentTarget.dataset.index;
        this.setData({
            selectIndex2: index,
            status: index,
            slect_item2: false,
            name2: this.data.selctList2[index]
        })
        this.loadList()
        console.log(index,2)
    },
    // 活动选择状态
    changeIndex_3(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            selectIndex3: index,
            status: index,
            slect_item3: false,
            name3: this.data.selctList2[index]
        })
        this.loadList()
        console.log(index, 3)
    },
    // 搜索推广数据
    dataSwatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            dataTab: index,
            slect_item1: false,
            slect_item2: false,
            slect_item3: false,
            slect_item4: false,
        })
    },
    // 搜索推广
    slect_1itemShow(){
        this.setData({
            slect_item1: !this.data.slect_item1,
             slect_item2: false
        })
    },
    slect_2itemShow(){
        this.setData({
            slect_item2: !this.data.slect_item2,
            slect_item1: false
        })
    },
    slect_3itemShow(){
        this.setData({
            slect_item3: !this.data.slect_item3,
        })
    },
    
    goAddredPacket(e) {
        let index = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: '/pages/AddredPacket/AddredPacket?type=' + index,
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.on_off) {
            this.data.page++;
            this.getShopActivitie()
        }
    },
    
})
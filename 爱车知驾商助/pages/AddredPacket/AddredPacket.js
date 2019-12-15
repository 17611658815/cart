const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id: 0,
        shop_id: 0,
        shopName: '',
        shopPrice: '',
        type:0,
        tapTime: '',
        youhui:0,
        isshow: true,
        zhicheng: false,
        referrerarray: ['满减','折扣','代金卷'],
        index:0,
        referrerName:'',
        num1:'',//满减生效金额
        time:'',//生效时间
        time1Flage:true,//开始之间
        time1isshow: true,
        timeName1:'',//开始时间
        time2Flage:true,//开始之间
        time2isshow: true,
        timeName2:'',//开始时间
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        that.setData({
            member_id: userInfo.id,
            type: options.type
        })
    },
    shopPriceInpt(e) {
        this.setData({
            shopPrice: e.detail.value
        })
    },
    shopNameInpt(e){
        this.setData({
            shopName: e.detail.value
        })
    },
    num1Inpt(e){
        this.setData({
            num1: e.detail.value
        })
    },
    // 选择优惠卷
    bindPickerChange(e){
        console.log(e)
        let index = e.detail.value;
        this.setData({
            index: index,
            zhicheng:false,
            referrerName: this.data.referrerarray[index]
        })
    },
    bindDateChange(e){
        console.log(e)
        this.setData({
            time1Flage:false,
            timeName1: e.detail.value
        })
    },
    bindDateChange2(e){
        console.log(e)
        this.setData({
            time2Flage:false,
            timeName2: e.detail.value
        })
    },
    // 提交红包
    addShopActivitie() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.num = that.data.shopPrice;
        params.type = that.data.type;
        params.value = that.data.shopName;
        params.youhui = that.data.youhui;
        var nowTime = new Date();
        if (nowTime - that.data.tapTime < 3000) {
            console.log('阻断')
            return;
        }
        console.log('执行')
        this.setData({ tapTime: nowTime });
        if (that.data.shopName == '' || that.data.shopPrice == "") {
            app.alert('请完数量信息~');
            return;
        }
        app.net.$Api.addShopActivitie(params).then((res) => {
            if (res.data.code == 200) {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            that.setData({
                                shopName: '',
                                shopPrice: '',
                            })
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 2000)
                    }
                })
            } else if (res.data.code == 400) {
                app.alert(res.data.msg)
            }
        })
    },
    // 提交优惠卷
    addShopActiviti2() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.num = that.data.shopPrice;
        params.type = that.data.type;
        params.value = that.data.shopName;
        params.youhui_type = that.data.index/1+1;
        params.stime = that.data.timeName1;
        params.etime = that.data.timeName2;
        params.man = that.data.num1;

        var nowTime = new Date();
        if (nowTime - that.data.tapTime < 3000) {
            console.log('阻断')
            return;
        }
        console.log('执行')
        this.setData({ tapTime: nowTime });
        if (that.data.shopName == '' || that.data.shopPrice == "") {
            app.alert('请完数量信息~');
            return;
        }
        if (that.data.timeName1 == ""){
            app.alert('请输入生效时间~');
            return;
        }
        if (that.data.timeName2 == ""){
            app.alert('请输入失效时间~');
            return;
        }
        if (that.data.man == ""){
            app.alert('请输入优惠卷生效金额~');
            return;
        }
        app.net.$Api.addShopActivitie(params).then((res) => {
            if (res.data.code == 200) {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            that.setData({
                                shopName: '',
                                shopPrice: '',
                               type:0,
                              shopName:"",
                              index:0,
                                timeName1:'',
                               timeName2:'',
                               num1:''
                            })
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 2000)
                    }
                })
            }else if(res.data.code == 400){
                app.alert(res.data.msg)
            }
        })
    },
    // 提交活动
    addShopActivitie3() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.title = that.data.shopName;
        params.num = that.data.shopPrice;
        params.type = that.data.type;
        params.stime = that.data.timeName1;
        params.etime = that.data.timeName2;
        var nowTime = new Date();
        if (nowTime - that.data.tapTime < 3000) {
            console.log('阻断')
            return;
        }
        console.log('执行')
        this.setData({ tapTime: nowTime });
        if (that.data.shopName == '' || that.data.shopPrice == "") {
            app.alert('请完数量信息~');
            return;
        }
        if (that.data.timeName1 == "") {
            app.alert('请输入生效时间~');
            return;
        }
        if (that.data.timeName2 == "") {
            app.alert('请输入失效时间~');
            return;
        }
        app.net.$Api.addShopActivitie(params).then((res) => {
            if (res.data.code == 200) {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            that.setData({
                                shopName: '',
                                shopPrice: '',
                                timeName1:'',
                                timeName2:'',
                            })
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 2000)
                    }
                })
            } else if (res.data.code == 400) {
                app.alert(res.data.msg)
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
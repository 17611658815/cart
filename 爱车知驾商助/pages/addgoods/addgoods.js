// page/order/pages/newAddress/newAddress.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:0,
        index: 0,
        typeid: '', //分类id
        obj_id:'',//商品id
        typeName:'',
        goodsName:'',
        goodsPrice:'',
        goodsList:[],
        newGoodsList:[],
        array: [],
        mobile: '', //收货人手机号
        province: '', //收货人所在省份
        city: '', //收货人城市
        address: '', //收货人详细地址
        typeList:[],
        typeName:'',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        that.setData({
            member_id:userInfo.id
        })
        that.getGoodsType()
    },
    //商品名称
    goodsNameInpt(e) {
        this.setData({
            goodsName: e.detail.value
        })
    },
    // 联系人姓名
    goodsPriceInpt(e) {
        this.setData({
            goodsPrice: e.detail.value
        })
    },
    // 获取分类
    getGoodsType() {
        let that = this;
        let params = {
                appid: app.globalData.appid,
            };
        app.net.$Api.getGoodsType(params).then((res) => {
            for(var i = 0; i< res.data.data.length;i++){
                that.data.array.push(res.data.data[i].name)
            }
            that.setData({
                list: res.data.data,
                array: that.data.array
            })
            console.log(res)
          
        })
       
    },
    getTypeGoods(id){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            typeid: id
        };
        app.net.$Api.getTypeGoods(params).then((res) => {
            that.setData({
                goodsList:res.data.data,
                newGoodsList: res.data.data
            })
        })
    },
    // picker-确定事件
    bindMultiPickerChange: function (e) {
        console.log(e)
        let index = e.detail.value;
        let list = this.data.list;
        this.setData({
            typeName: list[index].name,
            typeid: list[index].id
        })
        this.getTypeGoods(this.data.typeid)
    },
    goodsNameInpt(e){
        console.log(e)
        let value = e.detail.value;
        let newGoodsList = []
        this.data.goodsList.forEach((item)=>{
            console.log(item)
            if (item.name.indexOf(value) != -1){
                newGoodsList.push(item)
            }
        })
        this.setData({
            newGoodsList: newGoodsList
        })
        console.log(this.data.newGoodsList)

    },
    checkdItem(e){
        let item = e.currentTarget.dataset.item;
        this.setData({
            newGoodsList: [item],
            obj_id: item.id,
            goodsName: item.name,
        })
    },
    addGoodsItem(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            typeid: that.data.typeid,
            obj_id: that.data.obj_id,
            member_id: that.data.member_id,
            name: that.data.goodsName,
            price: that.data.goodsPrice,
        };
        if (that.data.goodsName == ""){
            app.alert("请输入商品名称~！")
            return
        }
        if (that.data.goodsPrice == ""){
            app.alert("请输入商品价格~！")
            return
        }
        app.net.$Api.addShopGoods(params).then((res) => {
            if (res.data.code == 200){
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                       
                        setTimeout(function () {
                            that.setData({
                                typeName:'',
                                goodsName:'',
                                goodsPrice:'',
                                goodsList: [],
                                newGoodsList: [],
                            })
                        }, 2000)
                    }
                })
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
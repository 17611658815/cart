const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: [{ name: '出售中', status: 1 }, { name: '已下架', status: 2 }, { name: '草稿中', status: 0 }],
        currentTab:0,
        status: 1,
        page: 1,
        member_id: '',
        goodsList: [],
        goodsListLength: 1,
        on_off: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userinfo') || '';
        this.setData({
            member_id: userinfo.id,
            currentTab: options.index,
            status: options.status,
        })
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.loadList()
    },

    loadList(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            page: that.data.page,
            status: that.data.status
        }
        app.loading('加载中')
        app.net.$Api.getShopGoodsList(params).then((res) => {
            console.log(res)
            if (res.data.data.length > 0) {
                that.setData({
                    goodsList: res.data.data,
                })
            } else {
                that.setData({
                    on_off: true
                })
            }
            wx.hideLoading()
        })
    },
    getShopGoodsList() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            page: that.data.page,
            status: that.data.status
        }
        app.loading('加载中')
        app.net.$Api.getShopGoodsList(params).then((res) => {
            console.log(res)
            if (res.data.data.length > 0) {
                that.setData({
                    goodsList: that.data.goodsList.concat(res.data.data),
                })
            } else {
                that.setData({
                    on_off: true
                })
            }
            wx.hideLoading()
        })
    },
    setGoodsStatus(e){
        let that = this;
        let id = e.currentTarget.dataset.id;
        let status = e.currentTarget.dataset.status;
        let title = status == 2 ? "下架":"删除";
        wx.showModal({
            title: '温馨提示',
            content: '确定' + title+'此商品吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                   
                    that.setShopGoodsStatus(id, status)
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    setShopGoodsStatus(id, status) {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            id: id,
            status: status
        }
        app.net.$Api.setShopGoodsStatus(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                wx.showToast({
                    title: '下架成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            that.loadList()
                        }, 2000)
                    }
                })
            }
        })
    },
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        let status = e.currentTarget.dataset.status;
        this.setData({
            goodsList: [],
            status: status,
            currentTab: index
        })
        this.getShopGoodsList()
    },
    // 修改商品信息
    changeGoods(e){
        let id = e.currentTarget.dataset.id;
        let obj_id = e.currentTarget.dataset.obj_id;
        wx.navigateTo({
            url: '/pages/addgoods/addgoods?id=' + id + "&obj_id=" + obj_id,
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.on_off) {
            this.data.page++
            this.getShopGoodsList()
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
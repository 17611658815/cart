// pages/contentList/contentList.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page:1,
        catid:0,
        on_off:false,
        currentTab:0,
        catList:[],
        contList:[],
        scrollLeft:0
    },
    // 获取元素位置
    handleScroll(selectedId) {
        var that = this;
        console.log(selectedId)
        var query = wx.createSelectorQuery();//创建节点查询器
        query.select('#item-' + selectedId).boundingClientRect();//选择id='#item-' + selectedId的节点，获取节点位置信息的查询请求
        query.select('#scroll-view').boundingClientRect();//获取滑块的位置信息
        //获取滚动位置
        query.select('#scroll-view').scrollOffset();//获取页面滑动位置的查询请求
        query.exec(function (res) {
            console.log("res:", res)
            that.setData({
                scrollLeft: res[2].scrollLeft + res[0].left + res[0].width / 2 - res[1].width / 2
            });
            console.log(that.data.scrollLeft)
        });
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        let catid = e.currentTarget.dataset.id;
        this.handleScroll(index)
        this.setData({
            currentTab: index,
            catid: catid,
            contList:[],
            page:1,
        })
        this.customerList();
    },
    customerList() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.catid = that.data.catid;
        params.page = that.data.page;
        app.net.$Api.customerList(params).then((res) => {
            console.log(res)
            if(that.data.page == 1){
                that.setData({
                    catList: res.data.cat,
                })
            }
            if (res.data.list.length>0){
                that.setData({
                    contList: that.data.contList.concat(res.data.list),
                })
            }else{
                that.setData({
                    on_off:true
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            currentTab: options.index,
            catid: options.id,
        })
        this.customerList()
    },
    /**
        * 页面上拉触底事件的处理函数
        */
    onReachBottom: function () {
        if (!this.data.on_off){
            this.data.page++;
            this.customerList()
        }
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
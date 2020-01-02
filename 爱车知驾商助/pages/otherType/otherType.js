const app = getApp()
Page({
    data: {
        member_id:0,
        currentTab: 0,
        navList: ['待支付', '待维修', '待发货','待退款'],
        dataList: [1, 2, 3, 4, 5],
        status: ['1', '3', '9', '5'],//订单状态
        page:1,//分页
        on_off:false,//开关
        dataList:[],
        listlength:1,
    },
    onShow(){
        this.data.page = 1;
        this.data.dataList = []
        this.getOrderList()
    },
    onLoad(options) { 
        let userInfo = wx.getStorageSync('userinfo') || '';
        this.setData({
            currentTab: options.currentTab,
            member_id: userInfo.id
        })
        // this.getOrderList()
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            page:1,
            on_off:false,
            dataList:[],
            currentTab: index,
        })
        this.getOrderList()
    },
    // 订单列表
    getOrderList() {
        let that = this,
            params = {
                appid: app.globalData.appid,
                member_id: that.data.member_id,
                status: that.data.status[that.data.currentTab],
                page: that.data.page,
            }
        app.net.$Api.getOrderList(params).then((res) => {
            console.log(res.data)
            if (that.data.page==1){
                that.setData({
                    listlength: res.data.data.length,
                })
            }
            if (res.data.data.length>0){
                that.setData({
                    dataList: that.data.dataList.concat(res.data.data),
                })
            }else{
                that.setData({
                    on_off:true
                })
            }
        })
    },
    goDetaile(e) {
        let id = e.currentTarget.dataset.id;
        let status = e.currentTarget.dataset.status;
        wx.navigateTo({
            url: '/pages/otherDetaile/otherDetaile?id=' + id + '&status=' + status,
        })

    },
    onReachBottom(){
        if (!this.data.on_off){
            this.data.page++;
            this.getOrderList()
        }
    }
});

Page({
    data: {
        currentTab: 0,
        navList: ['待支付', '待维修', '待发货','待退款'],
        dataList: [1, 2, 3, 4, 5]
        // dataList:[]
    },
    onLoad() { },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index
        })
    },
   
});

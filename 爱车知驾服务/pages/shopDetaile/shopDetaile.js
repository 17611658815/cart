const app = getApp()
Page({
    data: {
        id:0,
        top: 0,
        shopObj:{},
        currentTab:0,
        total:0,
        CarList:{}
    },
   
    onLoad(options) {
        let CarList = wx.getStorageSync('CarList') || {};
        this.setData({
            isIphoneX: app.globalData.isIphoneX,
            id: options.id,
            CarList: CarList
        })
        this.getShopInfo()
        this.sumTotal(CarList)
    },
    sumTotal(CarList){
        let total = 0;
        if (JSON.stringify(CarList) != "{}") {
            for (var k in CarList) {
                total += CarList[k].price * CarList[k].num / 1
            }
        }
        this.setData({
            total: total.toFixed(2)
        })
    },
    // 获取附近店铺
    getShopInfo() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            id: that.data.id,
        }
        app.loading('加载中')
        app.net.$Api.getShopInfo(params).then((res) => {
            console.log(res)
            that.setData({
                shopObj:res.data
            })
            wx.hideLoading()
        })
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index
        })
    },
    addCar(e){
        let item = e.currentTarget.dataset.item;
            item.num = 1;
        let push = true; 
        
        let CarList = this.data.CarList;

        if (CarList[item.id]!=undefined){
            CarList[item.id].num++
        }else{
            CarList[item.id] = item;
        }
        console.log(CarList)
        // 合计
        let total = 0;
        for (var k in CarList){
            total += CarList[k].price * CarList[k].num / 1
        }
        this.setData({
            CarList: CarList,
            total: total.toFixed(2)
        })
        wx.setStorage({
            key: 'CarList',
            data: CarList,
        })

    },
    checked(e) {
        let index = e.currentTarget.dataset.index;
        this.data.textArr.forEach((item, i) => {
            item.checked = false;
            if (index == i) {
                item.checked = !item.checked
            }
        })
        this.setData({
            textArr: this.data.textArr
        })
    },
    selectGood() {
        this.setData({
            selectShow: !this.data.selectShow
        })
    },
    // 选择内存
    change_1(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            current_1: index
        })
    },
    // 选择颜色 
    change_2(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            current_2: index
        })
    },
    // 选择租期
    change_3(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            current_3: index
        })
    },
    // 勾选手机保障服务
    selectCheckBox() {
        this.setData({
            falge: !this.data.falge
        })
    },
    //  返回首页
    goIndex() {
        my.switchTab({
            url: '/pages/index/index'
        })
    },
    // 去结算
    goGoodsList(){
        wx.navigateTo({
            url: '/pages/goodsList/goodsList?id='+this.data.id
        })
    },
    //  查看更多
    gohelpCenter() {
        my.navigateTo({
            url: '/pages/helpCenter/helpCenter'
        });
    },
    //  去添加信息
    goaddres() {
        my.navigateTo({
            url: '/pages/addres/addres'
        });
    }
});

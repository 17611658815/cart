const app = getApp()
Page({
    data: {
        id:0,
        top: 0,
        shopObj:{},
        currentTab:0,
        total:0,
        CarList:{},
        member_id:0,
        scrollLeft:0,
    },
   
    onLoad(options) {
        let that = this;
        wx.removeStorage({
            key: 'CarList',
            success: function(res) {},
        })
        let userinfo = wx.getStorageSync('userinfo') || '';
        let CarList =  {};
        this.setData({
            isIphoneX: app.globalData.isIphoneX,
            id: options.id,
            CarList: CarList,
            member_id: userinfo.id
        })
        this.getShopInfo()
        // this.sumTotal(CarList)
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
            member_id: that.data.member_id,
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
        this.handleScroll(index)
        this.setData({
            currentTab: index,
        })
    },
    // 添加购物车
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
        console.log(this.data.CarList)
        if (!app.globalData.userinfo.id) {
            app.checkLogin()
        } else if (JSON.stringify(this.data.CarList) == "{}") {
            app.alert("请选择购买的商品")
        }else{
            wx.navigateTo({
                url: '/pages/goodsList/goodsList?id='+this.data.id
            })
        }
       
    },
    //  查看更多
    gohelpCenter() {
        wx.navigateTo({
            url: '/pages/helpCenter/helpCenter'
        });
    },
    //  去添加信息
    goaddres() {
        wx.navigateTo({
            url: '/pages/addres/addres'
        });
    },
     /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return{
            title:'知驾车服',
            path: '/pages/shopDetaile/shopDetaile?id=' + that.data.id
        }
    }
});

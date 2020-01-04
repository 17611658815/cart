// components/slideNav/slideNav.js
let app  = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        userinfo: {
            type: Object,
        },
        slideNav: { //导航 
            type: Boolean,
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        slideNav: false,
        list: [{
            path: "/pages/other/other",
            name: "订单",
            icon: "../../images/order_icon.png"
        }, {
            path: "",
            name: "急呼",
            icon: "../../images/dun_icon.png"
        }, {
            path: "/pages/wallet/wallet",
            name: "钱包",
            icon: "../../images/wallet_icon.png"
        }, {
            path: "",
            name: "我的客服",
            icon: "../../images/kefu_icon.png"
        }, {
            path: "/pages/mayCarList/mayCarList",
            name: "我的爱车",
                icon: "../../images/img15.png"
        }, {
            path: "/pages/setCenter/setCenter",
            name: "设置",
            icon: "../../images/shezhi_icon.png"
        }, {
            path: "/pages/carOwnerServer/carOwnerServer",
            name: "车主服务",
            icon: "../../images/chezhu_icon.png"
        }]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //关闭
        hideslideNav() {
            let that = this;
            that.setData({
                slideNav: !that.data.slideNav,
            })
            that.triggerEvent("hideslideNav", data);
        },
        //显示
        showslideNav() {
            let that = this;
            that.setData({
                slideNav: true,
            })
            that.triggerEvent("showslideNav", data);
        },
        goDetaile(e){
            let url = e.currentTarget.dataset.url;
            if (!app.globalData.userinfo.id) {
                app.checkLogin()
            }else{
                wx.navigateTo({
                    url: url,
                })
            }
        }
    }
})
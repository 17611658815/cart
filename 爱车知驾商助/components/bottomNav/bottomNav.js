// components/bottomNav/bottomNav.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        navbarData: { //navbarData   由父页面传递的数据，变量名字自命名
            type: Number,
            value: {},
            observer: function(newVal, oldVal) {}
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        tabArr: [{
            "pagePath": "pages/index/index",
            "text": "主页",
            "iconPath": "images/tabber/home_select_2.png",
            "selectedIconPath": "images/tabber/home_select_1.png"
        },
        {
            "pagePath": "pages/message/message",
            "text": "消息",
            "iconPath": "images/tabber/msg_select_2.png",
            "selectedIconPath": "images/tabber/msg_select_1.png"
        },
        {
            "pagePath": "pages/tool/tool",
            "text": "工具",
            "iconPath": "images/tabber/type_select_2.png",
            "selectedIconPath": "images/tabber/type_select_1.png"
        },
        {
            "pagePath": "pages/may/may",
            "text": "我的",
            "iconPath": "images/tabber/may_select_2.png",
            "selectedIconPath": "images/tabber/may_select_1.png"
        }],
        isIphoneX: false,
        currenTab: app.globalData.currenTab,
    },
    attached() {
        this.setData({
            isIphoneX: app.globalData.isIphoneX
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        switchTab(e) {
            let index = e.currentTarget.dataset.index;
            this.setData({
                currenTab: index
            })
            console.log(e)
        }
    }
})
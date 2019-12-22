//main.js
//获取应用实例
var app = getApp();
Page({
    data: {
        member_id:0,
        title: '',
        time: '',
        content: '',
        newsData: {},
        windowHeight: "",
        windowWidth: "",
        relevant: {}, //相关内容列表
        key: 0,
        id: 0,
        num: '',
        toView: '',
        msgVal: '',
        isIphoneX: false,
        isAddmsg: false,
        on_off: false,
        userInfo: '',
        page: 1,
        isZan: false,
        postingsList:[],
    },

    onPullDownRefresh: function (e) {
        console.log("下拉刷新");
        swan.stopPullDownRefresh() //关闭下拉状态
    },
    onShow: function (e) {
        let that = this;
        wx.getSystemInfo({
            success: res => {
                console.log(res.model.search('iPhone X') != -1)
                if (res.model.search('iPhone X') != -1) {
                    that.data.isIphoneX = true
                } else {
                    that.data.isIphoneX = false
                }
                that.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth,
                    isIphoneX: that.data.isIphoneX
                });
            }
        });
    },
    // 获取内容
    postingsInfo() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.id = that.data.id;
        app.net.$Api.postingsInfo(params).then((res) => {
            console.log(res)
            that.setData({
                newsData:res.data.data
            })
        })
    },
    pullUpLoad(){
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.id = that.data.id;
        params.page = that.data.page;
        params.member_id = that.data.member_id;
        app.net.$Api.postingsComment(params).then((res) => {
            console.log(res)
            res.data.data.forEach((item)=>{
                item.iszan = false
            })
            if (res.data.data.length>0){
                that.setData({
                    postingsList: that.data.postingsList.concat(res.data.data)
                })
            }else{
                that.setData({
                    on_off:true
                })
            }
           
        })
    },
    // 获取评论列表
    postingsComment() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.id = that.data.id;
        params.page = that.data.page;
        params.member_id = that.data.member_id;
        app.net.$Api.postingsComment(params).then((res) => {
            console.log(res)
            that.setData({
                postingsList:res.data.data
            })
        })
    },
    onLoad: function (options) {
        var that = this;
        let userInfo = wx.getStorageSync('userinfo');
        that.setData({
            id: options.id,
            member_id:userInfo.id,
            isIphoneX: app.globalData.isIphoneX
        })
        that.postingsInfo()
        that.postingsComment()
    },
   
    // 提交评论
    addMsg() {
        var that = this,
        params = new Object();
        params.appid = app.globalData.appid;
        params.member_id = that.data.member_id;
        params.postings_id = that.data.id;
        params.content =  that.data.msgVal,
        app.net.$Api.addPostingsComment(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                wx.showToast({
                    title: '评论成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            that.setData({
                                msgVal: "",
                                page:1
                            })
                            that.postingsComment()
                        }, 2000)
                    }
                })
            }
        })
    },
    clickZan(e) {
        var that = this;
            var index = e.currentTarget.dataset.index;
        var type = e.currentTarget.dataset.type;
        var postingsList = that.data.postingsList;
            var id = e.currentTarget.dataset.id,
            params = new Object();
            params.appid = app.globalData.appid;
            params.member_id = that.data.member_id;
            params.comment_id = id;
            app.net.$Api.postingsCommentZan(params).then((res) => {
                console.log(res)
                if (type=="no") {
                    that.setData({
                        [`postingsList[${index}].cai`]: postingsList[index].cai / 1 - 1,
                        [`postingsList[${index}].iszan`]: false,
                    })
                } else {
                    that.setData({
                        [`postingsList[${index}].cai`]: postingsList[index].cai / 1 + 1,
                        [`postingsList[${index}].iszan`]: true
                    })
                }
            })
        // var that = this;
        // var index = e.currentTarget.dataset.index;
        // var commentList = that.data.commentList;
        // var commentid = e.currentTarget.dataset.id;
        // console.log(commentList[index].zan / 1 + 1)
        // if (commentList[index].iszan) {
        //     that.setData({
        //         [`commentList[${index}].zan`]: commentList[index].zan / 1 - 1,
        //         [`commentList[${index}].iszan`]: false,
        //     })
        // } else {
        //     that.setData({
        //         [`commentList[${index}].zan`]: commentList[index].zan / 1 + 1,
        //         [`commentList[${index}].iszan`]: true
        //     })
        // }
        // that.zan(commentid)
        // console.log(commentList)
    },
    // 点赞
    zan(commentid) {
        var that = this;
        swan.request({
            url: 'https://mfkapi.39yst.com/appInterface/bd39yst/zan',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                appid: app.globalData.appid,
                userid: that.data.userInfo.id,
                commentid: commentid
            },
            success: function (res) {
                console.log(res)
            },
            fail: function () {// fail
            },
            complete: function () {// complete
            }
        });
    },
    seoInfo(options) {
        console.log(options, 104)
        swan.setPageInfo && swan.setPageInfo({
            title: `${options.title}-民福康健康`,
            articleTitle: `${options.title}-民福康健康`,
            releaseDate: options.time,
            image: options.thumb[0],
            keywords: options.title,
            description: options.desc,
            success: function () {
                console.log('页面基础信息设置完成');
            }
        })
    },
    loading: function () {
        swan.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        });
    },
    //获取相关列表方法
    getArrayItems: function (arr, num, key) {
        var that = this;
        var temp_array = {};
        var rand = [];
        while (rand.length < 3) {
            let k = Math.ceil(Math.random() * arr.length);
            if (k != key && rand.indexOf(k) < 0) {
                rand.push(k);
            }
        }
        for (let i = 0; i < rand.length; i++) {
            temp_array[rand[i]] = arr[rand[i]];
        }
        return temp_array;
    },
    onReachBottom: function () {
        if (!this.data.on_off) {
            this.data.page++;
            this.pullUpLoad();
        }
    },
    //跳转详情
    showContent: function (e) {
        // console.log(this.data);
        var key = e.currentTarget.dataset.id;
        swan.redirectTo({
            url: 'content?key=' + key + '&id=' + this.data.id
        });
    },
    //获取焦点
    onbindfocus(e) {
        console.log(e)
        this.setData({
            bottom: e.detail.height,
            isAddmsg: true
        })
    },
    onbindblur() {
        this.setData({
            isfocus: false,
            bottom: 0,
            isAddmsg: false
        })
    },
    onbindconfirm() {
        let that = this;
        that.data.commentMsgArr.push(that.data.oncommentMsg)
        this.setData({
            isfocus: false,
            bottom: 0,
            commentMsgArr: that.data.commentMsgArr
        })
    },
    oncommentMsg(e) {
        this.setData({
            msgVal: e.detail.value,
        })
    },
    gocomment() {
        console.log('111')
        this.setData({
            toView: "comment"
        })
    },
    pageScroll: function (e) {
        this.setData({
            toView: ""
        })
    },
    onShareAppMessage: function () {
        var that = this;
        return {
            title: that.data.title,
            path: '/pages/content/content?id=' + that.data.id
        }
    },
});
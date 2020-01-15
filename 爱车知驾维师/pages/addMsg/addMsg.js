// pages/addMsg/addMsg.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:'',
        addresMsg:'',//文章内容
        oldimg: "",
        newimg: "",
        member_id:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        that.setData({
            member_id: userInfo.id
        })
    },
    titleInpt(e){
        this.setData({
            title: e.detail.value
        })
    },
    // 文本域val-change事件
    ontextareaChange(e) {
        this.setData({
            addresMsg: e.detail.value
        })
    },
    addPostings(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            title: that.data.title,
            content: that.data.addresMsg,
            thumb: that.data.newimg
        };
        if (that.data.title == "") {
            app.alert("请填写文章标题")
            return
        }
        if (that.data.addresMsg == "") {
            app.alert("请填写您要发布的内容")
            return
        }
        app.net.$Api.addPostings(params).then((res) => {
            if (res.data.code == 200) {
                wx.showToast({
                    title: '发布成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            wx.navigateBack({
                                detal: 1
                            })
                        }, 2000)
                    }
                })
            }
        })
    },
    // 选取图片
    chooseImageTap: function () {
        var that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#00000",
            success: function (res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album')
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera')
                    }
                }
            }
        })
    },
    chooseWxImage: function (type, typeNum) {
        var that = this;
        var tempFilePaths = that.data.tempFilePaths;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                console.log(res);
                var oldimg = that.data.oldimg;
                that.upImgs(res.tempFilePaths[0], 0)
                that.setData({
                    oldimg: res.tempFilePaths[0]
                });
            }
        })
    },
    upImgs: function (imgurl, index) {
        var that = this;
        app.loading('上传中...');
        wx.uploadFile({
            url: 'https://api.dodo.wiki/appInterface/artificer/upImgFile',
            filePath: imgurl,
            name: 'file',
            header: {
                'content-type': 'multipart/form-data'
            },
            formData: {
                appid: app.globalData.appid
            },
            success: function (res) {
                var data = JSON.parse(res.data)
                if (data['code'] == 200) {
                    // that.data.imgString.push(data['url']);
                    // index++;
                    // if (that.data.imgs[index] != undefined) {//存在下一张
                    //     that.upImgs(that.data.imgs[index], index);
                    // }
                    that.setData({
                        newimg: data['url']
                    })
                    wx.hideLoading();
                } else {
                    console.log(data['url']);
                }

            },
            fail: function (res) {
            },
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
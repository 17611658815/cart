// pages/upPicregister/upPicregister.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oldidCard: 'https://img.dodo.wiki/app/idCard.png',
        olddriving:'https://img.dodo.wiki/app/olddriving.jpg',
        oldcertification: 'https://img.dodo.wiki/app/certification.jpg',
        isshade: true,
        idCard: '', //身份证
        certification: '',//资格证
        driving: '',//驾驶证
        avatar:'',//头像
        sessionKey: '',
        userid: 0,
        name: '',
        user: {},
        city: '',
        num: 0,
        device: false,
        tempImagePath: "", //个人自拍
        camera: false,
        ctx: {},
        type: "takePhoto",
    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        let sessionKey = wx.getStorageSync('session_key');
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            sessionKey,
            userid: userInfo.id,
            oldidCard: app.globalData.hasInfo.card_photos || "",
            oldcertification: app.globalData.hasInfo.aptitude_photos || "",
            olddriving: app.globalData.hasInfo.healthy_photos || "",
            city: app.globalData.city,
            num: app.globalData.num
        })
        this.setData({
            ctx: wx.createCameraContext()
        })

        console.log(this.data.oldcertification)
    },

    getName(e) {
        console.log(e)
        this.setData({
            name: e.detail.value
        })
    },
    hideshade() {
        this.setData({
            isshade: false
        })
    },
    // 拍照
    selfie(){
        this.setData({
            device:true
        })
    },
    // 重拍
    delselfie() {
        this.setData({
            tempImagePath: ""
        })
    },
    async confirmPic(){
        await this.upImgs(this.data.tempImagePath, 0, 4)
        await this.setData({
            device: false
        })
    },
    chooseImageTap: function (e) {
        let that = this;
        let type = e.currentTarget.dataset.type;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#00000",
            success: function (res) {
                console.log(res)
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album', type)
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera', type)
                    }
                }
            }
        })
    },
    // 选取图片
    chooseWxImage: function (type, typeNum) {
        var that = this;
        var tempFilePaths = that.data.tempFilePaths;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                if (typeNum == 1) {
                    that.setData({
                        oldidCard: res.tempFilePaths[0]
                    })
                    that.upImgs(res.tempFilePaths[0], 0, 1)
                } else if (typeNum == 2) {
                    that.setData({
                        oldcertification: res.tempFilePaths[0]
                    })
                    that.upImgs(res.tempFilePaths[0], 0, 2)
                } else if (typeNum == 3){
                    that.setData({
                        olddriving: res.tempFilePaths[0]
                    })
                    that.upImgs(res.tempFilePaths[0], 0, 3)
                }
            }
        })
    },
    getPhoneNumber(e) {
        let that = this;
        let idCard = that.data.idCard; //身份证
        let certification = that.data.certification; //资格证
        let driving = that.data.driving; //驾驶证
        let params = {
            appid: app.globalData.appid,
            sessionKey: that.data.sessionKey,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
        }
        if (idCard == "") {
            app.alert('上传身份证~');
            return
        }
        if (driving == "") {
            app.alert('上传驾驶证~');
            return
        }
        if (certification == "") {
            app.alert('请上传职业资格证~');
            return
        }
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
            console.log('拒绝')
            app.alert('拒绝授权将无法注册~')
        } else {
            app.net.$Api.analysisUserPhone(params).then((res) => {
                var data = JSON.parse(res.data.data)
                let phone = data.purePhoneNumber;
                console.log(res)
                that.saveUserInfo(phone)
            })
        }

    },
    saveUserInfo(phone) {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            userid: that.data.userid,
            phone: phone,
            identity: that.data.idCard,
            aptitude: that.data.certification,
            healthy_photos: that.data.driving,
            avatar: that.data.avatar
        }
        app.net.$Api.saveUserInfo(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                wx.showModal({
                    title: '温馨提示',
                    content: '提交成功',
                    showCancel: false,
                    success: function () {
                        wx.reLaunch({
                            url: '/pages/index/index',
                        })
                    }

                })
            } else if (res.data.code == 400) {
                app.alert(res.data.msg)
            }
        })
    },
    upImgs: function (imgurl, index, type) {
        var that = this;
        wx.uploadFile({
            url: 'https://api.dodo.wiki/appInterface/artificer/upImgFile',
            filePath: imgurl,
            name: 'file',
            header: {
                'content-type': 'multipart/form-data'
            },
            formData: {
                appid: app.globalData.appid,
            },
            success: function (res) {
                var data = JSON.parse(res.data)
                if (type == 1) {
                    that.setData({
                        idCard: data.url
                    })
                } else if (type == 2) {
                    that.setData({
                        certification: data.url
                    })
                } else if (type == 3){
                    that.setData({
                        driving: data.url
                    })
                } else if (type == 4){
                    that.setData({
                        avatar: data.url
                    })
                }
                console.log(that.data.idCard)
            }
        })
    },

    // 预览
    previewImage: function (e) {
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current, // 当前显示图片的http链接  
            urls: [current] // 需要预览的图片http链接列表  
        })
    },
    
    camera() {
        let { ctx, type, startRecord } = this.data;
        // 拍照
            console.log("拍照");
            ctx.takePhoto({
                quality: "normal",
                success: (res) => {
                    // console.log(res);
                    this.setData({
                        tempImagePath: res.tempImagePath,
                        camera: false,
                    });
                },
                fail: (e) => {
                    console.log(e);
                }
            })
    },
    // 打开模拟的相机界面
    open(e) {
        let { type } = e.target.dataset;
        console.log("开启相机准备", type == "takePhoto" ? "拍照" : "录视频");
        this.setData({
            camera: true,
            type
        })
    },
    // 关闭模拟的相机界面
    close() {
        console.log("关闭相机");
        this.setData({
            camera: false
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
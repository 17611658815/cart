// pages/upPicregister/upPicregister.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // oldidCard: 'https://img.dodo.wiki/app/idCard.png',
        // olddriving:'https://img.dodo.wiki/app/olddriving.jpg',
        // oldcertification: 'https://img.dodo.wiki/app/certification.jpg',
        isshade: true,
        idCard: 'https://img.dodo.wiki/app/idCard.png', //身份证
        certification: 'https://img.dodo.wiki/app/certification.jpg',//资格证
        driving: 'https://img.dodo.wiki/app/olddriving.jpg',//驾驶证
        avatar:'',//头像
        sessionKey: '',
        userid: 0,
        name: '',
        user: {},
        city: '',
        num: 0,
        device: false,
        tempImagePath: "https://img.dodo.wiki/app/img11.jpg", //个人自拍
        camera: false,
        ctx: {},
        type: "takePhoto",
        text1:'',
        text2:'',
        img1:'',
        phone:''
    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        if (!app.globalData.hasInfo || !app.globalData.hasInfo.id){
            app.checkLogin();
        }else{
            this.initialize();
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    // onShow: function () {
    //     console.log('onShow')
    //     this.initialize();
    // },
    hideshade() {
        this.setData({
            isshade: false
        })
    },
    //初始化方法
    initialize(){
        let sessionKey = wx.getStorageSync('session_key');
        let userInfo = wx.getStorageSync('userinfo');
        let city = wx.getStorageSync('city') || "";
        this.setData({
            sessionKey,
            userid: userInfo.id,
            phone: userInfo.phone,
            city: app.globalData.city,
            num: app.globalData.num
        })
        if (city == ""){
            this.getLocationMsg();
        }
        this.setData({
            ctx: wx.createCameraContext()
        })
        this.getUserInfo()
    },

    //获取当前位置
    getLocationMsg() {
        let that = this;
        wx.getLocation({
            type: 'gcj02',
            altitude: true, //高精度定位
            success: function (res) {
                console.log(res)
                wx.request({
                    url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=UYFBZ-ANUWW-Y7GRO-OURNR-G5L7O-PHFMD',
                    success: function (e) {
                        console.log(e, 39)
                        app.globalData.longitude = res.longitude;
                        app.globalData.latitude = res.latitude;
                        app.setStorage("longitude", res.longitude)
                        app.setStorage("latitude", res.latitude)
                        app.setStorage("city", e.data.result.address_component.city)
                        app.globalData.city = e.data.result.address_component.city;
                        // app.globalData.id = e.data.result.address_component.city
                        // that.setData({
                        //     city: e.data.result.address_component.city,//当前城市
                        //     address: e.data.result.address,//当前位置
                        //     longitude: res.longitude,
                        //     latitude: res.latitude,
                        // })
                    }
                })
            }
        });
    },
    nameInpt(e) {
        this.setData({
            name: e.detail.value
        })
    },
    // getShopInfo() {
    //     let that = this;
    //     let params = {
    //         appid: app.globalData.appid,
    //         member_id: that.data.member_id,
    //     }
    //     app.net.$Api.getShopInfo(params).then((res) => {
    //         that.setData({
    //             imgs1: res.data.data.aptitude_photos,
    //             imgs2: res.data.data.work_photos,
    //             imgs3: res.data.data.avatar,
    //             new_img1: res.data.data.aptitude_photos,
    //             new_img2: res.data.data.work_photos,
    //             new_img3: res.data.data.avatar,
    //             goodsName: res.data.data.real_name,
    //         })
    //     })
    // },
    getUserInfo() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            userid: that.data.userid,
        }
        app.net.$Api.getUserInfo(params).then((res) => {
            app.globalData.hasInfo = res.data.user;
            that.setData({
                certification: res.data.user.aptitude_photos,
                driving: res.data.user.healthy_photos,
                idCard: res.data.user.card_photos, //身份证
                certification: res.data.user.aptitude_photos,
                // oldidCard: res.data.user.card_photos,
                // oldcertification: res.data.user.aptitude_photos,
                // olddriving: res.data.user.healthy_photos,
                avatar: res.data.user.avatar,
                tempImagePath: res.data.user.avatar,
                name: res.data.user.real_name,
                text1: (res.data.user.subscribe_message['8T_Xni23AoLeZwG3r3T-iXIw3eTus12_FzLSV-EQPJQ'] != undefined && res.data.user.subscribe_message['8T_Xni23AoLeZwG3r3T-iXIw3eTus12_FzLSV-EQPJQ'] == 'accept') ? '已授权' : '未授权',
                text2: (res.data.user.subscribe_message['IajJtRQNTx_f695jvXlM1Fa2qBAcW6nCA3Rny0KLZIg'] != undefined && res.data.user.subscribe_message['IajJtRQNTx_f695jvXlM1Fa2qBAcW6nCA3Rny0KLZIg'] == 'accept') ? '已授权' : '未授权',
            })
        })
    },
    requestMsg1() {
        console.log('11111')
        let that = this;
        wx.requestSubscribeMessage({
            tmplIds: ['8T_Xni23AoLeZwG3r3T-iXIw3eTus12_FzLSV-EQPJQ'],
            success(res) {
                console.log(res)
                if (res['8T_Xni23AoLeZwG3r3T-iXIw3eTus12_FzLSV-EQPJQ'] === 'accept') {
                    delete res.errMsg
                    that.setSubscribeMessage(res)
                    that.setData({
                        text1: '已授权'
                    })
                } else {
                    app.alert('拒绝授权')
                }
                console.log(res)
            },fail(res) {
                console.log('fail  失败')
                console.log(res)
            },
            complete(res) {
            console.log('complete  调用完成')
            }
        })
    },
    requestMsg2() {
        let that = this;
        wx.requestSubscribeMessage({
            tmplIds: ['IajJtRQNTx_f695jvXlM1Fa2qBAcW6nCA3Rny0KLZIg'],
            success(res) {
                if (res['IajJtRQNTx_f695jvXlM1Fa2qBAcW6nCA3Rny0KLZIg'] === 'accept') {
                    delete res.errMsg
                    that.setSubscribeMessage(res)
                    that.setData({
                        text2: '已授权'
                    })
                } else {
                    app.alert('拒绝授权')
                }
                console.log(res)
            }
        })
    },
    setSubscribeMessage(power) {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.userid,
            power: power
        }
        app.net.$Api.setSubscribeMessage(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                wx.showToast({
                    title: '授权成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        // setTimeout(function () {
                        //     that.NeworderList()
                        // }, 2000)
                    }
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000,
                })
            }
        })

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
            device:true,
            tempImagePath: "https://img.dodo.wiki/app/img11.jpg"
        })
    },
    // 重拍
    delselfie() {
        this.setData({
            tempImagePath: "https://img.dodo.wiki/app/img11.jpg"
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
        // var tempFilePaths = that.data.tempFilePaths;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                that.upImgs(res.tempFilePaths[0], 0, typeNum)
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
        if (that.data.name == "") {
            app.alert('请填写名称~');
            return
        }
        if (idCard == "" && driving == "" && certification == "") {
            app.alert('请上传证件信息~');
            return
        }
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
            console.log('拒绝')
            app.alert('拒绝授权将无法注册~')
        } else {
            app.net.$Api.analysisUserPhone(params).then((res) => {
                var data = JSON.parse(res.data.data)
                let phone = data.purePhoneNumber;
                let userinfo = wx.getStorageSync('userinfo');
                userinfo.phone = data.purePhoneNumber;
                wx.setStorage({
                    key: 'userinfo',
                    data: userinfo,
                })
                console.log(res)
                that.saveUserInfo(phone)
            })
        }

    },
    saveUserInfo(phone) {
        let that = this;
        console.log(that.data)
        let params = {
            appid: app.globalData.appid,
            userid: that.data.userid,
            phone: phone,
            identity: that.data.idCard,
            aptitude: that.data.certification,
            healthy_photos: that.data.driving,
            avatar: that.data.avatar,
            city: app.globalData.city,
            name:that.data.name,
            share_source:app.globalData.share_source
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
    saveUserInfo2() {
        let that = this;
        console.log(that.data)
        let params = {
            appid: app.globalData.appid,
            userid: that.data.userid,
            phone: that.data.phone,
            identity: that.data.idCard,
            aptitude: that.data.certification,
            healthy_photos: that.data.driving,
            avatar: that.data.avatar,
            city: app.globalData.city,
            name:that.data.name
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
        app.loading('上传中')
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
                console.log(type,res, that.data);
                var data = JSON.parse(res.data)
                if(data.code == 200){
                    if (type == 1) {
                        that.setData({
                            idCard: data.url
                        })
                        console.log(that.data.idCard, type,439)
                    } else if (type == 2) {
                        that.setData({
                            certification: data.url
                        })
                        console.log(that.data.certification, type, 444)
                    } else if (type == 3) {
                        that.setData({
                            driving: data.url
                        })
                        console.log(that.data.driving, type, 449)
                    } else if (type == 4) {
                        that.setData({
                            avatar: data.url
                        })
                        console.log(that.data.avatar, type, 454)
                    }
                }else{
                    app.alert(res.data.msg)
                }
                wx.hideLoading()
                console.log(that.data,457)
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
        let that = this;
        that.data.cameraContext = wx.createCameraContext()
        that.data.cameraContext.takePhoto({
                quality: "normal",
                success: (res) => {
                    // console.log(res);
                    that.setData({
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
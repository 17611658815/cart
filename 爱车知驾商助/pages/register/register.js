const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        city:'',
        member_id:0,
        imgs1:'',//营业执照
        imgs2:'',//法人合照
        imgs3:'',//店铺头像
        new_img1:'',
        new_img2:'',
        new_img3:'',
        sessionKey:'',
        text1:'未授权',
        text2:'未授权',
        goodsName:'',
        phone:'',
        shop_service:'',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let sessionKey = wx.getStorageSync('session_key');
        let userinfo = wx.getStorageSync('userinfo');
        this.setData({
            sessionKey,
            member_id: userinfo.id,
            city: app.globalData.city,
            phone: userinfo.phone || ""
        })
        this.getShopInfo()
        this.getLocationMsg();
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
                        console.log(res)
                        app.globalData.longitude = res.longitude;
                        app.globalData.latitude = res.latitude;
                        app.globalData.city = e.data.result.address_component.city;
                        that.setData({
                            city: e.data.result.address_component.city,//当前城市
                            // address: e.data.result.address,//当前位置
                            // longitude: res.longitude,
                            // latitude: res.latitude,
                        })
                    }
                })
            }
        });
    },
    getShopInfo() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
        }
        app.net.$Api.getShopInfo(params).then((res) => {
            console.log(res)
            that.setData({
                imgs1: res.data.data.aptitude_photos,
                imgs2: res.data.data.work_photos,
                imgs3: res.data.data.avatar,
                new_img1: res.data.data.aptitude_photos,
                new_img2: res.data.data.work_photos,
                new_img3: res.data.data.avatar,
                goodsName: res.data.data.real_name,
                shop_service: res.data.data.shop_service,
                text1:(res.data.data.subscribe_message['5Bk34iK5EBCkW1-rDRwepXPdTfL3TgtipfMubCGvv40'] 
                != undefined && res.data.data.subscribe_message['5Bk34iK5EBCkW1-rDRwepXPdTfL3TgtipfMubCGvv40'] == 'accept') ? '已授权':'未授权',
                text2:(res.data.data.subscribe_message['Fy899cypwva2oUVilULgO7BJp3z7IY4qI8Tkicnus2k'] 
                != undefined && res.data.data.subscribe_message['5Bk34iK5EBCkW1-rDRwepXPdTfL3TgtipfMubCGvv40'] == 'accept') ? '已授权':'未授权',
            })
            console.log(res.data.data.phone)
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
                        imgs1: res.tempFilePaths[0]
                    })
                    that.upImgs(res.tempFilePaths[0], 0, 1)
                } else if (typeNum == 2) {
                    that.setData({
                        imgs2: res.tempFilePaths[0]
                    })
                    that.upImgs(res.tempFilePaths[0], 0, 2)
                } else if (typeNum == 3) {
                    that.setData({
                        imgs3: res.tempFilePaths[0]
                    })
                    that.upImgs(res.tempFilePaths[0], 0, 3)
                }
            }
        })
    },
    upImgs: function (imgurl, index, type) {
        var that = this;
        wx.showLoading({
            title: '上传中..',
        })
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
                var data = JSON.parse(res.data);
              
                if (type == 1) {
                    that.setData({
                        new_img1: data.url
                    })
                } else if (type == 2) {
                    that.setData({
                        new_img2: data.url
                    })
                } else if (type == 3) {
                    that.setData({
                        new_img3: data.url
                    })
                }
                wx.hideLoading()
                console.log(that.data.new_img1, that.data.new_img2)
            }
        })
    },
    requestMsg1(){
        let that = this;
        wx.requestSubscribeMessage({
            tmplIds: ['5Bk34iK5EBCkW1-rDRwepXPdTfL3TgtipfMubCGvv40'],
            success(res) {
                if (res['5Bk34iK5EBCkW1-rDRwepXPdTfL3TgtipfMubCGvv40'] === 'accept'){
                    delete res.errMsg
                    that.setSubscribeMessage(res)
                    that.setData({
                        text1:'已授权'
                    })
                } else {
                    app.alert('拒绝授权')
                }
                console.log(res)
             }
        })
    },
    requestMsg2(){
        let that = this;
        wx.requestSubscribeMessage({
            tmplIds: ['Fy899cypwva2oUVilULgO7BJp3z7IY4qI8Tkicnus2k'],
            success(res) {
                if (res['Fy899cypwva2oUVilULgO7BJp3z7IY4qI8Tkicnus2k'] === 'accept') {
                    delete res.errMsg
                    that.setSubscribeMessage(res)
                    that.setData({
                        text2:'已授权'
                    })
                }else{
                    app.alert('拒绝授权')
                }
                console.log(res)
             }
        })
    },
    setSubscribeMessage(power){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
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
    getPhoneNumber(e) {
        let that = this;
        let new_img1 = that.data.new_img1; //营业执照
        let new_img2 = that.data.new_img2; //合照
        let new_img3 = that.data.new_img3; //店铺头像
        let params = {
            appid: app.globalData.appid,
            sessionKey: that.data.sessionKey,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
        }
        if (that.data.goodsName == ""){
            app.alert('请输入店铺名称~');
            return
        }
        if (new_img1 == "") {
            app.alert('请上传营业执照~');
            return
        }
        if (new_img2 == "") {
            app.alert('请上传法人合照~');
            return
        }
        if (new_img3 == "") {
            app.alert('请上传店铺头像~');
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
                that.saveUserInfo(phone)
            })
        }

    },
    goodsNameInpt(e){
        this.setData({
            goodsName:e.detail.value 
        })
    },
    serviceInpt(e){
        this.setData({
            shop_service: e.detail.value
        })
    },
    saveUserInfo(phone){
        let that = this;
        let new_img1 = that.data.new_img1; //营业执照
        let new_img2 = that.data.new_img2; //合照
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            name: that.data.goodsName,
            aptitude_photos: that.data.new_img1,
            work_photos: that.data.new_img2,
            avatar: that.data.new_img3,
            lat: app.globalData.latitude,
            lng: app.globalData.longitude,
            phone: phone,
            city:app.globalData.city,
            shop_service: that.data.shop_service

        }
        app.net.$Api.saveShopInfo(params).then((res) => {
            console.log(res)
            if(res.data.code==200){
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
            }
        })

    },
    saveUserInfo2(){
        let that = this;
        let new_img1 = that.data.new_img1; //营业执照
        let new_img2 = that.data.new_img2; //合照
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            name: that.data.goodsName,
            aptitude_photos: that.data.new_img1,
            work_photos: that.data.new_img2,
            avatar: that.data.new_img3,
            lat: app.globalData.latitude,
            lng: app.globalData.longitude,
            phone: that.data.phone,
            city: app.globalData.city,
            shop_service: that.data.shop_service
        }
        app.net.$Api.saveShopInfo(params).then((res) => {
            console.log(res)
            if(res.data.code==200){
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
            }
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
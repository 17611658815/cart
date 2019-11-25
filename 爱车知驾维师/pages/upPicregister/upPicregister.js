// pages/upPicregister/upPicregister.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oldidCard:'',
        oldcertification:'',
        isshade:true,
        idCard:'', //身份证
        certification:'',//资格证
        sessionKey:'',
        userid:0,
        name:'',
        user:{},
        city:'',
        num:0
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
            name: app.globalData.hasInfo.real_name || "",
            city: app.globalData.city,
            num: app.globalData.num
        })
        console.log(this.data.oldcertification)
    },
  
    getName(e){
        console.log(e)
        this.setData({
            name: e.detail.value
        })
    },
    hideshade(){
        this.setData({
            isshade:false 
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
                }
            }
        })
    },
    getPhoneNumber(e){
        let that = this;
        let idCard = that.data.idCard; //身份证
        let certification = that.data.certification; //资格证
        let name = that.data.name; //资格证
        let params = {
            appid: app.globalData.appid,
            sessionKey: that.data.sessionKey,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
        }
        if (name == "") {
            app.alert('请输入姓名~');
            return
        }
        if (idCard == ""){
            app.alert('上传身份证~');
            return
        }
        if (certification == ""){
            app.alert('请上传职业资格证~');
            return
        }
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny'){
            console.log('拒绝')  
            app.alert('拒绝授权将无法注册~')
        }else{
            app.net.$Api.analysisUserPhone(params).then((res) => {
                var data = JSON.parse(res.data.data)
                let phone = data.purePhoneNumber;
                console.log(res)
                that.saveUserInfo(phone)
            })
        }
        
    },
    saveUserInfo(phone){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            userid: that.data.userid,
            phone: phone,
            identity: that.data.idCard,
            aptitude: that.data.certification,
            name:that.data.name
        }
        app.net.$Api.saveUserInfo(params).then((res) => {
            console.log(res)
            if(res.data.code == 200){
                wx.showModal({
                    title: '温馨提示',
                    content: '提交成功',
                    showCancel: false,
                    success:function(){
                        wx.reLaunch({
                            url: '/pages/index/index',
                        })
                    }
                    
                })
            } else if (res.data.code == 400){
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
                console.log(data)
                // if (that.data.imgs[index] != undefined) {//存在下一张
                //     that.data.picPaths.push(data['url'])
                //     that.setData({
                //         picPaths: that.data.picPaths
                //     })
                //     console.log(that.data.picPaths)
                // }
                // idCard: '', //身份证
                //     certification: '',//资格证
                if (type == 1){
                    that.setData({
                        idCard: data.url
                    })
                } else if (type == 2){
                    that.setData({
                        certification: data.url
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
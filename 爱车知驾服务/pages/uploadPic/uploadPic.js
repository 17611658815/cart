const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shootPic:'',
        flage:true,
        cartData:{},
        member_id:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userinfo') || '';
        this.setData({
            member_id: userinfo.id
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
    chooseWxImage: function (type) {
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (photo) {
                console.log(photo)
                that.setData({
                    shootPic: photo.tempFilePaths[0]
                })
                wx.uploadFile({
                    url: 'https://api.dodo.wiki/appInterface/consumer/uploadVinImage',
                    filePath: photo.tempFilePaths[0],
                    name: 'file',
                    header: {
                        'content-type': 'multipart/form-data'
                    },
                    formData: {
                        appid: app.globalData.appid,
                        member_id: that.data.member_id,
                    },
                    success: function (res) {
                        wx.hideLoading()

                        let data = JSON.parse(res.data)
                        if (data.code == 200) {
                            that.setData({
                                cartData: data,
                                flage: false
                            })
                        }
                        console.log(res)
                        if (data.code == 300) {
                            wx.showModal({
                                title: '温馨提示',
                                content: data.message,
                                showCancel: false,
                                success() {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }
                            })
                        }
                    }
                })
                // wx.getImageInfo({
                //     src: photo.tempFilePaths[0],
                //     success: function (res) {
                //         console.log(res)
                //         var ctx = wx.createCanvasContext('photo_canvas');
                //         // 缩放比例
                //         var ratio = parseInt(photo.tempFiles[0].size /1024 /1024)/2;
                //         console.log(ratio)
                //         var canvasWidth = res.width
                //         var canvasHeight = res.height;
                //         canvasWidth = Math.trunc(res.width / ratio)
                //         canvasHeight = Math.trunc(res.height / ratio)
                //         that.setData({
                //             canvasWidth: canvasWidth,
                //             canvasHeight: canvasHeight,
                //             shootPic: res.path
                //         })//设置canvas尺寸
                //         console.log(that.data.shootPic)
                //         ctx.drawImage(photo.tempFilePaths[0], 0, 0, canvasWidth, canvasHeight)
                //         ctx.draw()
                //     },
                //     fail: function (error) {
                //         console.log(error)
                //     }
                // })

            },
            error: function (res) {
                console.log(res);
            }
        })
    },
    upImgs: function () { //保存图片
       let that = this;
        // app.loading('上传中..')
        // wx.uploadFile({
        //     url: 'https://api.dodo.wiki/appInterface/consumer/uploadVinImage',
        //     filePath: that.data.shootPic,
        //     name: 'file',
        //     header: {
        //         'content-type': 'multipart/form-data'
        //     },
        //     formData: {
        //         appid: app.globalData.appid,
        //         member_id: that.data.member_id,
        //     },
        //     success: function (res) {
        //         wx.hideLoading()
        //         let data = JSON.parse(res.data)
        //         if (data.code == 200) {
        //             that.setData({
        //                 cartData: data,
        //                 flage: false
        //             })
        //         }
        //         console.log(res)
        //         if (data.code == 300) {
        //             wx.showModal({
        //                 title: '温馨提示',
        //                 content: data.message,
        //                 showCancel: false,
        //                 success() {
        //                     wx.navigateBack({
        //                         delta: 1
        //                     })
        //                 }
        //             })
        //         }
        //     }
        // })
      
        app.loading('上传中..')
        wx.uploadFile({
            url: 'https://api.dodo.wiki/appInterface/consumer/uploadVinImage',
            filePath: that.data.shootPic,
            name: 'file',
            header: {
                'content-type': 'multipart/form-data'
            },
            formData: {
                appid: app.globalData.appid,
                member_id: that.data.member_id,
            },
            success: function (res) {
                wx.hideLoading()
                
                let data = JSON.parse(res.data)
                if (data.code == 200){
                    that.setData({
                        cartData: data,
                        flage:false
                    })
                }
                console.log(res)
                if (data.code == 300){
                    wx.showModal({
                        title: '温馨提示',
                        content: data.message,
                        showCancel: false,
                        success(){
                            wx.navigateBack({
                                delta:1
                            })
                        }
                    })
                }
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
    // 重新上传
    anewup() {
        this.setData({
            shootPic: '',
            flage: true,
            cartData: {}
        })
    }, 
    // 确认信息
    confirm(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            info: that.data.cartData.info.info,
        }
        app.loading('加载中')
        app.net.$Api.saveCar(params).then((res) => {
            if (res.data.code == 200) {
                wx.showToast({
                    title: res.data.message,
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            wx.navigateTo({
                                url: '/pages/mayCarList/mayCarList',
                            })
                        }, 2000)
                    }
                })
            } else {
                wx.showToast({
                    title: res.data.message,
                    icon: 'success',
                    duration: 2000,
                })
            }
            wx.hideLoading()
        })
    } , 
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
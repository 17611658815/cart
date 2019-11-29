var prevV = wx.createVideoContext('video');
var app = getApp();
Page({
    data: {
        userid: 0,
        imgs: [],//本地图片地址数组
        oldVideoPath: [],//本地图片地址数组
        newVideoPath: [],//网络数组
        videoPath:'',//当前视频路径
        message: '',
        submitTime: 1,
        userid: '',
        tempFilePaths: {},//本地图片地址对象
        canChoose: true,//是否可选图片
        imgString: [],//图片拼接后的字符串
        videoPlay: false,
        autoHeight:0,
        isplay:false,
        order_id:0,

    },
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    autoHeight: ((res.windowWidth) / 16) * 9
                });
            }
        });
        var userinfo = wx.getStorageSync('userinfo') || null
        that.setData({
            userid: userinfo.id,
            order_id: options.id
        });
    },
    savemessage: function (e) {
        var that = this;
        that.setData({
            message: e.detail.value
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
    
    noChoose: function () {
        var that = this;
        that.alert("最多只能上传9张哦~")
    },
    uploading(){
        this.upImgs(this.data.imgs[0],0)
    },
    // 选取图片
    chooseWxImage: function (type) {
        var that = this;
        var imgsPaths = that.data.imgs;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                console.log(res);
                var imgsLimit = [];
                var tempFilePaths = that.data.tempFilePaths;
                var imgs = that.data.imgs;
                console.log(res.tempFilePaths);
                for (var i = 0; i < res.tempFilePaths.length; i++) {
                    tempFilePaths[res.tempFilePaths[i]] = '';
                    console.log(res.tempFilePaths[i])
                    imgs.push(res.tempFilePaths[i]);
                };
                if (imgs.length > 9) {
                    for (var i = 0; i < 9; i++) {
                        imgsLimit.push(imgs[i]);
                    }
                    that.setData({
                        imgs: imgsLimit,
                        tempFilePaths: tempFilePaths,
                    });
                } else {
                    that.setData({
                        imgs: imgs,
                        tempFilePaths: tempFilePaths,
                    });
                }
                if (imgsPaths.length >= 9) {
                    that.setData({
                        canChoose: false,
                    });
                } else {
                    that.setData({
                        canChoose: true,
                    });
                };
                that.upImgs(that.data.imgs[0], 0)
            },
        })
    },
    // 选取视频
    chooseWxVideo: function (type) {
        let that = this;
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success(res) {
                console.log(res)
                that.upVideo(res.tempFilePath)
                that.data.oldVideoPath.push(res.tempFilePath)
                that.setData({
                    oldVideoPath: that.data.oldVideoPath
                })
            }
        })
    },
    //点击播放
    videoPlay(e) {
        var that = this;
        console.log(e)
        let src = e.currentTarget.dataset.src;
        prevV.play()
        that.setData({
            videoPlay: true,
            isplay: true,
            videoPath: src
        })
    },
    // 关闭视频
    closeVideo() {
        console.log('11111')
        prevV.stop()
        this.setData({
            videoPlay: false,
            isplay: false
        })
    },
    // 预览
    previewImage(e){
        let that = this;
        let src = e.currentTarget.dataset.src;
        wx.previewImage({
            current: src,
            urls: that.data.imgs,
            success: function (res) {
                console.log(res)
            }
        })
    },
    // 提交数据
    addOrderContent(){
        let that = this;
        if (that.data.newVideoPath.length == 0 && that.data.imgString.length == 0) {
            app.alert('请上传进度视频或照片')
            return
        }
        let params = {
            appid: app.globalData.appid,
            order_id: that.data.order_id,
            video: that.data.newVideoPath.join(','),
            img: that.data.imgString.join(','),
            msg: that.data.message
        }
        app.loading('加载中')
        app.net.$Api.addOrderContent(params).then((res) => {
            console.log(res)
            that.setData({
                otherObj: res.data.data
            })
            wx.hideLoading()
        })
    },
    upImgs: function (imgurl, index) {
        var that = this;
        that.loading();
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
                console.log(data);
                if (data['code'] == 200) {
                    that.data.imgString.push(data['url']);
                    index++;
                    if (that.data.imgs[index] != undefined) {//存在下一张
                        that.upImgs(that.data.imgs[index], index);
                    } 
                    that.setData({
                        imgString: that.data.imgString
                    })
                    wx.hideToast();
                    console.log(that.data.tempFilePaths)
                } else {
                    console.log(data['url']);
                }
               
            },
            fail: function (res) {
            },
        })
    },
    upVideo: function (videourl) {
        var that = this;
        that.loading();
        wx.uploadFile({
            url: 'https://api.dodo.wiki/appInterface/artificer/upVideoFile',
            filePath: videourl,
            name: 'file',
            header: {
                'content-type': 'multipart/form-data'
            }, // 设置请求的 header
            formData: {
                appid: app.globalData.appid
            }, // HTTP 请求中其他额外的 form data
            success: function (res) {
                console.log(res)
                var data = JSON.parse(res.data);
                if (data['code'] == 200) {
                    that.data.newVideoPath.push(data['url'])
                    that.setData({
                        newVideoPath: that.data.newVideoPath
                    })
                } else {
                    console.log(data['url']);
                }
                wx.hideToast();
            },
            fail: function (res) {
            },
        })
    },
    /* upMessage: function () {
        var that = this;
        console.log(123);
        console.log(that.data.tempFilePaths);
        that.loading();
        var imgStrings = that.data.tempFilePaths;
        var imgString = that.data.imgString;
        for (var i in imgStrings) {
            imgString += imgStrings[i] + ','
        }
        that.setData({
            imgString: imgString,
        })
        console.log(that.data.imgString);
        wx.request({
            url: app.globalData.ip + '?type=message&uid=' + that.data.userid + '&message=' + that.data.message + '&images=' + that.data.imgString,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                if (res.data.res == 'false') {
                    that.alert(res.data.msg);
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,
                        success: function () {
                            wx.navigateBack({
                                delta: 1,
                            })
                        }
                    })
                }
            },
            complete: function () {// complete
                wx.hideToast();
            }
        });
    }, */
    alert(content) {
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: false
        })
        return this
    },
    loading: function () {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })
    },
    onShareAppMessage: function () {
        var that = this;
        return app.share(
            '/pages/index/index?shareChannel=' + that.data.userid,
        );
    },
})
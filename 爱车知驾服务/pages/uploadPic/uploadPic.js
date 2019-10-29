// pages/uploadPic/uploadPic.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shootPic:'',
        flage:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
            success: function (res) {
                // 1.5m = 1572864b
                wx.getFileSystemManager().readFile({
                    filePath: res.tempFilePaths[0],
                    encoding: "base64",
                    success: function (data) {
                        that.setData({
                            shootPic: 'data:image/png;base64,'+data.data,
                        })
                        console.log(data)
                    }
                })
            }
        })
        
    },
    // upImgs: function (imgurl, index, type) {
    //     var that = this;
    //     wx.showLoading({
    //         title: '上传中',
    //         mask: true,
    //     })
    //     wx.uploadFile({
    //         url: 'https://mfkapi.39yst.com/appInterface/common/upImgFile',
    //         filePath: imgurl,
    //         name: 'file',
    //         header: {
    //             'content-type': 'multipart/form-data'
    //         },
    //         formData: {
    //             appid: app.globalData.appid,
    //         },
    //         success: function (res) {
    //             console.log(data);
               
    //         }
    //     })
    // },

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
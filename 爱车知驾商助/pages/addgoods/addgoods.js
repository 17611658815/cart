// page/order/pages/newAddress/newAddress.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id: 0,
        index: 0,
        typeid: '', //分类id
        obj_id: '', //商品id
        typeName: '',
        goodsName: '',
        goodsPrice: '',
        goodsList: [],
        newGoodsList: [],
        list: [],
        array: [],
        array2: ['1', '2'], //品牌
        index2: 0, //品牌索引
        typeName2: '',
        mobile: '', //收货人手机号
        province: '', //收货人所在省份
        city: '', //收货人城市
        address: '', //收货人详细地址
        typeList: [],

        oldimg: "",
        newimg: "",
        num: '个', //单位
        oldPrice: '', //原价
        newPrice: '', //现价
        goodsNum: '', //商品数量
        goodstype: '', //商品型号
        brandsArr: ['请选择分类'],
        loading: false,
        goods_id: 0,
        multiArray: [
            [],
            [],
            []
        ],
        multiIndex: [0, 0, 0],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad (options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        that.setData({
            member_id: userInfo.id
        })
        let getGoodsType = await that.getGoodsType()
        if (options.id) {
            that.setData({
                obj_id: options.id
            })
            that.getShopGoods()
        }

    },
    // 选取图片
    chooseImageTap: function() {
        var that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#00000",
            success: function(res) {
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
    chooseWxImage: function(type, typeNum) {
        var that = this;
        var tempFilePaths = that.data.tempFilePaths;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function(res) {
                console.log(res);
                var oldimg = that.data.oldimg;
                that.upImgs(res.tempFilePaths[0], 0)
                that.setData({
                    oldimg: res.tempFilePaths[0]
                });
            }
        })
    },
    upImgs: function(imgurl, index) {
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
            success: function(res) {
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
            fail: function(res) {},
        })
    },
    //商品名称
    goodsNameInpt(e) {
        this.setData({
            goodsName: e.detail.value
        })
    },
    // 联系人姓名
    goodsPriceInpt(e) {
        this.setData({
            goodsPrice: e.detail.value
        })
    },
    // 商品原价
    oldPriceInpt(e) {
        this.setData({
            oldPrice: e.detail.value
        })
    },
    // 商品现价
    newPriceInpt(e) {
        this.setData({
            newPrice: e.detail.value
        })
    },
    // 商品数量
    goodsNumInpt(e) {
        this.setData({
            goodsNum: e.detail.value
        })
    },
    // 商品数量
    goodstypeInpt(e) {
        this.setData({
            goodstype: e.detail.value
        })
    },
    // 获取分类
    getGoodsType() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
        };
        return new Promise((resolve, reject) => {
            app.net.$Api.getGoodsType(params).then((res) => {
                for (var i = 0; i < res.data.data.length; i++) {
                    console.log(res.data.data)
                    that.data.multiArray[0].push(res.data.data[i].name)
                }
                for (var i = 0; i < res.data.data[0].son.length; i++) {
                    console.log(res.data.data)
                    that.data.multiArray[1].push(res.data.data[0].son[i].name)
                }
                for (var i = 0; i < res.data.data[0].son[0].son.length; i++) {
                    that.data.multiArray[2].push(res.data.data[0].son[0].son[i].name)
                }
                that.setData({
                    multiArray: that.data.multiArray,
                    list: res.data.data,
                })
                console.log(that.data.multiArray)
                resolve(res.data.data)
            })
        })
    },
    bindMultiPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function(e) {
        var that = this;
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var row = e.detail.column,
            index = e.detail.value;
        that.data.multiIndex[row] = index;
        that.data.brandsArr = []
        if (row == 0) {
            that.data.multiArray[1] = [];
            for (var i = 0; i < that.data.list[index].son.length; i++) {
                that.data.multiArray[1].push(that.data.list[index].son[i].name)
            }
            that.data.multiArray[2] = [];
            for (var i = 0; i < that.data.list[index].son[0].son.length; i++) {
                that.data.multiArray[2].push(that.data.list[index].son[0].son[i].name)
            }
        } else if (row == 1) {
            that.data.multiArray[2] = [];
            for (var i = 0; i < that.data.list[that.data.multiIndex[0]].son[index].son.length; i++) {
                that.data.multiArray[2].push(that.data.list[that.data.multiIndex[0]].son[index].son[i].name)
            }
        }
        this.setData({
            typeName2:"",
            multiArray: that.data.multiArray,
            multiIndex: that.data.multiIndex,
            brandsArr:that.data.brandsArr
        });
    },

    getShopGoods() {
        let that = this;
        console.log('getShopGoods')
        let params = {
            appid: app.globalData.appid,
            member_id: that.data.member_id,
            id: that.data.obj_id
        };
        console.log(that.data.obj_id)
        app.net.$Api.getShopGoods(params).then((res) => {
            let name1 = '';
            let name2 = '';
            let isbreak = false;
            for (var i = 0; i < that.data.list.length; i++) {
                for (var k = 0; k < that.data.list[i].son.length; k++) {
                    for (var j = 0; j < that.data.list[i].son[k].son.length; j++) {
                        console.log(that.data.list[i].son[k].son[j].name)
                        if (res.data.data.typeid === that.data.list[i].son[k].son[j].id){
                            console.log(that.data.list[i].son[k].son[j].name)
                            name1 = that.data.list[i].son[k].son[j].name;
                            that.data.brandsArr = [];
                            for (var m = 0; m < that.data.list[i].son[k].son[j].brands.length;m++){
                                that.data.brandsArr.push(that.data.list[i].son[k].son[j].brands[m].name);
                                if (res.data.data.brand_id === that.data.list[i].son[k].son[j].brands[m].id) {
                                    name2 = that.data.list[i].son[k].son[j].brands[m].name;
                                }
                            }
                            isbreak = true;
                        }
                        if (isbreak){break;}
                    }
                    if (isbreak) { break; }
                }
                if (isbreak) { break; }
            }
            console.log(res)
            that.setData({
                typeid: res.data.data.typeid,
                goodsName: res.data.data.name,
                newPrice: res.data.data.price,
                oldPrice: res.data.data.original_price,
                newimg: res.data.data.thumb,
                oldimg: res.data.data.thumb,
                goodstype: res.data.data.model,
                goodsNum: res.data.data.num,
                typeid2: res.data.data.brand_id,
                typeName: name1,
                typeName2: name2,
                goods_id: res.data.data.id,
                brandsArr: that.data.brandsArr
            })

        })
    },
    getTypeGoods(id) {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            typeid: id
        };
        app.net.$Api.getTypeGoods(params).then((res) => {
            that.setData({
                goodsList: res.data.data,
                newGoodsList: res.data.data
            })
        })
    },
    // picker-确定事件
    bindMultiPickerChange: function(e) {
        console.log(e)
        let that = this;
        let index = e.detail.value;
        let list = that.data.list;
        let multiIndex = that.data.multiIndex;
        console.log(list)
        this.data.brandsArr = []
        list[multiIndex[0]].son[multiIndex[1]].son[multiIndex[2]].brands.forEach(item => {
            this.data.brandsArr.push(item.name)
        })
        this.setData({
            typeName: list[multiIndex[0]].son[multiIndex[1]].son[multiIndex[2]].name,
            typeid: list[multiIndex[0]].son[multiIndex[1]].son[multiIndex[2]].id,
            brandsArr: this.data.brandsArr,
            num: list[multiIndex[0]].son[multiIndex[1]].son[multiIndex[2]].unit == "" ? "个" : list[multiIndex[0]].son[multiIndex[1]].son[multiIndex[2]].unit
        })
        console.log(this.data.brandsArr)
        this.getTypeGoods(this.data.typeid)
    },
    // 选择品牌
    bindMultiPickerChange2: function(e) {
        console.log(e)
        let that = this;
        let index = e.detail.value;
        let list = this.data.brandsArr;
        let multiIndex = that.data.multiIndex;
        this.setData({
            typeName2: list[index],
            typeid2: this.data.list[multiIndex[0]].son[multiIndex[1]].son[multiIndex[2]].brands[index].id
        })
        console.log(this.data.list[multiIndex[0]].son[multiIndex[1]].son[multiIndex[2]].brands[index].id)
    },
    // goodsNameInpt(e){
    //     console.log(e)
    //     let value = e.detail.value;
    //     let newGoodsList = []
    //     this.data.goodsList.forEach((item)=>{
    //         console.log(item)
    //         if (item.name.indexOf(value) != -1){
    //             newGoodsList.push(item)
    //         }
    //     })
    //     this.setData({
    //         newGoodsList: newGoodsList
    //     })
    //     console.log(this.data.newGoodsList)

    // },
    checkdItem(e) {
        let item = e.currentTarget.dataset.item;
        this.setData({
            newGoodsList: [item],
            obj_id: item.id,
            goodsName: item.name,
        })
    },
    addGoodsItem() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            typeid: that.data.typeid,
            id: that.data.goods_id,
            member_id: that.data.member_id,
            name: that.data.goodsName,
            price: that.data.newPrice,
            original_price: that.data.oldPrice,
            thumb: that.data.newimg,
            model: that.data.goodstype,
            num: that.data.goodsNum,
            brand_id: that.data.typeid2
        };
        if (that.data.typeName == "") {
            app.alert("请选择分类~！")
            return
        }
        if (that.data.typeName2 == "") {
            app.alert("请选择品牌~！")
            return
        }
        if (that.data.goodsName == "") {
            app.alert("请输入商品名称~！")
            return
        }
        if (that.data.newimg == "") {
            app.alert("请上传商品头像~！")
            return
        }
        if (that.data.newPrice == "") {
            app.alert("请输入商品现价~！")
            return
        }
        if (that.data.original_price == "") {
            app.alert("请输入商品原价~！")
            return
        }
        if (that.data.goodsNum == "") {
            app.alert("请输入商品数量~！")
            return
        }
        app.loading('提交中')
        that.setData({
            loading: true
        })
        app.net.$Api.addShopGoods(params).then((res) => {
            if (res.data.code == 200) {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,
                    success: function() {
                        wx.hideLoading()
                        setTimeout(function() {
                            // that.setData({
                            //     typeName:'',
                            //     goodsName:'',
                            //     goodsPrice:'',
                            //     goodsList: [],
                            //     newGoodsList: [],
                            //     newPrice:"",
                            //     oldPrice:"",
                            //    newimg:"",
                            //     goodstype:'',
                            //     goodsNum: '',
                            // })
                            wx.navigateBack({
                                detal: 1
                            }, () => {
                                that.setData({
                                    loading: false
                                })
                            })
                        }, 2000)
                    }
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
// pages/detail/detail.js
let db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieid:'',
    info:{},
    comment:"",
    rate:0,
    images:[],
    fileIds:[],
  },
  changeComment:function(event){
    this.setData({
      comment:event.detail
    })
  },
  changeRate:function(event){
    this.setData({
      rate:event.detail
    })
  },
  // 上传图片
  uploadImages:function(){
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          images:this.data.images.concat(tempFilePaths) 
        })
      }
    })
  },
  // 提交评论
  doComment(){
    wx.showLoading({
      title: '评价中',
    })
    let promiseArr =[]
    this.data.images.map((item)=>{
      let suffix = /\.\w+$/.exec(item)[0];
      promiseArr.push( new Promise((resolve,reject)=>{
        wx.cloud.uploadFile({
          cloudPath:new Date().getTime()+suffix,
          filePath:item,
          success:res=>{
            this.setData({
              fileIds:this.data.fileIds.concat(res.fileID)
            })
            resolve()
          },
          fail:err=>{
            console.log(err);
            reject()
          }
        })
      }))
    })
    Promise.all(promiseArr).then(res=>{
        db.collection('comment').add({
          data:{
            comment:this.data.comment,
            rate:this.data.rate,
            fileIds:this.data.fileIds,
            movieid:this.data.movieid
          }
        }).then(res=>{
          wx.hideLoading()
          wx.showToast({
            title: '评价成功',
          })
        }).catch(err=>{
          wx.hideLoading()
          wx.showToast({
            title: '评价失败',
          })
        })
    }).catch(err=>{
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      movieid:options.movieid
    })
    wx.showLoading()
    wx.cloud.callFunction({
      name:"comment",
      data:{
        movieid:options.movieid
      }
    }).then(res=>{
      wx.hideLoading()
      console.log(res);
      this.setData({
        info:res.result
      })
    }).catch(err=>{
      wx.hideLoading()
      console.log(err);
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
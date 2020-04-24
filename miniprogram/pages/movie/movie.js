// miniprogram/pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[]
  },
  // 获取电影详情
  getMovie: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'movieapi',
      data: {
        start: this.data.movieList.length,
        count: 10
      }
    }).then(res => {
      console.log(this.data.movieList.concat(res.result.subjects));
      this.setData({
        movieList: this.data.movieList.concat(res.result.subjects)
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  // 进入详情页面
  goDetail:function(event){
    let movieid = event.target.dataset.movieid
    wx.navigateTo({
      url: `../detail/detail?movieid=${movieid}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovie()
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
    console.log(1);
    this.getMovie()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
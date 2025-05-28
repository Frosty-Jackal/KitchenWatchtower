// pages/licmanage/lic_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   lic_id:"",
    lic_name:"",
    limit_time:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  applySubmit:function(){
    var lic_name =  this.data.lic_name;
    var limit_time =  this.data.limit_time;
    var lic_id =  this.data.lic_id;
    wx.request({
      url:'http://localhost:8080/lic/add_record',
      method: 'POST', // 明确指定POST方法
      data: JSON.stringify({ // 转换为JSON字符串
        limitTime: limit_time,
        licId: lic_id,
        licName: lic_name
      }),
      header: {
        "content-type": "application/json", // 修改为JSON格式
        "x-requested-with": "XMLHttpRequest"
      },
      success:function(res){
      //that.handleAddTodoRecordResult(res);
      wx.navigateBack({
       
      });
      },
      fail:function(res){
      }
    })
  },
  inputTitle:function(e){
    this.setData({
      lic_name:e.detail.value,
    });
  },
  inputId:function(e){
    this.setData({
      lic_id:e.detail.value,
    });
  },
  inputTime:function(e){
    this.setData({
      limit_time:e.detail.value,
    });
  }
})
// pages/licmanage/lic_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   lic_id:"",
    lic_name:"",
    limit_time:"",
    faceImgUrl: '',
  faceImgWidth: 0,
  faceImgHeight: 0,
  faceImgOriginWidth: 0,
  faceImgOriginHeight: 0,
  ocrResult: null
  },
  chooseMedia() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: res => {
        const imgUrl = res.tempFiles[0].tempFilePath
        wx.getImageInfo({
          src: imgUrl,
          success: res => {
            const fixWidth = 600
            const { width, height } = res
            this.setData({
              faceImgUrl: imgUrl,
              faceImgWidth: fixWidth,
              faceImgHeight: (fixWidth / width) * height,
              faceImgOriginWidth: width,
              faceImgOriginHeight: height
            }, () => {
              this.runOCR() // 图片加载完成后立即执行OCR
            })
          }
        })
      }
    })
  },
   
  // 清除图片
  clearImage() {
    this.setData({
      faceImgUrl: '',
      ocrResult: null
    })
  },
   
  // OCR核心逻辑
  async runOCR() {
    if (!this.data.faceImgUrl) return
   
    const canvas = wx.createOffscreenCanvas({
      type: '2d',
      width: this.data.faceImgOriginWidth,
      height: this.data.faceImgOriginHeight,
    })
    
    const context = canvas.getContext('2d')
    const img = canvas.createImage()
    
    await new Promise(resolve => {
      img.onload = resolve
      img.src = this.data.faceImgUrl
    })
   
    context.drawImage(img, 0, 0, this.data.faceImgOriginWidth, this.data.faceImgOriginHeight)
    const imgData = context.getImageData(0, 0, this.data.faceImgOriginWidth, this.data.faceImgOriginHeight)
   
    // 创建OCR会话
    const session = wx.createVKSession({
      track: {
        OCR: { mode: 2 }
      },
      version: 'v1'
    })
   
    session.start(err => {
      if (err) {
        wx.showToast({ title: 'OCR初始化失败', icon: 'none' })
        return
      }
   
      session.runOCR({
        frameBuffer: imgData.data.buffer,
        width: this.data.faceImgOriginWidth,
        height: this.data.faceImgOriginHeight
      })
    })
   
    // 处理识别结果
    session.on('updateAnchors', anchors => {
      if (anchors.length > 0) {
        const result = this.parseOCRResult(anchors)
        this.showOCRResult(result)
      }
    })
  },
   
  // 解析OCR结果（基础版本，可根据实际需求优化）
  parseOCRResult(anchors) {
    let mainText = ''
    anchors.forEach(anchor => {
      if (anchor.text) {
        mainText += anchor.text + ' '
      }
    })
    return mainText.trim()
  },
   
  // 显示识别结果
  showOCRResult(result) {
    this.setData({
      ocrResult: result
    })
    wx.showToast({ title: '识别成功', icon: 'success' })
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
Page({
  data: {
    licId: '',
    licName: '',
    limitTime: ''
  },

  onLoad(options) {
    const limitTime = options.limitTime 
      ? this.formatDate(options.limitTime) 
      : this.formatDate(new Date());
    this.setData({
      licId: options.licId|| '自动生成',
      licName: options.licName|| '',
      limitTime: limitTime
    });
  },
  formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },onLicNameInput(e) {
    this.setData({ licName: e.detail.value });
  },
 
  // 日期选择处理
  onDateChange(e) {
    this.setData({ limitTime: e.detail.value });
  },
 
  applySubmit: function() {
    if (!this.data.licName.trim()) {
      wx.showToast({ title: '名称不能为空', icon: 'none' });
      return;
    }
   
    if (!this.data.limitTime) {
      wx.showToast({ title: '请选择有效期', icon: 'none' });
      return;
    }
    wx.request({
      url: 'http://localhost:8080/lic/update_record',
      method: 'PUT',
      data: {
        licId: this.data.licId,
        licName: this.data.licName,
        limitTime: this.data.limitTime
      },
      header: {
        "content-type": "application/json"
      },
      success: (res) => {
        if (res.data.result_code === 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1500,
            complete: () => {
              wx.navigateBack();
            }
          });
        } else {
          wx.showToast({ title: '修改失败', icon: 'error' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络异常', icon: 'error' });
      }
    });
  }
});
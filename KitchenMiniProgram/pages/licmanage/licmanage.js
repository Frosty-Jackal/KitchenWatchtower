Page({
  data: {

  },
  onLoad(options) {
    this.getTodoRecord();
  },
  getTodoRecord:function(){
    let that=this;
      wx.request({
        url:'http://localhost:8080/lic/get_record',
        data:{},
        header:{"content-type":"application/x-www-form-urlencoded","x-requested-with":"XMLHttpRequest",
        },
        success:function(res){
          that.handleGetTodoRecordResult(res);
        },
        fail:function(res){

        }
      })
  },handleGetTodoRecordResult:function(res){
    console.log(JSON.stringify(res));
    this.setData({
      todoList:res.data.aaData,
    });
  },
  onAddRecord:function(e){
    wx.navigateTo({
      url:"lic_add",
    })
  },
  onDeleteRecord: function(e) {
    const { itemid } = e.currentTarget.dataset;
    wx.showModal({
      title: '删除确认',
      content: '确定要删除该证书吗？',
      confirmColor: '#FF4747', // 红色确认按钮
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:8080/lic/delete_record', // 明确删除端点
            method: 'POST', // 明确使用POST方法
            data: { lic_id: itemid },
            header: {
              'content-type': 'application/json', // 正确的内容类型
              'x-requested-with': 'XMLHttpRequest'
            },
            success: (res) => {
              if (res.data.result_code === 0) {
                wx.showToast({ title: '删除成功', icon: 'success' });
                this.refreshData(); // 删除成功后刷新数据
              } else {
                wx.showToast({ title: '删除失败', icon: 'error' });
              }
            },
            fail: () => {
              wx.showToast({ title: '网络异常', icon: 'error' });
            }
          });
        }
      }
    });
  },
  
  // 新增数据刷新方法
  refreshData() {
    // 这里调用你的数据获取方法，例如：
    this.getTodoRecord();
  },
  onModifyRecord: function(e) {
    const { licId, licName, limitTime } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/licmanage/lic_modify?licId=${licId}&licName=${licName}&limitTime=${limitTime}`
    });
  }
})
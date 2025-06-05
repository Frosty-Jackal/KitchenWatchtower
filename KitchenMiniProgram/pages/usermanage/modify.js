Page({
  data: {
    industryarr:[],
    industryindex:0,
    statusarr:[],
    statusindex:0,
    jobarr:[],
    jobindex:0,
    hasfinancing: false,  //是否已融资
    isorg: false,  //是否是机构
    id:0,
    title:"",
    object_id:0,
    content:"",
  },
  onLoad: function (options) {
    console.log(options.record);
    var record = JSON.parse(options.record);
    this.setData({
      id:record.id,
      title:record.title,
      object_id:record.object_id,
    })
  },
  bindPickerChange: function(e){ //下拉选择
    const eindex = e.detail.value;
    const name = e.currentTarget.dataset.pickername;
    // this.setData(Object.assign({},this.data,{name:eindex}))
    switch(name) {
      case 'industry':
        this.setData({
          industryindex: eindex
        })
        break;
      case 'status':
        this.setData({
          statusindex: eindex
        })
        break;
      case 'job':
        this.setData({
          jobindex: eindex
        })
        break;
      default:
        return
    }
  },

  applySubmit:function(){
    let that=this;
    wx.showModal({
      cancelColor:'cancelColor',
      title: '提示',
      content: '你确定要修改该记录吗？',
      success:function(res){
        if (res.confirm) {
          var id = that.data.id;
          var title = that.data.title;
          var object_id = that.data.object_id;
          console.log(id);
          console.log(object_id);
          console.log(title);
          wx.request({
            url: 'http://localhost:8080/User/update_record',
            method: 'PUT',
            data: JSON.stringify({id:id,userName:object_id,userPhone:title}),
            header: { "content-type": "application/json" },
            success:function(res){
               wx.navigateBack({

               });
            },
            fail:function (res) {              
            },
          })
       }
     }
  })
},
inputname:function(e) {
  this.setData({
    object_id: e.detail.value
  });
},
inputphone:function(e) {
  this.setData({
    title:e.detail.value,
  });
}

})

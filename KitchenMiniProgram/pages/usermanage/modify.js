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
            url: 'http://localhost:8080/MyWeb_war_exploded/project_todo_servlet_action?action=modify_todo_record',
            data:{"id":id,"object_id":object_id,"title":title,},
            header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest", },
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

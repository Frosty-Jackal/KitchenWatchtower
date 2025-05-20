Page({
  data: {
     title:"",
     id:null,
     object_id:null,
  },
  onLoad: function (options) {
    // console.log(options.record);
    // var record = JSON.parse(options.record);
    // this.setData({
    //   id:record.id,
    //   title:record.title,
    //   object_id:record.object_id,
    // })
  },
  applySubmit:function(){
    let that=this;
    wx.showModal({
      cancelColor:'cancelColor',
      title: '提示',
      content: '你确定要添加该用户吗？',
      success:function(res){
        if (res.confirm) {
           var title = that.data.title;
           var object_id = that.data.object_id;
           var content = that.data.content;
           console.log(object_id);
           console.log(title);
           console.log(content);
          wx.request({
            url: 'http://localhost:8080/MyWeb_war_exploded/project_todo_servlet_action?action=add_todo_record',
            data:{"object_id":object_id,"title":title,"content":content},
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
},
inputnumber:function(e) {
  this.setData({
    content:e.detail.value,
  });
},

})

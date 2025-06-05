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
            url: 'http://localhost:8080/User/add_record',
            method: 'POST', // 明确指定POST方法
      data: JSON.stringify({
            userName: object_id,
            userPhone: title,
            userIdNumber: content 
          }),
          header: {
            "content-type": "application/json", // 修改为JSON格式
            "x-requested-with": "XMLHttpRequest"
          },
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
chooseImage:function() {
  let _this = this;
  wx.showActionSheet({
    itemList: ['从相册中选择', '拍照'],
    itemColor: "#f7982a",
    success: function(res) {
      if (!res.cancel) {
        if(res.tapIndex == 0){
          _this.chooseWxImage('album')
        }else if(res.tapIndex == 1){
          _this.chooseWxImage('camera')
        }
      }
    }
  })
},
chooseWxImage:function(type){
  let _this = this;
  wx.chooseImage({
    sizeType: ['original', 'compressed'],
    sourceType: [type],
    success: function (res) {
      _this.setData({
        uploadimgs: _this.data.uploadimgs.concat(res.tempFilePaths)
      })
    }
  })
},
editImage:function(){
  this.setData({
    editable: !this.data.editable
  })
},
deleteImg:function(e){
  console.log(e.currentTarget.dataset.index);
  const imgs = this.data.uploadimgs
  // Array.prototype.remove = function(i){
  //   const l = this.length;
  //   if(l==1){
  //     return []
  //   }else if(i>1){
  //     return [].concat(this.splice(0,i),this.splice(i+1,l-1))
  //   }
  // }
  this.setData({
    uploadimgs: imgs.remove(e.currentTarget.dataset.index)
  })
},

})

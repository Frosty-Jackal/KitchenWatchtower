Page({
  data: {
    title:"",
    id:null,
    object_id:null,
    food_name:"",
    food_type:"",
    food_quantity:0,
    food_keeptime:"",
    create_time:"",
    food_quality:"",
    food_keepcondition:"",
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
      content: '你确定已将该食材入库吗？',
      success:function(res){
        if (res.confirm) {
           var food_name = that.data.food_name;
           var food_type= that.data.food_type;
           var food_quantity=that.data.food_quantity;
           var food_keeptime=that.data.food_keeptime;
           var food_quality= that.data.food_quality;
           var food_keepcondition=that.data.food_keepcondition; 
           var supplier=that.data.supplier;
           var create_time= that.data.create_time;
          wx.request({
            url: 'http://localhost:8080/MyWeb_war_exploded/warehouse_manage_servlet_action?action=add_manage_record',
            data:{
            "food_name":food_name,
            "food_type": food_type,
            "food_quantity":food_quantity,
            "food_keeptime":food_keeptime,
            "food_quality":food_quality,
            "food_keepcondition":food_keepcondition,
            "supplier":supplier,},
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
inputfood_name:function(e) {
  this.setData({
    food_name:e.detail.value
  });
},
inputfood_type:function(e) {
  this.setData({
    food_type:e.detail.value,
  });
},
inputfood_keeptime:function(e) {
  this.setData({
    food_keeptime:e.detail.value
  });
},
inputfood_quantity:function(e) {
  this.setData({
    food_quantity:e.detail.value,
  });
},
inputfood_quality:function(e) {
  this.setData({
    food_quality:e.detail.value,
  });
},
inputfood_keepcondition:function(e) {
  this.setData({
    food_keepcondition:e.detail.value,
  });
},
inputfood_supplier:function(e) {
  this.setData({
    supplier:e.detail.value,
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

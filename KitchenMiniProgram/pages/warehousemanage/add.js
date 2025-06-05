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
  onShow: function() {
    // 每次页面显示时都刷新数据（推荐）
    this.getTodoRecord();
  },
  applySubmit:function(){
    var lic_name =  this.data.lic_name;
    var limit_time =  this.data.limit_time;
    var lic_id =  this.data.lic_id;
    console.log(lic_id);
    console.log(lic_name);
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
  applySubmit:function(){
    var foodName = this.data.food_name;
    var foodType= this.data.food_type;
    var foodQuantity=this.data.food_quantity;
    var limitTime=this.data.food_keeptime;
    var foodQuality= this.data.food_quality;
    var foodKeepcondition=this.data.food_keepcondition; 
    var foodSupplier=this.data.supplier;
    wx.showModal({
      cancelColor:'cancelColor',
      title: '提示',
      content: '你确定已将该食材入库吗？',
      success:function(res){
        if (res.confirm) {
           console.log(foodName);
           console.log(foodType);
          wx.request({
            url: 'http://localhost:8080/warehouse/add_record',
            method: 'POST', // 明确指定POST方法
      data: JSON.stringify({
            foodName: foodName,
            foodType: foodType,
            limitTime: limitTime,
            foodQuantity: foodQuantity,
            foodQuality: foodQuality,
            foodSupplier:
            foodSupplier,
            foodKeepCondition: foodKeepcondition,           
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

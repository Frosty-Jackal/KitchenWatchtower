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
    object_id:"",
    food_name:"",
    food_type:"",
    food_quantity:0,
    food_keeptime:"",
    create_time:"",
    food_quality:"",
    food_keepcondition:"",
    supplier:"",
    originalfood_quantity:0,
  },
  onLoad: function (options) {
    console.log(options.record);
    var record = JSON.parse(options.record);
    this.setData({
      id:record.id,
      food_name:record.food_name,
      food_type:record.food_type,
      originalfood_quantity:record.food_quantity,
      food_keeptime:record.food_keeptime,
      create_time:record.create_time,
      food_quality:record.food_quality,
      food_keepcondition:record.food_keepcondition,
      supplier:record.supplier,
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
    const currentQuantity = Number(that.data.food_quantity);
    const originalQuantity = Number(that.data.originalfood_quantity);
    console.log(that.data.food_quantity);
    console.log(that.data.originalfood_quantity);
    if (currentQuantity >= originalQuantity) {
      wx.showToast({
        title: '修改后的数量必须小于原始数量',
        icon: 'none'
      });
      return; // 阻止后续操作
    }
    wx.showModal({
      cancelColor:'cancelColor',
      title: '提示',
      content: '你确定要修改该记录吗？',
      success:function(res){
        if (res.confirm) {
          var id = that.data.id;
          var food_quantity=that.data.food_quantity;
          console.log(id);
          wx.request({
            url: 'http://localhost:8080/warehouse/update_record',
            method: 'PUT',
            data: JSON.stringify({
            id:id,
            foodQuantity:food_quantity
            }),
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
},
inputquantity:function(e) {
  this.setData({
    food_quantity: e.detail.value
  });
},

})

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
    food_name:"",
    food_type:"",
    food_quantity:0,
    food_keeptime:"",
    create_time:"",
    food_quality:"",
    food_keepcondition:"",
    supplier:"",
  },
  onLoad: function (options) {
    console.log(options.record);
    var record = JSON.parse(options.record);
    this.setData({
      id:record.id,
      food_name:record.food_name,
      food_type:record.food_type,
      food_quantity:record.food_quantity,
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

})

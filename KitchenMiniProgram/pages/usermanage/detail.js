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
    create_time:"",
  },
  onLoad: function (options) {
    console.log(options.record);
    var record = JSON.parse(options.record);
    this.setData({
      id:record.id,
      title:record.title,
      object_id:record.object_id,
      content:record.content,
      create_time:record.create_time,
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

Page({
  data: {
    showsearch:false,   //显示搜索按钮
    searchtext:'',  //搜索文字
    filterdata:{},  //筛选条件数据
    showfilter:false, //是否显示下拉筛选
    showfilterindex:null, //显示哪个筛选类目
    sortindex:0,  //一级分类索引
    sortid:null,  //一级分类id
    subsortindex:0, //二级分类索引
    subsortid:null, //二级分类id
    cityindex:0,  //一级城市索引
    cityid:null,  //一级城市id
    subcityindex:0,  //二级城市索引
    subcityid:null, //二级城市id
    servicelist:[], //服务集市列表
    scrolltop:null, //滚动位置
    page: 0,  //分页
    devicelist:[],
    allRecords: [], // 完整数据集（应在页面加载时初始化）
    filteredList: [], // 当前筛选结果
  },
  onLoad: function () { //加载数据渲染页面
    this.fetchServiceData();
    this.fetchFilterData();
    this.getTodoRecord();
  },
  onShow: function() {
    // 每次页面显示时都刷新数据（推荐）
    this.getTodoRecord();
  },
  fetchFilterData:function(){ //获取筛选条件
    this.setData({

      filterdata:{
        "sort": [
            {
                "id": 0,
                "title": "全部"
            },
            {
              "id": 1,
              "title": "人力资源",
              "subsort": [
                {
                    "id": 1,
                    "title": "全部"
                },
                {
                    "id": 11,
                    "title": "社会及商业保险"
                },
                {
                    "id": 12,
                    "title": "招聘、猎头"
                },
                {
                    "id": 13,
                    "title": "薪酬绩效"
                },
              ]
            },
            {
              "id": 2,
              "title": "财务法务",
              "subsort": [
                {
                    "id": 2,
                    "title": "全部"
                },
                {
                    "id": 21,
                    "title": "知识产权保护"
                },
                {
                    "id": 22,
                    "title": "工商注册"
                },
                {
                    "id": 23,
                    "title": "法律咨询"
                },
              ]
            },
            {
              "id": 3,
              "title": "行政办公",
              "subsort": [
                {
                    "id": 3,
                    "title": "全部"
                },
                {
                    "id": 31,
                    "title": "翻译"
                },
                {
                    "id": 32,
                    "title": "速记"
                }
              ]
            },
            {
              "id": 4,
              "title": "创业指导",
              "subsort": [
                {
                    "id": 4,
                    "title": "全部"
                },
                {
                    "id": 41,
                    "title": "创业培训"
                }
              ]
            },
        ],
        "city": [
            {
                "id": 0,
                "title": "全部"
            },
            {
              "id": 1,
              "title": "湖北省",
              "subcity": [
                {
                    "id": 1,
                    "title": "全部"
                },
                {
                    "id": 11,
                    "title": "武汉市"
                },
                {
                    "id": 12,
                    "title": "襄阳市"
                },
                {
                    "id": 13,
                    "title": "孝感市"
                },
                {
                    "id": 14,
                    "title": "随州市"
                },
                {
                    "id": 15,
                    "title": "荆州市"
                },
                {
                    "id": 16,
                    "title": "黄冈市"
                },
                {
                    "id": 17,
                    "title": "天门市"
                },
                {
                    "id": 18,
                    "title": "仙桃市"
                },
                {
                    "id": 19,
                    "title": "潜江市"
                },
                {
                    "id": 20,
                    "title": "十堰市"
                },
                {
                    "id": 21,
                    "title": "宜昌市"
                },
                {
                    "id": 22,
                    "title": "咸宁市"
                },
              ]
            },
            {
              "id": 2,
              "title": "浙江省",
              "subcity": [
                {
                    "id": 2,
                    "title": "全部"
                },
                {
                    "id": 21,
                    "title": "杭州市"
                },
                {
                    "id": 22,
                    "title": "金华市"
                },
                {
                    "id": 23,
                    "title": "义乌市"
                },
              ]
            },
            {
              "id": 3,
              "title": "江苏省",
              "subcity": [
                {
                    "id": 3,
                    "title": "全部"
                },
                {
                    "id": 31,
                    "title": "南京市"
                },
                {
                    "id": 32,
                    "title": "苏州市"
                }
              ]
            }
        ],
      }
    })
  },
  fetchServiceData:function(){  //获取城市列表
    let _this = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    const imgUrls = [
      "https://cbu01.alicdn.com/img/ibank/O1CN015rbYdV1R1rZNYkB2g_!!2206936282052-0-cib.jpg",
  ];
    const randomImgUrl = imgUrls[Math.floor(Math.random() * imgUrls.length)];
    const perpage = 10;
    this.setData({
      page:this.data.page+1
    })
    const page = this.data.page;
    const newlist = [];
    for (var i = (page-1)*perpage; i < page*perpage; i++) {
      newlist.push({
        "id":i+1,
        "name":"上海拜特信息技术有限公司"+(i+1),
        "city":"上海",
        "tag":"法律咨询",
        "imgurl":randomImgUrl,
      })
    }
    setTimeout(()=>{
      _this.setData({
        servicelist:_this.data.servicelist.concat(newlist)
      })
    },1500)
  },
  submitSearch:function(){  //提交搜索
    console.log(this.data.searchtext);
    this.fetchServiceData();
  },
  setFilterPanel: function(e){ //展开筛选面板
    const d = this.data;
    const i = e.currentTarget.dataset.findex;
    if(d.showfilterindex == i){
      this.setData({
        showfilter: false,
        showfilterindex: null
      })
    }else{    
      this.setData({
        showfilter: true,
        showfilterindex:i,
      })
    }
    console.log(d.showfilterindex);
  },
  setSortIndex:function(e){ //服务类别一级索引
    const d= this.data;
    const dataset = e.currentTarget.dataset;
    this.setData({
      sortindex:dataset.sortindex,
      sortid:dataset.sortid,
      subsortindex: d.sortindex==dataset.sortindex ? d.subsortindex:0
    })
    console.log('服务类别id：一级--'+this.data.sortid+',二级--'+this.data.subsortid);
  },
  setSubsortIndex:function(e){ //服务类别二级索引
    const dataset = e.currentTarget.dataset;
    this.setData({
      subsortindex:dataset.subsortindex,
      subsortid:dataset.subsortid,
    })
    console.log('服务类别id：一级--'+this.data.sortid+',二级--'+this.data.subsortid);
  },
  setCityIndex:function(e){ //服务城市一级索引
    const d= this.data;
    const dataset = e.currentTarget.dataset;
    this.setData({
      cityindex:dataset.cityindex,
      cityid:dataset.cityid,
      subcityindex: d.cityindex==dataset.cityindex ? d.subcityindex:0
    })
    console.log('服务城市id：一级--'+this.data.cityid+',二级--'+this.data.subcityid);
  },
  setSubcityIndex:function(e){ //服务城市二级索引
    const dataset = e.currentTarget.dataset;
    this.setData({
      subcityindex:dataset.subcityindex,
      subcityid:dataset.subcityid,
    })
    console.log('服务城市id：一级--'+this.data.cityid+',二级--'+this.data.subcityid);
  },
  hideFilter: function(){ //关闭筛选面板
    this.setData({
      showfilter: false,
      showfilterindex: null
    })
  },
  scrollHandle:function(e){ //滚动事件
    this.setData({
      scrolltop:e.detail.scrollTop
    })
  },
  goToTop:function(){ //回到顶部
    this.setData({
      scrolltop:0
    })
  },
  scrollLoading:function(){ //滚动加载
    this.fetchServiceData();
  },
  onPullDownRefresh:function(){ //下拉刷新
    this.setData({
      page:0,
      servicelist:[]
    })
    this.fetchServiceData();
    this.fetchFilterData();
    setTimeout(()=>{
      wx.stopPullDownRefresh()
    },1000)
  },
  getTodoRecord:function(){
    let that=this;
    wx.request({
      url: 'http://localhost:8080/warehouse/get_record',
      data:{},
      header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest", },
      success:function(res){
          that.handle(res);
      },
      fail:function (res) {
          
      },
    })
  },
  handle:function(res) {
    console.log(JSON.stringify(res));
    this.setData({
      devicelist:res.data.aaData,
      allRecords:res.data.aaData,
    })
  },
  OnDeleteRecord:function (e) {
    console.log(JSON.stringify(e));
    var id = e.currentTarget.dataset.itemid;
    console.log(id);
    let that=this;
    wx.showModal({
      cancelColor:'cancelColor',
      title: '提示',
      content: '你确定要删除该记录吗？',
      success:function(res){
        if (res.confirm) {
          var id = e.currentTarget.dataset.id;
          console.log(id);
          wx.request({
            url: 'http://localhost:8080/warehouse/delete_record', // 明确删除端点
            method: 'POST', // 明确使用POST方法
            data: { id: id },
            header: {
              'content-type': 'application/json', // 正确的内容类型
              'x-requested-with': 'XMLHttpRequest'
            },
            success:function(res){
              that.getTodoRecord();
            },
            fail:function (res) {

            },
          })
        }
      }
  })
  // wx.request({
  //   url: 'http://localhost:8080/MyWeb_war_exploded/project_todo_servlet_action?action=delete_todo_record',
  //   data:{"id":id},
  //   header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest", },
  //   success:function(res){
  //       that.handle(res);
  //   },
  //   fail:function (res) {
  //   },
  // })
  },
  OndetailRecord:function (h) {
    let that=this;
    console.log(JSON.stringify(h));
    var id = h.currentTarget.dataset.id;
    var food_name = h.currentTarget.dataset.food_name;
    var food_type= h.currentTarget.dataset.food_type;
    var food_quantity= h.currentTarget.dataset.food_quantity;
    var food_keeptime= h.currentTarget.dataset.food_keeptime;
    var food_quality= h.currentTarget.dataset.food_quality;
    var food_keepcondition=h.currentTarget.dataset.food_keepcondition; 
    var supplier=h.currentTarget.dataset.supplier;
    var create_time= h.currentTarget.dataset.create_time;
    console.log(JSON.stringify(h));
    var recordObject1 = {
      "id": id,
      "food_name":food_name,
      "food_type": food_type,
      "food_quantity":food_quantity,
      "food_keeptime":food_keeptime,
      "create_time":create_time,
      "food_quality":food_quality,
      "food_keepcondition":food_keepcondition,
      "supplier":supplier,
     };
    var record = JSON.stringify(recordObject1);
    console.log(record);
    wx.navigateTo({
       url:'detail?record='+record,
    })
  },
  OnModifyRecord:function (h) {
    let that=this;
    console.log(JSON.stringify(h));
    var id = h.currentTarget.dataset.id;
    var food_name = h.currentTarget.dataset.food_name;
    var food_type= h.currentTarget.dataset.food_type;
    var food_quantity= h.currentTarget.dataset.food_quantity;
    var food_keeptime= h.currentTarget.dataset.food_keeptime;
    var food_quality= h.currentTarget.dataset.food_quality;
    var food_keepcondition=h.currentTarget.dataset.food_keepcondition; 
    var supplier=h.currentTarget.dataset.supplier;
    var create_time= h.currentTarget.dataset.create_time;
    var recordObject1 = {
      "id": id,
      "food_name":food_name,
      "food_type": food_type,
      "food_quantity":food_quantity,
      "food_keeptime":food_keeptime,
      "create_time":create_time,
      "food_quality":food_quality,
      "food_keepcondition":food_keepcondition,
      "supplier":supplier,    
     };
    var record = JSON.stringify(recordObject1);
    console.log(record);
    wx.navigateTo({
       url:'modify?record='+record,
    })
  },
  OnAddRecord:function(){
    wx.navigateTo({
      url: 'add',
    })
  },
  // OnsubmitSearch:function(){    
  //   let that=this;
  //   var id = that.data.searchtext;
  //   const searchText = that.data.searchtext;
  //   console.log(searchText);
  //   console.log(id);
  //   wx.request({
  //     url: 'http://localhost:8080/warehouse/get_record',
  //     data:{food_type: searchText},
  //     header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest", },
  //     success:function(res){
  //       that.handle(res);
  //     },
  //     fail:function (res) {          
  //     },
  //   })
  // },
  onSubmitSearch: function() {    
    const searchText = this.data.searchtext.trim().toLowerCase();
    console.log('执行本地搜索:', searchText);   
    if (!searchText) {
      // 如果搜索文本为空，显示全部记录
      this.setData({
        filteredList: [...this.data.allRecords],
        searchResultCount: this.data.allRecords.length
      });
      return;
    }
    
    // 执行本地筛选
    const filteredList = this.data.allRecords.filter(item => {
      // 根据实际数据结构调整筛选条件
      return (
        item.food_name.toLowerCase().includes(searchText) ||
        item.food_type.toLowerCase().includes(searchText) 
      );
    });    
    // 更新UI
    this.setData({
      devicelist : filteredList,
      searchResultCount: filteredList.length
    });
  },

  inputSearch:function(e){  //输入搜索文字
    this.setData({
      showsearch:e.detail.cursor>0,
      searchtext:e.detail.value
    })
  },
  saveSearchResult: function() {
    const devicelist = this.data.devicelist;
    const searchText = this.data.searchtext;
    
    // 防止重复点击
    if (this.data.isSaving) return;
    
    if (!devicelist || devicelist.length === 0) {
      wx.showToast({
        title: '没有数据可保存',
        icon: 'none'
      });
      return;
    }
    
    this.setData({ isSaving: true });
    wx.showLoading({
      title: '正在导出...',
      mask: true
    });
    
    // 准备要保存的数据
    const dataToSave = {
      searchText: searchText,
      timestamp: new Date().toISOString(),
      results: devicelist
    };
    
    wx.setStorage({
      key: 'search_result_' + searchText,
      data: dataToSave,
      success: () => {
        wx.showToast({
          title: '导出成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: (err) => {
        console.error('导出失败:', err);
        wx.showToast({
          title: '导出失败',
          icon: 'none',
          duration: 2500
        });
      },
      complete: () => {
        wx.hideLoading();
        this.setData({ isSaving: false });
      }
    });
  },
  // saveSearchResult: function() {
  //   const devicelist = this.data.devicelist;
  //   const searchText = this.data.searchtext;
  
  //   if (this.data.isSaving) return;
  
  //   if (!devicelist || devicelist.length === 0) {
  //     wx.showToast({ title: '没有数据可保存', icon: 'none' });
  //     return;
  //   }
  
  //   this.setData({ isSaving: true });
  //   wx.showLoading({ title: '正在保存...', mask: true });
  
  //   // 准备数据
  //   const dataToSave = {
  //     searchText: searchText,
  //     timestamp: new Date().toISOString(),
  //     results: devicelist
  //   };
  
  //   // 生成文件名（包含时间戳防止覆盖）
  //   const filename = `search_result_${searchText}_${Date.now()}.json`;
  //   const filePath = `${wx.env.USER_DATA_PATH}/${filename}`; // 保存到小程序用户目录
    
  //   try {
  //     // 写入文件
  //     const fs = wx.getFileSystemManager();
  //     fs.writeFile({
  //       filePath: filePath,
  //       data: JSON.stringify(dataToSave),
  //       encoding: 'utf8',
  //       success: () => {
  //         wx.showToast({
  //           title: '文件保存成功',
  //           icon: 'success',
  //           duration: 2000
  //         });
  //         console.log('文件路径：', filePath);
          
  //         // 可选：引导用户保存到手机相册/存储
  //         wx.saveFileToDisk({
  //           filePath: filePath,
  //           success: () => console.log('已引导用户保存'),
  //           fail: (e) => console.warn('保存引导失败', e)
  //         });
  //       },
  //       fail: (err) => {
  //         console.error('文件保存失败:', err);
  //         wx.showToast({ title: '保存失败', icon: 'none' });
  //       }
  //     });
  //   } catch (e) {
  //     console.error('捕获异常:', e);
  //   } finally {
  //     wx.hideLoading();
  //     this.setData({ isSaving: false });
  //   }
  // },
})
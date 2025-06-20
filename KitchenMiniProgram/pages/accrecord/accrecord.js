// index.js
Page({
  data: {
    searchtext: '',
    scrolltop: 0,
    originalList: [
      {
        id: 1,
        device_id: '李校长',
        create_time: '2025-5-19 12:30',
        device_name: '成都市青羊区校长陪餐'
      },
      {
        id: 2,
        device_id: '王老板',
        create_time: '2025-5-20 18:45',
        device_name: '成都市温江区商务宴请'
      },
      {
        id: 3,
        device_id: '张主任',
        create_time: '2025-5-21 09:15',
        device_name: '武汉市江汉区教育督导'
      },
      {
        id: 4,
        device_id: '陈经理',
        create_time: '2025-5-22 14:30',
        device_name: '杭州市西湖区企业洽谈'
      },
      {
        id: 5,
        device_id: '林总监',
        create_time: '2025-5-23 11:00',
        device_name: '南京市鼓楼区项目评审'
      },
      {
        id: 6,
        device_id: '周科长',
        create_time: '2025-5-24 16:45',
        device_name: '重庆市渝中区政务接待'
      },
      {
        id: 7,
        device_id: '郑主管',
        create_time: '2025-5-25 10:20',
        device_name: '深圳市南山区客户答谢'
      },
      {
        id: 8,
        device_id: '吴书记',
        create_time: '2025-5-26 14:00',
        device_name: '西安市雁塔区学术交流'
      },
      {
        id: 9,
        device_id: '冯校长',
        create_time: '2025-5-27 09:30',
        device_name: '苏州市工业园区投资考察'
      },
      {
        id: 10,
        device_id: '许经理',
        create_time: '2025-5-28 17:15',
        device_name: '天津市和平区年度总结'
      }
    ],
    filteredList: []
  },

  onLoad: function() {
    // 初始化时显示全部数据
    this.setData({ filteredList: this.data.originalList })
  },

  inputSearch: function(e) {
    this.setData({
      searchtext: e.detail.value,
    })
  },

  submitSearch: function() {
    const keyword = this.data.searchtext.toLowerCase()
    const filtered = this.data.originalList.filter(item => 
      item.device_id.includes(keyword) ||
      item.device_name.includes(keyword)
    )
    this.setData({ filteredList: filtered })
  },
  // 刷新功能实现
Butrefresh: function() {
  // 1. 重置搜索条件
  this.setData({
    searchtext: '',
    // 2. 恢复完整数据集
    filteredList: this.data.originalList
  })
  
  // 3. 滚动条回到顶部（可选）
  this.goToTop()
  
  // 4. 显示刷新反馈（新增）
  wx.showToast({
    title: '已刷新',
    icon: 'success',
    duration: 1000
  })
},

  scrollHandle: function(e) {
    this.setData({ scrolltop: e.detail.scrollTop })
  },

  goToTop: function() {
    this.setData({ scrolltop: 0 })
  },

  scrollLoading: function() {
    // 静态数据无需加载更多
    console.log('已到列表底部')
  },
})
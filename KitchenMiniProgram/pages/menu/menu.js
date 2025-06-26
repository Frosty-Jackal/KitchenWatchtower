// app.js
Page({
  data: {
    cardItems: [
      { title: '人员管理', pagePath: '/pages/usermanage/list',imagePath: '/pages/menu/people.png' },
      { title: '陪餐记录', pagePath: '/pages/accrecord/accrecord',imagePath: '/pages/menu/accrecord.png' },
      { title: '食堂展板', pagePath: '/pages/canmanage/canmanage',imagePath: '/pages/menu/canteen.png' },
      { title: '证书管理', pagePath: '/pages/licmanage/licmanage',imagePath: '/pages/menu/lic.png' },
      { title: '原料控制', pagePath: '/pages/warehousemanage/list',imagePath: '/pages/menu/warehouse.png' },
      { title: '待办事项', pagePath: '/pages/todolist/todolist',imagePath: '/pages/menu/todolist.png' },
      { title: '地图展板', pagePath: '/pages/map/index',imagePath: '/pages/menu/map.png' }
    ]
  },
  navigateTo(e) {
    const { path } = e.currentTarget.dataset
    wx.navigateTo({
      url: path,
      fail: (err) => {
        console.error('跳转失败:', err)
        wx.showToast({
          title: '功能开发中',
          icon: 'none'
        })
      }
    })
  }
})
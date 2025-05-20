// app.js
Page({
  data: {
    cardItems: [
      { title: '人员管理', pagePath: '/pages/usermanage/list',imagePath: '/pages/menu/people.jpg' },
      { title: '陪餐记录', pagePath: '/pages/accrecord/accrecord',imagePath: '/pages/menu/accrecord.png' }
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
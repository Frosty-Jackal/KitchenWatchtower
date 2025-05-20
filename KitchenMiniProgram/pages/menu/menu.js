// app.js
Page({
  data: {
    cardItems: [
      { title: '人员管理', pagePath: '/pages/usermanage/list'  }
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
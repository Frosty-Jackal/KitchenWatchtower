Page({
  data: {
    canteenList: [
      {
        id: 1,
        name: '西苑一食堂',
        score: 4,
        tags: ['透明厨房', '穿戴规整', '餐具消毒'],
        distance: '232m',
        type: '社会餐饮'
      },
      {
        id: 2,
        name: '西苑二食堂',
        score: 5,
        tags: ['明厨亮灶', '食材溯源', '环境优雅'],
        distance: '314m',
        type: '自营餐饮'
      },
      {
        id: 3,
        name: '东苑三食堂',
        score: 3,
        tags: ['环境整洁', '菜品丰富', '价格亲民'],
        distance: '289m',
        type: '社会餐饮'
      },
      {
        id: 4,
        name: '北园食堂',
        score: 5,
        tags: ['智能点餐', '食品留样', '阳光厨房'],
        distance: '198m',
        type: '自营餐饮'
      },
      {
        id: 5,
        name: '东园食堂',
        score: 4,
        tags: ['后厨直播', '绿色食材', '员工持证'],
        distance: '376m',
        type: '社会餐饮'
      }
    ]
  },
  onLoad() {
    console.log('数据类型验证：', 
      typeof this.data.canteenList[0].score === 'number' // 应输出true
    )
  }
})

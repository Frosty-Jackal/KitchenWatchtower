Page({
  data: {
    todos: [],
    currentIndex: 0,
    selectedId: null,
    showModal: false,
    currentId: null,
    itemTitle: '',
    itemStatus: '未完成',
    itemDueDate: '',
    itemPriority: '中',
    statusOptions: ['未完成', '进行中', '已完成'],
    priorityOptions: ['低', '中', '高']
  },

  onLoad() {
    this.loadData();
  },

  loadData() {
    try {
      const todos = wx.getStorageSync('todos');
      if (todos) {
        this.setData({
          todos: todos,
          currentIndex: todos.length > 0 ? Math.max(...todos.map(item => item.id)) : 0
        });
        this.renderTable();
      }
    } catch (e) {
      console.error('加载数据失败:', e);
    }
  },

  saveData() {
    wx.setStorageSync('todos', this.data.todos);
  },

  renderTable() {
    this.setData({
      todos: this.data.todos
    });
  },

  onAddTap() {
    this.setData({
      showModal: true,
      currentId: null,
      itemTitle: '',
      itemStatus: '未完成',
      itemDueDate: '',
      itemPriority: '中'
    });
  },

  onEditTap() {
    if (this.data.selectedId) {
      const todo = this.data.todos.find(item => item.id === this.data.selectedId);
      if (todo) {
        this.setData({
          showModal: true,
          currentId: this.data.selectedId,
          itemTitle: todo.title,
          itemStatus: todo.status,
          itemDueDate: todo.dueDate,
          itemPriority: todo.priority
        });
      }
    } else {
      wx.showToast({
        title: '请先选择一条记录进行修改',
        icon: 'none'
      });
    }
  },

  onDeleteTap() {
    if (this.data.selectedId) {
      wx.showModal({
        title: '提示',
        content: '确定要删除这个待办事项吗？',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              todos: this.data.todos.filter(item => item.id !== this.data.selectedId),
              selectedId: null
            });
            this.saveData();
            this.renderTable();
          }
        }
      });
    } else {
      wx.showToast({
        title: '请先选择一条记录进行删除',
        icon: 'none'
      });
    }
  },

  onRowTap(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      selectedId: id
    });
    this.renderTable();
  },

  onFormSubmit(e) {
    const { title, duedate } = e.detail.value;
    const status = this.data.itemStatus;
    const priority = this.data.itemPriority;

    if (this.data.currentId) {
      const todos = this.data.todos.map(todo => {
        if (todo.id === this.data.currentId) {
          return {
            ...todo,
            title,
            status,
            dueDate: duedate,
            priority
          };
        }
        return todo;
      });

      this.setData({
        todos,
        showModal: false
      });
    } else {
      this.setData({
        currentIndex: this.data.currentIndex + 1,
        todos: [
          ...this.data.todos,
          {
            id: this.data.currentIndex + 1,
            title,
            status,
            dueDate: duedate,
            priority,
            selected: false
          }
        ],
        showModal: false
      });
    }

    this.saveData();
    this.renderTable();
  },

  onInputChange(e) {
    const { id, value } = e.detail;
    this.setData({
      [id]: value
    });
  },

  onStatusChange(e) {
    this.setData({
      itemStatus: this.data.statusOptions[e.detail.value]
    });
  },

  onPriorityChange(e) {
    this.setData({
      itemPriority: this.data.priorityOptions[e.detail.value]
    });
  },

  onCloseModal() {
    this.setData({
      showModal: false
    });
  }
});
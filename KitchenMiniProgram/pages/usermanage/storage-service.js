/**
 * 微信小程序数据存储服务
 * 支持同步/异步存储、文件存储等多种方式
 */
export default {
  // 异步存储数据到本地缓存
  saveData(key, data) {
    return new Promise((resolve, reject) => {
      try {
        const dataString = typeof data === 'string' ? data : JSON.stringify(data);
        wx.setStorage({
          key,
          data: dataString,
          success: () => resolve(true),
          fail: (err) => reject({ message: '存储失败', error: err })
        });
      } catch (e) {
        reject({ message: '数据转换失败', error: e });
      }
    });
  },

  // 同步存储数据到本地缓存
  saveDataSync(key, data) {
    try {
      const dataString = typeof data === 'string' ? data : JSON.stringify(data);
      wx.setStorageSync(key, dataString);
      return true;
    } catch (e) {
      console.error('同步存储失败:', e);
      return false;
    }
  },

  // 异步读取本地缓存数据
  getData(key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key,
        success: (res) => {
          try {
            const parsedData = JSON.parse(res.data);
            resolve(parsedData);
          } catch (e) {
            resolve(res.data); // 如果不是JSON格式，直接返回原始数据
          }
        },
        fail: (err) => reject({ message: '读取失败', error: err })
      });
    });
  },

  // 同步读取本地缓存数据
  getDataSync(key) {
    try {
      const data = wx.getStorageSync(key);
      return JSON.parse(data);
    } catch (e) {
      return data; // 如果不是JSON格式，直接返回原始数据
    }
  },

  // 检查数据是否存在
  hasData(key) {
    try {
      wx.getStorageSync(key);
      return true;
    } catch (e) {
      return false;
    }
  },

  // 删除存储的数据
  removeData(key) {
    return new Promise((resolve, reject) => {
      wx.removeStorage({
        key,
        success: () => resolve(true),
        fail: (err) => reject({ message: '删除失败', error: err })
      });
    });
  },

  // 同步删除存储的数据
  removeDataSync(key) {
    try {
      wx.removeStorageSync(key);
      return true;
    } catch (e) {
      return false;
    }
  },

  // 存储数据到文件系统
  saveToFile(data, fileName = 'data.json') {
    return new Promise((resolve, reject) => {
      const fs = wx.getFileSystemManager();
      const filePath = wx.env.USER_DATA_PATH + '/' + fileName;
      const dataString = typeof data === 'string' ? data : JSON.stringify(data);

      fs.writeFile({
        filePath,
        data: dataString,
        encoding: 'utf8',
        success: () => resolve(filePath),
        fail: (err) => reject({ message: '写入文件失败', error: err })
      });
    });
  },

  // 从文件系统读取数据
  readFromFile(fileName = 'data.json') {
    return new Promise((resolve, reject) => {
      const fs = wx.getFileSystemManager();
      const filePath = wx.env.USER_DATA_PATH + '/' + fileName;

      fs.readFile({
        filePath,
        encoding: 'utf8',
        success: (res) => {
          try {
            const parsedData = JSON.parse(res.data);
            resolve(parsedData);
          } catch (e) {
            resolve(res.data); // 如果不是JSON格式，直接返回原始数据
          }
        },
        fail: (err) => reject({ message: '读取文件失败', error: err })
      });
    });
  },

  // 检查文件是否存在
  fileExists(fileName) {
    return new Promise((resolve) => {
      const fs = wx.getFileSystemManager();
      const filePath = wx.env.USER_DATA_PATH + '/' + fileName;

      fs.access({
        path: filePath,
        success: () => resolve(true),
        fail: () => resolve(false)
      });
    });
  }
};    
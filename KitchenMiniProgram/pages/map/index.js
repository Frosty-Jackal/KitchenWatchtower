Page({
  data: {
    latitude: 39.908823,
    longitude: 116.397470,
    scale: 14,
    markers: [{
      id: 1,
      latitude: 39.908823,
      longitude: 116.397470,
      name: '当前位置',
      callout: {
        content: '我的位置',
        color: '#000000',
        fontSize: 14,
        borderRadius: 6,
        bgColor: '#ffffff',
        padding: 5,
        display: 'ALWAYS'
      }
    }],
    setting: {
      showCompass: true,
      showScale: true,
      enableRotate: true,
      enableOverlooking: true,
      enableZoom: true,
      enableScroll: true,
      enableSatellite: false,
      enableTraffic: false
    },
    locationAuthDenied: false,
    loading: false
  },
  onLoad: function() {
    this.getLocation();
  },
  getLocation: function() {
    const that = this;
    // 显示加载中
    this.setData({ loading: true });
    
    // 先检查用户是否授权获取位置信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] === false) {
          // 用户拒绝过授权，显示引导重新授权的界面
          that.setData({
            locationAuthDenied: true,
            loading: false
          });
        } else {
          // 用户未拒绝过或已授权，尝试获取位置
          wx.getLocation({
            type: 'gcj02',
            success: function(res) {
              that.setData({
                latitude: res.latitude,
                longitude: res.longitude,
                markers: [{
                  id: 1,
                  latitude: res.latitude,
                  longitude: res.longitude,
                  name: '当前位置',
                  callout: {
                    content: '我的位置',
                    color: '#000000',
                    fontSize: 14,
                    borderRadius: 6,
                    bgColor: '#ffffff',
                    padding: 5,
                    display: 'ALWAYS'
                  }
                }],
                locationAuthDenied: false,
                loading: false
              });
            },
            fail: function(err) {
              console.error('获取位置失败', err);
              that.setData({
                loading: false
              });
              
              // 根据错误类型给出不同提示
              if (err.errMsg.indexOf('auth deny') >= 0) {
                that.setData({
                  locationAuthDenied: true
                });
                wx.showToast({
                  title: '需要位置权限才能获取位置',
                  icon: 'none',
                  duration: 2000
                });
              } else {
                wx.showToast({
                  title: '获取位置失败，请检查GPS是否开启',
                  icon: 'none',
                  duration: 2000
                });
              }
            }
          });
        }
      },
      fail: function(err) {
        console.error('获取设置失败', err);
        that.setData({ loading: false });
        wx.showToast({
          title: '获取位置权限设置失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 打开设置页面，引导用户开启位置权限
  openSetting: function() {
    const that = this;
    wx.openSetting({
      success: function(res) {
        if (res.authSetting['scope.userLocation']) {
          // 用户开启了位置权限，重新获取位置
          that.setData({
            locationAuthDenied: false
          });
          that.getLocation();
        }
      }
    });
  },
  
  // 手动重新定位
  reLocation: function() {
    this.getLocation();
  }
}) 
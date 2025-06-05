package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.DeviceDao;
import com.example.demo.dao.UserDao;
import com.example.demo.entity.Device;
import com.example.demo.entity.User;

public class UserService {
    public void getDeviceRecord(JSONObject param ,  JSONObject json) {
        UserDao dao =  new UserDao();
        dao.getUserRecord(param,json);
    }

    public void addDeviceRecord(User user , JSONObject json) {
        UserDao dao =  new UserDao();
        dao.addUserRecord(user,json);
    }
    public void deleteDeviceRecord(String id) throws Exception {
        UserDao dao =  new UserDao();
        dao.deleteUserRecord(id);
    }

    public void updateDeviceRecord(User user) throws Exception {
        UserDao dao = new UserDao();
        dao.updateUserRecord(user);
    }
}

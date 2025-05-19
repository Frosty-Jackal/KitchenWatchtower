package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.DeviceDao;
import com.example.demo.entity.Device;

public class DeviceService {
    public void getDeviceRecord(JSONObject param ,  JSONObject json) {
        DeviceDao dao =  new DeviceDao();
        dao.getDeviceRecord(param,json);
    }

    public void addDeviceRecord(Device device, JSONObject json) {
        DeviceDao dao =  new DeviceDao();
        dao.addDeviceRecord(device,json);
    }
}

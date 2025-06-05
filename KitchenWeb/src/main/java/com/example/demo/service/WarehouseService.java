package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.DeviceDao;
import com.example.demo.dao.WarehouseDao;
import com.example.demo.entity.Device;
import com.example.demo.entity.Warehouse;

public class WarehouseService {
    public void getDeviceRecord(JSONObject param ,  JSONObject json) {
        WarehouseDao dao =  new WarehouseDao();
        dao.getWarehouseRecord(param,json);
    }

    public void addDeviceRecord(Warehouse food , JSONObject json) {
        WarehouseDao dao =  new WarehouseDao();
        dao.addWarehouseRecord(food,json);
    }
    public void deleteDeviceRecord(String id) throws Exception {
        WarehouseDao dao =  new WarehouseDao();
        dao.deleteWarehouseRecord(id);
    }

    public void updateDeviceRecord(Warehouse food) throws Exception {
        WarehouseDao dao = new WarehouseDao();
        dao.updateWarehouseRecord(food);
    }
}

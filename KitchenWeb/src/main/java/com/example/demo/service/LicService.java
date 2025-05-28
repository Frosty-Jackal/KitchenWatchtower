package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.DeviceDao;
import com.example.demo.dao.LicDao;
import com.example.demo.entity.Device;
import com.example.demo.entity.Lic;

public class LicService {
    public void getDeviceRecord(JSONObject param ,  JSONObject json) {
        LicDao dao =  new LicDao();
        dao.getLicRecord(param,json);
    }

    public void addDeviceRecord(Lic lic , JSONObject json) {
        LicDao dao =  new LicDao();
        dao.addLicRecord(lic,json);
    }
    public void deleteDeviceRecord(String id) throws Exception {
        LicDao dao =  new LicDao();
        dao.deleteLicRecord(id);
    }

    public void updateDeviceRecord(Lic lic) throws Exception {
        LicDao dao = new LicDao();
        dao.updateLicRecord(lic);
    }
}

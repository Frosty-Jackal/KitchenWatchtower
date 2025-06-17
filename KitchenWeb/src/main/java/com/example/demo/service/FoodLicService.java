package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.FoodLicDao;
import com.example.demo.entity.FoodLic;

public class FoodLicService {
    public void addDeviceRecord(FoodLic foodLic, JSONObject json) {
        FoodLicDao dao = new FoodLicDao();
        dao.addFoodLicRecord(foodLic, json);
    }
    public void getDeviceRecord(JSONObject param, JSONObject json) {
        FoodLicDao dao = new FoodLicDao();
        dao.getFoodLicRecord(param, json);
    }
    public void deleteDeviceRecord(String licNum) throws Exception {
        FoodLicDao dao = new FoodLicDao();
        dao.deleteFoodLicRecord(licNum);
    }

    public void updateDeviceRecord(FoodLic foodLic) throws Exception {
        FoodLicDao dao = new FoodLicDao();
        dao.updateFoodLicRecord(foodLic);
    }
}
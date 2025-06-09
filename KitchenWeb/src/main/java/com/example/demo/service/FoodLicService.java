package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.FoodLicDao;
import com.example.demo.entity.FoodLic;

public class FoodLicService {
    public void addDeviceRecord(FoodLic foodLic, JSONObject json) {
        FoodLicDao dao = new FoodLicDao();
        dao.addFoodLicRecord(foodLic, json);
    }
}
package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Lic;
import com.example.demo.service.LicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Autowired // 添加依赖注入注解
private LicService service;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/lic")
public class LicController {
    @RequestMapping("/get_record")
    public JSONObject getDeviceRecord(@RequestBody(required=false) JSONObject param){
        JSONObject json=new JSONObject();
        LicService service =  new LicService();
        service.getDeviceRecord(param,json);
        return json;
    }
    @RequestMapping("/add_record")
    public JSONObject addDeviceRecord(@RequestBody(required=false) Lic lic){
        JSONObject json=new JSONObject();
        System.out.println("[LicController/addDeviceRecord]" + lic.toString());
//        LicService service =  new LicService();
        service.addDeviceRecord(lic,json);
        return json;
    }
}

package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Device;
import com.example.demo.service.DeviceService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/device")
public class DeviceController {
    @RequestMapping("/get_record")
    public JSONObject getDeviceRecord(@RequestBody(required=false) JSONObject param){
        JSONObject json=new JSONObject();
//        if(!(param==null)){
            DeviceService service =  new DeviceService();
            service.getDeviceRecord(param,json);
//        }
        return json;
    }

    @RequestMapping("/add_record")
    public JSONObject addDeviceRecord(@RequestBody(required=false) Device device){
        JSONObject json=new JSONObject();
        System.out.println("[DeviceController/addDeviceRecord]" + device.toString());
        DeviceService service =  new DeviceService();
        service.addDeviceRecord(device,json);
        return json;
    }
}

package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Lic;
import com.example.demo.service.LicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


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
        LicService service =  new LicService();
        service.addDeviceRecord(lic,json);
        return json;
    }

    @RequestMapping(value = "/delete_record", method = RequestMethod.POST)
    public JSONObject deleteDeviceRecord(@RequestBody Map<String, String> params) {
        JSONObject json = new JSONObject();
        try {
            String id = params.get("lic_id");
            LicService service =  new LicService();
            service.deleteDeviceRecord(id);
            json.put("result_code", 0);
            json.put("result_msg", "删除成功");
        } catch (Exception e) {
            json.put("result_code", 500);
            json.put("result_msg", "删除失败：" + e.getMessage());
        }
        return json;
    }

    @RequestMapping(value = "/update_record", method = RequestMethod.PUT)
    public JSONObject updateDeviceRecord(@RequestBody Lic lic) {
        JSONObject json = new JSONObject();
        try {
            LicService licService =  new LicService();

            licService.updateDeviceRecord(lic);
            json.put("result_code", 0);
            json.put("result_msg", "修改成功");
        } catch (Exception e) {
            json.put("result_code", 500);
            json.put("result_msg", "修改失败：" + e.getMessage());
        }
        return json;
    }

}

package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Warehouse;
import com.example.demo.service.WarehouseService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/warehouse")
public class WarehouseController {
    @RequestMapping("/get_record")
    public JSONObject getDeviceRecord(@RequestBody(required=false) JSONObject param){
        JSONObject json=new JSONObject();
        WarehouseService service =  new WarehouseService();
        service.getDeviceRecord(param,json);
        return json;
    }
    @RequestMapping("/add_record")
    public JSONObject addDeviceRecord(@RequestBody(required=false) Warehouse food){
        JSONObject json=new JSONObject();
        System.out.println("[WarehouseController/addDeviceRecord]" + food.toString());
        WarehouseService service =  new WarehouseService();
        service.addDeviceRecord(food,json);
        return json;
    }

    @RequestMapping(value = "/delete_record", method = RequestMethod.POST)
    public JSONObject deleteDeviceRecord(@RequestBody Map<String, String> params) {
        JSONObject json = new JSONObject();
        try {
            String id = params.get("id");
            WarehouseService service =  new WarehouseService();
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
    public JSONObject updateDeviceRecord(@RequestBody Warehouse food) {
        JSONObject json = new JSONObject();
        try {
            WarehouseService foodService =  new WarehouseService();

            foodService.updateDeviceRecord(food);
            json.put("result_code", 0);
            json.put("result_msg", "修改成功");
        } catch (Exception e) {
            json.put("result_code", 500);
            json.put("result_msg", "修改失败：" + e.getMessage());
        }
        return json;
    }
}

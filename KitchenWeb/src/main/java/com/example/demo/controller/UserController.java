package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/User")
public class UserController {
    @RequestMapping("/get_record")
    public JSONObject getDeviceRecord(@RequestBody(required=false) JSONObject param){
        JSONObject json=new JSONObject();
        UserService service =  new UserService();
        service.getDeviceRecord(param,json);
        return json;
    }
    @RequestMapping("/add_record")
    public JSONObject addDeviceRecord(@RequestBody(required=false) User user){
        JSONObject json=new JSONObject();
        System.out.println("[UserController/addDeviceRecord]" + user.toString());
        UserService service =  new UserService();
        service.addDeviceRecord(user,json);
        return json;
    }

    @RequestMapping(value = "/delete_record", method = RequestMethod.POST)
    public JSONObject deleteDeviceRecord(@RequestBody Map<String, String> params) {
        JSONObject json = new JSONObject();
        try {
            String id = params.get("id");
            UserService service =  new UserService();
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
    public JSONObject updateDeviceRecord(@RequestBody User user) {
        JSONObject json = new JSONObject();
        try {
            UserService userService =  new UserService();

            userService.updateDeviceRecord(user);
            json.put("result_code", 0);
            json.put("result_msg", "修改成功");
        } catch (Exception e) {
            json.put("result_code", 500);
            json.put("result_msg", "修改失败：" + e.getMessage());
        }
        return json;
    }
}

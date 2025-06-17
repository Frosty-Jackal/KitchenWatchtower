package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.FoodLic;
import com.example.demo.service.FoodLicService;
import com.example.demo.service.OcrService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/foodlic")
public class FoodLicController {

    @PostMapping("/add_record")
    public JSONObject addDeviceRecord(@RequestBody FoodLic foodLic) {
        JSONObject json = new JSONObject();
        System.out.println("[FoodLicController/addDeviceRecord]" + foodLic.toString());

        FoodLicService service = new FoodLicService();
        service.addDeviceRecord(foodLic, json);

        return json;
    }

    @PostMapping("/ocr")
    public JSONObject recognizeLicense(@RequestParam("image") MultipartFile imageFile) {
        OcrService ocrService = new OcrService();
        return ocrService.recognizeLicense(imageFile);
    }
    @RequestMapping("/get_record")
    public JSONObject getDeviceRecord(@RequestBody(required=false) JSONObject param) {
        JSONObject json = new JSONObject();
        FoodLicService service = new FoodLicService();
        service.getDeviceRecord(param, json);
        return json;
    }
    @RequestMapping(value = "/delete_record", method = RequestMethod.POST)
    public JSONObject deleteDeviceRecord(@RequestBody Map<String, String> params) {
        JSONObject json = new JSONObject();
        try {
            String licNum = params.get("lic_num");
            FoodLicService service = new FoodLicService();
            service.deleteDeviceRecord(licNum);
            json.put("result_code", 0);
            json.put("result_msg", "删除成功");
        } catch (Exception e) {
            json.put("result_code", 500);
            json.put("result_msg", "删除失败：" + e.getMessage());
        }
        return json;
    }

    @RequestMapping(value = "/update_record", method = RequestMethod.PUT)
    public JSONObject updateDeviceRecord(@RequestBody FoodLic foodLic) {
        JSONObject json = new JSONObject();
        try {
            FoodLicService service = new FoodLicService();
            service.updateDeviceRecord(foodLic);
            json.put("result_code", 0);
            json.put("result_msg", "修改成功");
        } catch (Exception e) {
            json.put("result_code", 500);
            json.put("result_msg", "修改失败：" + e.getMessage());
        }
        return json;
    }
}
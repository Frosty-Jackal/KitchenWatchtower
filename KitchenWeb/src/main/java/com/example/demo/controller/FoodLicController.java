package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.FoodLic;
import com.example.demo.service.FoodLicService;
import com.example.demo.service.OcrService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
}
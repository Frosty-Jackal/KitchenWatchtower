// src/main/java/com/example/demo/service/OcrService.java
package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.util.Base64;

@Service
public class OcrService {
    private static final String OCR_API_URL = "https://aip.baidubce.com/rest/2.0/ocr/v1/food_business_license";
    private static final String ACCESS_TOKEN = "24.d54289e30e71c154512e8785ed11c016.2592000.1752023806.282335-119169771"; // 需要替换为真实token

    public JSONObject recognizeLicense(MultipartFile imageFile) {
        JSONObject result = new JSONObject();
        try {
            // 1. 图片转Base64
            byte[] bytes = imageFile.getBytes();
            String imgBase64 = Base64.getEncoder().encodeToString(bytes);

            // 2. 构建请求参数
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("image", imgBase64);
            params.add("access_token", ACCESS_TOKEN);

            // 3. 调用百度OCR API
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    OCR_API_URL,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            // 4. 解析响应结果
            JSONObject ocrResult = JSONObject.parseObject(response.getBody());
            if (ocrResult.getInteger("log_id") != null) {
                // 提取关键字段
                JSONObject data = new JSONObject();
                data.put("licNum", extractField(ocrResult, "许可证编号"));
                data.put("optName", extractField(ocrResult, "经营者名称"));

                result.put("result_code", 0);
                result.put("data", data);
                result.put("result_msg", "识别成功");
            } else {
                result.put("result_code", 500);
                result.put("result_msg", "OCR识别失败：" + ocrResult.toJSONString());
            }
        } catch (Exception e) {
            result.put("result_code", 500);
            result.put("result_msg", "系统异常：" + e.getMessage());
        }
        return result;
    }

    private String extractField(JSONObject ocrResult, String fieldName) {
        return ocrResult.getJSONObject("words_result")
                .getJSONArray(fieldName)
                .getJSONObject(0)
                .getString("word");
    }
}
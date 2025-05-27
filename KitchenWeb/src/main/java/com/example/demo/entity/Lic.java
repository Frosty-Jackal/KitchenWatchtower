package com.example.demo.entity;

public class Lic {
    private String id;
    private String licId;       // 原 lic_id → 驼峰命名
    private String licName;     // 原 lic_name → 驼峰命名
    private String limitTime;   // 原 limit_time → 驼峰命名

    // Getter/Setter for licId
    public String getLicId() {
        return licId;
    }
    public void setLicId(String licId) {
        this.licId = licId;
    }

    // Getter/Setter for licName
    public String getLicName() {
        return licName;
    }
    public void setLicName(String licName) {
        this.licName = licName;
    }

    // Getter/Setter for limitTime
    public String getLimitTime() {
        return limitTime;
    }
    public void setLimitTime(String limitTime) {
        this.limitTime = limitTime;
    }

    @Override
    public String toString() {
        return "Lic{" +
                "id='" + id + '\'' +
                ", licId='" + licId + '\'' +
                ", licName='" + licName + '\'' +
                ", limitTime='" + limitTime + '\'' +
                '}';
    }
}
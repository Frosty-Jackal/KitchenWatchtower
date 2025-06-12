package com.example.demo.entity;


public class Warehouse {
    private String id;
    private String foodId;       // 原 food_id → 驼峰命名
    private String foodName;     // 原 food_name → 驼峰命名
    private String foodType;
    private String foodKeepCondition;
    private String foodQuantity;
    private String foodQuality;
    private String foodSupplier;
    private String limitTime;   // 原 limit_time → 驼峰命名

    // Getter/Setter for foodI
    //
    public String getid() {
        return id;
    }

    public String getfoodName() {
        return foodName;
    }
    public void setfoodName(String foodName) {
        this.foodName = foodName;
    }
    // Getter/Setter for foodSupplier
    public String getfoodSupplier() {
        return foodSupplier;
    }
    public void setfoodSupplier(String foodSupplier) {
        this.foodSupplier = foodSupplier;
    }
    public String getfoodType() {
        return foodType;
    }
    public void setfoodType(String foodType) {
        this.foodType = foodType;
    }
    public String getfoodKeepCondition() {
        return foodKeepCondition;
    }
    public void setfoodKeepCondition(String foodKeepCondition) {
        this.foodKeepCondition = foodKeepCondition;
    }
    public String getfoodQuantity() {
        return foodQuantity;
    }
    public void setfoodQuantity(String foodQuantity) {
        this.foodQuantity = foodQuantity;
    }
    public String getfoodQuality() {
        return foodQuality;
    }
    public void setfoodQuality(String foodQuality) {
        this.foodQuality = foodQuality;
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
        return "Warehouse{"+
                "id='" + id + '\'' +
                "foodName='" + foodName + '\'' +
                ", foodType='" + foodType + '\'' +
                ", limitTime='" + limitTime + '\'' +
                ", foodQuantity='" + foodQuantity + '\'' +
                ", foodQuality='" + foodQuality + '\'' +
                ", foodSupplier='" + foodSupplier + '\'' +
                ", foodKeepCondition='" + foodKeepCondition + '\'' +
                 // 假设类中存在createTime字段
                '}';
    }


}
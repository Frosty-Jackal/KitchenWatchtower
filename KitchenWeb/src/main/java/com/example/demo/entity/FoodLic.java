package com.example.demo.entity;

public class FoodLic {
    private String licNum;
    private String optName;

    // Getter/Setter
    public String getLicNum() { return licNum; }
    public void setLicNum(String licNum) { this.licNum = licNum; }

    public String getOptName() { return optName; }
    public void setOptName(String optName) { this.optName = optName; }

    @Override
    public String toString() {
        return "FoodLic{" +
                "licNum='" + licNum + '\'' +
                ", optName='" + optName + '\'' +
                '}';
    }
}
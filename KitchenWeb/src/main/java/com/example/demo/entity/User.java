package com.example.demo.entity;

public class User {
    private String id;
    private String userIdNumber;       // 原 user_id → 驼峰命名
    private String userName;     // 原 user_name → 驼峰命名
    private String userPhone;   // 原 limit_time → 驼峰命名

    public String getId() {
        return id;
    }
    // Getter/Setter for userIdNumber
    public String getUserIdNumber() {
        return userIdNumber;
    }
    public void setUserIdNumber(String userIdNumber) {
        this.userIdNumber = userIdNumber;
    }

    // Getter/Setter for userName
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    // Getter/Setter for UserPhone
    public String getUserPhone() {
        return userPhone;
    }
    public void setUserPhone(String UserPhone) {
        this.userPhone = UserPhone;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", userIdNumber='" + userIdNumber + '\'' +
                ", userName='" + userName + '\'' +
                ", UserPhone='" + userPhone + '\'' +
                '}';
    }
}
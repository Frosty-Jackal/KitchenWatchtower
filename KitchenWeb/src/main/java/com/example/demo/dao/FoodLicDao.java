package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.FoodLic;
import java.sql.*;

public class FoodLicDao {
    public void addFoodLicRecord(FoodLic foodLic, JSONObject json) {
        String url = "jdbc:mysql://localhost:3306/KitchenWatchtower?useSSL=false&serverTimezone=UTC";
        String sql = "INSERT INTO foodlic (lic_num, opt_name) VALUES (?, ?)";

        try (Connection conn = DriverManager.getConnection(url, "root", "584237");
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, foodLic.getLicNum());
            pstmt.setString(2, foodLic.getOptName());

            pstmt.executeUpdate();

            json.put("result_code", 0);
            json.put("result_msg", "添加成功");

        } catch (SQLException e) {
            json.put("result_code", 500);
            json.put("result_msg", "数据库错误：" + e.getMessage());
        }
    }
}
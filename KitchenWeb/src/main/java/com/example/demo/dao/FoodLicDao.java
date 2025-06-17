package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.FoodLic;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public void getFoodLicRecord(JSONObject param, JSONObject json) {
        String url = "jdbc:mysql://localhost:3306/KitchenWatchtower?useSSL=false&serverTimezone=UTC";
        String sql = "SELECT * FROM foodlic ORDER BY lic_num";

        try (Connection conn = DriverManager.getConnection(url, "root", "584237");
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            List<Map<String, String>> list = new ArrayList<>();
            while (rs.next()) {
                Map<String, String> map = new HashMap<>();
                map.put("lic_num", rs.getString("lic_num"));
                map.put("opt_name", rs.getString("opt_name"));
                list.add(map);
            }

            json.put("aaData", list);
            json.put("result_code", 0);
            json.put("result_msg", "ok");

        } catch (SQLException e) {
            json.put("result_code", 500);
            json.put("result_msg", "数据库查询失败：" + e.getMessage());
        }
    }
    public void deleteFoodLicRecord(String licNum) throws Exception {
        String url = "jdbc:mysql://localhost:3306/KitchenWatchtower?useSSL=false&serverTimezone=UTC";
        String sql = "DELETE FROM foodlic WHERE lic_num = ?";

        try (Connection conn = DriverManager.getConnection(url, "root", "584237");
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, licNum);
            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new Exception("未找到对应许可证记录");
            }

        } catch (SQLException e) {
            throw new Exception("数据库操作失败：" + e.getMessage());
        }
    }

    public void updateFoodLicRecord(FoodLic foodLic) throws Exception {
        String url = "jdbc:mysql://localhost:3306/KitchenWatchtower?useSSL=false&serverTimezone=UTC";
        String sql = "UPDATE foodlic SET opt_name = ? WHERE lic_num = ?";

        try (Connection conn = DriverManager.getConnection(url, "root", "584237");
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, foodLic.getOptName());
            pstmt.setString(2, foodLic.getLicNum());

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new Exception("未找到对应许可证记录");
            }

        } catch (SQLException e) {
            throw new Exception("数据库操作失败：" + e.getMessage());
        }
    }
}
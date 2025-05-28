package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Lic;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;

public class LicDao {
    public void getLicRecord(JSONObject param, JSONObject json) {
        System.out.println("[LicDao/getLicRecord]here!param=null");
        String url = "jdbc:mysql://localhost:3306/jeff?";
        String username = "root";
        String password = "584237";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try (Connection connection = DriverManager.getConnection(url, username, password);
             Statement statement = connection.createStatement()) {

            String sql = "SELECT * FROM liclic ORDER BY lic_name";
            List<Map<String, String>> list = new ArrayList<>();

            try (ResultSet rs = statement.executeQuery(sql)) {
                while (rs.next()) {
                    Map<String, String> map = new HashMap<>();
                    // 映射数据库字段到原有接口字段（保持前端兼容）
                    map.put("device_id", rs.getString("lic_id"));    // 实际存储lic_id，但接口保持device_id
                    map.put("device_name", rs.getString("lic_name"));  // 实际存储lic_name，但接口保持device_name
                    map.put("create_time", rs.getString("limit_time")); // 实际存储limit_time，但接口保持create_time
                    list.add(map);
                }
            }

            json.put("aaData", list);
            json.put("result_code", 0);
            json.put("result_msg", "ok");
            System.out.println("[LicDao]finish!");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void addLicRecord(Lic lic, JSONObject json) {
        System.out.println("[LicDao/addLicRecord]here!lic=" + lic.toString());
        String url = "jdbc:mysql://localhost:3306/jeff?";
        String username = "root";
        String password = "584237";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try (Connection connection = DriverManager.getConnection(url, username, password);
             Statement statement = connection.createStatement()) {

            // 构造插入语句
            String licId = lic.getLicId();
            String licName = lic.getLicName();
            String limitTime = lic.getLimitTime();

            String sql = String.format(
                    "INSERT INTO liclic (lic_id, lic_name, limit_time) VALUES ('%s', '%s', '%s')",
                    licId, licName, limitTime
            );

            statement.executeUpdate(sql);

            json.put("result_code", 0);
            json.put("result_msg", "ok");
            System.out.println("[LicDao/addLicRecord]finish!");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void getDeviceRecord(JSONObject param, JSONObject json) {
    }
    public void deleteLicRecord(String id) throws Exception {
        String url = "jdbc:mysql://localhost:3306/jeff?useSSL=false&serverTimezone=UTC";
        String sql = "DELETE FROM liclic WHERE lic_id = ?";

        try (Connection conn = DriverManager.getConnection(url, "root", "584237");
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, id);
            pstmt.executeUpdate();
            System.out.println("[LicDao/deleteRecord]succdelete");
            System.out.println(pstmt);

        } catch (SQLException e) {
            throw new Exception("数据库操作失败：" + e.getMessage());
        }
    }

    public void updateLicRecord(Lic lic) throws Exception {
        String url = "jdbc:mysql://localhost:3306/jeff?useSSL=false&serverTimezone=UTC";
        String sql = "UPDATE liclic SET lic_name = ?, limit_time = ? WHERE lic_id = ?";

        try (Connection conn = DriverManager.getConnection(url, "root", "584237");
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, lic.getLicName());
            pstmt.setString(2, lic.getLimitTime());
            pstmt.setString(3, lic.getLicId());

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new Exception("未找到对应的证书记录");
            }

        } catch (SQLException e) {
            throw new Exception("数据库操作失败：" + e.getMessage());
        }
    }

}
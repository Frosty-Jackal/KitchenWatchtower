package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.User;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;

public class UserDao {
    public void getUserRecord(JSONObject param, JSONObject json) {
        System.out.println("[UserDao/getUserRecord]here!param=null");
        String url = "jdbc:mysql://localhost:3306/KitchenWatchtower?";
        String username = "root";
        String password = "584237";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try (Connection connection = DriverManager.getConnection(url, username, password);
             Statement statement = connection.createStatement()) {

            String sql = "SELECT * FROM user ORDER BY user_name";
            List<Map<String, String>> list = new ArrayList<>();

            try (ResultSet rs = statement.executeQuery(sql)) {
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    Map<String, String> map = new HashMap<>();
                    // 将每一行数据存入Map
                    for (int i = 1; i <= columnCount; i++) {
                        map.put(metaData.getColumnName(i), rs.getString(i));
                    }
                    list.add(map);
                }
            }

            json.put("aaData", list);
            json.put("result_code", 0);
            json.put("result_msg", "ok");
            System.out.println("[UserDao]finish!");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    /**
     * 统一异常处理方法
     * @param json 响应JSON对象
     * @param msg 错误信息
     * @param e 异常对象
     */
    private void handleException(JSONObject json, String msg, Throwable e) {
        json.put("result_code", -1);
        json.put("result_msg", msg + ": " + e.getMessage());
        e.printStackTrace(); // 建议替换为日志框架记录
        System.out.println("[UserDao] 异常处理：" + msg);
    }

    public void addUserRecord(User user, JSONObject json) {
        System.out.println("[UserDao/addUserRecord]here!user=" + user.toString());
        String url = "jdbc:mysql://localhost:3306/KitchenWatchtower?";
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
            String userId = user.getUserIdNumber();
            String userName = user.getUserName();
            String userPhone = user.getUserPhone();
            String create_time=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());

            String sql = String.format(
                    "INSERT INTO user (user_idnumber, user_name, user_phone, create_time) VALUES ('%s', '%s', '%s', '%s')",
                    userId, userName, userPhone, create_time
            );

            statement.executeUpdate(sql);

            json.put("result_code", 0);
            json.put("result_msg", "ok");
            System.out.println("[UserDao/addUserRecord]finish!");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void getDeviceRecord(JSONObject param, JSONObject json) {
    }
    public void deleteUserRecord(String id) throws Exception {
        String url = "jdbc:mysql://localhost:3306/KitchenWatchtower?useSSL=false&serverTimezone=UTC";
        String sql = "DELETE FROM user WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(url, "root", "584237");
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, id);
            pstmt.executeUpdate();
            System.out.println("[UserDao/deleteRecord]succdelete");
            System.out.println(pstmt);

        } catch (SQLException e) {
            throw new Exception("数据库操作失败：" + e.getMessage());
        }
    }

    public void updateUserRecord(User user) throws Exception {
        String url = "jdbc:mysql://localhost:3306/KitchenWatchtower?useSSL=false&serverTimezone=UTC";
        String sql = "UPDATE user SET user_name = ?, user_phone = ?  WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(url, "root", "584237");
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, user.getUserName());
            String food_quantity = user.getUserName();

            System.out.println("数量: " + food_quantity);
            pstmt.setString(2, user.getUserPhone());

            String food_quan = user.getUserPhone();

            System.out.println("数量: " + food_quan);

            pstmt.setString(3, user.getId());

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new Exception("未找到对应的证书记录");
            }

        } catch (SQLException e) {
            throw new Exception("数据库操作失败：" + e.getMessage());
        }
    }

}
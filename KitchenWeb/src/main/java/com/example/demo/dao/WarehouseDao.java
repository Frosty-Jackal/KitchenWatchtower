package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Warehouse;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class WarehouseDao {
    public void getWarehouseRecord(JSONObject param, JSONObject json) {
        System.out.println("[WarehouseDao/getWarehouseRecord]here!param=" + param);
        String url = "jdbc:mysql://localhost:3306/KitchenWatchtower?";
        String username = "root";
        String password = "584237";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            StringBuilder sqlBuilder = new StringBuilder("SELECT * FROM warehouse");
            List<String> conditions = new ArrayList<>();
            List<Object> params = new ArrayList<>();

            if (param != null) {
                // 使用 has() 和 get() 组合判断，兼容原生 JSON 库
                if ( param.get("food_name") != null) {
                    conditions.add("food_name LIKE ?");
                    params.add("%" + param.getString("food_name") + "%");
                }
                if ( param.get("food_type") != null) {
                    conditions.add("food_type = ?");
                    params.add(param.getString("food_type"));
                }
                if ( param.get("supplier") != null) {
                    conditions.add("supplier = ?");
                    params.add(param.getString("supplier"));
                }
                // 其他条件...
            }

            if (!conditions.isEmpty()) {
                sqlBuilder.append(" WHERE ").append(String.join(" AND ", conditions));
            }

            sqlBuilder.append(" ORDER BY food_name");
            String sql = sqlBuilder.toString();
            System.out.println("执行的 SQL: " + sql);
            System.out.println("查询参数: " + params);

            try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
                for (int i = 0; i < params.size(); i++) {
                    pstmt.setObject(i + 1, params.get(i));
                }

                List<Map<String, String>> list = new ArrayList<>();
                try (ResultSet rs = pstmt.executeQuery()) {
                    ResultSetMetaData metaData = rs.getMetaData();
                    int columnCount = metaData.getColumnCount();

                    while (rs.next()) {
                        Map<String, String> map = new HashMap<>();
                        for (int i = 1; i <= columnCount; i++) {
                            map.put(metaData.getColumnName(i), rs.getString(i));
                        }
                        list.add(map);
                    }
                }

                json.put("aaData", list);
                json.put("result_code", 0);
                json.put("result_msg", "ok");
                System.out.println("[WarehouseDao]finish! 查询结果数量: " + list.size());
            }

        } catch (SQLException e) {
            e.printStackTrace();
            json.put("result_code", 1);
            json.put("result_msg", "查询失败: " + e.getMessage());
        }
    }

//    public void getWarehouseRecord(JSONObject param, JSONObject json) {
//        System.out.println("[WarehouseDao/getWarehouseRecord]here!param=null");
//        String url = "jdbc:mysql://localhost:3306/KitchenWatchtower?";
//        String username = "root";
//        String password = "584237";
//
//        try {
//            Class.forName("com.mysql.cj.jdbc.Driver");
//        } catch (ClassNotFoundException e) {
//            e.printStackTrace();
//        }
//
//        try (Connection connection = DriverManager.getConnection(url, username, password);
//             Statement statement = connection.createStatement()) {
//
//            String sql = "SELECT * FROM warehouse ORDER BY food_name";
//            List<Map<String, String>> list = new ArrayList<>();
//
//            try (ResultSet rs = statement.executeQuery(sql)) {
//                ResultSetMetaData metaData = rs.getMetaData();
//                int columnCount = metaData.getColumnCount();
//
//                while (rs.next()) {
//                    Map<String, String> map = new HashMap<>();
//                    // 将每一行数据存入Map
//                    for (int i = 1; i <= columnCount; i++) {
//                        map.put(metaData.getColumnName(i), rs.getString(i));
//                    }
//                    list.add(map);
//                }
//            }
//
//            json.put("aaData", list);
//            json.put("result_code", 0);
//            json.put("result_msg", "ok");
//            System.out.println("[WarehouseDao]finish!");
//
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//    }

    public void addWarehouseRecord(Warehouse food, JSONObject json) {
        System.out.println("接收到的 Warehouse 对象：" + food);
        System.out.println("[WarehouseDao/addWarehouseRecord]here!food=" + food.toString());
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
            String food_type= food.getfoodType();
            String food_name = food.getfoodName();
            String food_keeptime = food.getLimitTime();
            String food_quantity = food.getfoodQuantity();
            String food_quality = food.getfoodQuality();
            String food_keepcondition = food.getfoodKeepCondition();
            String supplier = food.getfoodSupplier();
            String create_time=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());

            System.out.println("获取的食品信息：");
            System.out.println("食品类型: " + food_type);
            System.out.println("食品名称: " + food_name);
            System.out.println("保质期: " + food_keeptime);
            System.out.println("数量: " + food_quantity);
            System.out.println("质量: " + food_quality);
            System.out.println("保存条件: " + food_keepcondition);
            System.out.println("供应商: " + supplier);
            System.out.println("创建时间: " + create_time);

            String sql = String.format(
                    "INSERT INTO warehouse (food_name, food_type, food_keeptime, food_quantity,food_quality, supplier, food_keepcondition, create_time) VALUES ('%s', '%s', '%s','%s', '%s', '%s','%s', '%s')",
                    food_name, food_type, food_keeptime, food_quantity,food_quality, supplier, food_keepcondition, create_time
            );

            statement.executeUpdate(sql);

            json.put("result_code", 0);
            json.put("result_msg", "ok");
            System.out.println("[WarehouseDao/addWarehouseRecord]finish!");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public void getDeviceRecord(JSONObject param, JSONObject json) {
    }
    public void deleteWarehouseRecord(String id) throws Exception {
        String url = "jdbc:mysql://localhost:3306/KitchenWatchtower?useSSL=false&serverTimezone=UTC";
        String sql = "DELETE FROM warehouse WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(url, "root", "584237");
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, id);
            pstmt.executeUpdate();
            System.out.println("[WarehouseDao/deleteRecord]succdelete");
            System.out.println(pstmt);

        } catch (SQLException e) {
            throw new Exception("数据库操作失败：" + e.getMessage());
        }
    }

    public void updateWarehouseRecord(Warehouse food) throws Exception {
        String url = "jdbc:mysql://localhost:3306/KitchenWatchtower?useSSL=false&serverTimezone=UTC";
        // 仅更新food_quantity字段，通过food_id定位记录
        String sql = "UPDATE warehouse SET food_quantity = food_quantity - ? WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(url, "root", "584237");
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // 设置要扣除的数量（注意参数顺序）
            pstmt.setString(1, food.getfoodQuantity());

            String food_quantity = food.getfoodQuantity();

            System.out.println("数量: " + food_quantity);



            // 通过food_id定位记录
            pstmt.setString(2, food.getid());




            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new Exception("未找到对应的原料记录，出库失败");
            }

        } catch (SQLException e) {
            throw new Exception("原料出库操作失败：" + e.getMessage());
        }
    }

}
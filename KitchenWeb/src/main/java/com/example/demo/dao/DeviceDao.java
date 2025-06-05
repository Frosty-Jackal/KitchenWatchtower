package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Device;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;

public class DeviceDao {
    public void getDeviceRecord(JSONObject param,JSONObject json) {
        System.out.println("[DeviceDao/getDeviceRecord]here!param=null");
        String url =  "jdbc:mysql://localhost:3306/KitchenWatchtower?";
        String username="root";
        String password="584237";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        Connection connection = null;
        try {
            connection =  DriverManager.getConnection(url,  username, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        Statement statement=null;

        try {
            statement=connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        String sql="select * from device_file order by device_name";
        List list =  new ArrayList();
        try {
            ResultSet rs =  statement.executeQuery(sql);
            while(rs.next())
            {
                Map map =  new HashMap();
                map.put("device_id",rs.getString("device_id"));
                map.put("device_name",rs.getString("device_name"));
                map.put("device_type",rs.getString("device_type"));
                map.put("create_time",rs.getString("create_time"));
                list.add(map);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        json.put("aaData",list);
        json.put("result_code",0);
        json.put("result_msg","ok");
        System.out.println("[DeviceDao]finish!");
    }

    public void addDeviceRecord(Device device, JSONObject json) {
        System.out.println("[DeviceDao/addDeviceRecord]here!device="+device.toString());
        String url =  "jdbc:mysql://localhost:3306/KitchenWatchtower?";
        String username="root";
        String password="584237";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        Connection connection = null;
        try {
            connection =  DriverManager.getConnection(url,  username, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        Statement statement=null;

        try {
            statement=connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        String deviceId =  device.getDeviceid();
        String deviceName =  device.getDevicename();
        String deviceType =  device.getDevicetype();
        Date date=new Date();
        String  createTime= (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());

        String sql="insert into device_file(device_id,device_name,device_type,create_time)"+" values('"+deviceId+"','"+deviceName+"','"+deviceType+"','"+createTime+"')";
        List list =  new ArrayList();
        try {
            statement.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        json.put("aaData",list);
        json.put("result_code",0);
        json.put("result_msg","ok");
        System.out.println("[DeviceDao/addDeviceRecord]finish!");
    }
}

package com.example.demo.entity;

public class Device {
    String deviceid;
    String devicename;
    String devicetype;
    String createtime;

    public String getDeviceid() {
        return deviceid;
    }

    public void setDeviceid(String deviceid) {
        this.deviceid = deviceid;
    }

    public String getDevicename() {
        return devicename;
    }

    public void setDevicename(String devicename) {
        this.devicename = devicename;
    }

    public String getDevicetype() {
        return devicetype;
    }

    public void setDevicetype(String devicetype) {
        this.devicetype = devicetype;
    }

    public String getCreatetime() {
        return createtime;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }

    @Override
    public String toString() {
        return "Device{" +
                "deviceid='" + deviceid + '\'' +
                ", devicename='" + devicename + '\'' +
                ", devicetype='" + devicetype + '\'' +
                ", createtime='" + createtime + '\'' +
                '}';
    }
}

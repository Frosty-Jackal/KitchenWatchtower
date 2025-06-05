/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80042
Source Host           : localhost:3306
Source Database       : KitchenWatchtower

Target Server Type    : MYSQL
Target Server Version : 80042
File Encoding         : 65001

Date: 2025-06-05 16:45:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for liclic
-- ----------------------------
DROP TABLE IF EXISTS `liclic`;
CREATE TABLE `liclic` (
  `lic_id` int DEFAULT NULL,
  `lic_name` varchar(255) DEFAULT NULL,
  `limit_time` varchar(255) DEFAULT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of liclic
-- ----------------------------
INSERT INTO `liclic` VALUES ('12', '214', '2025-06-03', '5');
INSERT INTO `liclic` VALUES ('1234234', '唐彪', '43', '10');
INSERT INTO `liclic` VALUES ('232', '21', '2020-01-01', '11');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_idnumber` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '唐彪', '18228268719', '2023141460318', '2025-06-03 21:26:54');
INSERT INTO `user` VALUES ('3', '3', '18140481158', '21321321321321321321', '2025-06-03 23:23:26');
INSERT INTO `user` VALUES ('4', '李江', '15984226823', '213213213213213213', '2025-06-03 23:24:28');

-- ----------------------------
-- Table structure for warehouse
-- ----------------------------
DROP TABLE IF EXISTS `warehouse`;
CREATE TABLE `warehouse` (
  `id` int NOT NULL AUTO_INCREMENT,
  `food_name` varchar(255) DEFAULT NULL,
  `food_type` varchar(255) DEFAULT NULL,
  `food_quantity` varchar(255) DEFAULT NULL,
  `food_keeptime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `food_quality` varchar(255) DEFAULT NULL,
  `food_keepcondition` varchar(255) DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of warehouse
-- ----------------------------
INSERT INTO `warehouse` VALUES ('21', '梨子', '水果', '112', 'oneday', '2025-06-03 20:43:43', 'good', '冷藏', '唐彪');
INSERT INTO `warehouse` VALUES ('22', '胡萝', 'Vegetables', '143', 'onemonth', '2025-06-04 10:29:20', 'best', '冷藏', 'hr');

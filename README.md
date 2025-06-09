
# KitchenWatchtower

A team project for Sichuan University's Problem Solving Practical Course, implementing a kitchen monitoring system with real-time data visualization and mini-program integration.

<div align="center">
  <img src="page/Composition.jpg" alt="System Architecture" width="400" height="300">
</div>


## 🚀 Quick Start

### Run Web Application
1. Import project to IDEA:
   ```bash
   Drag the "KitchenWeb" directory into IntelliJ IDEA
   ```
2. Start application:
   - Click the "Run" button in IDEA
   - Access web interface via:
     ```
     http://localhost:8080/menu.html
     ```

### Database Preparation
1. Open terminal and navigate to project directory
   ```bash
   cd KITCHENWATCHTOWER
   ```

2. Log in to MySQL database
   ```bash
   mysql -u <your_username> -p
   ```
   Enter your MySQL password when prompted

3. Create new database with UTF8MB4 support
   ```sql
   CREATE DATABASE KitchenWatchtower 
   CHARACTER SET utf8mb4 
   COLLATE utf8mb4_unicode_ci;
   ```

4. Switch to the new database
   ```sql
   USE KitchenWatchtower;
   ```

5. Import SQL schema
   ```bash
   source ./KitchenWatchtower.sql
   ```

   _Database preparation completed!_

### Run Mini-Program
1. Ensure web application is running (as described above)

2. Update configuration files in web application:
   - Modify database connection settings in `KitchenWeb\src\main\java\com\example\demo\dao`
   - Update all the `root` and `password` parts 

3. Import project to WeChat Developer Tools:
   ```bash
   Drag the "KitchenMiniProgram" directory into WeChat Developer Tools
   ```

4. Update mini-program configuration:
   - Modify `appid` in `KitchenMiniProgram/project.config.json`
     ```json
     {
       "appid": "<your-app-id>"
     }
     ```

5. Build and preview:
   - Click "Compile" button in WeChat Developer Tools

   _start mini-program journey!_

## 📋 Recommended Requirements
- MySQL 8.0+ 

## 📂 Project Structure
```
KITCHENWATCHTOWER/
├── KitchenWeb/          # Web application source code
├── KitchenMiniProgram/  # WeChat mini-program source code
├── page/               # Documentation assets
└── KitchenWatchtower.sql # Database schema
```
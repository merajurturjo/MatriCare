# MatriCare - Maternal Health Support System

**MatriCare** is an open-source web application designed to reduce maternal mortality rates by providing critical health tracking and emergency features for expecting mothers.

## 🚀 Vision
In many regions, proper nutrition and timely medical intervention are often missed during pregnancy. MatriCare aims to bridge this gap by offering a simple, digital companion.

## ✨ Features
- **Pregnancy Tracker:** Predicts Expected Delivery Date (EDD) based on LMP.
- **Smart Health Insights:** Provides stage-specific dietary guidelines.
- **Emergency Connectivity:** Quick links to emergency services and hospitals.
- **Visual Dashboards:** Track weight, hydration, and vitamin intake.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+)
- **Future Integration:** Machine Learning for risk prediction.

## 📂 Project Structure
- `index.html`: Main interface and structure.
- `style.css`: UI/UX design and responsive layout.
- `script.js`: Core logic and date calculations.

## 📝 Contribution
This is an ongoing project. Feel free to fork this repository and submit pull requests for new features like AI Chatbots or Vaccine Reminders!

---

## 🗄️ Database Management System (DBMS) Design
Although the current version is a frontend prototype, it is designed to be integrated with a relational database (MySQL/PostgreSQL). Below is the proposed database schema for **MatriCare**.

### 📊 Entity-Relationship (ER) Overview
The system is designed to manage users (expecting mothers), their health milestones, and vaccination schedules.

### 💻 SQL Schema Implementation
You can use the following SQL commands to set up the database for this project:

```sql
-- 1. Table for storing user (mother's) information
CREATE TABLE Mothers (
    mother_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(15),
    lmp_date DATE NOT NULL, -- Last Menstrual Period
    edd_date DATE,          -- Estimated Delivery Date
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table for tracking health symptoms and milestones
CREATE TABLE Health_Logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    mother_id INT,
    week_number INT,
    weight_kg DECIMAL(5,2),
    blood_pressure VARCHAR(20),
    symptoms_noted TEXT,
    FOREIGN KEY (mother_id) REFERENCES Mothers(mother_id) ON DELETE CASCADE
);

-- 3. Table for vaccination and checkup schedules
CREATE TABLE Appointments (
    app_id INT PRIMARY KEY AUTO_INCREMENT,
    mother_id INT,
    purpose VARCHAR(100), -- e.g., Tetanus Vaccine, Regular Checkup
    scheduled_date DATE,
    status ENUM('Pending', 'Completed', 'Missed') DEFAULT 'Pending',
    FOREIGN KEY (mother_id) REFERENCES Mothers(mother_id) ON DELETE CASCADE
);

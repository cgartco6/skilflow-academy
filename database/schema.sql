-- SkillFlow Academy Database Schema
CREATE DATABASE IF NOT EXISTS skillflow_academy;
USE skillflow_academy;

-- Courses Table
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    modules INT DEFAULT 0,
    students INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    trending BOOLEAN DEFAULT FALSE,
    description TEXT,
    full_description TEXT,
    learning_outcomes JSON,
    instructor_name VARCHAR(255),
    instructor_title VARCHAR(255),
    icon VARCHAR(10),
    image_path VARCHAR(500),
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX category_idx (category),
    INDEX trending_idx (trending),
    INDEX price_idx (price)
);

-- Sales Table
CREATE TABLE sales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    customer_email VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'ZAR',
    payment_method ENUM('PayFast', 'Stripe', 'EFT') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
    download_token VARCHAR(100) UNIQUE,
    access_expiry DATE,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    INDEX payment_method_idx (payment_method),
    INDEX created_date_idx (created_date)
);

-- Business Analytics Table
CREATE TABLE business_analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE UNIQUE NOT NULL,
    revenue DECIMAL(15,2) DEFAULT 0,
    sales_count INT DEFAULT 0,
    new_customers INT DEFAULT 0,
    payment_method_breakdown JSON,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Marketing Campaigns Table
CREATE TABLE marketing_campaigns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    campaign_name VARCHAR(255) NOT NULL,
    platform VARCHAR(100) NOT NULL,
    status ENUM('active', 'paused', 'completed') DEFAULT 'active',
    budget DECIMAL(15,2) DEFAULT 0,
    spend DECIMAL(15,2) DEFAULT 0,
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    conversions INT DEFAULT 0,
    target_countries JSON,
    start_date DATE,
    end_date DATE,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX platform_idx (platform),
    INDEX status_idx (status)
);

-- Content Team Table
CREATE TABLE content_team (
    id INT PRIMARY KEY AUTO_INCREMENT,
    team_member VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    specialization VARCHAR(255),
    active_projects INT DEFAULT 0,
    completed_projects INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial course data
INSERT INTO courses (title, price, category, level, duration, modules, students, rating, trending, description) VALUES
('AI Prompt Engineering Mastery', 1799.00, 'Technology', 'Beginner to Advanced', '6 hours', 12, 12450, 4.9, TRUE, 'Master the art of communicating with AI systems for maximum productivity and creativity.'),
('Short-Form Video Domination', 1599.00, 'Marketing', 'All Levels', '5 hours', 10, 18700, 4.8, TRUE, 'Create viral content for TikTok, Reels, and Shorts that drives massive business growth.');

-- Insert content team data
INSERT INTO content_team (team_member, role, specialization, active_projects) VALUES
('Dr. Sarah Chen', 'Lead Instructor', 'AI & Machine Learning', 3),
('Marcus Johnson', 'Video Producer', 'Social Media Content', 4),
('Content Creation AI', 'Automated System', 'All Content Types', 12);

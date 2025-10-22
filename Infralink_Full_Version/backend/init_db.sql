-- Create database and tables for Infralink with mock data

DROP DATABASE IF EXISTS infralink_db;
CREATE DATABASE infralink_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE infralink_db;

-- Projects table
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  status ENUM('Active','Completed','Delayed') NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NULL,
  progress INT NOT NULL CHECK (progress BETWEEN 0 AND 100)
);

-- Updates table
CREATE TABLE updates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  update_text VARCHAR(500) NOT NULL,
  timestamp DATETIME NOT NULL,
  CONSTRAINT fk_updates_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Feedback table
CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  feedback_text VARCHAR(500) NOT NULL,
  submitted_at DATETIME NOT NULL
);

-- Mock projects (3)
INSERT INTO projects (name, status, start_date, end_date, progress) VALUES
('Bridge Expansion - Riverdale', 'Active', '2025-07-01', NULL, 42),
('City Metro Line 2', 'Delayed', '2024-01-15', NULL, 65),
('Water Treatment Plant Upgrade', 'Completed', '2023-04-01', '2024-12-20', 100);

-- Mock updates (5)
INSERT INTO updates (project_id, update_text, timestamp) VALUES
(1, 'Piling works commenced on the east bank.', '2025-10-10 09:30:00'),
(1, 'All materials delivered ahead of schedule.', '2025-10-14 16:00:00'),
(2, 'Tunnel Boring Machine maintenance caused a 1-week delay.', '2025-09-29 11:15:00'),
(2, 'Electrical systems integration testing started.', '2025-10-12 14:45:00'),
(3, 'Final inspection passed; project closed.', '2024-12-20 10:00:00');

-- Mock feedback (2)
INSERT INTO feedback (name, email, feedback_text, submitted_at) VALUES
('Asha Mehta', 'asha@example.com', 'Great to see regular updates on the metro project.', '2025-10-01 12:05:00'),
('Ravi Kumar', 'ravi@example.com', 'Please add a map view for project locations.', '2025-10-05 09:20:00');



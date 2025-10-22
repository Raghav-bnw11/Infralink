# Infralink
Infralink – Real-time Infrastructure Project Tracking Web App A full-stack prototype to monitor construction and infrastructure projects, with a web-based dashboard, real-time updates, and user feedback collection. Built using HTML/CSS/JS, Flask, and MySQL.

# Infralink – Infrastructure Project Tracking Web App

Infralink is a full-stack web application prototype designed to provide real-time updates on construction and infrastructure projects. It enables users to view project timelines, progress, updates, and submit feedback, aiming to improve transparency and communication in urban development.

## Features

### Frontend
- Responsive web pages using **HTML, CSS, Bootstrap, and JavaScript**
- Pages include:
  - **Home** – Introduction and overview
  - **Dashboard** – Project status, timelines, and progress bars
  - **Updates** – Recent updates for ongoing projects
  - **Feedback** – Submit feedback to authorities or project managers
- Fetches live data from the backend via **AJAX / Fetch API**

### Backend
- **Flask REST API** with endpoints:
  - `/api/projects` – Fetch project list
  - `/api/updates` – Fetch project updates
  - `/api/feedback` – Submit user feedback
- Implements **CORS** to allow frontend integration

### Database
- **MySQL** database to store:
  - `projects` – Project details and progress
  - `updates` – Real-time project updates
  - `feedback` – User feedback submissions
- CRUD operations fully implemented

### Integration
- Frontend and backend connected via **AJAX / Fetch API**
- Real-time updates reflected on the dashboard
- Feedback submissions stored in MySQL

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository_url>
cd Infralink_Full_Version

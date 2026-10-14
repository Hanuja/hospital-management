# 🏥 MediCare Plus – Full-Stack Hospital Management Web Application

MediCare Plus is a modern, premium, responsive full-stack Hospital Management System built with **React.js, Vite, Tailwind CSS, Framer Motion, PHP REST API, and MySQL**.

---

## 🎨 Technology Stack

### Frontend
- **React.js 18+** & **Vite**
- **Tailwind CSS** (MediCare Plus Custom Brand Palette: `#0F4C81`, `#16A3A8`, `#22C55E`, `#DC2626`)
- **Framer Motion** (Smooth transitions & micro-interactions)
- **Lucide React** (Modern medical icon set)
- **Axios** (API HTTP Client with mock fallback layer)
- **React Helmet Async** (SEO Title & Meta tags)
- **React Hot Toast** (Toast notifications)

### Backend
- **PHP 8+**
- **RESTful API Structure**
- **PDO Prepared Statements**
- **JSON API Responses & CORS Configuration**

### Database
- **MySQL / MariaDB**
- **phpMyAdmin (XAMPP)**

---

## ⚡ Features & Modules

1. **Responsive Navbar & Sticky Header**: Subtitle, Emergency Call action (+94 11 999 9999), 13 navigation links, and mobile slide-down menu.
2. **Dynamic Home Landing Page**: Hero banner, 6 quick service cards, stats counters, 8 department previews, featured doctors slider, health packages, testimonial slider, facilities preview, and CTA.
3. **Filterable Doctor Directory**: Search by name, specialization, or department with filters for department, experience, and gender.
4. **Doctor Quick View Modal**: Large photo, qualifications, bio, schedule, fees, and instant booking trigger.
5. **16 Clinical Departments**: Detailed listing of Cardiology, Neurology, Orthopedics, Pediatrics, Oncology, Gynecology, etc.
6. **Separate Appointment Booking Flow (`/appointment`)**: 4-step multi-step form (Patient Info → Medical Selection → Date/Time → Confirmation).
7. **Separate Payment Gateway (`/payment`)**: Supports Credit/Debit Card, Online Banking, Mobile Wallet, and Pay at Hospital modes.
8. **Printable / Downloadable Official Receipt**: Printable modal with MediCare Plus letterhead, transaction ID, and booking breakdown.
9. **Interactive Health Packages**: Packages starting from $199 with included test lists.
10. **Filterable Photo Gallery**: Categories for Facilities, Departments, Camps, Events, Team + Lightbox Zoom Modal.
11. **Patient Testimonials & Reviews**: Star ratings, verified patient badges, and Write a Review modal saving to MySQL.
12. **Hospital Careers & Job Portal**: 7 job listings + Apply Now modal with CV/Resume upload saving to MySQL.
13. **FAQ Accordion System**: Categories, search, and collapsible accordions.
14. **Contact Page with Google Maps & WhatsApp**: Google Maps embed, hospital hotline, WhatsApp chat trigger, and contact form.
15. **Floating Widgets**: Floating emergency phone call button (`tel:+94119999999`) and WhatsApp chat button.
16. **Admin Control Portal (`/admin`)**: Sidebar navigation, stats cards, Doctor CRUD, Department management, Appointment operations, Payment records, and Testimonial approvals.

---

## ▶️ XAMPP & Local Installation Guide

### Step 1: Install XAMPP
Download and install [XAMPP](https://www.apachefriends.org/) (with Apache & MySQL enabled).

### Step 2: Start Services
Open the XAMPP Control Panel and start both **Apache** and **MySQL**.

### Step 3: Create Database
Open your browser and navigate to:
```
http://localhost/phpmyadmin/
```
Create a new database named:
```
medicare_plus
```

### Step 4: Import Database Dump
Click on the `medicare_plus` database in phpMyAdmin, go to the **Import** tab, choose the file:
```
database/hospital.sql
```
and click **Import**.

### Step 5: Setup Backend
Copy the `backend/` folder into your XAMPP htdocs directory:
```
C:\xampp\htdocs\hospital-management\backend\
```

### Step 6: Start Frontend Development Server
Open VS Code terminal in the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```

### Step 7: Access Application
Open your web browser and navigate to:
```
http://localhost:5173
```

---

## 🔐 Credentials for Demo

- **Admin Account**: `admin@medicareplus.com` / `admin123`
- **Patient Account**: `patient@medicareplus.com` / `patient123`

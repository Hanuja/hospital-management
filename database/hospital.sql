-- phpMyAdmin SQL Dump
-- MediCare Plus Hospital Management System Database Schema
-- Compatible with MySQL / MariaDB (XAMPP)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Database Creation
CREATE DATABASE IF NOT EXISTS `medicare_plus` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `medicare_plus`;

-- 1. Users Table (Patients & Admins)
DROP TABLE IF EXISTS `job_applications`;
DROP TABLE IF EXISTS `careers`;
DROP TABLE IF EXISTS `testimonials`;
DROP TABLE IF EXISTS `gallery`;
DROP TABLE IF EXISTS `faqs`;
DROP TABLE IF EXISTS `contact_messages`;
DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `appointments`;
DROP TABLE IF EXISTS `health_packages`;
DROP TABLE IF EXISTS `doctors`;
DROP TABLE IF EXISTS `departments`;
DROP TABLE IF EXISTS `patients`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `role` enum('patient','admin') NOT NULL DEFAULT 'patient',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 2. Patients Table
CREATE TABLE `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `nic` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT 'Male',
  `address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk_patient_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 3. Departments Table
CREATE TABLE `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `icon` varchar(50) DEFAULT 'Activity',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 4. Doctors Table
CREATE TABLE `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `qualification` varchar(150) NOT NULL,
  `specialization` varchar(150) NOT NULL,
  `experience` int(11) NOT NULL DEFAULT 5,
  `gender` enum('Male','Female') DEFAULT 'Male',
  `bio` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `consultation_fee` decimal(10,2) NOT NULL DEFAULT 50.00,
  `availability` varchar(100) DEFAULT 'Mon - Fri, 9:00 AM - 4:00 PM',
  `rating` decimal(3,2) DEFAULT 4.90,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `fk_doctor_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 5. Health Packages Table
CREATE TABLE `health_packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `age_group` varchar(50) DEFAULT '18-60',
  `tests` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 6. Appointments Table
CREATE TABLE `appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `patient_name` varchar(150) NOT NULL,
  `patient_email` varchar(150) NOT NULL,
  `patient_phone` varchar(30) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` varchar(20) NOT NULL,
  `consultation_type` enum('In-person','Online') DEFAULT 'In-person',
  `reason` varchar(255) DEFAULT NULL,
  `medical_notes` text DEFAULT NULL,
  `status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 7. Payments Table
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appointment_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL DEFAULT 'Card',
  `transaction_id` varchar(100) NOT NULL,
  `status` enum('pending','completed','failed') NOT NULL DEFAULT 'completed',
  `paid_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `appointment_id` (`appointment_id`),
  CONSTRAINT `fk_payment_appointment` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 8. Gallery Table
CREATE TABLE `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 9. Testimonials Table
CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(150) NOT NULL,
  `patient_email` varchar(150) DEFAULT NULL,
  `patient_photo` varchar(255) DEFAULT NULL,
  `treatment` varchar(150) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `doctor` varchar(150) DEFAULT NULL,
  `rating` int(1) NOT NULL DEFAULT 5,
  `testimonial` text NOT NULL,
  `before_after` text DEFAULT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('approved','pending','rejected') NOT NULL DEFAULT 'approved',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 10. Careers Table
CREATE TABLE `careers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department` varchar(100) NOT NULL,
  `job_title` varchar(150) NOT NULL,
  `location` varchar(100) DEFAULT 'Colombo, Sri Lanka',
  `employment_type` varchar(50) DEFAULT 'Full-Time',
  `experience` varchar(50) DEFAULT '2+ Years',
  `qualifications` text DEFAULT NULL,
  `salary` varchar(100) DEFAULT 'Competitive',
  `benefits` text DEFAULT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 11. Job Applications Table
CREATE TABLE `job_applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `career_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `qualification` varchar(150) DEFAULT NULL,
  `experience` varchar(50) DEFAULT NULL,
  `cover_letter` text DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `status` enum('submitted','reviewing','shortlisted','rejected') DEFAULT 'submitted',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `career_id` (`career_id`),
  CONSTRAINT `fk_app_career` FOREIGN KEY (`career_id`) REFERENCES `careers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 12. FAQs Table
CREATE TABLE `faqs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL DEFAULT 'General',
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 13. Contact Messages Table
CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read','replied') DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- SEED DEMO DATA
-- --------------------------------------------------------

-- Users Seed (Admin password: admin123, Patient password: patient123 hashed with password_hash)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `role`) VALUES
(1, 'System Admin', 'admin@medicareplus.com', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeFv8.wK2d7BsmPxgR3O5r0E9fS3gYwSm', '+94 11 234 5678', 'admin'),
(2, 'John Silva', 'patient@medicareplus.com', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeFv8.wK2d7BsmPxgR3O5r0E9fS3gYwSm', '+94 77 123 4567', 'patient');

INSERT INTO `patients` (`id`, `user_id`, `nic`, `dob`, `gender`, `address`) VALUES
(1, 2, '199012345678', '1990-05-15', 'Male', '45 Galle Road, Colombo 03, Sri Lanka');

-- Departments Seed (16 Departments)
INSERT INTO `departments` (`id`, `name`, `description`, `image`, `icon`) VALUES
(1, 'Cardiology', 'Advanced heart care, diagnostics, angioplasty, and cardiac rehabilitation led by top cardiologists.', 'https://i.pinimg.com/736x/d6/19/ea/d619eaf6c12546f496bae8d258e79368.jpg', 'Heart'),
(2, 'Neurology', 'Comprehensive diagnosis and treatment for brain, spinal cord, and neuromuscular disorders.', 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80', 'Brain'),
(3, 'Orthopedics', 'Specialized care for joint replacements, complex fractures, sports injuries, and spine health.', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', 'Bone'),
(4, 'Pediatrics', 'Dedicated child healthcare, neonatal intensive care, pediatric surgery, and growth monitoring.', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80', 'Baby'),
(5, 'Oncology', 'State-of-the-art cancer care offering chemotherapy, radiation therapy, and surgical oncology.', 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80', 'ShieldPulse'),
(6, 'Gynecology', 'Comprehensive women healthcare, high-risk pregnancy care, maternity wards, and laparoscopic surgery.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', 'UserCheck'),
(7, 'General Medicine', 'Holistic internal medicine services, preventive health screenings, and chronic illness management.', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80', 'Stethoscope'),
(8, 'Dermatology', 'Advanced medical, surgical, and cosmetic skin treatments using cutting-edge laser technologies.', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80', 'Sparkles'),
(9, 'ENT (Ear, Nose, Throat)', 'Complete ENT diagnosis, hearing restoration, sinus surgery, and speech therapy.', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80', 'Ear'),
(10, 'Urology', 'Treatment for kidney stones, prostate health, male infertility, and reconstructive urology.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', 'Activity'),
(11, 'Nephrology', 'Advanced kidney care, hemodialysis unit, peritoneal dialysis, and kidney transplant services.', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80', 'Droplet'),
(12, 'Gastroenterology', 'Diagnostic endoscopy, liver disease management, and minimally invasive digestive treatments.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', 'Crosshair'),
(13, 'Pulmonology', 'Expert respiratory care for asthma, COPD, pulmonary fibrosis, and sleep apnea.', 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80', 'Wind'),
(14, 'Ophthalmology', 'Comprehensive eye care, laser vision correction, cataract surgery, and glaucoma management.', 'https://images.unsplash.com/photo-1583912267670-6575ad3736be?auto=format&fit=crop&w=800&q=80', 'Eye'),
(15, 'Psychiatry', 'Empathetic mental health counseling, psychiatric evaluations, and behavioral therapy.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', 'Smile'),
(16, 'Dental Care', 'Cosmetic dentistry, root canals, dental implants, orthodontics, and oral surgery.', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80', 'SmilePlus');

-- Doctors Seed (10 Doctors)
INSERT INTO `doctors` (`id`, `department_id`, `name`, `qualification`, `specialization`, `experience`, `gender`, `bio`, `image`, `consultation_fee`, `availability`, `rating`) VALUES
(1, 1, 'Dr. Aris Thorne', 'MD, FACC, FRCP (UK)', 'Interventional Cardiology', 18, 'Male', 'Dr. Aris Thorne is a globally recognized interventional cardiologist with over 18 years of experience performing complex coronary angioplasties and cardiac valve repairs.', 'https://i.pinimg.com/736x/d9/fb/38/d9fb38046a2da8cd32a5dc4bf708e2c1.jpg', 75.00, 'Mon - Fri, 8:00 AM - 2:00 PM', 4.95),
(2, 2, 'Dr. Elena Rostova', 'MBBS, MD (Neurology), DM', 'Brain & Spine Surgery', 14, 'Female', 'Specialist in cerebrovascular surgery, stroke rehabilitation, and neuro-oncology with numerous research publications in international journals.', 'https://images.unsplash.com/photo-1594824813566-78a05349b29e?auto=format&fit=crop&w=800&q=80', 80.00, 'Mon - Sat, 10:00 AM - 4:00 PM', 4.92),
(3, 3, 'Dr. Marcus Vance', 'MS (Orthopedics), FRCS', 'Joint Replacement & Spine', 16, 'Male', 'Leading orthopedic surgeon specializing in robotic knee and hip replacements, arthroscopic sports surgery, and complex spinal alignment.', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80', 70.00, 'Tue - Sun, 9:00 AM - 3:00 PM', 4.89),
(4, 4, 'Dr. Sophia Chen', 'MD (Pediatrics), DCH', 'Neonatal & Child Intensive Care', 12, 'Female', 'Compassionate pediatrician focused on newborn care, developmental pediatric health, and childhood immunizations.', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80', 60.00, 'Mon - Fri, 9:00 AM - 5:00 PM', 4.97),
(5, 5, 'Dr. Julian Sterling', 'MD, DM (Oncology), ESMO', 'Surgical & Medical Oncology', 20, 'Male', 'Renowned oncologist heading the MediCare Plus Cancer Care Centre, pioneering immunotherapy and targeted cancer treatments.', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80', 90.00, 'Mon - Thu, 10:00 AM - 2:00 PM', 4.98),
(6, 6, 'Dr. Sarah Al-Mansoor', 'MBBS, MS (OB/GYN), FICOG', 'Maternity & High-Risk Pregnancy', 15, 'Female', 'Expert obstetrician and laparoscopic surgeon with deep commitment to empowering safe, painless delivery and maternal wellness.', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80', 65.00, 'Mon - Sat, 8:30 AM - 1:30 PM', 4.94),
(7, 7, 'Dr. David Miller', 'MD (Internal Med), FACP', 'General Medicine & Prevention', 22, 'Male', 'Senior consultant in internal medicine specializing in lifestyle diseases, diabetes control, and preventive executive checkups.', 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=800&q=80', 50.00, 'Mon - Fri, 8:00 AM - 4:00 PM', 4.88),
(8, 8, 'Dr. Natasha Perera', 'MD (Dermatology), FAAD', 'Medical & Aesthetic Dermatology', 10, 'Female', 'Specialist in laser treatments, eczema management, skin rejuvenation, and pediatric skin conditions.', 'https://images.unsplash.com/photo-1594824813566-78a05349b29e?auto=format&fit=crop&w=800&q=80', 55.00, 'Tue - Sat, 11
(9, 11, 'Dr. Kenneth Cole', 'MD, DM (Nephrology)', 'Kidney Transplants & Dialysis', 17, 'Male', 'Head of Nephrology overseeing our state-of-the-art dialysis center and adult kidney transplantation program.', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80', 75.00, 'Mon - Fri, 9:00 AM - 3:00 PM', 4.93),
(10, 16, 'Dr. Hannah Wright', 'BDS, MDS (Oral Surgery)', 'Cosmetic & Implant Dentistry', 11, 'Female', 'Expert dental surgeon providing smile redesigns, painless root canals, dental implants, and laser gum treatments.', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80', 45.00, 'Mon - Sat, 9:00 AM - 6:00 PM', 4.96);

-- Health Packages Seed (6 Packages)
INSERT INTO `health_packages` (`id`, `name`, `description`, `price`, `age_group`, `tests`, `image`) VALUES
(1, 'Full Body Checkup', 'Complete health evaluation package designed for early detection, preventive care, and overall wellness monitoring with advanced medical tests.', 199.00, '18-60', 'CBC, Blood Sugar, Lipid Profile, Liver Function (LFT), Kidney Function (KFT), ECG, Chest X-Ray, Ultrasound Abdomen, Senior Doctor Consultation', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'),
(2, 'Senior Citizen Package', 'Tailored health monitoring for seniors focusing on bone density, cardiac screening, joint health, and vital organ wellness.', 249.00, '60+', 'CBC, HbA1c, Lipid Profile, LFT, KFT, Vitamin D & B12, Bone Mineral Density (DEXA), ECG, Echocardiogram, Eye Checkup, Specialist Consultation', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80'),
(3, 'Women\'s Health Package', 'Comprehensive wellness screening designed for women covering hormonal health, breast screening, thyroid profile, and pap smear.', 229.00, '18-55', 'Complete Blood Count, Thyroid Profile (T3, T4, TSH), Pap Smear, Mammogram / Breast USG, Pelvic USG, Vitamin D3, Gynaecologist Consultation', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'),
(4, 'Children\'s Health Package', 'Pediatric growth assessment, vision screening, nutritional checkup, and routine developmental milestone tracking.', 129.00, '0-16', 'Complete Blood Count, Urine Routine, Stool Analysis, Vision & Hearing Test, Growth Charting, Pediatrician Consultation', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80'),
(5, 'Heart Health Package', 'Specialized cardiovascular risk evaluation with 2D Echo, Stress Test, Lipid Subfractions, and Cardiac Consult.', 299.00, '30+', 'Lipid Profile, Cardiac Markers (Troponin, hs-CRP), ECG, Treadmill Stress Test (TMT), 2D Echocardiogram, Cardiologist Consultation', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'),
(6, 'Diabetes Screening Package', 'Thorough glycemic assessment, HbA1c, renal function, retinal scan, and customized diabetic diet consultation.', 149.00, '25+', 'Fasting & PP Blood Sugar, HbA1c, Microalbumin, Kidney Profile, Diabetic Retinopathy Screen, Dietitian & Endocrinologist Consult', 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80');

-- Appointments Seed
INSERT INTO `appointments` (`id`, `patient_id`, `patient_name`, `patient_email`, `patient_phone`, `doctor_id`, `department_id`, `package_id`, `appointment_date`, `appointment_time`, `consultation_type`, `reason`, `status`) VALUES
(1001, 1, 'John Silva', 'patient@medicareplus.com', '+94 77 123 4567', 1, 1, NULL, '2026-08-15', '10:00 AM', 'In-person', 'Routine Cardiac Checkup and Blood Pressure evaluation.', 'confirmed'),
(1002, 1, 'John Silva', 'patient@medicareplus.com', '+94 77 123 4567', 4, 4, 4, '2026-08-20', '02:30 PM', 'In-person', 'Children Health Package screening for my son.', 'pending');

-- Payments Seed
INSERT INTO `payments` (`id`, `appointment_id`, `amount`, `payment_method`, `transaction_id`, `status`, `paid_at`) VALUES
(5001, 1001, 75.00, 'Credit Card', 'MCP-TXN-9847123', 'completed', '2026-08-09 10:15:00');

-- Gallery Seed (10 Images)
INSERT INTO `gallery` (`id`, `title`, `image`, `category`, `description`) VALUES
(1, 'State-of-the-Art Operation Theatre', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', 'Hospital Facilities', 'Modular ultra-clean operation theatre equipped with HD laparoscopy and robotic surgical suites.'),
(2, 'Advanced Intensive Care Unit (ICU)', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', 'Hospital Facilities', '24/7 dedicated critical care monitoring unit with bedside ventilators and isolation beds.'),
(3, 'Cardiology Diagnostic Hub', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80', 'Medical Departments', '3D Cath Lab and cardiac imaging equipment for non-invasive heart diagnosis.'),
(4, 'Free Community Health Camp 2025', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', 'Health Camps', 'Over 1,200 rural citizens received complimentary health screenings and medicines.'),
(5, 'Executive Patient Suite', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80', 'Patient Care', 'Private luxury patient rooms featuring smart beds, nurse call buttons, and ambient lighting.'),
(6, 'Annual Healthcare Excellence Awards', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', 'Events', 'Celebrating 25 years of compassionate care and medical breakthroughs.'),
(7, '24/7 Emergency & Trauma Response Team', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80', 'Medical Team', 'Our specialized trauma physicians and mobile ICU paramedics.'),
(8, 'Pediatric Play & Healing Ward', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80', 'Medical Departments', 'Child-friendly recovery environment designed to comfort young patients.'),
(9, 'Robotic Surgery Milestone Celebration', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', 'Celebrations', 'Completion of 1,000 successful minimally invasive robotic surgeries.'),
(10, 'Blood Donation Drive', 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80', 'Community Programs', 'Collecting 500+ units of life-saving blood in collaboration with the Red Cross.');

-- Testimonials Seed (8 Testimonials)
INSERT INTO `testimonials` (`id`, `patient_name`, `patient_email`, `patient_photo`, `treatment`, `department`, `doctor`, `rating`, `testimonial`, `verified`, `status`) VALUES
(1, 'John Silva', 'john@example.com', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 'Angioplasty Surgery', 'Cardiology', 'Dr. Aris Thorne', 5, 'The cardiac team at MediCare Plus saved my life! Dr. Thorne performed my angioplasty with utmost precision. The nursing staff treated me like family.', 1, 'approved'),
(2, 'Amara Fernando', 'amara@example.com', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', 'Maternity & Normal Delivery', 'Gynecology', 'Dr. Sarah Al-Mansoor', 5, 'I delivered my first baby girl here. Dr. Sarah was supportive throughout my pregnancy. The maternity suite felt like a 5-star hotel!', 1, 'approved'),
(3, 'Robert Vance', 'robert@example.com', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', 'Total Knee Replacement', 'Orthopedics', 'Dr. Marcus Vance', 5, 'After 5 years of severe knee pain, I can now walk painless thanks to robotic knee surgery at MediCare Plus. Truly world-class hospital care!', 1, 'approved'),
(4, 'Priya Wickramasinghe', 'priya@example.com', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', 'Pediatric Care', 'Pediatrics', 'Dr. Sophia Chen', 5, 'Dr. Sophia Chen is an angel! She diagnosed my son\'s respiratory infection quickly and gave him the best treatment without unnecessary stress.', 1, 'approved'),
(5, 'Michael Scott', 'michael@example.com', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', 'Full Body Executive Screening', 'Health Packages', 'Dr. David Miller', 5, 'The Full Body Checkup was seamless. I completed 12 diagnostic tests in 2 hours, and Dr. Miller explained every result clearly.', 1, 'approved'),
(6, 'Nimali Jayawardena', 'nimali@example.com', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', 'Chemotherapy & Recovery', 'Oncology', 'Dr. Julian Sterling', 5, 'Cancer treatment is scary, but Dr. Sterling and the MediCare Plus Oncology team gave me hope and treated me with deep compassion.', 1, 'approved'),
(7, 'Kasun Perera', 'kasun@example.com', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', 'Emergency Trauma Care', 'Emergency Unit', 'Dr. Aris Thorne', 5, 'Brought my dad after a sudden heart event at 2 AM. The emergency team responded within seconds! Forever grateful to MediCare Plus.', 1, 'approved'),
(8, 'Dilani Alwis', 'dilani@example.com', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80', 'Laser Skin Treatment', 'Dermatology', 'Dr. Natasha Perera', 5, 'Dr. Natasha resolved my chronic skin inflammation with modern laser technology. Excellent hygiene standards and polite doctors.', 1, 'approved');

-- Careers Seed (7 Jobs)
INSERT INTO `careers` (`id`, `department`, `job_title`, `location`, `employment_type`, `experience`, `qualifications`, `salary`, `benefits`, `description`) VALUES
(1, 'Cardiology', 'Senior Consultant Cardiologist', 'Colombo, Sri Lanka', 'Full-Time', '10+ Years', 'MD / DM Cardiology, FRCP or equivalent registration', '$8,000 - $12,000 / month', 'Housing allowance, Medical insurance, Research grants', 'We are seeking an experienced Interventional Cardiologist to lead cardiac catheterization procedures and mentor junior medical fellows.'),
(2, 'Nursing', 'ICU Staff Nurse (Night/Day Shift)', 'Colombo, Sri Lanka', 'Full-Time', '3+ Years', 'B.Sc Nursing / Diploma in Nursing, Nursing Council Registered', '$1,200 - $1,800 / month', 'Shift bonuses, Uniform allowance, Health insurance', 'Provide compassionate bedside critical care, ventilator monitoring, and medication administration in our 30-bed adult ICU.'),
(3, 'Pharmacy', 'Registered Hospital Pharmacist', 'Colombo, Sri Lanka', 'Full-Time', '2+ Years', 'B.Pharm / M.Pharm, Registered Pharmacist license', '$1,000 - $1,500 / month', 'Performance bonus, Continued pharmaceutical training', 'Manage inpatient and outpatient prescription dispensing, drug safety audits, and inventory control.'),
(4, 'Laboratory', 'Medical Laboratory Technologist (MLT)', 'Colombo, Sri Lanka', 'Full-Time', '2+ Years', 'Degree / Diploma in Medical Laboratory Technology', '$900 - $1,300 / month', 'Health insurance, Night shift allowance', 'Perform biochemistry, hematology, and microbiological automated lab testing following strict ISO safety protocols.'),
(5, 'Front Office', 'Healthcare Receptionist & Coordinator', 'Colombo, Sri Lanka', 'Full-Time', '1+ Year', 'Diploma / Bachelor\'s degree, Fluency in English & Sinhala', '$700 - $1,000 / month', 'Overtime pay, Employee health discounts', 'Greet patients, assist with appointment scheduling, handle hospital inquiries, and coordinate admission desk procedures.'),
(6, 'IT & Health Systems', 'Full-Stack Software Developer', 'Colombo, Sri Lanka', 'Full-Time', '3+ Years', 'B.Sc in Computer Science / IT, Experience with React & PHP/Node', '$1,500 - $2,500 / month', 'Remote flexibility, Tech equipment stipend', 'Maintain and enhance MediCare Plus digital hospital platform, electronic health records (EHR), and patient booking portals.'),
(7, 'Human Resources', 'HR Executive & Recruiter', 'Colombo, Sri Lanka', 'Full-Time', '3+ Years', 'Bachelor\'s in Human Resources / Business Administration', '$1,100 - $1,600 / month', 'Annual leave bonus, Professional membership sponsorship', 'Lead medical recruitment drives, staff onboarding, performance reviews, and hospital employee welfare initiatives.');

-- FAQs Seed (20 FAQs)
INSERT I:00 AM - 5:00 PM', 4.91),NTO `faqs` (`id`, `category`, `question`, `answer`, `status`) VALUES
(1, 'Appointments', 'How can I book an appointment with a specialist?', 'You can book an appointment online via our "Book Appointment" page by choosing your desired department, doctor, date, and preferred time slot. Alternatively, call our appointment hotline at +94 11 234 5678.', 'active'),
(2, 'Appointments', 'Can I reschedule or cancel my booked appointment?', 'Yes. You can reschedule or cancel your appointment at least 4 hours before your scheduled time slot through your Patient Dashboard or by contacting customer support.', 'active'),
(3, 'Appointments', 'Are walk-in consultations allowed?', 'While we accommodate walk-in consultations based on doctor availability, we strongly advise booking online to avoid long waiting times.', 'active'),
(4, 'Doctors', 'How do I check doctor consultation hours?', 'Doctor consultation hours are displayed on each doctor\'s profile in our Doctor Directory page and on the quick-view doctor modal.', 'active'),
(5, 'Doctors', 'Can I request a second opinion from a specialist?', 'Absolutely. You can book a second opinion consultation with any of our senior department heads by presenting your previous diagnostic reports.', 'active'),
(6, 'Emergency', 'Is emergency medical service available 24/7?', 'Yes! Our Trauma & Emergency Care Unit operates 24 hours a day, 7 days a week, 365 days a year with dedicated trauma doctors and advanced ambulances.', 'active'),
(7, 'Emergency', 'What is the emergency contact hotline?', 'For immediate medical emergencies, call +94 11 999 9999 or hit the floating red emergency button on our website to initiate a direct call.', 'active'),
(8, 'Payments', 'What payment methods do you accept?', 'We accept Credit/Debit Cards (Visa, MasterCard, Amex), Online Banking, Mobile Wallets, and cash payments directly at the hospital reception.', 'active'),
(9, 'Payments', 'Will I receive an official receipt after online payment?', 'Yes! Upon completing payment on our Payment page, a digital receipt with transaction ID and appointment details is generated instantly for viewing and download.', 'active'),
(10, 'Insurance', 'Which health insurance providers do you work with?', 'MediCare Plus partners with all major international and local insurance providers. Our Insurance Desk assists with cashless hospitalization claims.', 'active'),
(11, 'Health Packages', 'Do I need to fast before taking a Full Body Checkup?', 'Yes. Most comprehensive packages (including lipid and blood sugar tests) require 8 to 12 hours of overnight fasting prior to blood sample collection.', 'active'),
(12, 'Health Packages', 'How long does a health package checkup take?', 'Comprehensive checkups typically take between 2 to 3 hours. Diagnostic results are made available on your online profile within 24 hours.', 'active'),
(13, 'Visiting Hours', 'What are the visiting hours for ward patients?', 'Regular ward visiting hours are 11:00 AM - 1:00 PM in the morning and 4:30 PM - 7:00 PM in the evening. ICU visiting hours are strictly restricted to close family.', 'active'),
(14, 'Laboratory', 'Can I get lab samples collected from my home?', 'Yes, MediCare Plus offers home sample collection services for elderly and bedridden patients. Contact our laboratory desk to schedule home collection.', 'active'),
(15, 'Laboratory', 'How do I download my laboratory test reports?', 'You can log into your MediCare Plus patient account and download PDF reports directly under "My Medical Records".', 'active'),
(16, 'Pharmacy', 'Is the hospital pharmacy open 24 hours?', 'Yes, our inpatient and outpatient pharmacies operate round-the-clock with genuine prescription medications.', 'active'),
(17, 'Treatments', 'What advanced surgical technologies are available at MediCare Plus?', 'We offer robotic-assisted surgeries, 3D cardiac catheterization, 128-Slice CT imaging, 3T MRI, and laparoscopic keyhole procedures.', 'active'),
(18, 'Careers', 'How can I apply for open positions at MediCare Plus?', 'Visit our Careers page, select the desired job opening, click "Apply Now", fill in your details, and submit your CV / resume.', 'active'),
(19, 'Contact', 'Where is MediCare Plus hospital located?', 'We are situated at No. 123 Health Avenue, Medical District, Colombo, Sri Lanka. Detailed directions and Google Map navigation are available on our Contact page.', 'active'),
(20, 'Contact', 'Can I request medical assistance via WhatsApp?', 'Yes! You can chat directly with our care coordinators using our floating WhatsApp button on the bottom right of the screen.', 'active');

COMMIT;

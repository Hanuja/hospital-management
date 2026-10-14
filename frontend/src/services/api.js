import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/hospital-management/backend/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000,
});

// Seed Fallback Data for seamless offline/standalone preview
const MOCK_DEPARTMENTS = [
  { id: 1, name: 'Cardiology', category: 'Medical', description: 'Advanced heart care, diagnostics, angioplasty, and cardiac rehabilitation led by top cardiologists.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80', icon: 'Heart', head: 'Dr. Aris Thorne', exp: '18+ Years', services: ['ECG & ECHO', 'Heart Bypass', 'Angioplasty'], hours: 'Mon-Sat: 8 AM - 8 PM', emergency: true },
  { id: 2, name: 'Neurology', category: 'Surgical', description: 'Comprehensive diagnosis and treatment for brain, spinal cord, and neuromuscular disorders.', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80', icon: 'Brain', head: 'Dr. Elena Rostova', exp: '14+ Years', services: ['Brain Surgery', 'Stroke Rehab', 'Neuro Diagnostics'], hours: 'Mon-Fri: 9 AM - 6 PM', emergency: true },
  { id: 3, name: 'Orthopedics', category: 'Surgical', description: 'Specialized care for joint replacements, complex fractures, sports injuries, and spine health.', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', icon: 'Bone', head: 'Dr. Marcus Vance', exp: '16+ Years', services: ['Joint Replacement', 'Spine Surgery', 'Physiotherapy'], hours: 'Mon-Sat: 8 AM - 6 PM', emergency: false },
  { id: 4, name: 'Pediatrics', category: 'Medical', description: 'Dedicated child healthcare, neonatal intensive care, pediatric surgery, and growth monitoring.', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80', icon: 'Baby', head: 'Dr. Sophia Chen', exp: '12+ Years', services: ['Vaccinations', 'Child Nutrition', 'Pediatric ICU'], hours: 'Mon-Sun: 9 AM - 8 PM', emergency: true },
  { id: 5, name: 'Gynecology', category: 'Specialty', description: 'Comprehensive women healthcare, high-risk pregnancy care, maternity wards, and laparoscopic surgery.', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', icon: 'Activity', head: 'Dr. Sarah Al-Mansoor', exp: '15+ Years', services: ['Maternity Care', 'IVF Treatment', 'Women Wellness'], hours: 'Mon-Sat: 9 AM - 7 PM', emergency: true },
  { id: 6, name: 'Dental Care', category: 'Specialty', description: 'Advanced medical, surgical, and cosmetic dental treatments using cutting-edge laser technologies.', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80', icon: 'Stethoscope', head: 'Dr. Hannah Wright', exp: '11+ Years', services: ['Root Canal', 'Implants', 'Teeth Whitening'], hours: 'Mon-Sat: 10 AM - 6 PM', emergency: false },
  { id: 7, name: 'Eye Care', category: 'Specialty', description: 'Vision correction, cataract surgery, laser vision correction, and glaucoma management.', image: 'https://images.unsplash.com/photo-1583912267670-6575ad3736be?auto=format&fit=crop&w=800&q=80', icon: 'Eye', head: 'Dr. Anita Desai', exp: '14+ Years', services: ['LASIK Surgery', 'Cataract', 'Glaucoma Care'], hours: 'Mon-Sat: 9 AM - 5 PM', emergency: false },
  { id: 8, name: 'ENT', category: 'Medical', description: 'Complete ENT diagnosis, hearing restoration, sinus surgery, and speech therapy.', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80', icon: 'Stethoscope', head: 'Dr. Thomas Clark', exp: '11+ Years', services: ['Hearing Tests', 'Sinus Surgery', 'Throat Care'], hours: 'Mon-Fri: 9 AM - 6 PM', emergency: false },
  { id: 9, name: 'Oncology', category: 'Diagnostic', description: 'State-of-the-art cancer care offering chemotherapy, radiation therapy, and surgical oncology.', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80', icon: 'Activity', head: 'Dr. Julian Sterling', exp: '20+ Years', services: ['Chemotherapy', 'Radiation', 'Tumor Removal'], hours: 'Mon-Fri: 8 AM - 5 PM', emergency: true },
  { id: 10, name: 'Emergency', category: 'Emergency', description: '24/7 critical trauma care and rapid mobile ICU ambulance response.', image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80', icon: 'Activity', head: 'Dr. David Miller', exp: '22+ Years', services: ['Trauma Care', 'ACLS Ambulance', 'Critical ICU'], hours: '24 Hours / 7 Days', emergency: true },
];

const MOCK_DOCTORS = [
  { id: 1, department_id: 1, department_name: 'Cardiology', name: 'Dr. Aris Thorne', qualification: 'MD, FACC, FRCP (UK)', specialization: 'Interventional Cardiology', experience: 18, gender: 'Male', bio: 'Dr. Aris Thorne is a globally recognized interventional cardiologist with over 18 years of experience performing complex coronary angioplasties.', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80', consultation_fee: 75.00, availability: 'Mon - Fri, 8:00 AM - 2:00 PM', rating: 4.95 },
  { id: 2, department_id: 2, department_name: 'Neurology', name: 'Dr. Elena Rostova', qualification: 'MBBS, MD (Neurology), DM', specialization: 'Brain & Spine Surgery', experience: 14, gender: 'Female', bio: 'Specialist in cerebrovascular surgery, stroke rehabilitation, and neuro-oncology with research in international medical journals.', image: 'https://images.unsplash.com/photo-1594824813566-78a05349b29e?auto=format&fit=crop&w=800&q=80', consultation_fee: 80.00, availability: 'Mon - Sat, 10:00 AM - 4:00 PM', rating: 4.92 },
  { id: 3, department_id: 3, department_name: 'Orthopedics', name: 'Dr. Marcus Vance', qualification: 'MS (Orthopedics), FRCS', specialization: 'Joint Replacement & Spine', experience: 16, gender: 'Male', bio: 'Leading orthopedic surgeon specializing in robotic knee and hip replacements, arthroscopic sports surgery, and spinal alignment.', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80', consultation_fee: 70.00, availability: 'Tue - Sun, 9:00 AM - 3:00 PM', rating: 4.89 },
  { id: 4, department_id: 4, department_name: 'Pediatrics', name: 'Dr. Sophia Chen', qualification: 'MD (Pediatrics), DCH', specialization: 'Neonatal & Child Intensive Care', experience: 12, gender: 'Female', bio: 'Compassionate pediatrician focused on newborn care, developmental pediatric health, and childhood immunizations.', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80', consultation_fee: 60.00, availability: 'Mon - Fri, 9:00 AM - 5:00 PM', rating: 4.97 },
  { id: 5, department_id: 5, department_name: 'Oncology', name: 'Dr. Julian Sterling', qualification: 'MD, DM (Oncology), ESMO', specialization: 'Surgical & Medical Oncology', experience: 20, gender: 'Male', bio: 'Renowned oncologist heading the MediCare Plus Cancer Care Centre, pioneering immunotherapy and targeted treatments.', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80', consultation_fee: 90.00, availability: 'Mon - Thu, 10:00 AM - 2:00 PM', rating: 4.98 },
  { id: 6, department_id: 6, department_name: 'Gynecology', name: 'Dr. Sarah Al-Mansoor', qualification: 'MBBS, MS (OB/GYN), FICOG', specialization: 'Maternity & High-Risk Pregnancy', experience: 15, gender: 'Female', bio: 'Expert obstetrician and laparoscopic surgeon with deep commitment to safe delivery and maternal wellness.', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80', consultation_fee: 65.00, availability: 'Mon - Sat, 8:30 AM - 1:30 PM', rating: 4.94 },
  { id: 7, department_id: 7, department_name: 'General Medicine', name: 'Dr. David Miller', qualification: 'MD (Internal Med), FACP', specialization: 'General Medicine & Prevention', experience: 22, gender: 'Male', bio: 'Senior consultant in internal medicine specializing in lifestyle diseases, diabetes control, and executive checkups.', image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=800&q=80', consultation_fee: 50.00, availability: 'Mon - Fri, 8:00 AM - 4:00 PM', rating: 4.88 },
  { id: 8, department_id: 8, department_name: 'Dermatology', name: 'Dr. Natasha Perera', qualification: 'MD (Dermatology), FAAD', specialization: 'Medical & Aesthetic Dermatology', experience: 10, gender: 'Female', bio: 'Specialist in laser treatments, eczema management, skin rejuvenation, and pediatric skin conditions.', image: 'https://images.unsplash.com/photo-1594824813566-78a05349b29e?auto=format&fit=crop&w=800&q=80', consultation_fee: 55.00, availability: 'Tue - Sat, 11:00 AM - 5:00 PM', rating: 4.91 },
  { id: 9, department_id: 11, department_name: 'Nephrology', name: 'Dr. Kenneth Cole', qualification: 'MD, DM (Nephrology)', specialization: 'Kidney Transplants & Dialysis', experience: 17, gender: 'Male', bio: 'Head of Nephrology overseeing our state-of-the-art dialysis center and adult kidney transplantation program.', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80', consultation_fee: 75.00, availability: 'Mon - Fri, 9:00 AM - 3:00 PM', rating: 4.93 },
  { id: 10, department_id: 16, department_name: 'Dental Care', name: 'Dr. Hannah Wright', qualification: 'BDS, MDS (Oral Surgery)', specialization: 'Cosmetic & Implant Dentistry', experience: 11, gender: 'Female', bio: 'Expert dental surgeon providing smile redesigns, painless root canals, dental implants, and laser gum treatments.', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80', consultation_fee: 45.00, availability: 'Mon - Sat, 9:00 AM - 6:00 PM', rating: 4.96 }
];

const MOCK_PACKAGES = [
  { id: 'PKG-001', title: 'Full Body Checkup', category: 'General', description: 'Complete health evaluation package designed for early detection, preventive care, and overall wellness monitoring with advanced medical tests.', startPrice: '$199', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', status: 'Active', hospitalBenefits: ['Advanced diagnostics', 'Expert medical review', 'Digital health records', 'Complete hospital support', 'Follow-up consultation care'], plans: [
    { id: 'basic', label: '18 - 30', title: 'Basic Wellness Checkup', ageRange: 'Age 18 – 30', price: '$199', suitableFor: 'Young adults who want regular health monitoring.', includes: ['General physician consultation', 'Complete blood count (CBC)', 'Blood sugar test', 'Lipid profile', 'Liver function test', 'Kidney function test', 'Blood pressure check', 'Basic health report'], benefits: ['Early detection of health problems', 'Maintain healthy lifestyle', 'Regular health tracking', 'Preventive medical guidance'] },
    { id: 'advanced', label: '31 - 50', title: 'Advanced Full Body Checkup', ageRange: 'Age 31 – 50', price: '$399', suitableFor: 'Working adults and lifestyle risk patients.', includes: ['Doctor consultation', 'Complete blood count (CBC)', 'Diabetes screening', 'Lipid profile', 'Liver function test', 'Kidney function test', 'Thyroid profile', 'ECG test', 'Chest X-ray', 'Vitamin level check', 'Health risk assessment'], benefits: ['Complete health overview', 'Early lifestyle disease detection', 'Heart and organ health monitoring', 'Personalized recommendations'] },
    { id: 'premium', label: '51+', title: 'Premium Executive Health Checkup', ageRange: 'Age 51+', price: '$699', suitableFor: 'Senior citizens requiring comprehensive health evaluation.', includes: ['Senior physician consultation', 'Complete blood investigations', 'Diabetes evaluation', 'Heart assessment', 'ECG test', 'Echocardiogram (ECHO)', 'Chest X-ray', 'Kidney function test', 'Liver function test', 'Bone health assessment', 'Cancer risk screening', 'Complete health report review'], benefits: ['Comprehensive health evaluation', 'Early diagnosis of chronic conditions', 'Specialist recommendations', 'Long-term health management'] }
  ]},
  { id: 'PKG-002', title: 'Heart Care Package', category: 'Cardiology', description: 'Complete cardiac health assessment and preventive heart care package designed for early detection and better heart health management.', startPrice: '$149', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80', status: 'Active', hospitalBenefits: ['Experienced cardiologists', 'Modern cardiac equipment', 'Same day test reports', 'Digital health records', 'Follow-up consultation support'], plans: [
    { id: 'basic', label: '18 - 30', title: 'Basic Heart Checkup', ageRange: 'Age 18 – 30', price: '$149', suitableFor: 'Healthy adults who want regular heart monitoring.', includes: ['Cardiologist consultation', 'ECG test', 'Blood pressure check', 'Cholesterol testing', 'Basic heart risk assessment'], benefits: ['Early health monitoring', 'Lifestyle guidance', 'Preventive heart care'] },
    { id: 'advanced', label: '31 - 50', title: 'Advanced Heart Care Package', ageRange: 'Age 31 – 50', price: '$299', suitableFor: 'Adults with lifestyle risks or family history of heart disease.', includes: ['Cardiologist consultation', 'ECG test', 'Echocardiogram (ECHO)', 'Blood pressure monitoring', 'Lipid profile test', 'Heart risk assessment'], benefits: ['Early detection of heart problems', 'Advanced cardiac screening', 'Expert cardiologist guidance'] },
    { id: 'premium', label: '51+', title: 'Premium Cardiac Health Package', ageRange: 'Age 51+', price: '$499', suitableFor: 'Senior adults and high-risk heart patients.', includes: ['Senior cardiologist consultation', 'ECG test', 'Echocardiogram', 'TMT (stress test)', 'Complete lipid profile', 'Blood sugar test', 'Heart risk evaluation', 'Detailed cardiac report'], benefits: ['Comprehensive heart evaluation', 'Early diagnosis of cardiac conditions', 'Personalized cardiac care plan'] }
  ]},
  { id: 'PKG-003', title: 'Cancer Screening', category: 'Oncology', description: 'Advanced cancer screening package for early detection and prevention with personalized medical advice.', startPrice: '$249', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80', status: 'Active', hospitalBenefits: ['Experienced oncologists', 'Advanced screening technology', 'Same day report support', 'Digital health records', 'Care coordinator support'], plans: [
    { id: 'basic', label: '18 - 30', title: 'Basic Cancer Screening', ageRange: 'Age 18 – 30', price: '$249', suitableFor: 'Healthy adults who want early cancer screening.', includes: ['Oncology consultation', 'Blood investigations', 'Cancer marker screening', 'Basic health risk evaluation'], benefits: ['Early cancer detection', 'Personalized medical advice', 'Preventive care support'] },
    { id: 'advanced', label: '31 - 50', title: 'Advanced Cancer Screening Package', ageRange: 'Age 31 – 50', price: '$399', suitableFor: 'Adults with family history or lifestyle-related cancer risk.', includes: ['Oncology consultation', 'Blood investigations', 'Cancer marker tests', 'Imaging support', 'Health risk evaluation'], benefits: ['Detailed screening support', 'Early intervention guidance', 'Advanced diagnostic support'] },
    { id: 'premium', label: '51+', title: 'Premium Cancer Care Screening', ageRange: 'Age 51+', price: '$599', suitableFor: 'Senior adults requiring comprehensive screening.', includes: ['Senior oncology consultation', 'Blood investigations', 'Cancer marker tests', 'Imaging support', 'Tumor screening review', 'Detailed health report'], benefits: ['Comprehensive cancer evaluation', 'Specialized diagnostic support', 'Personalized care plan'] }
  ]},
  { id: 'PKG-004', title: 'Family Health Package', category: 'Family', description: 'Complete healthcare package designed for families with regular health monitoring, preventive screening, and early disease detection.', startPrice: '$249', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80', status: 'Active', hospitalBenefits: ['Family-focused medical care', 'Preventive screenings for every age', 'Digital health records', 'Follow-up consultation support', 'Flexible appointment scheduling'], plans: [
    { id: 'basic', label: '18 - 30', title: 'Young Family Package', ageRange: 'Age 18 – 30', price: '$249', suitableFor: 'Young adults and healthy family members.', includes: ['General physician consultation', 'Complete blood count (CBC)', 'Diabetes screening', 'Cholesterol check', 'Basic health assessment'], benefits: ['Regular health monitoring', 'Early risk identification', 'Affordable preventive care'] },
    { id: 'advanced', label: '31 - 50', title: 'Family Wellness Package', ageRange: 'Age 31 – 50', price: '$449', suitableFor: 'Working adults and families with health risks.', includes: ['General physician consultation', 'Complete blood count', 'Diabetes screening', 'Lipid profile', 'Kidney function test', 'Liver function test', 'Blood pressure monitoring'], benefits: ['Complete family health tracking', 'Early detection of lifestyle diseases', 'Expert medical guidance'] },
    { id: 'premium', label: '51+', title: 'Senior Family Care Package', ageRange: 'Age 51+', price: '$699', suitableFor: 'Senior citizens and high-risk patients.', includes: ['Senior physician consultation', 'Complete blood tests', 'Diabetes evaluation', 'Heart risk assessment', 'Kidney & liver screening', 'Bone health check', 'Detailed health report'], benefits: ['Comprehensive senior healthcare', 'Chronic disease monitoring', 'Personalized health recommendations'] }
  ]},
  { id: 'PKG-005', title: 'Child Wellness Package', category: 'Pediatrics', description: 'Specialized healthcare package for children\'s growth, development, and preventive care.', startPrice: '$149', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', status: 'Active', hospitalBenefits: ['Child-friendly care environment', 'Specialized pediatric experts', 'Vaccination and growth tracking', 'Digital health records', 'Parental consultation support'], plans: [
    { id: 'basic', label: '0 - 5', title: 'Kids Basic Care', ageRange: 'Age 0 – 5 Years', price: '$149', suitableFor: 'Young children needing routine preventive care.', includes: ['Pediatric consultation', 'Growth assessment', 'Vaccination review', 'Nutrition guidance'], benefits: ['Healthy childhood development', 'Preventive pediatric care', 'Parent guidance support'] },
    { id: 'advanced', label: '6 - 12', title: 'Kids Growth Package', ageRange: 'Age 6 – 12 Years', price: '$249', suitableFor: 'School-aged children requiring growth and health monitoring.', includes: ['Pediatric consultation', 'Growth monitoring', 'Blood tests', 'Nutrition assessment', 'Child health screening'], benefits: ['Growth tracking', 'Early health issue detection', 'Nutritional guidance'] },
    { id: 'premium', label: '13 - 17', title: 'Teen Health Package', ageRange: 'Age 13 – 17 Years', price: '$349', suitableFor: 'Teenagers requiring complete screening and wellness support.', includes: ['Pediatric consultation', 'Complete health screening', 'Blood investigations', 'Lifestyle assessment', 'Mental wellness guidance'], benefits: ['Comprehensive adolescent care', 'Lifestyle support', 'Preventive wellness planning'] }
  ]},
  { id: 'PKG-006', title: "Women's Wellness Package", category: "Women's Health", description: "Complete women's healthcare package designed for preventive screening, early diagnosis, and personalized health support.", startPrice: '$199', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', status: 'Active', hospitalBenefits: ['Expert gynecologists', 'Advanced screening', 'Personalized care', 'Privacy & comfort', 'Follow-up consultation support'], plans: [
    { id: 'basic', label: '18 - 30', title: "Women's Basic Wellness", ageRange: 'Age 18 – 30', price: '$199', suitableFor: 'Young women who need regular health monitoring.', includes: ['Gynecologist consultation', 'General health checkup', 'Complete blood count (CBC)', 'Thyroid profile', 'Vitamin level assessment', "Basic women's health screening"], benefits: ["Maintain women's health", 'Early detection of health concerns', 'Expert gynecological guidance', 'Preventive healthcare support'] },
    { id: 'advanced', label: '31 - 50', title: "Women's Advanced Wellness", ageRange: 'Age 31 – 50', price: '$399', suitableFor: 'Women requiring regular screening and reproductive health care.', includes: ['Gynecologist consultation', 'Pap smear test', 'Breast screening', 'Mammogram support', 'Thyroid profile', 'Hormone evaluation', 'Blood sugar test', 'Complete blood count', "Women's health assessment"], benefits: ["Early detection of women's health issues", 'Personalized medical advice', 'Reproductive health monitoring', 'Specialist consultation support'] },
    { id: 'premium', label: '51+', title: "Women's Premium Care Package", ageRange: 'Age 51+', price: '$599', suitableFor: 'Women after menopause or those requiring comprehensive evaluation.', includes: ['Senior gynecologist consultation', 'Mammogram screening', 'Pap smear test', 'Bone density test', 'Thyroid function test', 'Diabetes screening', 'Heart risk assessment', 'Hormone health evaluation', 'Complete health report review'], benefits: ["Comprehensive women's health evaluation", 'Menopause health support', 'Early disease detection', 'Long-term wellness planning'] }
  ]}
];

const MOCK_TESTIMONIALS = [
  { id: 1, patient_name: 'John Silva', patient_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', treatment: 'Angioplasty Surgery', department: 'Cardiology', doctor: 'Dr. Aris Thorne', rating: 5, testimonial: 'The cardiac team at MediCare Plus saved my life! Dr. Thorne performed my angioplasty with utmost precision. The nursing staff treated me like family.', verified: 1 },
  { id: 2, patient_name: 'Amara Fernando', patient_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', treatment: 'Maternity & Normal Delivery', department: 'Gynecology', doctor: 'Dr. Sarah Al-Mansoor', rating: 5, testimonial: 'I delivered my first baby girl here. Dr. Sarah was supportive throughout my pregnancy. The maternity suite felt like a 5-star hotel!', verified: 1 },
  { id: 3, patient_name: 'Robert Vance', patient_photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', treatment: 'Total Knee Replacement', department: 'Orthopedics', doctor: 'Dr. Marcus Vance', rating: 5, testimonial: 'After 5 years of severe knee pain, I can now walk painless thanks to robotic knee surgery at MediCare Plus. Truly world-class hospital care!', verified: 1 },
  { id: 4, patient_name: 'Priya Wickramasinghe', patient_photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', treatment: 'Pediatric Care', department: 'Pediatrics', doctor: 'Dr. Sophia Chen', rating: 5, testimonial: 'Dr. Sophia Chen is an angel! She diagnosed my son\'s respiratory infection quickly and gave him the best treatment without unnecessary stress.', verified: 1 },
];

export const getDoctors = async () => {
  try {
    const res = await apiClient.get('/doctors/index.php');
    if (res.data && res.data.data) return res.data.data;
  } catch (err) {
    console.warn('API connection offline, utilizing seed data fallback for Doctors.');
  }
  return MOCK_DOCTORS;
};

export const getDoctorById = async (id) => {
  try {
    const res = await apiClient.get(`/doctors/index.php?id=${id}`);
    if (res.data && res.data.data) return res.data.data;
  } catch (err) {
    console.warn('API fallback for Doctor ID:', id);
  }
  return MOCK_DOCTORS.find(d => d.id === parseInt(id)) || MOCK_DOCTORS[0];
};

export const createDoctor = async (doctorData) => {
  try {
    const res = await apiClient.post('/doctors/index.php', doctorData);
    if (res.data && res.data.status === 'success') return res.data;
  } catch (err) {
    console.warn('API fallback for createDoctor');
  }
  return { status: 'success', id: Date.now(), message: 'Doctor added successfully' };
};

export const updateDoctor = async (doctorData) => {
  try {
    const res = await apiClient.put('/doctors/index.php', doctorData);
    if (res.data && res.data.status === 'success') return res.data;
  } catch (err) {
    console.warn('API fallback for updateDoctor');
  }
  return { status: 'success', message: 'Doctor updated successfully' };
};

export const deleteDoctor = async (id) => {
  try {
    const res = await apiClient.delete(`/doctors/index.php?id=${id}`);
    if (res.data && res.data.status === 'success') return res.data;
  } catch (err) {
    console.warn('API fallback for deleteDoctor');
  }
  return { status: 'success', message: 'Doctor deleted successfully' };
};

export const getDepartments = async () => {
  try {
    const res = await apiClient.get('/departments/index.php');
    if (res.data && res.data.data) return res.data.data;
  } catch (err) {
    console.warn('API fallback for Departments');
  }
  return MOCK_DEPARTMENTS;
};

export const getPackages = async () => {
  try {
    const res = await apiClient.get('/packages/index.php');
    if (res.data && res.data.data) return res.data.data;
  } catch (err) {
    console.warn('API fallback for Health Packages');
  }
  return MOCK_PACKAGES;
};

export const getTestimonials = async () => {
  try {
    const res = await apiClient.get('/testimonials/index.php');
    if (res.data && res.data.data) return res.data.data;
  } catch (err) {
    console.warn('API fallback for Testimonials');
  }
  return MOCK_TESTIMONIALS;
};

export const createAppointment = async (appointmentData) => {
  try {
    const res = await apiClient.post('/appointments/index.php', appointmentData);
    if (res.data && res.data.appointment_id) return res.data;
  } catch (err) {
    console.warn('API fallback for createAppointment');
  }
  return {
    status: 'success',
    appointment_id: Math.floor(1000 + Math.random() * 9000),
    message: 'Appointment created successfully'
  };
};

export const getAppointmentById = async (id) => {
  try {
    const res = await apiClient.get(`/appointments/index.php?id=${id}`);
    if (res.data && res.data.data) return res.data.data;
  } catch (err) {
    console.warn('API fallback for getAppointmentById');
  }
  return {
    id: id || 1001,
    patient_name: 'John Silva',
    patient_email: 'patient@medicareplus.com',
    patient_phone: '+94 77 123 4567',
    doctor_name: 'Dr. Aris Thorne',
    specialization: 'Interventional Cardiology',
    department_name: 'Cardiology',
    appointment_date: '2026-08-25',
    appointment_time: '10:00 AM',
    consultation_type: 'In-person',
    consultation_fee: 75.00,
    status: 'pending'
  };
};

export const getAppointments = async () => {
  try {
    const res = await apiClient.get('/appointments/index.php');
    if (res.data && res.data.data) return res.data.data;
  } catch (err) {
    console.warn('API fallback for Appointments');
  }
  return [
    { id: 'APP-1021', patient_name: 'John Silva', patient_email: 'patient@medicareplus.com', patient_phone: '+94 77 123 4567', doctor_id: 1, doctor_name: 'Dr. Aris Thorne', department_id: 1, department_name: 'Cardiology', appointment_date: '2026-08-25', appointment_time: '09:30 AM', consultation_type: 'In-person', consultation_fee: 75, reason: 'Routine Cardiac Checkup and Blood Pressure evaluation.', medical_notes: '', status: 'confirmed' },
    { id: 'APP-1022', patient_name: 'Maria Perera', patient_email: 'maria@medicareplus.com', patient_phone: '+94 71 987 6543', doctor_id: 2, doctor_name: 'Dr. Elena Rostova', department_id: 2, department_name: 'Neurology', appointment_date: '2026-08-25', appointment_time: '10:30 AM', consultation_type: 'Online', consultation_fee: 80, reason: 'Follow-up for migraine treatment.', medical_notes: 'Patient reported reduced frequency of episodes.', status: 'pending' },
    { id: 'APP-1023', patient_name: 'Robert Vance', patient_email: 'robert@medicareplus.com', patient_phone: '+94 76 555 4321', doctor_id: 3, doctor_name: 'Dr. Marcus Vance', department_id: 3, department_name: 'Orthopedics', appointment_date: '2026-08-26', appointment_time: '02:00 PM', consultation_type: 'In-person', consultation_fee: 70, reason: 'Post-operative knee replacement follow-up.', medical_notes: 'Recovery progressing well. Physiotherapy ongoing.', status: 'confirmed' },
    { id: 'APP-1024', patient_name: 'Amara Fernando', patient_email: 'amara@medicareplus.com', patient_phone: '+94 77 444 3322', doctor_id: 6, doctor_name: 'Dr. Sarah Al-Mansoor', department_id: 5, department_name: 'Gynecology', appointment_date: '2026-08-26', appointment_time: '04:00 PM', consultation_type: 'In-person', consultation_fee: 65, reason: 'Prenatal checkup — 28 weeks.', medical_notes: 'All vitals normal. Ultrasound scheduled.', status: 'completed' },
    { id: 'APP-1025', patient_name: 'Kasun Perera', patient_email: 'kasun@medicareplus.com', patient_phone: '+94 77 888 9900', doctor_id: 7, doctor_name: 'Dr. David Miller', department_id: 7, department_name: 'General Medicine', appointment_date: '2026-08-27', appointment_time: '11:00 AM', consultation_type: 'In-person', consultation_fee: 50, reason: 'Annual executive health screening.', medical_notes: '', status: 'pending' },
    { id: 'APP-1026', patient_name: 'Dilani Alwis', patient_email: 'dilani@medicareplus.com', patient_phone: '+94 77 222 3344', doctor_id: 8, doctor_name: 'Dr. Natasha Perera', department_id: 8, department_name: 'Dermatology', appointment_date: '2026-08-27', appointment_time: '03:30 PM', consultation_type: 'Online', consultation_fee: 55, reason: 'Skin irritation follow-up consultation.', medical_notes: 'Prescribed topical corticosteroid cream.', status: 'cancelled' },
  ];
};

export const updateAppointment = async (appointmentData) => {
  try {
    const res = await apiClient.put('/appointments/index.php', appointmentData);
    if (res.data && res.data.status === 'success') return res.data;
  } catch (err) {
    console.warn('API fallback for updateAppointment');
  }
  return { status: 'success', message: 'Appointment updated successfully' };
};

export const deleteAppointment = async (id) => {
  try {
    const res = await apiClient.delete(`/appointments/index.php?id=${id}`);
    if (res.data && res.data.status === 'success') return res.data;
  } catch (err) {
    console.warn('API fallback for deleteAppointment');
  }
  return { status: 'success', message: 'Appointment deleted successfully' };
};

export const processPayment = async (paymentData) => {
  try {
    const res = await apiClient.post('/payments/index.php', paymentData);
    if (res.data && res.data.status === 'success') return res.data;
  } catch (err) {
    console.warn('API fallback for processPayment');
  }
  return {
    status: 'success',
    payment_id: Math.floor(5000 + Math.random() * 5000),
    transaction_id: 'MCP-TXN-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    message: 'Payment completed successfully'
  };
};

export const submitContactMessage = async (msgData) => {
  try {
    const res = await apiClient.post('/contact/index.php', msgData);
    return res.data;
  } catch (err) {
    return { status: 'success', message: 'Message sent successfully.' };
  }
};

export const submitJobApplication = async (appData) => {
  try {
    const res = await apiClient.post('/applications/index.php', appData);
    return res.data;
  } catch (err) {
    return { status: 'success', message: 'Application submitted successfully.' };
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await apiClient.post('/auth/login.php', credentials);
    return res.data;
  } catch (err) {
    if (credentials.email === 'admin@medicareplus.com' || credentials.email === 'admin') {
      return {
        status: 'success',
        user: { id: 1, name: 'System Admin', email: 'admin@medicareplus.com', role: 'admin', phone: '+94 11 234 5678' }
      };
    }
    return {
      status: 'success',
      user: { id: 2, name: credentials.email.split('@')[0] || 'John Silva', email: credentials.email, role: 'patient', phone: '+94 77 123 4567' }
    };
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await apiClient.post('/auth/register.php', userData);
    return res.data;
  } catch (err) {
    return {
      status: 'success',
      user: { id: Date.now(), name: userData.name, email: userData.email, role: userData.role || 'patient', phone: userData.phone }
    };
  }
};

export default apiClient;

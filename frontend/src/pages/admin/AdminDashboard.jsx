import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, UserCheck, Stethoscope, Calendar, CreditCard, Image, 
  MessageSquare, Briefcase, HelpCircle, Mail, Plus, Trash2, CheckCircle2, 
  XCircle, Bell, User, LogOut, Settings, Shield, Activity, DollarSign, 
  FileText, Download, Edit3, Eye, Search, Filter, RefreshCw, Layers, Building, Baby, Globe, Lock, Star, Award, Clock
} from 'lucide-react';
import { getDoctors, getDepartments, getPackages, getTestimonials, createDoctor, updateDoctor, deleteDoctor, getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../../services/api';
import toast from 'react-hot-toast';

const DEPARTMENT_SPECIALIZATIONS = {
  'Cardiology': ['Interventional Cardiology', 'Pediatric Cardiology', 'Electrophysiology', 'General Cardiology'],
  'Neurology': ['Clinical Neurology', 'Neurosurgery', 'Pediatric Neurology'],
  'Pediatrics': ['General Pediatrics', 'Neonatology', 'Pediatric Surgery'],
  'Oncology': ['Medical Oncology', 'Radiation Oncology', 'Surgical Oncology'],
  'Orthopedics': ['Joint Replacement', 'Sports Medicine', 'Spine Surgery'],
  'General Medicine': ['Internal Medicine', 'Family Medicine'],
  'Dermatology': ['Cosmetic Dermatology', 'Medical Dermatology'],
  'Gynaecology': ['Obstetrics', 'Gynecologic Oncology', 'Reproductive Endocrinology']
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  // Loaded Data
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Doctor Directory Management States
  const [doctorSearchTerm, setDoctorSearchTerm] = useState('');
  const [doctorDeptFilter, setDoctorDeptFilter] = useState('All');
  const [isDoctorFormModalOpen, setIsDoctorFormModalOpen] = useState(false);
  const [isViewDoctorModalOpen, setIsViewDoctorModalOpen] = useState(false);
  const [selectedDoctorView, setSelectedDoctorView] = useState(null);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  
  const [doctorSortBy, setDoctorSortBy] = useState('nameAsc');
  const [doctorCurrentPage, setDoctorCurrentPage] = useState(1);
  const doctorsPerPage = 10;

  const [doctorFormData, setDoctorFormData] = useState({
    id: null,
    name: '',
    qualification: '',
    specialization: '',
    department_id: '1',
    department_name: 'Cardiology',
    experience: 5,
    consultation_fee: 75.00,
    availability: 'Mon - Fri, 9:00 AM - 5:00 PM',
    bio: '',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    gender: 'Male',
    rating: 4.90
  });

  // Mock State Data for Admin Control Modules
  const [appointments, setAppointments] = useState([]);

  // Appointment Management States
  const [apptSearchTerm, setApptSearchTerm] = useState('');
  const [apptStatusFilter, setApptStatusFilter] = useState('All');
  const [isViewApptModalOpen, setIsViewApptModalOpen] = useState(false);
  const [selectedApptView, setSelectedApptView] = useState(null);
  const [isApptFormModalOpen, setIsApptFormModalOpen] = useState(false);
  const [apptToDelete, setApptToDelete] = useState(null);

  const [apptFormData, setApptFormData] = useState({
    id: null,
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    doctor_id: '',
    department_id: '',
    appointment_date: '',
    appointment_time: '10:00 AM',
    consultation_type: 'In-person',
    consultation_fee: 50,
    reason: '',
    medical_notes: '',
    status: 'pending'
  });

  // Health Packages Management States
  const [packages, setPackages] = useState([]);
  const [pkgSearchTerm, setPkgSearchTerm] = useState('');
  const [pkgCategoryFilter, setPkgCategoryFilter] = useState('All');
  const [isViewPkgModalOpen, setIsViewPkgModalOpen] = useState(false);
  const [selectedPkgView, setSelectedPkgView] = useState(null);
  const [isPkgFormModalOpen, setIsPkgFormModalOpen] = useState(false);
  const [pkgToDelete, setPkgToDelete] = useState(null);
  const [viewPkgPlanTab, setViewPkgPlanTab] = useState('basic');

  const emptyPlan = { id: '', label: '', title: '', ageRange: '', price: '', suitableFor: '', includes: [], benefits: [] };

  const [pkgFormData, setPkgFormData] = useState({
    id: null,
    title: '',
    category: 'General',
    description: '',
    startPrice: '',
    image: '',
    status: 'Active',
    hospitalBenefits: [],
    plans: [
      { id: 'basic', label: '18 - 30', title: '', ageRange: 'Age 18 – 30', price: '', suitableFor: '', includes: [], benefits: [] },
      { id: 'advanced', label: '31 - 50', title: '', ageRange: 'Age 31 – 50', price: '', suitableFor: '', includes: [], benefits: [] },
      { id: 'premium', label: '51+', title: '', ageRange: 'Age 51+', price: '', suitableFor: '', includes: [], benefits: [] },
    ]
  });

  // Temp inputs for adding items to plan arrays
  const [tempIncludeInput, setTempIncludeInput] = useState('');
  const [tempBenefitInput, setTempBenefitInput] = useState('');
  const [tempHospBenefitInput, setTempHospBenefitInput] = useState('');
  const [editingPlanIndex, setEditingPlanIndex] = useState(0);

  const [payments, setPayments] = useState([
    { id: 'PAY-5001', apptId: 'APP-1021', patient: 'John Silva', amount: '$75.00', method: 'Credit Card (**** 4821)', status: 'Paid', date: '2026-08-09' },
    { id: 'PAY-5002', apptId: 'APP-1022', patient: 'Maria Perera', amount: '$80.00', method: 'Online Banking', status: 'Pending', date: '2026-08-09' },
    { id: 'PAY-5003', apptId: 'APP-1023', patient: 'Robert Vance', amount: '$70.00', method: 'Counter Cash', status: 'Paid', date: '2026-08-08' },
  ]);

  const [jobApplications, setJobApplications] = useState([
    { id: 1, applicant: 'Dr. Nishan Wickrama', position: 'Senior Resident Cardiologist', exp: '8 Yrs', status: 'Reviewing', date: '2026-08-08' },
    { id: 2, applicant: 'Kavindi Perera', position: 'Registered ICU Nurse', exp: '5 Yrs', status: 'Shortlisted', date: '2026-08-07' },
    { id: 3, applicant: 'Sahan Dias', position: 'Medical Lab Technologist', exp: '4 Yrs', status: 'Interview', date: '2026-08-06' },
  ]);

  const [activityLogs] = useState([
    { id: 1, action: 'Admin approved Appointment #APP-1021', module: 'Appointments', time: '09 Aug 2026 · 10:14 AM', ip: '192.168.1.45' },
    { id: 2, action: 'Admin updated Dr. Aris Thorne profile', module: 'Doctors', time: '09 Aug 2026 · 09:30 AM', ip: '192.168.1.45' },
    { id: 3, action: 'New job application submitted by Dr. Nishan Wickrama', module: 'Careers', time: '08 Aug 2026 · 04:15 PM', ip: '175.45.20.12' },
  ]);

  const [cmsContent, setCmsContent] = useState({
    heroHeading: 'Advanced Healthcare. Compassionate Care.',
    heroSubheading: 'Providing world-class medical care with experienced specialists and advanced technology.',
    emergencyHotline: '+94 11 999 9999',
    hospitalPhone: '+94 11 234 5678',
    contactEmail: 'info@medicareplus.com',
  });

  useEffect(() => {
    const loadAdminData = async () => {
      const docs = await getDoctors();
      const depts = await getDepartments();
      const tests = await getTestimonials();
      const apts = await getAppointments();
      const pkgs = await getPackages();
      setDoctors(docs);
      setDepartments(depts);
      setTestimonials(tests);
      setAppointments(apts);
      setPackages(pkgs);
    };
    loadAdminData();
  }, []);

  // DOCTOR DIRECTORY ACTION HANDLERS
  const openAddDoctorModal = () => {
    const initialDeptName = departments[0]?.name || 'Cardiology';
    const initialSpec = DEPARTMENT_SPECIALIZATIONS[initialDeptName] ? DEPARTMENT_SPECIALIZATIONS[initialDeptName][0] : 'General Practice';

    setDoctorFormData({
      id: null,
      name: '',
      qualification: 'MBBS, MD',
      specialization: initialSpec,
      department_id: departments[0]?.id ? String(departments[0].id) : '1',
      department_name: initialDeptName,
      experience: 5,
      consultation_fee: 75.00,
      availability: 'Mon - Fri, 9:00 AM - 4:00 PM',
      bio: 'Experienced specialist committed to delivering exceptional patient care and medical excellence.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      gender: 'Male',
      rating: 4.95
    });
    setIsDoctorFormModalOpen(true);
  };

  const openEditDoctorModal = (doctor) => {
    setDoctorFormData({
      id: doctor.id,
      name: doctor.name || '',
      qualification: doctor.qualification || '',
      specialization: doctor.specialization || '',
      department_id: doctor.department_id ? String(doctor.department_id) : '1',
      department_name: doctor.department_name || 'Cardiology',
      experience: doctor.experience || 5,
      consultation_fee: doctor.consultation_fee || 75.00,
      availability: doctor.availability || 'Mon - Fri, 9:00 AM - 4:00 PM',
      bio: doctor.bio || '',
      image: doctor.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      gender: doctor.gender || 'Male',
      rating: doctor.rating || 4.90
    });
    setIsDoctorFormModalOpen(true);
  };

  const openViewDoctorModal = (doctor) => {
    setSelectedDoctorView(doctor);
    setIsViewDoctorModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setDoctorFormData({ ...doctorFormData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDoctorSubmit = async (e) => {
    e.preventDefault();
    if (!doctorFormData.name.trim() || !doctorFormData.specialization.trim()) {
      toast.error('Doctor Name and Specialization are required.');
      return;
    }

    const selectedDeptObj = departments.find(d => String(d.id) === String(doctorFormData.department_id));
    const deptName = selectedDeptObj ? selectedDeptObj.name : doctorFormData.department_name || 'Cardiology';

    if (doctorFormData.id) {
      // Edit existing doctor
      const updatedObj = {
        ...doctorFormData,
        department_name: deptName,
        consultation_fee: parseFloat(doctorFormData.consultation_fee) || 75.00,
        experience: parseInt(doctorFormData.experience) || 5
      };
      await updateDoctor(updatedObj);
      setDoctors(prev => prev.map(d => d.id === doctorFormData.id ? updatedObj : d));
      toast.success(`Updated doctor details for ${doctorFormData.name}`);
    } else {
      // Add new doctor
      const newDocObj = {
        ...doctorFormData,
        id: Date.now(),
        department_name: deptName,
        consultation_fee: parseFloat(doctorFormData.consultation_fee) || 75.00,
        experience: parseInt(doctorFormData.experience) || 5,
        rating: 4.95
      };
      const res = await createDoctor(newDocObj);
      if (res && res.id) newDocObj.id = res.id;
      setDoctors(prev => [newDocObj, ...prev]);
      toast.success(`Successfully added ${doctorFormData.name} to Doctor Directory`);
    }

    setIsDoctorFormModalOpen(false);
  };

  const executeDeleteDoctor = async () => {
    if (!doctorToDelete) return;
    await deleteDoctor(doctorToDelete.id);
    setDoctors(prev => prev.filter(d => d.id !== doctorToDelete.id));
    toast.success(`Doctor ${doctorToDelete.name} removed from directory.`);
    setDoctorToDelete(null);
  };

  const handleUpdateApptStatus = (id, newStatus) => {
    const apptData = { id, status: newStatus };
    updateAppointment(apptData);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    toast.success(`Appointment ${id} status set to ${newStatus}.`);
  };

  // APPOINTMENT CRUD HANDLERS
  const openViewApptModal = (appt) => {
    setSelectedApptView(appt);
    setIsViewApptModalOpen(true);
  };

  const openAddApptModal = () => {
    setApptFormData({
      id: null,
      patient_name: '',
      patient_email: '',
      patient_phone: '',
      doctor_id: doctors[0]?.id ? String(doctors[0].id) : '',
      department_id: doctors[0]?.department_id ? String(doctors[0].department_id) : '',
      appointment_date: '',
      appointment_time: '10:00 AM',
      consultation_type: 'In-person',
      consultation_fee: doctors[0]?.consultation_fee || 50,
      reason: '',
      medical_notes: '',
      status: 'pending'
    });
    setIsApptFormModalOpen(true);
  };

  const openEditApptModal = (appt) => {
    setApptFormData({
      id: appt.id,
      patient_name: appt.patient_name || '',
      patient_email: appt.patient_email || '',
      patient_phone: appt.patient_phone || '',
      doctor_id: appt.doctor_id ? String(appt.doctor_id) : '',
      department_id: appt.department_id ? String(appt.department_id) : '',
      appointment_date: appt.appointment_date || '',
      appointment_time: appt.appointment_time || '10:00 AM',
      consultation_type: appt.consultation_type || 'In-person',
      consultation_fee: appt.consultation_fee || 50,
      reason: appt.reason || '',
      medical_notes: appt.medical_notes || '',
      status: appt.status || 'pending'
    });
    setIsApptFormModalOpen(true);
  };

  const handleSaveApptSubmit = async (e) => {
    e.preventDefault();
    if (!apptFormData.patient_name.trim() || !apptFormData.patient_email.trim() || !apptFormData.appointment_date) {
      toast.error('Patient Name, Email, and Appointment Date are required.');
      return;
    }

    const selectedDoc = doctors.find(d => String(d.id) === String(apptFormData.doctor_id));
    const docName = selectedDoc ? selectedDoc.name : '';
    const deptName = selectedDoc ? selectedDoc.department_name : departments.find(d => String(d.id) === String(apptFormData.department_id))?.name || '';
    const fee = apptFormData.consultation_fee || selectedDoc?.consultation_fee || 50;

    if (apptFormData.id) {
      // Edit existing appointment
      const updatedObj = {
        ...apptFormData,
        doctor_name: docName,
        department_name: deptName,
        consultation_fee: parseFloat(fee)
      };
      await updateAppointment(updatedObj);
      setAppointments(prev => prev.map(a => a.id === apptFormData.id ? { ...a, ...updatedObj } : a));
      toast.success(`Appointment #${apptFormData.id} updated successfully.`);
    } else {
      // Add new appointment
      const newApptObj = {
        ...apptFormData,
        id: 'APP-' + (1000 + Math.floor(Math.random() * 9000)),
        doctor_name: docName,
        department_name: deptName,
        consultation_fee: parseFloat(fee)
      };
      const res = await createAppointment(newApptObj);
      if (res && res.appointment_id) newApptObj.id = res.appointment_id;
      setAppointments(prev => [newApptObj, ...prev]);
      toast.success(`New appointment created for ${apptFormData.patient_name}.`);
    }

    setIsApptFormModalOpen(false);
  };

  const executeDeleteAppt = async () => {
    if (!apptToDelete) return;
    await deleteAppointment(apptToDelete.id);
    setAppointments(prev => prev.filter(a => a.id !== apptToDelete.id));
    toast.success(`Appointment #${apptToDelete.id} has been deleted.`);
    setApptToDelete(null);
  };

  // Appointment Filter Logic
  const filteredAppointments = appointments.filter(appt => {
    const searchLower = apptSearchTerm.toLowerCase();
    const matchesSearch = !apptSearchTerm ||
      (appt.patient_name || '').toLowerCase().includes(searchLower) ||
      (appt.doctor_name || '').toLowerCase().includes(searchLower) ||
      (appt.department_name || '').toLowerCase().includes(searchLower) ||
      String(appt.id).toLowerCase().includes(searchLower) ||
      (appt.patient_email || '').toLowerCase().includes(searchLower);
    const matchesStatus = apptStatusFilter === 'All' || (appt.status || '').toLowerCase() === apptStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // HEALTH PACKAGES CRUD HANDLERS
  const openViewPkgModal = (pkg) => {
    setSelectedPkgView(pkg);
    setViewPkgPlanTab('basic');
    setIsViewPkgModalOpen(true);
  };

  const openAddPkgModal = () => {
    setPkgFormData({
      id: null,
      title: '',
      category: 'General',
      description: '',
      startPrice: '',
      image: '',
      status: 'Active',
      hospitalBenefits: [],
      plans: [
        { id: 'basic', label: '18 - 30', title: '', ageRange: 'Age 18 – 30', price: '', suitableFor: '', includes: [], benefits: [] },
        { id: 'advanced', label: '31 - 50', title: '', ageRange: 'Age 31 – 50', price: '', suitableFor: '', includes: [], benefits: [] },
        { id: 'premium', label: '51+', title: '', ageRange: 'Age 51+', price: '', suitableFor: '', includes: [], benefits: [] },
      ]
    });
    setEditingPlanIndex(0);
    setTempIncludeInput('');
    setTempBenefitInput('');
    setTempHospBenefitInput('');
    setIsPkgFormModalOpen(true);
  };

  const openEditPkgModal = (pkg) => {
    setPkgFormData({
      id: pkg.id,
      title: pkg.title || '',
      category: pkg.category || 'General',
      description: pkg.description || '',
      startPrice: pkg.startPrice || '',
      image: pkg.image || '',
      status: pkg.status || 'Active',
      hospitalBenefits: pkg.hospitalBenefits || [],
      plans: pkg.plans && pkg.plans.length >= 3 ? pkg.plans.map(p => ({ ...p })) : [
        { id: 'basic', label: '18 - 30', title: '', ageRange: 'Age 18 – 30', price: '', suitableFor: '', includes: [], benefits: [] },
        { id: 'advanced', label: '31 - 50', title: '', ageRange: 'Age 31 – 50', price: '', suitableFor: '', includes: [], benefits: [] },
        { id: 'premium', label: '51+', title: '', ageRange: 'Age 51+', price: '', suitableFor: '', includes: [], benefits: [] },
      ]
    });
    setEditingPlanIndex(0);
    setTempIncludeInput('');
    setTempBenefitInput('');
    setTempHospBenefitInput('');
    setIsPkgFormModalOpen(true);
  };

  const handleSavePkgSubmit = (e) => {
    e.preventDefault();
    if (!pkgFormData.title.trim()) {
      toast.error('Package name is required.');
      return;
    }

    if (pkgFormData.id) {
      setPackages(prev => prev.map(p => p.id === pkgFormData.id ? { ...pkgFormData } : p));
      toast.success(`Package "${pkgFormData.title}" updated successfully.`);
    } else {
      const newPkg = { ...pkgFormData, id: 'PKG-' + String(Date.now()).slice(-4) };
      setPackages(prev => [newPkg, ...prev]);
      toast.success(`Package "${pkgFormData.title}" created successfully.`);
    }
    setIsPkgFormModalOpen(false);
  };

  const executeDeletePkg = () => {
    if (!pkgToDelete) return;
    setPackages(prev => prev.filter(p => p.id !== pkgToDelete.id));
    toast.success(`Package "${pkgToDelete.title}" has been deleted.`);
    setPkgToDelete(null);
  };

  const togglePkgStatus = (pkg) => {
    const newStatus = pkg.status === 'Active' ? 'Inactive' : 'Active';
    setPackages(prev => prev.map(p => p.id === pkg.id ? { ...p, status: newStatus } : p));
    toast.success(`Package "${pkg.title}" is now ${newStatus}.`);
  };

  const updatePlanField = (planIndex, field, value) => {
    setPkgFormData(prev => {
      const newPlans = [...prev.plans];
      newPlans[planIndex] = { ...newPlans[planIndex], [field]: value };
      return { ...prev, plans: newPlans };
    });
  };

  const addItemToPlanArray = (planIndex, field, value) => {
    if (!value.trim()) return;
    setPkgFormData(prev => {
      const newPlans = [...prev.plans];
      newPlans[planIndex] = { ...newPlans[planIndex], [field]: [...(newPlans[planIndex][field] || []), value.trim()] };
      return { ...prev, plans: newPlans };
    });
  };

  const removeItemFromPlanArray = (planIndex, field, itemIndex) => {
    setPkgFormData(prev => {
      const newPlans = [...prev.plans];
      newPlans[planIndex] = { ...newPlans[planIndex], [field]: newPlans[planIndex][field].filter((_, i) => i !== itemIndex) };
      return { ...prev, plans: newPlans };
    });
  };

  // Package Filter Logic
  const PACKAGE_CATEGORIES = ['General', 'Cardiology', 'Oncology', 'Family', 'Pediatrics', "Women's Health"];

  const filteredPackages = packages.filter(pkg => {
    const searchLower = pkgSearchTerm.toLowerCase();
    const matchesSearch = !pkgSearchTerm ||
      (pkg.title || '').toLowerCase().includes(searchLower) ||
      (pkg.category || '').toLowerCase().includes(searchLower) ||
      String(pkg.id).toLowerCase().includes(searchLower);
    const matchesCategory = pkgCategoryFilter === 'All' || (pkg.category || '').toLowerCase() === pkgCategoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleUpdateApplicantStatus = (id, newStatus) => {
    setJobApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    toast.success(`Applicant status updated to ${newStatus}.`);
  };

  // Doctor Filter Logic
  const filteredDoctorsBase = doctors.filter(doc => {
    const matchesSearch = (doc.name || '').toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
      (doc.specialization || '').toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
      (doc.department_name || '').toLowerCase().includes(doctorSearchTerm.toLowerCase());
    const matchesDept = doctorDeptFilter === 'All' || doc.department_name === doctorDeptFilter;
    return matchesSearch && matchesDept;
  });

  const sortedDoctors = [...filteredDoctorsBase].sort((a, b) => {
    if (doctorSortBy === 'nameAsc') return (a.name || '').localeCompare(b.name || '');
    if (doctorSortBy === 'nameDesc') return (b.name || '').localeCompare(a.name || '');
    if (doctorSortBy === 'feeAsc') return (parseFloat(a.consultation_fee) || 0) - (parseFloat(b.consultation_fee) || 0);
    if (doctorSortBy === 'feeDesc') return (parseFloat(b.consultation_fee) || 0) - (parseFloat(a.consultation_fee) || 0);
    return 0;
  });

  const doctorIndexOfLast = doctorCurrentPage * doctorsPerPage;
  const doctorIndexOfFirst = doctorIndexOfLast - doctorsPerPage;
  const filteredDoctors = sortedDoctors.slice(doctorIndexOfFirst, doctorIndexOfLast);
  const totalDoctorPages = Math.ceil(sortedDoctors.length / doctorsPerPage);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      
      {/* 1. DARK NAVY SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#0F172A] text-slate-300 p-6 space-y-6 flex-shrink-0">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0F4C81] text-white font-extrabold rounded-xl flex items-center justify-center text-lg shadow-md">
              M+
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base font-poppins">Control Center</h2>
              <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">MediCare Plus</span>
            </div>
          </div>
        </div>

        <nav className="space-y-6 text-xs font-semibold overflow-y-auto max-h-[calc(100vh-140px)]">
          {/* Group 1: Overview */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 block mb-1">Overview</span>
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-[#0F4C81] text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <LayoutDashboard size={18} /> Dashboard Stats
            </button>
          </div>

          {/* Group 2: Patient Care */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 block mb-1">Patient Care</span>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'doctors' ? 'bg-[#0F4C81] text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <span className="flex items-center gap-3"><Stethoscope size={18} /> Doctor Directory</span>
              <span className="bg-[#16A3A8] text-white font-bold px-2 py-0.5 rounded-full text-[10px]">{doctors.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'departments' ? 'bg-[#0F4C81] text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Building size={18} /> Departments ({departments.length || 10})
            </button>
            <button
              onClick={() => setActiveTab('facilities')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'facilities' ? 'bg-[#0F4C81] text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Baby size={18} /> Facilities & Kids Room
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'packages' ? 'bg-[#0F4C81] text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Shield size={18} /> Health Packages ({packages.length})
            </button>
          </div>

          {/* Group 3: Operations */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 block mb-1">Operations</span>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'appointments' ? 'bg-[#0F4C81] text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <span className="flex items-center gap-3"><Calendar size={18} /> Appointments</span>
              <span className="bg-amber-500 text-slate-950 font-extrabold px-2 py-0.5 rounded-full text-[10px]">{appointments.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'payments' ? 'bg-[#0F4C81] text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <CreditCard size={18} /> Payments & Receipts
            </button>
          </div>

          {/* Group 4: Content & Communications */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 block mb-1">Content & Inbox</span>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'testimonials' ? 'bg-[#0F4C81] text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <MessageSquare size={18} /> Reviews ({testimonials.length})
            </button>
            <button
              onClick={() => setActiveTab('careers')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'careers' ? 'bg-[#0F4C81] text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Briefcase size={18} /> Careers & Applicants
            </button>
          </div>

          {/* Group 5: System CMS & Audit */}
          <div className="space-y-1 pt-2 border-t border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 block mb-1">System & CMS</span>
            <button
              onClick={() => setActiveTab('cms')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'cms' ? 'bg-[#0F4C81] text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Globe size={18} /> Website Content CMS
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'logs' ? 'bg-[#0F4C81] text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Lock size={18} /> Audit Logs & Security
            </button>
          </div>
        </nav>
      </aside>

      {/* 2. MAIN ADMIN CONTENT CONTAINER */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 shadow-sm">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search control center..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F4C81] bg-slate-50"
              />
            </div>
          </div>

          {/* Quick Actions Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={openAddDoctorModal}
              className="bg-[#0F4C81] text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-[#0A3860] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={14} /> Add Doctor
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className="bg-[#16A3A8] text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-[#0F766E] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Calendar size={14} /> View Appointments
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 relative transition-colors"
              >
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  8
                </span>
              </button>

              {/* Notification Popover Drawer */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 space-y-3 text-xs">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold text-[#0F172A] text-sm">Notifications (8)</span>
                    <button onClick={() => setIsNotificationsOpen(false)} className="text-slate-400 hover:text-slate-600"><XCircle size={16} /></button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="font-bold text-[#0F4C81]">New Appointment #APP-1021</p>
                      <p className="text-[11px] text-slate-500">John Silva requested Cardiology - 2 mins ago</p>
                    </div>
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                      <p className="font-bold text-[#22C55E]">Payment Complete $75.00</p>
                      <p className="text-[11px] text-slate-500">Card Payment TXN-9847123 - 15 mins ago</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="font-bold text-slate-800">Job Application Submitted</p>
                      <p className="text-[11px] text-slate-500">Dr. Nishan Wickrama - 1 hour ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                className="flex items-center gap-2 p-1.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-[#0F172A]"
              >
                <div className="w-6 h-6 rounded-full bg-[#0F4C81] text-white flex items-center justify-center font-bold text-[10px]">
                  A
                </div>
                <span>Admin</span>
              </button>

              {isAdminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 text-xs font-semibold space-y-1">
                  <div className="p-2 border-b text-[11px] text-slate-500 font-bold">Logged in as System Admin</div>
                  <button onClick={() => { setActiveTab('cms'); setIsAdminDropdownOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-lg">Website Settings</button>
                  <button onClick={() => { setActiveTab('logs'); setIsAdminDropdownOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-lg">Audit Logs</button>
                  <button onClick={() => { toast.success('Logged out.'); setIsAdminDropdownOpen(false); }} className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-bold flex items-center gap-1">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body Views */}
        <main className="p-6 md:p-8 space-y-8 overflow-y-auto flex-grow text-xs">
          
          {/* TAB 1: OVERVIEW & TOP STATS */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-4 border-slate-200">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#0F172A] font-poppins">Hospital Operations Dashboard</h1>
                  <p className="text-slate-500 text-xs">Real-time statistics across clinical departments, appointments, and hospital revenue.</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                  🟢 All Systems Operational
                </span>
              </div>

              {/* 4 Statistics Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase">Total Patients</span>
                    <span className="text-[10px] font-bold text-[#22C55E] bg-emerald-50 px-2 py-0.5 rounded-full">↑ 12.5%</span>
                  </div>
                  <div className="text-3xl font-extrabold text-[#0F172A] font-poppins">12,540</div>
                  <span className="text-[11px] text-slate-500">Registered Medical Records</span>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase">Specialist Doctors</span>
                    <span className="text-[10px] font-bold text-[#0F4C81] bg-blue-50 px-2 py-0.5 rounded-full">Active</span>
                  </div>
                  <div className="text-3xl font-extrabold text-[#0F4C81] font-poppins">{doctors.length}</div>
                  <span className="text-[11px] text-slate-500">Board Certified Consultants</span>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase">Appointments</span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Today</span>
                  </div>
                  <div className="text-3xl font-extrabold text-[#16A3A8] font-poppins">248</div>
                  <span className="text-[11px] text-slate-500">42 Pending Approval</span>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase">Hospital Revenue</span>
                    <span className="text-[10px] font-bold text-[#22C55E] bg-emerald-50 px-2 py-0.5 rounded-full">↑ 18.4%</span>
                  </div>
                  <div className="text-3xl font-extrabold text-[#22C55E] font-poppins">$48,500</div>
                  <span className="text-[11px] text-slate-500">Monthly Revenue Stream</span>
                </div>
              </div>

              {/* Today's Appointments Operations Desk */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-[#0F172A] font-poppins">Today's Appointments Operations Desk</h3>
                  <button onClick={() => setActiveTab('appointments')} className="text-xs text-[#0F4C81] font-bold hover:underline">View All →</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase border-b">
                      <tr>
                        <th className="p-3">Patient</th>
                        <th className="p-3">Doctor</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Time</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {appointments.slice(0, 5).map((a) => (
                        <tr key={a.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-[#0F172A]">{a.patient_name} <span className="block text-[10px] text-slate-400">{a.patient_phone}</span></td>
                          <td className="p-3 font-semibold text-[#0F4C81]">{a.doctor_name}</td>
                          <td className="p-3 text-slate-600">{a.department_name}</td>
                          <td className="p-3 font-bold text-slate-700">{a.appointment_time}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                              (a.status || '').toLowerCase() === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                              (a.status || '').toLowerCase() === 'completed' ? 'bg-blue-100 text-blue-800' :
                              (a.status || '').toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {a.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <button onClick={() => openViewApptModal(a)} className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors" title="View Details"><Eye size={13} /></button>
                              <button onClick={() => openEditApptModal(a)} className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg transition-colors" title="Edit"><Edit3 size={13} /></button>
                              <button onClick={() => handleUpdateApptStatus(a.id, 'confirmed')} className="px-2 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[10px]">Approve</button>
                              <button onClick={() => handleUpdateApptStatus(a.id, 'cancelled')} className="px-2 py-1 bg-red-500 text-white rounded-lg font-bold text-[10px]">Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCTOR DIRECTORY & MANAGEMENT */}
          {activeTab === 'doctors' && (
            <div className="space-y-6">
              {/* Header section */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#0F172A] font-poppins">Doctor Directory Page</h1>
                  <p className="text-slate-500 text-xs">Manage medical consultants, specializations, consultation fees, and profile records.</p>
                </div>
                <button
                  onClick={openAddDoctorModal}
                  className="btn-primary py-2.5 px-5 text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Plus size={16} /> Add Doctor
                </button>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={doctorSearchTerm}
                    onChange={(e) => setDoctorSearchTerm(e.target.value)}
                    placeholder="Search doctor by name or specialization..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F4C81] bg-slate-50"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Filter size={14} className="text-slate-400" />
                    <span className="text-slate-600 font-semibold text-xs">Department:</span>
                  </div>
                  <select
                    value={doctorDeptFilter}
                    onChange={(e) => setDoctorDeptFilter(e.target.value)}
                    className="py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#0F4C81]"
                  >
                    <option value="All">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>

                  {(doctorSearchTerm || doctorDeptFilter !== 'All') && (
                    <button
                      onClick={() => { setDoctorSearchTerm(''); setDoctorDeptFilter('All'); }}
                      className="text-xs font-bold text-red-500 hover:underline px-2 py-1"
                    >
                      Clear
                    </button>
                  )}

                  <div className="flex items-center gap-2 border-l pl-3 ml-1">
                    <span className="text-slate-600 font-semibold text-xs">Sort:</span>
                    <select
                      value={doctorSortBy}
                      onChange={(e) => setDoctorSortBy(e.target.value)}
                      className="py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#0F4C81]"
                    >
                      <option value="nameAsc">Name (A-Z)</option>
                      <option value="nameDesc">Name (Z-A)</option>
                      <option value="feeAsc">Fee (Low to High)</option>
                      <option value="feeDesc">Fee (High to Low)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Main Doctors Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="p-4">Doctor Profile & Name</th>
                        <th className="p-4">Department</th>
                        <th className="p-4">Specialization</th>
                        <th className="p-4">Fee</th>
                        <th className="p-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doc) => (
                          <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                            {/* Doctor Photo & Name */}
                            <td className="p-4 font-bold text-[#0F172A]">
                              <div className="flex items-center gap-3">
                                <img
                                  src={doc.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80'}
                                  alt={doc.name}
                                  className="w-10 h-10 rounded-full object-cover border-2 border-slate-200 shadow-xs shrink-0"
                                />
                                <div>
                                  <span className="font-extrabold text-[#0F172A] text-sm block leading-tight">{doc.name}</span>
                                  <span className="text-[11px] text-slate-500 font-medium block">{doc.qualification || 'MBBS, MD'}</span>
                                </div>
                              </div>
                            </td>

                            {/* Department */}
                            <td className="p-4">
                              <span className="bg-teal-50 text-[#16A3A8] border border-teal-200 px-3 py-1 rounded-full font-bold text-[11px] inline-block">
                                {doc.department_name || 'Cardiology'}
                              </span>
                            </td>

                            {/* Specialization */}
                            <td className="p-4 font-medium text-slate-700">
                              {doc.specialization}
                              {doc.experience && (
                                <span className="text-[10px] text-slate-400 block mt-0.5">Exp: {doc.experience} Years</span>
                              )}
                            </td>

                            {/* Fee */}
                            <td className="p-4">
                              <span className="font-extrabold text-[#22C55E] text-sm">
                                ${parseFloat(doc.consultation_fee || 75).toFixed(2)}
                              </span>
                            </td>

                            {/* Actions: View, Edit, Delete */}
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-1.5">
                                {/* VIEW BUTTON */}
                                <button
                                  onClick={() => openViewDoctorModal(doc)}
                                  title="View Doctor Details"
                                  className="p-2 text-slate-600 bg-slate-100 hover:bg-[#0F4C81] hover:text-white rounded-xl transition-all shadow-xs"
                                >
                                  <Eye size={16} />
                                </button>

                                {/* EDIT BUTTON */}
                                <button
                                  onClick={() => openEditDoctorModal(doc)}
                                  title="Edit Doctor Details"
                                  className="p-2 text-amber-700 bg-amber-50 hover:bg-amber-500 hover:text-white rounded-xl transition-all shadow-xs"
                                >
                                  <Edit3 size={16} />
                                </button>

                                {/* DELETE BUTTON */}
                                <button
                                  onClick={() => setDoctorToDelete(doc)}
                                  title="Delete Doctor"
                                  className="p-2 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-xs"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-slate-400 font-semibold">
                            No doctor records match your search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {totalDoctorPages > 1 && (
                  <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-semibold">
                      Showing {doctorIndexOfFirst + 1} to {Math.min(doctorIndexOfLast, sortedDoctors.length)} of {sortedDoctors.length} doctors
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setDoctorCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={doctorCurrentPage === 1}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
                      >
                        Prev
                      </button>
                      {Array.from({ length: totalDoctorPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setDoctorCurrentPage(page)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            doctorCurrentPage === page 
                              ? 'bg-[#0F4C81] text-white border border-[#0F4C81]' 
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setDoctorCurrentPage(prev => Math.min(prev + 1, totalDoctorPages))}
                        disabled={doctorCurrentPage === totalDoctorPages}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: DEPARTMENTS */}
          {activeTab === 'departments' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-extrabold text-[#0F172A] font-poppins">Clinical Departments Management</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map(d => (
                  <div key={d.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="font-extrabold text-[#0F172A] text-base">{d.name}</span>
                      <span className="bg-blue-50 text-[#0F4C81] text-[10px] font-bold px-2 py-0.5 rounded-full">{d.category || 'Clinical'}</span>
                    </div>
                    <p className="text-slate-500 text-xs line-clamp-2">{d.description}</p>
                    <div className="text-[11px] font-bold text-slate-600 border-t pt-2">Head: {d.head || 'Dr. Specialist'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FACILITIES & KIDS ROOM */}
          {activeTab === 'facilities' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-extrabold text-[#0F172A] font-poppins">Hospital Facilities & Kids Play Room</h1>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
                <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <Baby size={28} className="text-amber-600" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0F172A]">🧸 Kids Room & Children's Play Area</h4>
                    <p className="text-xs text-slate-600">Location: 3rd Floor Pediatric Wing | Capacity: 20 Children | Status: Active (Daily 7 AM - 9 PM)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HEALTH PACKAGES MANAGEMENT */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#0F172A] font-poppins">Health Packages Management</h1>
                  <p className="text-slate-500 text-xs">Manage health checkup packages — create plans, set pricing, track bookings, and update benefits.</p>
                </div>
                <button
                  onClick={openAddPkgModal}
                  className="btn-primary py-2.5 px-5 text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Plus size={16} /> Add Package
                </button>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={pkgSearchTerm}
                    onChange={(e) => setPkgSearchTerm(e.target.value)}
                    placeholder="Search by package name, category, or ID..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F4C81] bg-slate-50"
                  />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Filter size={14} className="text-slate-400" />
                    <span className="text-slate-600 font-semibold text-xs">Category:</span>
                  </div>
                  <select
                    value={pkgCategoryFilter}
                    onChange={(e) => setPkgCategoryFilter(e.target.value)}
                    className="py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#0F4C81]"
                  >
                    <option value="All">All Categories</option>
                    {PACKAGE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {(pkgSearchTerm || pkgCategoryFilter !== 'All') && (
                    <button
                      onClick={() => { setPkgSearchTerm(''); setPkgCategoryFilter('All'); }}
                      className="text-xs font-bold text-red-500 hover:underline px-2 py-1"
                    >
                      Clear
                    </button>
                  )}
                  <span className="text-[11px] text-slate-400 font-semibold ml-auto">
                    {filteredPackages.length} of {packages.length} packages
                  </span>
                </div>
              </div>

              {/* Packages Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="p-4">Package ID</th>
                        <th className="p-4">Package Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Starting Price</th>
                        <th className="p-4">Plans</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPackages.length > 0 ? (
                        filteredPackages.map(pkg => (
                          <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-bold text-[#0F4C81]">{pkg.id}</td>
                            <td className="p-4">
                              <div>
                                <span className="font-extrabold text-[#0F172A] text-sm block leading-tight">{pkg.title}</span>
                                <span className="text-[11px] text-slate-500 font-medium block truncate max-w-[250px]">{pkg.description}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="bg-teal-50 text-[#16A3A8] border border-teal-200 px-3 py-1 rounded-full font-bold text-[11px] inline-block">
                                {pkg.category}
                              </span>
                            </td>
                            <td className="p-4 font-extrabold text-[#22C55E] text-sm">{pkg.startPrice}</td>
                            <td className="p-4">
                              <span className="bg-[#0F4C81]/10 text-[#0F4C81] px-2.5 py-1 rounded-full font-extrabold text-[11px]">
                                {pkg.plans ? pkg.plans.length : 3} Plans
                              </span>
                            </td>
                            <td className="p-4">
                              <button onClick={() => togglePkgStatus(pkg)}>
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold inline-block cursor-pointer transition-colors ${
                                  pkg.status === 'Active' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-red-100 text-red-700 hover:bg-red-200'
                                }`}>
                                  {pkg.status || 'Active'}
                                </span>
                              </button>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-1.5">
                                <button onClick={() => openViewPkgModal(pkg)} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors" title="View Details">
                                  <Eye size={15} />
                                </button>
                                <button onClick={() => openEditPkgModal(pkg)} className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-xl transition-colors" title="Edit Package">
                                  <Edit3 size={15} />
                                </button>
                                <button onClick={() => setPkgToDelete(pkg)} className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors" title="Delete Package">
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="p-8 text-center text-slate-400 text-sm">
                            No packages found matching your search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: APPOINTMENTS — FULL CRUD MANAGEMENT */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#0F172A] font-poppins">All Appointment Records</h1>
                  <p className="text-slate-500 text-xs">Manage patient appointments — view details, edit, add new, or cancel bookings.</p>
                </div>
                <button
                  onClick={openAddApptModal}
                  className="btn-primary py-2.5 px-5 text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Plus size={16} /> Add Appointment
                </button>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={apptSearchTerm}
                    onChange={(e) => setApptSearchTerm(e.target.value)}
                    placeholder="Search by patient, doctor, email, or ID..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F4C81] bg-slate-50"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Filter size={14} className="text-slate-400" />
                    <span className="text-slate-600 font-semibold text-xs">Status:</span>
                  </div>
                  <select
                    value={apptStatusFilter}
                    onChange={(e) => setApptStatusFilter(e.target.value)}
                    className="py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#0F4C81]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  {(apptSearchTerm || apptStatusFilter !== 'All') && (
                    <button
                      onClick={() => { setApptSearchTerm(''); setApptStatusFilter('All'); }}
                      className="text-xs font-bold text-red-500 hover:underline px-2 py-1"
                    >
                      Clear
                    </button>
                  )}

                  <span className="text-[11px] text-slate-400 font-semibold ml-auto">
                    {filteredAppointments.length} of {appointments.length} records
                  </span>
                </div>
              </div>

              {/* Main Appointments Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="p-4">Appt ID</th>
                        <th className="p-4">Patient</th>
                        <th className="p-4">Doctor</th>
                        <th className="p-4">Department</th>
                        <th className="p-4">Date & Time</th>
                        <th className="p-4">Fee</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAppointments.length > 0 ? (
                        filteredAppointments.map(a => (
                          <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-bold text-[#0F4C81]">{a.id}</td>
                            <td className="p-4">
                              <div>
                                <span className="font-extrabold text-[#0F172A] text-sm block leading-tight">{a.patient_name}</span>
                                <span className="text-[11px] text-slate-500 font-medium block">{a.patient_phone}</span>
                              </div>
                            </td>
                            <td className="p-4 font-semibold text-slate-700">{a.doctor_name}</td>
                            <td className="p-4">
                              <span className="bg-teal-50 text-[#16A3A8] border border-teal-200 px-3 py-1 rounded-full font-bold text-[11px] inline-block">
                                {a.department_name}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="font-bold text-slate-800 block">{a.appointment_date}</span>
                              <span className="text-[11px] text-slate-500 flex items-center gap-1"><Clock size={11} /> {a.appointment_time}</span>
                            </td>
                            <td className="p-4 font-extrabold text-[#22C55E]">${a.consultation_fee || '—'}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold inline-block ${
                                (a.status || '').toLowerCase() === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                (a.status || '').toLowerCase() === 'completed' ? 'bg-blue-100 text-blue-800' :
                                (a.status || '').toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {a.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-1.5">
                                <button onClick={() => openViewApptModal(a)} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors" title="View Details">
                                  <Eye size={15} />
                                </button>
                                <button onClick={() => openEditApptModal(a)} className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-xl transition-colors" title="Edit Appointment">
                                  <Edit3 size={15} />
                                </button>
                                <button onClick={() => setApptToDelete(a)} className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors" title="Delete Appointment">
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="p-8 text-center text-slate-400 text-sm">
                            No appointments found matching your search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-extrabold text-[#0F172A] font-poppins">Payment Transactions & Receipts</h1>
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-3">
                {payments.map(p => (
                  <div key={p.id} className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-[#0F172A]">{p.id} — {p.patient}</span>
                      <p className="text-slate-500">{p.method} | Date: {p.date}</p>
                    </div>
                    <span className="font-extrabold text-[#22C55E] text-sm">{p.amount} ({p.status})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CAREERS & APPLICANTS */}
          {activeTab === 'careers' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-extrabold text-[#0F172A] font-poppins">Job Applications & Hiring Desk</h1>
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-3">
                {jobApplications.map(app => (
                  <div key={app.id} className="p-4 bg-slate-50 rounded-2xl border flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-sm text-[#0F172A]">{app.applicant}</span>
                      <p className="text-slate-500">Position: {app.position} ({app.exp} Exp)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateApplicantStatus(app.id, e.target.value)}
                        className="p-1.5 rounded-lg border text-xs font-bold"
                      >
                        <option value="Reviewing">Reviewing</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: WEBSITE CMS */}
          {activeTab === 'cms' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-extrabold text-[#0F172A] font-poppins">Website Content Management System</h1>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Hero Heading</label>
                  <input
                    type="text"
                    value={cmsContent.heroHeading}
                    onChange={(e) => setCmsContent({ ...cmsContent, heroHeading: e.target.value })}
                    className="w-full p-2.5 rounded-xl border text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Emergency Hotline</label>
                  <input
                    type="text"
                    value={cmsContent.emergencyHotline}
                    onChange={(e) => setCmsContent({ ...cmsContent, emergencyHotline: e.target.value })}
                    className="w-full p-2.5 rounded-xl border text-xs"
                  />
                </div>
                <button onClick={() => toast.success('Website CMS content updated live!')} className="btn-primary py-2.5 px-6 text-xs font-bold">
                  Save Live CMS Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: AUDIT LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-extrabold text-[#0F172A] font-poppins">Security & Audit Logs</h1>
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-3">
                {activityLogs.map(log => (
                  <div key={log.id} className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-[#0F172A]">{log.action}</span>
                      <p className="text-slate-400 text-[10px]">Module: {log.module} | IP: {log.ip}</p>
                    </div>
                    <span className="text-slate-500 text-[10px]">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. MODALS FOR DOCTOR MANAGEMENT (VIEW, ADD/EDIT, DELETE)       */}
      {/* ------------------------------------------------------------- */}

      {/* VIEW DOCTOR DETAILS MODAL */}
      {isViewDoctorModalOpen && selectedDoctorView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden space-y-0">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] p-6 text-white relative">
              <button
                onClick={() => setIsViewDoctorModalOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 p-1.5 rounded-full transition-colors"
              >
                <XCircle size={20} />
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={selectedDoctorView.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80'}
                  alt={selectedDoctorView.name}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white/20 shadow-md"
                />
                <div>
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedDoctorView.department_name || 'Cardiology'}
                  </span>
                  <h3 className="text-xl font-bold font-poppins mt-1">{selectedDoctorView.name}</h3>
                  <p className="text-xs text-teal-100">{selectedDoctorView.qualification || 'MBBS, MD'}</p>
                </div>
              </div>
            </div>

            {/* Details Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Specialization</span>
                  <span className="font-bold text-[#0F172A]">{selectedDoctorView.specialization}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Consultation Fee</span>
                  <span className="font-extrabold text-[#22C55E] text-sm">${selectedDoctorView.consultation_fee}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Experience</span>
                  <span className="font-bold text-slate-800">{selectedDoctorView.experience || 5} Years</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Working Schedule</span>
                  <span className="font-bold text-slate-800">{selectedDoctorView.availability || 'Mon - Fri'}</span>
                </div>
              </div>

              {selectedDoctorView.bio && (
                <div>
                  <h4 className="font-bold text-slate-700 mb-1 uppercase text-[10px]">Doctor Bio & Background</h4>
                  <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border leading-relaxed text-xs">
                    {selectedDoctorView.bio}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  onClick={() => {
                    setIsViewDoctorModalOpen(false);
                    openEditDoctorModal(selectedDoctorView);
                  }}
                  className="bg-amber-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-1.5"
                >
                  <Edit3 size={14} /> Edit Doctor
                </button>
                <button
                  onClick={() => setIsViewDoctorModalOpen(false)}
                  className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-xl hover:bg-slate-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT DOCTOR FORM MODAL */}
      {isDoctorFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-5 my-8">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-base text-[#0F172A]">
                {doctorFormData.id ? `Edit Doctor — ${doctorFormData.name}` : 'Add New Doctor to Directory'}
              </h3>
              <button onClick={() => setIsDoctorFormModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveDoctorSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Doctor Name *</label>
                  <input
                    type="text"
                    value={doctorFormData.name}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, name: e.target.value })}
                    placeholder="e.g. Dr. Aris Thorne"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                    required
                  />
                </div>

                {/* Qualification */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Qualification *</label>
                  <input
                    type="text"
                    value={doctorFormData.qualification}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, qualification: e.target.value })}
                    placeholder="e.g. MD, FACC, FRCP"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Department */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Department *</label>
                  <select
                    value={doctorFormData.department_id}
                    onChange={(e) => {
                      const selectedDeptId = e.target.value;
                      const deptName = departments.find(d => String(d.id) === String(selectedDeptId))?.name || 'General';
                      const availableSpecs = DEPARTMENT_SPECIALIZATIONS[deptName] || ['General Practice'];
                      setDoctorFormData({ ...doctorFormData, department_id: selectedDeptId, department_name: deptName, specialization: availableSpecs[0] });
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#0F4C81] bg-white"
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                {/* Specialization */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Specialization *</label>
                  <select
                    value={doctorFormData.specialization}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, specialization: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81] bg-white"
                    required
                  >
                    {(DEPARTMENT_SPECIALIZATIONS[doctorFormData.department_name] || ['General Practice']).map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Fee */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Consultation Fee ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={doctorFormData.consultation_fee}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, consultation_fee: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                    required
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={doctorFormData.experience}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, experience: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                  />
                </div>
              </div>

              {/* Schedule / Availability */}
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Availability / Working Hours</label>
                <input
                  type="text"
                  value={doctorFormData.availability}
                  onChange={(e) => setDoctorFormData({ ...doctorFormData, availability: e.target.value })}
                  placeholder="e.g. Mon - Fri, 8:00 AM - 2:00 PM"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                />
              </div>

              {/* Profile Photo */}
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Profile Photo</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={doctorFormData.image}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, image: e.target.value })}
                    placeholder="Image URL or upload..."
                    className="flex-1 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                  />
                  <label className="cursor-pointer bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2.5 rounded-xl font-bold flex items-center justify-center text-xs">
                    Upload File
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Doctor Profile Bio</label>
                <textarea
                  rows="3"
                  value={doctorFormData.bio}
                  onChange={(e) => setDoctorFormData({ ...doctorFormData, bio: e.target.value })}
                  placeholder="Brief description of doctor's clinical achievements..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsDoctorFormModalOpen(false)}
                  className="flex-1 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-white bg-[#0F4C81] hover:bg-[#0A3860] rounded-xl font-bold shadow-md"
                >
                  {doctorFormData.id ? 'Save Changes' : 'Add Doctor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {doctorToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 space-y-4 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0F172A]">Delete Doctor Record?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove <strong className="text-slate-800">{doctorToDelete.name}</strong> from the doctor directory? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDoctorToDelete(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={executeDeleteDoctor}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ------------------------------------------------------------- */}
      {/* 4. MODALS FOR APPOINTMENT MANAGEMENT (VIEW, ADD/EDIT, DELETE)  */}
      {/* ------------------------------------------------------------- */}

      {/* VIEW APPOINTMENT DETAILS MODAL */}
      {isViewApptModalOpen && selectedApptView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden space-y-0">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] p-6 text-white relative">
              <button
                onClick={() => setIsViewApptModalOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 p-1.5 rounded-full transition-colors"
              >
                <XCircle size={20} />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Calendar size={28} className="text-white" />
                </div>
                <div>
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Appointment #{selectedApptView.id}
                  </span>
                  <h3 className="text-xl font-bold font-poppins mt-1">{selectedApptView.patient_name}</h3>
                  <p className="text-xs text-teal-100">{selectedApptView.patient_email}</p>
                </div>
              </div>
            </div>

            {/* Details Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Patient Phone</span>
                  <span className="font-bold text-[#0F172A]">{selectedApptView.patient_phone || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Doctor</span>
                  <span className="font-bold text-[#0F4C81]">{selectedApptView.doctor_name || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Department</span>
                  <span className="font-bold text-slate-800">{selectedApptView.department_name || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Date</span>
                  <span className="font-bold text-slate-800">{selectedApptView.appointment_date}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Time</span>
                  <span className="font-bold text-slate-800">{selectedApptView.appointment_time}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Consultation Type</span>
                  <span className={`font-bold ${selectedApptView.consultation_type === 'Online' ? 'text-purple-600' : 'text-[#16A3A8]'}`}>
                    {selectedApptView.consultation_type || 'In-person'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Fee</span>
                  <span className="font-extrabold text-[#22C55E] text-sm">${selectedApptView.consultation_fee || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold inline-block ${
                    (selectedApptView.status || '').toLowerCase() === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                    (selectedApptView.status || '').toLowerCase() === 'completed' ? 'bg-blue-100 text-blue-800' :
                    (selectedApptView.status || '').toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedApptView.status}
                  </span>
                </div>
              </div>

              {selectedApptView.reason && (
                <div>
                  <h4 className="font-bold text-slate-700 mb-1 uppercase text-[10px]">Reason for Visit</h4>
                  <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border leading-relaxed text-xs">
                    {selectedApptView.reason}
                  </p>
                </div>
              )}

              {selectedApptView.medical_notes && (
                <div>
                  <h4 className="font-bold text-slate-700 mb-1 uppercase text-[10px]">Medical Notes</h4>
                  <p className="text-slate-600 bg-amber-50 p-3 rounded-xl border border-amber-200 leading-relaxed text-xs">
                    {selectedApptView.medical_notes}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  onClick={() => {
                    setIsViewApptModalOpen(false);
                    openEditApptModal(selectedApptView);
                  }}
                  className="bg-amber-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-1.5"
                >
                  <Edit3 size={14} /> Edit Appointment
                </button>
                <button
                  onClick={() => setIsViewApptModalOpen(false)}
                  className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-xl hover:bg-slate-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT APPOINTMENT FORM MODAL */}
      {isApptFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-5 my-8">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-base text-[#0F172A]">
                {apptFormData.id ? `Edit Appointment — #${apptFormData.id}` : 'Schedule New Appointment'}
              </h3>
              <button onClick={() => setIsApptFormModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveApptSubmit} className="space-y-4 text-xs">
              {/* Patient Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Patient Name *</label>
                  <input
                    type="text"
                    value={apptFormData.patient_name}
                    onChange={(e) => setApptFormData({ ...apptFormData, patient_name: e.target.value })}
                    placeholder="e.g. John Silva"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Patient Email *</label>
                  <input
                    type="email"
                    value={apptFormData.patient_email}
                    onChange={(e) => setApptFormData({ ...apptFormData, patient_email: e.target.value })}
                    placeholder="e.g. john@email.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Patient Phone *</label>
                <input
                  type="text"
                  value={apptFormData.patient_phone}
                  onChange={(e) => setApptFormData({ ...apptFormData, patient_phone: e.target.value })}
                  placeholder="e.g. +94 77 123 4567"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                  required
                />
              </div>

              {/* Doctor & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Doctor *</label>
                  <select
                    value={apptFormData.doctor_id}
                    onChange={(e) => {
                      const doc = doctors.find(d => String(d.id) === e.target.value);
                      setApptFormData({
                        ...apptFormData,
                        doctor_id: e.target.value,
                        department_id: doc ? String(doc.department_id) : apptFormData.department_id,
                        consultation_fee: doc ? doc.consultation_fee : apptFormData.consultation_fee
                      });
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#0F4C81] bg-white"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name} — {doc.department_name || doc.specialization}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Department</label>
                  <select
                    value={apptFormData.department_id}
                    onChange={(e) => setApptFormData({ ...apptFormData, department_id: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#0F4C81] bg-white"
                  >
                    <option value="">Auto (from doctor)</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date, Time & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Date *</label>
                  <input
                    type="date"
                    value={apptFormData.appointment_date}
                    onChange={(e) => setApptFormData({ ...apptFormData, appointment_date: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Time *</label>
                  <select
                    value={apptFormData.appointment_time}
                    onChange={(e) => setApptFormData({ ...apptFormData, appointment_time: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#0F4C81] bg-white"
                  >
                    {['08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','01:00 PM','01:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Type</label>
                  <select
                    value={apptFormData.consultation_type}
                    onChange={(e) => setApptFormData({ ...apptFormData, consultation_type: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#0F4C81] bg-white"
                  >
                    <option value="In-person">In-person</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
              </div>

              {/* Fee & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Consultation Fee ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={apptFormData.consultation_fee}
                    onChange={(e) => setApptFormData({ ...apptFormData, consultation_fee: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Status</label>
                  <select
                    value={apptFormData.status}
                    onChange={(e) => setApptFormData({ ...apptFormData, status: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#0F4C81] bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Reason for Visit</label>
                <textarea
                  rows="2"
                  value={apptFormData.reason}
                  onChange={(e) => setApptFormData({ ...apptFormData, reason: e.target.value })}
                  placeholder="Brief description of the patient's reason for appointment..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                />
              </div>

              {/* Medical Notes */}
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Medical Notes</label>
                <textarea
                  rows="2"
                  value={apptFormData.medical_notes}
                  onChange={(e) => setApptFormData({ ...apptFormData, medical_notes: e.target.value })}
                  placeholder="Doctor's medical notes, prescriptions, or follow-up instructions..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsApptFormModalOpen(false)}
                  className="flex-1 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-white bg-[#0F4C81] hover:bg-[#0A3860] rounded-xl font-bold shadow-md"
                >
                  {apptFormData.id ? 'Save Changes' : 'Create Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE APPOINTMENT CONFIRMATION MODAL */}
      {apptToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 space-y-4 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0F172A]">Delete Appointment?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete appointment <strong className="text-slate-800">#{apptToDelete.id}</strong> for <strong className="text-slate-800">{apptToDelete.patient_name}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setApptToDelete(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={executeDeleteAppt}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. MODALS FOR HEALTH PACKAGES (VIEW, ADD/EDIT, DELETE)         */}
      {/* ------------------------------------------------------------- */}

      {/* VIEW PACKAGE DETAILS MODAL */}
      {isViewPkgModalOpen && selectedPkgView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden my-8">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] p-6 text-white relative">
              <button
                onClick={() => setIsViewPkgModalOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 p-1.5 rounded-full transition-colors"
              >
                <XCircle size={20} />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Shield size={28} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {selectedPkgView.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${selectedPkgView.status === 'Active' ? 'bg-emerald-400/30 text-emerald-100' : 'bg-red-400/30 text-red-200'}`}>
                      {selectedPkgView.status || 'Active'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-poppins">{selectedPkgView.title}</h3>
                  <p className="text-xs text-teal-100 mt-0.5">Starting from {selectedPkgView.startPrice} · {selectedPkgView.plans?.length || 3} Plans</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 text-xs">
              {/* Description */}
              {selectedPkgView.description && (
                <div>
                  <h4 className="font-bold text-slate-700 mb-1 uppercase text-[10px]">Package Description</h4>
                  <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border leading-relaxed">{selectedPkgView.description}</p>
                </div>
              )}

              {/* Hospital Benefits */}
              {selectedPkgView.hospitalBenefits && selectedPkgView.hospitalBenefits.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-700 mb-2 uppercase text-[10px]">Hospital Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPkgView.hospitalBenefits.map((b, i) => (
                      <span key={i} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-[11px] font-semibold">✓ {b}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Plan Tabs */}
              {selectedPkgView.plans && selectedPkgView.plans.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-700 mb-2 uppercase text-[10px]">Age-Based Plans</h4>
                  <div className="flex gap-2 mb-3">
                    {selectedPkgView.plans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setViewPkgPlanTab(plan.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                          viewPkgPlanTab === plan.id
                            ? 'bg-[#0F4C81] text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {plan.id === 'basic' ? '🟢 Basic' : plan.id === 'advanced' ? '🔵 Advanced' : '🟣 Premium'} ({plan.label})
                      </button>
                    ))}
                  </div>

                  {selectedPkgView.plans.filter(p => p.id === viewPkgPlanTab).map(plan => (
                    <div key={plan.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex justify-between items-center">
                        <h5 className="font-bold text-[#0F172A] text-sm">{plan.title}</h5>
                        <span className="text-lg font-extrabold text-[#22C55E]">{plan.price}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Age Range</span>
                          <span className="font-bold text-slate-800">{plan.ageRange}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Suitable For</span>
                          <span className="font-semibold text-slate-700">{plan.suitableFor}</span>
                        </div>
                      </div>
                      {plan.includes && plan.includes.length > 0 && (
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Tests & Inclusions ({plan.includes.length})</span>
                          <div className="flex flex-wrap gap-1.5">
                            {plan.includes.map((item, i) => (
                              <span key={i} className="bg-blue-50 text-[#0F4C81] border border-blue-200 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">✓ {item}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {plan.benefits && plan.benefits.length > 0 && (
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Key Benefits</span>
                          <div className="flex flex-wrap gap-1.5">
                            {plan.benefits.map((b, i) => (
                              <span key={i} className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">★ {b}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  onClick={() => { setIsViewPkgModalOpen(false); openEditPkgModal(selectedPkgView); }}
                  className="bg-amber-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-1.5"
                >
                  <Edit3 size={14} /> Edit Package
                </button>
                <button
                  onClick={() => setIsViewPkgModalOpen(false)}
                  className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-xl hover:bg-slate-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PACKAGE FORM MODAL */}
      {isPkgFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 space-y-5 my-8">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-base text-[#0F172A]">
                {pkgFormData.id ? `Edit Package — ${pkgFormData.title}` : 'Create New Health Package'}
              </h3>
              <button onClick={() => setIsPkgFormModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePkgSubmit} className="space-y-4 text-xs">
              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Package Name *</label>
                  <input type="text" value={pkgFormData.title} onChange={(e) => setPkgFormData({ ...pkgFormData, title: e.target.value })} placeholder="e.g. Full Body Checkup" className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]" required />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Category *</label>
                  <select value={pkgFormData.category} onChange={(e) => setPkgFormData({ ...pkgFormData, category: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#0F4C81] bg-white">
                    {PACKAGE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Starting Price *</label>
                  <input type="text" value={pkgFormData.startPrice} onChange={(e) => setPkgFormData({ ...pkgFormData, startPrice: e.target.value })} placeholder="e.g. $199" className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]" required />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Status</label>
                  <select value={pkgFormData.status} onChange={(e) => setPkgFormData({ ...pkgFormData, status: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#0F4C81] bg-white">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Image URL</label>
                  <input type="url" value={pkgFormData.image} onChange={(e) => setPkgFormData({ ...pkgFormData, image: e.target.value })} placeholder="https://..." className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea rows="2" value={pkgFormData.description} onChange={(e) => setPkgFormData({ ...pkgFormData, description: e.target.value })} placeholder="Brief description of the health package..." className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]" />
              </div>

              {/* Hospital Benefits */}
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Hospital Benefits</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {pkgFormData.hospitalBenefits.map((b, i) => (
                    <span key={i} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
                      {b}
                      <button type="button" onClick={() => setPkgFormData(prev => ({ ...prev, hospitalBenefits: prev.hospitalBenefits.filter((_, idx) => idx !== i) }))} className="text-red-400 hover:text-red-600"><XCircle size={12} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={tempHospBenefitInput} onChange={(e) => setTempHospBenefitInput(e.target.value)} placeholder="e.g. Same day test reports" className="flex-1 p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (tempHospBenefitInput.trim()) { setPkgFormData(prev => ({ ...prev, hospitalBenefits: [...prev.hospitalBenefits, tempHospBenefitInput.trim()] })); setTempHospBenefitInput(''); } } }} />
                  <button type="button" onClick={() => { if (tempHospBenefitInput.trim()) { setPkgFormData(prev => ({ ...prev, hospitalBenefits: [...prev.hospitalBenefits, tempHospBenefitInput.trim()] })); setTempHospBenefitInput(''); } }} className="px-3 py-2 bg-[#16A3A8] text-white rounded-xl font-bold text-[10px]"><Plus size={14} /></button>
                </div>
              </div>

              {/* Plans Section */}
              <div className="border-t pt-4">
                <h4 className="font-bold text-[#0F172A] mb-3 text-sm">Age-Based Plans</h4>
                <div className="flex gap-2 mb-3">
                  {pkgFormData.plans.map((plan, idx) => (
                    <button key={plan.id} type="button" onClick={() => setEditingPlanIndex(idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                        editingPlanIndex === idx ? 'bg-[#0F4C81] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}>
                      {plan.id === 'basic' ? '🟢 Basic' : plan.id === 'advanced' ? '🔵 Advanced' : '🟣 Premium'}
                    </button>
                  ))}
                </div>

                {pkgFormData.plans[editingPlanIndex] && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1">Plan Title</label>
                        <input type="text" value={pkgFormData.plans[editingPlanIndex].title} onChange={(e) => updatePlanField(editingPlanIndex, 'title', e.target.value)} placeholder="e.g. Basic Wellness Checkup" className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]" />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1">Price</label>
                        <input type="text" value={pkgFormData.plans[editingPlanIndex].price} onChange={(e) => updatePlanField(editingPlanIndex, 'price', e.target.value)} placeholder="e.g. $199" className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1">Age Range Label</label>
                        <input type="text" value={pkgFormData.plans[editingPlanIndex].label} onChange={(e) => updatePlanField(editingPlanIndex, 'label', e.target.value)} placeholder="e.g. 18 - 30" className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]" />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1">Age Range Display</label>
                        <input type="text" value={pkgFormData.plans[editingPlanIndex].ageRange} onChange={(e) => updatePlanField(editingPlanIndex, 'ageRange', e.target.value)} placeholder="e.g. Age 18 – 30" className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]" />
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Suitable For</label>
                      <input type="text" value={pkgFormData.plans[editingPlanIndex].suitableFor} onChange={(e) => updatePlanField(editingPlanIndex, 'suitableFor', e.target.value)} placeholder="Describe who this plan is best for..." className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]" />
                    </div>

                    {/* Tests & Inclusions */}
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Tests & Inclusions</label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {(pkgFormData.plans[editingPlanIndex].includes || []).map((item, i) => (
                          <span key={i} className="bg-blue-50 text-[#0F4C81] border border-blue-200 px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
                            {item}
                            <button type="button" onClick={() => removeItemFromPlanArray(editingPlanIndex, 'includes', i)} className="text-red-400 hover:text-red-600"><XCircle size={12} /></button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input type="text" value={tempIncludeInput} onChange={(e) => setTempIncludeInput(e.target.value)} placeholder="e.g. ECG Test" className="flex-1 p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItemToPlanArray(editingPlanIndex, 'includes', tempIncludeInput); setTempIncludeInput(''); } }} />
                        <button type="button" onClick={() => { addItemToPlanArray(editingPlanIndex, 'includes', tempIncludeInput); setTempIncludeInput(''); }} className="px-3 py-2 bg-[#0F4C81] text-white rounded-xl font-bold text-[10px]"><Plus size={14} /></button>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Benefits</label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {(pkgFormData.plans[editingPlanIndex].benefits || []).map((b, i) => (
                          <span key={i} className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
                            {b}
                            <button type="button" onClick={() => removeItemFromPlanArray(editingPlanIndex, 'benefits', i)} className="text-red-400 hover:text-red-600"><XCircle size={12} /></button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input type="text" value={tempBenefitInput} onChange={(e) => setTempBenefitInput(e.target.value)} placeholder="e.g. Early disease detection" className="flex-1 p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81]" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItemToPlanArray(editingPlanIndex, 'benefits', tempBenefitInput); setTempBenefitInput(''); } }} />
                        <button type="button" onClick={() => { addItemToPlanArray(editingPlanIndex, 'benefits', tempBenefitInput); setTempBenefitInput(''); }} className="px-3 py-2 bg-amber-500 text-white rounded-xl font-bold text-[10px]"><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <button type="button" onClick={() => setIsPkgFormModalOpen(false)} className="flex-1 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 text-white bg-[#0F4C81] hover:bg-[#0A3860] rounded-xl font-bold shadow-md">
                  {pkgFormData.id ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE / DEACTIVATE PACKAGE MODAL */}
      {pkgToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 space-y-4 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0F172A]">Delete Health Package?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete <strong className="text-slate-800">"{pkgToDelete.title}"</strong>? Consider deactivating instead if existing bookings use this package.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setPkgToDelete(null)} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs">Cancel</button>
              <button onClick={() => { togglePkgStatus(pkgToDelete); setPkgToDelete(null); }} className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs shadow-md">Deactivate</button>
              <button onClick={executeDeletePkg} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md">Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;

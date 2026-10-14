import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Stethoscope, Calendar, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, DollarSign } from 'lucide-react';
import { getDoctors, getDepartments, getPackages, createAppointment } from '../services/api';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Appointment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [packages, setPackages] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    patient_name: '',
    nic: '',
    dob: '',
    gender: 'Male',
    patient_phone: '',
    patient_email: '',
    address: '',
    department_id: searchParams.get('department_id') || '',
    doctor_id: searchParams.get('doctor_id') || '',
    package_id: searchParams.get('package_id') || '',
    reason: searchParams.get('service') ? `Service Requested: ${searchParams.get('service')}` : '',
    medical_notes: '',
    appointment_date: searchParams.get('date') || new Date().toISOString().split('T')[0],
    appointment_time: searchParams.get('time') || '10:00 AM',
    consultation_type: searchParams.get('mode') || 'In-person',
    urgency: 'Normal'
  });

  useEffect(() => {
    const loadData = async () => {
      const docs = await getDoctors();
      const depts = await getDepartments();
      const pkgs = await getPackages();
      setDoctors(docs);
      setDepartments(depts);
      setPackages(pkgs);

      const doctorIdFromUrl = searchParams.get('doctor_id');
      const serviceFromUrl = searchParams.get('service');
      const deptFromUrl = searchParams.get('department');

      if (doctorIdFromUrl) {
        const selectedDoc = docs.find(d => d.id === parseInt(doctorIdFromUrl));
        if (selectedDoc) {
          setFormData(prev => ({
            ...prev,
            doctor_id: selectedDoc.id,
            department_id: selectedDoc.department_id || prev.department_id
          }));
        }
      } else if (deptFromUrl) {
        const matchedDept = depts.find(d => d.name.toLowerCase() === deptFromUrl.toLowerCase());
        if (matchedDept) {
          setFormData(prev => ({ ...prev, department_id: matchedDept.id }));
        }
      }
    };
    loadData();
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.patient_name || !formData.patient_email || !formData.patient_phone) {
        toast.error('Please fill in your Name, Email, and Phone Number.');
        return;
      }
    }
    if (step === 2) {
      if (!formData.department_id && !formData.doctor_id && !formData.package_id && !formData.reason) {
        toast.error('Please select a Department, Doctor, Service, or Health Package.');
        return;
      }
    }
    if (step === 3) {
      if (!formData.appointment_date || !formData.appointment_time) {
        toast.error('Please select an Appointment Date and Preferred Time.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleConfirmAppointment = async () => {
    const loadingToast = toast.loading('Creating your appointment record...');
    try {
      const res = await createAppointment(formData);
      toast.dismiss(loadingToast);
      if (res && res.status === 'success') {
        toast.success('Appointment created successfully! Redirecting to payment...');
        const appointmentId = res.appointment_id || 1001;
        navigate(`/payment?appointment_id=${appointmentId}`);
      } else {
        toast.error(res.message || 'Failed to create appointment');
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Error creating appointment. Proceeding to payment...');
      navigate('/payment?appointment_id=1001');
    }
  };

  const selectedDocObj = doctors.find(d => d.id === parseInt(formData.doctor_id));
  const selectedDeptObj = departments.find(d => d.id === parseInt(formData.department_id));
  const selectedPkgObj = packages.find(p => p.id === parseInt(formData.package_id));
  const estimatedFee = selectedDocObj ? selectedDocObj.consultation_fee : (selectedPkgObj ? selectedPkgObj.price : 50.00);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-3">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">{t('appointment.multistepBooking')}</span>
          <h1 className="text-4xl font-extrabold font-poppins">{t('appointment.bookAnAppointment')}</h1>
          <p className="text-blue-100 text-sm">{t('appointment.scheduleDescription')}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-4xl">
        
        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 gap-2 mb-10 text-center text-xs font-bold">
          <div className={`p-3 rounded-xl border transition-all ${step >= 1 ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-400'}`}>
            {t('appointment.step1PatientDetails')}
          </div>
          <div className={`p-3 rounded-xl border transition-all ${step >= 2 ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-400'}`}>
            {t('appointment.step2MedicalSelection')}
          </div>
          <div className={`p-3 rounded-xl border transition-all ${step >= 3 ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-400'}`}>
            {t('appointment.step3DateTime')}
          </div>
          <div className={`p-3 rounded-xl border transition-all ${step >= 4 ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-400'}`}>
            {t('appointment.step4Confirmation')}
          </div>
        </div>

        {/* Multi-Step Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-8 md:p-10 space-y-8">
          
          {/* STEP 1: PATIENT DETAILS */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b pb-4 border-slate-100 flex items-center gap-2">
                <User className="text-[#0F4C81]" size={22} />
                <h3 className="text-xl font-bold text-[#0F172A]">{t('appointment.step1Title')}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.fullName')}</label>
                  <input
                    type="text"
                    name="patient_name"
                    value={formData.patient_name}
                    onChange={handleChange}
                    placeholder="e.g. John Silva"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.emailAddress')}</label>
                  <input
                    type="email"
                    name="patient_email"
                    value={formData.patient_email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.phoneNumber')}</label>
                  <input
                    type="tel"
                    name="patient_phone"
                    value={formData.patient_phone}
                    onChange={handleChange}
                    placeholder="+94 77 123 4567"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.nic')}</label>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    placeholder="199012345678"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.dob')}</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.gender')}</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#0F4C81] focus:outline-none"
                  >
                    <option value="Male">{t('appointment.male')}</option>
                    <option value="Female">{t('appointment.female')}</option>
                    <option value="Other">{t('appointment.other')}</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.residentialAddress')}</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="No. 45 Galle Road, Colombo"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: MEDICAL INFORMATION */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b pb-4 border-slate-100 flex items-center gap-2">
                <Stethoscope className="text-[#0F4C81]" size={22} />
                <h3 className="text-xl font-bold text-[#0F172A]">{t('appointment.step2Title')}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.medicalDepartment')}</label>
                  <select
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#0F4C81] focus:outline-none"
                  >
                    <option value="">{t('appointment.selectDepartment')}</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.selectDoctor')}</label>
                  <select
                    name="doctor_id"
                    value={formData.doctor_id}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#0F4C81] focus:outline-none"
                  >
                    <option value="">{t('appointment.selectDoctorDefault')}</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialization} - ${doc.consultation_fee})</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.selectHealthPackage')}</label>
                  <select
                    name="package_id"
                    value={formData.package_id}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#0F4C81] focus:outline-none"
                  >
                    <option value="">{t('appointment.optionalHealthPackage')}</option>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>{pkg.name} (${pkg.price})</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.reasonForVisit')}</label>
                  <input
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="e.g. Chest discomfort, annual cardiac evaluation"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.medicalHistory')}</label>
                  <textarea
                    name="medical_notes"
                    rows={3}
                    value={formData.medical_notes}
                    onChange={handleChange}
                    placeholder="Any allergies, previous surgeries, or ongoing medications..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: APPOINTMENT DATE & TIME */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b pb-4 border-slate-100 flex items-center gap-2">
                <Calendar className="text-[#0F4C81]" size={22} />
                <h3 className="text-xl font-bold text-[#0F172A]">{t('appointment.step3Title')}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.preferredDate')}</label>
                  <input
                    type="date"
                    name="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.preferredTime')}</label>
                  <select
                    name="appointment_time"
                    value={formData.appointment_time}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#0F4C81] focus:outline-none"
                  >
                    <option value="09:00 AM">09:00 AM - 10:00 AM</option>
                    <option value="09:30 AM">09:30 AM - 10:30 AM</option>
                    <option value="10:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="10:30 AM">10:30 AM - 11:30 AM</option>
                    <option value="11:00 AM">11:00 AM - 12:00 PM</option>
                    <option value="02:00 PM">02:00 PM - 03:00 PM</option>
                    <option value="04:00 PM">04:00 PM - 05:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.consultationMode')}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, consultation_type: 'In-person' }))}
                      className={`p-3 rounded-xl border font-bold text-xs transition-all ${formData.consultation_type === 'In-person' ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-600'}`}
                    >
                      🏥 {t('appointment.inPersonVisit')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, consultation_type: 'Online' }))}
                      className={`p-3 rounded-xl border font-bold text-xs transition-all ${formData.consultation_type === 'Online' ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-600'}`}
                    >
                      💻 {t('appointment.telemedicineVideo')}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t('appointment.urgencyLevel')}</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#0F4C81] focus:outline-none"
                  >
                    <option value="Normal">{t('appointment.normalRoutine')}</option>
                    <option value="Urgent">{t('appointment.urgentPriority')}</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUMMARY & CONFIRMATION */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b pb-4 border-slate-100 flex items-center gap-2">
                <CheckCircle2 className="text-[#22C55E]" size={22} />
                <h3 className="text-xl font-bold text-[#0F172A]">{t('appointment.step4Title')}</h3>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold block">{t('appointment.patientNameLabel')}</span>
                    <p className="font-bold text-[#0F172A]">{formData.patient_name}</p>
                    <p className="text-xs text-slate-500">{formData.patient_email} | {formData.patient_phone}</p>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold block">{t('appointment.doctorDepartmentLabel')}</span>
                    <p className="font-bold text-[#0F172A]">{selectedDocObj ? selectedDocObj.name : t('appointment.medicareSpecialistDesk')}</p>
                    <p className="text-xs text-[#16A3A8] font-semibold">{selectedDeptObj ? selectedDeptObj.name : (formData.reason || t('appointment.generalCare'))}</p>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold block">{t('appointment.scheduledDateTime')}</span>
                    <p className="font-bold text-[#0F172A]">{formData.appointment_date} at {formData.appointment_time}</p>
                    <p className="text-xs text-slate-500">{t('appointment.type')}: {formData.consultation_type}</p>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold block">{t('appointment.estimatedFee')}</span>
                    <p className="text-2xl font-extrabold text-[#22C55E] font-poppins">${estimatedFee}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-[#0F4C81] flex items-center gap-2">
                <ShieldCheck size={18} />
                <span>{t('appointment.clicking')} <strong>{t('appointment.confirmAppointmentStrong')}</strong> {t('appointment.redirectPayment')}</span>
              </div>
            </motion.div>
          )}

          {/* Action Buttons Bar */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={16} /> {t('appointment.back')}
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary py-3 px-8 text-sm"
              >
                {t('appointment.nextStep')} <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmAppointment}
                className="btn-accent py-3 px-8 text-sm"
              >
                {t('appointment.confirmAndPay')}
              </button>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Appointment;
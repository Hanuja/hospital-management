export const BOOKING_STORAGE_KEY = 'hospital_booking_draft';

export const packageToDepartment = {
  heart: 'Cardiology',
  cancer: 'Oncology',
  family: 'General Medicine',
  child: 'Pediatrics',
  fullbody: 'General Medicine',
  women: 'Gynecology',
};

export const departmentToSpecialty = {
  Cardiology: 'Cardiology',
  Neurology: 'Neurology',
  Orthopedics: 'Orthopedics',
  Pediatrics: 'Pediatrics',
  Gynecology: 'Gynecology',
  'Dental Care': 'Dentistry',
  'Eye Care': 'Eye Care',
  ENT: 'ENT',
  Oncology: 'Oncology',
  Emergency: 'Emergency',
  'General Medicine': 'General Medicine',
};

export const parsePrice = (priceStr) => {
  const n = parseInt(String(priceStr).replace(/[^0-9]/g, ''), 10);
  return Number.isNaN(n) ? 0 : n;
};

export const generateId = (prefix) => {
  const r = Math.floor(Math.random() * 90000) + 10000;
  return `${prefix}-2026-${r}`;
};

export const saveBookingDraft = (draft) => {
  sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(draft));
};

export const loadBookingDraft = () => {
  try {
    const raw = sessionStorage.getItem(BOOKING_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const clearBookingDraft = () => {
  sessionStorage.removeItem(BOOKING_STORAGE_KEY);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const calculateFees = (draft) => {
  const hospitalCharge = 20;
  const tax = 15;
  const serviceCharge = 5;

  const packageFee = draft?.package?.price || 0;
  const consultationFee = draft?.consultationFee || draft?.doctor?.fee || 0;
  const baseFee = packageFee > 0 ? packageFee : consultationFee;

  return {
    packageFee,
    consultationFee,
    hospitalCharge: packageFee > 0 ? hospitalCharge : serviceCharge,
    tax: packageFee > 0 ? tax : 0,
    subtotal: baseFee + (packageFee > 0 ? hospitalCharge + tax : serviceCharge),
    total: baseFee + (packageFee > 0 ? hospitalCharge + tax : serviceCharge),
  };
};

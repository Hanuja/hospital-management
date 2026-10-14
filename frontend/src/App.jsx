import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingEmergency from './components/FloatingEmergency';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loaded page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Departments = lazy(() => import('./pages/Departments'));
const Services = lazy(() => import('./pages/Services'));
const Treatments = lazy(() => import('./pages/Treatments'));
const Facilities = lazy(() => import('./pages/Facilities'));
const HealthPackages = lazy(() => import('./pages/HealthPackages'));
const Appointment = lazy(() => import('./pages/Appointment'));
const Payment = lazy(() => import('./pages/Payment'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Careers = lazy(() => import('./pages/Careers'));
const Counselling = lazy(() => import('./pages/Counselling'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin Panel
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            <Helmet>
              <title>MediCare Plus — Advanced Healthcare. Compassionate Care.</title>
              <meta name="description" content="MediCare Plus Hospital provides world-class medical care with 150+ experienced specialists, 30+ clinical departments, 24/7 emergency response, and digital appointment booking." />
              <meta name="keywords" content="MediCare Plus, Hospital, Doctors, Appointments, Emergency 24/7, Cardiology, Surgery, Health Packages" />
            </Helmet>

            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            
            <Navbar />
            
            <main className="flex-grow">
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-[60vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F4C81]"></div>
                </div>
              }>
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/doctors/:id" element={<Doctors />} />
                  <Route path="/departments" element={<Departments />} />
                  <Route path="/departments/:id" element={<Departments />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/treatments" element={<Treatments />} />
                  <Route path="/treatments/:id" element={<Treatments />} />
                  <Route path="/facilities" element={<Facilities />} />
                  <Route path="/health-packages" element={<HealthPackages />} />
                  <Route path="/packages" element={<HealthPackages />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/media" element={<Gallery />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/patients" element={<Testimonials />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/counselling" element={<Counselling />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsConditions />} />
                  <Route path="/emergency" element={<Contact />} />
                  
                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Booking & Separate Payment Flow */}
                  <Route path="/appointment" element={<Appointment />} />
                  <Route path="/payment" element={<Payment />} />

                  {/* Patient Protected Portal */}
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />

                  {/* Admin Protected Portal */}
                  <Route path="/admin/*" element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            <FloatingEmergency />
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

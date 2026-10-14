import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, MessageSquarePlus, X, User } from 'lucide-react';
import { getTestimonials } from '../services/api';
import toast from 'react-hot-toast';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    patient_name: '',
    patient_email: '',
    treatment: '',
    department: 'Cardiology',
    doctor: '',
    rating: 5,
    testimonial: ''
  });

  useEffect(() => {
    const fetchT = async () => {
      const data = await getTestimonials();
      setTestimonials(data);
    };
    fetchT();
  }, []);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.patient_name || !newReview.testimonial) {
      toast.error('Please enter your name and review details.');
      return;
    }
    toast.success('Thank you! Your review has been submitted for verification.');
    setTestimonials(prev => [
      {
        id: Date.now(),
        ...newReview,
        patient_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        verified: 1
      },
      ...prev
    ]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">Patient Success Stories</span>
          <h1 className="text-4xl font-extrabold font-poppins">Patient Testimonials & Reviews</h1>
          <p className="text-blue-100 text-sm">Read authentic treatment reviews from patients who experienced compassionate care at MediCare Plus.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-accent py-3 px-6 text-sm inline-flex items-center gap-2 shadow-lg"
          >
            <MessageSquarePlus size={18} /> Write a Patient Review
          </button>
        </div>
      </section>

      {/* Testimonial Cards Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="card-premium space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-[#22C55E] text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 size={14} /> Verified Patient
                  </span>
                </div>

                <p className="text-sm text-slate-700 italic leading-relaxed">"{t.testimonial}"</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={t.patient_photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'} alt={t.patient_name} className="w-12 h-12 rounded-full object-cover border-2 border-[#16A3A8]" />
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm">{t.patient_name}</h4>
                    <p className="text-xs text-[#16A3A8] font-medium">{t.treatment} ({t.department})</p>
                  </div>
                </div>
                {t.doctor && (
                  <div className="text-right text-xs text-slate-500">
                    <span>Doctor:</span>
                    <p className="font-bold text-[#0F4C81]">{t.doctor}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 space-y-6 relative border border-slate-100">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-bold text-[#0F172A]">Write a Patient Review</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={newReview.patient_name}
                  onChange={(e) => setNewReview({ ...newReview, patient_name: e.target.value })}
                  placeholder="e.g. John Silva"
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Treatment Received</label>
                  <input
                    type="text"
                    value={newReview.treatment}
                    onChange={(e) => setNewReview({ ...newReview, treatment: e.target.value })}
                    placeholder="e.g. Angioplasty"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Doctor Name</label>
                  <input
                    type="text"
                    value={newReview.doctor}
                    onChange={(e) => setNewReview({ ...newReview, doctor: e.target.value })}
                    placeholder="e.g. Dr. Aris Thorne"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Star Rating (1 - 5)</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#0F4C81] focus:outline-none"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5 Very Good)</option>
                  <option value={3}>⭐⭐⭐ (3/5 Good)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Your Feedback / Testimonial *</label>
                <textarea
                  rows={4}
                  value={newReview.testimonial}
                  onChange={(e) => setNewReview({ ...newReview, testimonial: e.target.value })}
                  placeholder="Share your treatment experience with our doctors and nursing staff..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-sm justify-center">
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Testimonials;

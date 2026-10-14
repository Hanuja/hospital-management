import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, ShieldAlert } from 'lucide-react';
import { submitContactMessage } from '../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please complete Name, Email, and Message.');
      return;
    }
    setLoading(true);
    const loadingToast = toast.loading('Sending message to MediCare Plus...');
    try {
      await submitContactMessage(formData);
      toast.dismiss(loadingToast);
      toast.success('Thank you! Your message has been sent successfully. Our team will contact you shortly.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent("Hello MediCare Plus, I would like to book an appointment.");
  const whatsappUrl = `https://wa.me/94112345678?text=${whatsappMessage}`;

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-3">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">{t('contact.header_badge')}</span>
          <h1 className="text-4xl font-extrabold font-poppins">{t('contact.title')}</h1>
          <p className="text-blue-100 text-sm">{t('contact.subtitle')}</p>
        </div>
      </section>

      {/* Contact Cards & Form Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-6">
              <h3 className="text-xl font-bold text-[#0F172A] border-l-4 border-[#0F4C81] pl-3">{t('contact.hospital_info')}</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-50 text-[#0F4C81] rounded-xl flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block text-sm">{t('contact.address_title')}</span>
                    <p className="text-slate-600">{t('contact.address')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-teal-50 text-[#16A3A8] rounded-xl flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block text-sm">{t('contact.phone_title')}</span>
                    <a href="tel:+94112345678" className="text-slate-600 hover:text-[#0F4C81] font-semibold">+94 11 234 5678</a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-2xl">
                  <div className="p-2 bg-red-500 text-white rounded-xl flex-shrink-0 animate-pulse">
                    <ShieldAlert size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-red-600 block text-xs uppercase">{t('contact.emergency_title')}</span>
                    <a href="tel:+94119999999" className="text-lg font-extrabold text-red-700">+94 11 999 9999</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block text-sm">{t('contact.email_title')}</span>
                    <a href="mailto:info@medicareplus.com" className="text-slate-600 hover:text-[#0F4C81]">info@medicareplus.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-50 text-[#22C55E] rounded-xl flex-shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block text-sm">{t('contact.whatsapp_title')}</span>
                    <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-[#22C55E] font-bold hover:underline">
                      {t('contact.whatsapp_link')}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft h-64">
              <iframe
                title="MediCare Plus Hospital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80385584594!2d79.8437021!3d6.9270786!2m3!1f0!0!f0!0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2592756852445%3A0x6b803f27f8a9648a!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-soft p-8 space-y-6">
            <h3 className="text-xl font-bold text-[#0F172A]">{t('contact.form_title')}</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">{t('contact.form_name')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Silva"
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">{t('contact.form_email')}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">{t('contact.form_phone')}</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+94 77 123 4567"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">{t('contact.form_subject')}</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Inquiry regarding Cardiology Services"
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">{t('contact.form_message')}</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your question or request here..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-sm justify-center font-bold shadow-md"
              >
                <Send size={16} /> {loading ? t('contact.form_sending') : t('contact.form_submit')}
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;

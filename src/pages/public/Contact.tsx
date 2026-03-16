import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, Clock, MapPin, Send, CheckCircle } from "lucide-react";
import SEOHead from "@/components/layout/SEOHead";
import FinalCTA from "@/components/layout/FinalCTA";
import { FadeIn } from "@/components/layout/ServicePageLayout";

const serviceOptions = ["Personal Tax Filing", "Family Tax Filing", "Business Tax Return", "NTN Registration", "IRIS Profile Update", "GST Registration", "Business Incorporation", "Other"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.service) e.service = "Please select a service";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <SEOHead title="Contact Pak Filer — We're Here to Help" description="Contact Pak Filer for tax filing, NTN registration, GST, and business compliance services. WhatsApp, email, phone support." canonical="https://pakfiler.com/contact" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A8549] to-[#146B3A]" />
        <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H0Z" fill="white"/></svg></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3 block">CONTACT US</span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Contact Pak Filer — We're Here to Help</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Have a question about your taxes, need help choosing a service, or want a custom quote for your business? Our expert team is ready to assist you.</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12"><h2 className="text-3xl font-display font-bold text-[#1F2A2A]">Reach Us Your Way</h2></FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
            {[
              { icon: MessageCircle, title: "WhatsApp", desc: "Chat with us instantly — the fastest way to get answers", detail: "Within 1 hour", color: "bg-green-50 text-green-600" },
              { icon: Mail, title: "Email", desc: "support@pakfiler.com", detail: "Within 4 business hours", color: "bg-blue-50 text-blue-600" },
              { icon: Phone, title: "Phone", desc: "Call us during business hours", detail: "Immediate during hours", color: "bg-purple-50 text-purple-600" },
              { icon: Clock, title: "Office Hours", desc: "Monday to Saturday", detail: "9:00 AM – 6:00 PM PKT", color: "bg-amber-50 text-amber-600" },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-xl p-6 border border-[#E0EAE4] text-center hover:shadow-lg transition-shadow h-full">
                  <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center mx-auto mb-4`}><c.icon className="w-6 h-6" /></div>
                  <h3 className="font-display font-semibold text-[#1F2A2A] mb-1">{c.title}</h3>
                  <p className="text-sm text-[#4A5A5A] mb-2">{c.desc}</p>
                  <p className="text-xs text-[#7A8A8A]">{c.detail}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <FadeIn className="text-center mb-8"><h2 className="text-3xl font-display font-bold text-[#1F2A2A]">Send Us a Message</h2></FadeIn>
            {submitted ? (
              <FadeIn>
                <div className="bg-[#E8F5EE] rounded-2xl p-8 text-center border border-[#1A8549]/20">
                  <CheckCircle className="w-12 h-12 text-[#1A8549] mx-auto mb-4" />
                  <h3 className="text-xl font-display font-bold text-[#146B3A] mb-2">Thank you!</h3>
                  <p className="text-[#4A5A5A]">Your message has been received. Our team will contact you within 4 business hours.</p>
                </div>
              </FadeIn>
            ) : (
              <FadeIn>
                <form onSubmit={handleSubmit} className="space-y-5 bg-[#F7FAF8] rounded-2xl p-8 border border-[#E0EAE4]">
                  {[
                    { key: "name", label: "Full Name*", type: "text", placeholder: "Your full name" },
                    { key: "email", label: "Email Address*", type: "email", placeholder: "you@email.com" },
                    { key: "phone", label: "Phone Number (WhatsApp preferred)*", type: "tel", placeholder: "+92 300 1234567" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-semibold text-[#1F2A2A] mb-2">{f.label}</label>
                      <input type={f.type} value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder}
                        className={`w-full px-4 py-3 rounded-xl border bg-white text-[#1F2A2A] focus:ring-2 focus:ring-[#1A8549] outline-none ${errors[f.key] ? "border-red-400" : "border-[#E0EAE4]"}`} />
                      {errors[f.key] && <p className="text-xs text-red-500 mt-1">{errors[f.key]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold text-[#1F2A2A] mb-2">Service You Need*</label>
                    <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-[#1F2A2A] focus:ring-2 focus:ring-[#1A8549] outline-none ${errors.service ? "border-red-400" : "border-[#E0EAE4]"}`}>
                      <option value="">Select a service</option>
                      {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1F2A2A] mb-2">Your Message*</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your needs..."
                      rows={4} className={`w-full px-4 py-3 rounded-xl border bg-white text-[#1F2A2A] focus:ring-2 focus:ring-[#1A8549] outline-none resize-none ${errors.message ? "border-red-400" : "border-[#E0EAE4]"}`} />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" className="w-full px-6 py-4 bg-gradient-to-r from-[#1A8549] to-[#146B3A] text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" /> Send My Message
                  </button>
                </form>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-4">Our Office</h2>
            <p className="text-[#4A5A5A] mb-2">Pakistan</p>
            <p className="text-sm text-[#7A8A8A] mb-6">Visiting Hours: By appointment only — we encourage using our online services for a faster experience</p>
            <div className="bg-white rounded-2xl border border-[#E0EAE4] h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-[#1A8549]/30 mx-auto mb-2" />
                <p className="text-sm text-[#7A8A8A]">Google Maps embed — Office location</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}

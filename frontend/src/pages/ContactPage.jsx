import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Instagram, 
  Facebook, 
  Twitter,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

// Placeholder image for the Office/Verification Hub
const officeImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200';

// --- Helper Components ---

const ContactInfoItem = ({ icon: Icon, title, lines }) => (
  <div className="flex items-start gap-4 mb-8 last:mb-0 group">
    {/* Changed hover color to Teal */}
    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 group-hover:bg-teal-700 group-hover:text-white transition-all duration-300 flex-shrink-0">
      <Icon size={20} strokeWidth={1.5} />
    </div>
    <div>
      <h3 className="font-marcellus text-lg text-stone-900 mb-2">{title}</h3>
      {lines.map((line, index) => (
        <p key={index} className="text-sm text-stone-500 font-light leading-relaxed">{line}</p>
      ))}
    </div>
  </div>
);

const SocialLink = ({ icon: Icon, href }) => (
  <a 
    href={href} 
    className="w-10 h-10 border border-stone-200 text-stone-500 rounded-full flex items-center justify-center hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300"
  >
    <Icon size={18} />
  </a>
);

const InputField = ({ label, name, type = "text", value, onChange, placeholder, required = false }) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
      {label} {required && <span className="text-teal-700">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      // Changed focus colors to Teal
      className="w-full bg-white border border-stone-200 p-4 text-sm text-stone-800 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-all placeholder-stone-300 rounded-sm"
    />
  </div>
);

// --- Main Component ---

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! Support will contact you shortly.');
        setFormData({
            firstName: '', lastName: '', email: '', phone: '', subject: '', message: ''
        });
        setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-[#FDFBF7] font-montserrat text-stone-800 overflow-x-hidden">
      
      {/* --- Hero Section --- */}
      <div className="relative bg-[#1c1c1c] py-24 md:py-32 overflow-hidden">
        {/* Decorative elements - Changed from Amber/Rose to Teal/Sky */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-900/20 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-6 text-center relative z-10" data-aos="fade-up">
          <span className="text-teal-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Here to Help</span>
          <h1 className="font-marcellus text-4xl md:text-5xl lg:text-6xl text-white mb-6">Contact Support</h1>
          <div className="h-[1px] w-24 bg-stone-700 mx-auto mb-6"></div>
          <p className="text-stone-300 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Need help with a transaction, verifying a seller, or listing an item? 
            Our support team is here to ensure your buying and selling experience is seamless.
          </p>
        </div>
      </div>

      {/* --- Main Content Section --- */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* --- Left Side: Contact Info --- */}
          <div className="lg:col-span-5 space-y-12" data-aos="fade-right">
            <div>
              <h2 className="font-marcellus text-3xl text-stone-900 mb-8">Get in Touch</h2>
              <div className="bg-white p-8 border border-stone-100 shadow-sm rounded-sm">
                <ContactInfoItem 
                  icon={MapPin} 
                  title="Headquarters" 
                  lines={['Reuse Realm HQ', '123 Market Street, Tech Park', 'Bangalore, KA 560001']} 
                />
                <div className="my-8 border-t border-stone-100"></div>
                <ContactInfoItem 
                  icon={HelpCircle} 
                  title="Support & Safety" 
                  lines={['Live Chat: In-App Support', 'Safety Helpline: (1800) 123-4567']} 
                />
                <div className="my-8 border-t border-stone-100"></div>
                <ContactInfoItem 
                  icon={Mail} 
                  title="Email Us" 
                  lines={['support@reuserealm.com', 'business@reuserealm.com']} 
                />
                <div className="my-8 border-t border-stone-100"></div>
                <ContactInfoItem 
                  icon={Clock} 
                  title="Support Hours" 
                  lines={['Mon - Fri: 9:00 AM - 8:00 PM', 'Weekends: 10:00 AM - 5:00 PM']} 
                />
              </div>
            </div>

            <div>
              <h3 className="font-marcellus text-xl text-stone-900 mb-6">Join Our Community</h3>
              <div className="flex gap-4">
                <SocialLink icon={Instagram} href="#" />
                <SocialLink icon={Facebook} href="#" />
                <SocialLink icon={Twitter} href="#" />
              </div>
            </div>
          </div>

          {/* --- Right Side: Form --- */}
          <div className="lg:col-span-7" data-aos="fade-left">
            <div className="bg-white p-8 md:p-12 border border-stone-100 shadow-xl shadow-stone-200/50 rounded-sm relative overflow-hidden">
              {/* Changed Accent Bar to Teal */}
              <div className="absolute top-0 left-0 w-1 h-full bg-teal-700"></div>
              
              <div className="mb-10">
                <h2 className="font-marcellus text-3xl text-stone-900 mb-2">Submit a Request</h2>
                <p className="text-stone-500 font-light">Report an issue or ask a question. We usually respond within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                  <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  <InputField label="Phone (Optional)" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                </div>

                <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g. Account Verification Issue" />

                <div className="mb-8">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                    Message <span className="text-teal-700">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your issue or query in detail..."
                    className="w-full bg-white border border-stone-200 p-4 text-sm text-stone-800 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-all placeholder-stone-300 rounded-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-stone-900 text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-teal-700 transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send size={16} />}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* --- Visit Us Section (Rebranded as "Trust & Safety Hub") --- */}
      <div className="bg-white border-t border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Map Area */}
          <div className="h-96 lg:h-auto bg-stone-200 relative grayscale hover:grayscale-0 transition-all duration-700">
            <iframe
              title="Office Location"
              src="https://maps.google.com/maps?q=Bangalore&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
             <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-sm pointer-events-none">
               📍 Our Main Office
             </div>
          </div>

          {/* Image & Text Area */}
          <div className="relative h-[500px] lg:h-[600px] overflow-hidden group">
             <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/10 transition-colors duration-500 z-10"></div>
             <img 
               src={officeImage} 
               alt="Reuse Realm Office" 
               className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
             />
             <div className="absolute inset-0 flex items-center justify-center z-20 p-12 text-center">
                <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 max-w-lg shadow-2xl border border-white/50">
                   <h2 className="font-marcellus text-3xl md:text-4xl text-stone-900 mb-4">Verification Center</h2>
                   {/* Changed separator to Teal */}
                   <div className="h-[1px] w-12 bg-teal-700 mx-auto mb-6"></div>
                   <p className="text-stone-600 mb-8 font-light leading-relaxed">
                      We ensure every premium listing is verified. Sellers can visit our hubs for product authentication 
                      and instant valuation services.
                   </p>
                   <button className="text-xs font-bold uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-teal-700 hover:border-teal-700 transition-colors">
                      Book an Appointment
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactPage;
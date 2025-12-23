import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Recycle, 
  ShieldCheck, 
  Users, 
  Truck, 
  Tag, 
  Search, 
  Quote 
} from 'lucide-react';

// Using placeholder images relevant to a marketplace
const marketplaceImage1 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwtrADBZDmcdLmMFBXvvQJpMsa8P8OUJ4Fmw&s'; 
const marketplaceImage2 = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800';

// --- Sub-Components ---

const StatBox = ({ number, label }) => (
  // Changed border color to Teal
  <div className="border-l-2 border-teal-700 pl-4">
    <span className="font-marcellus text-3xl text-stone-900 block">{number}</span>
    <span className="text-xs uppercase tracking-widest text-stone-500">{label}</span>
  </div>
);

const ValueCard = ({ icon: Icon, title, description, delay }) => (
  <div 
    data-aos="fade-up" 
    data-aos-delay={delay}
    className="text-center p-8 bg-white border border-stone-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
  >
    {/* Changed icon background and text color to Teal */}
    <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6 text-teal-700">
      <Icon size={28} strokeWidth={1.5} />
    </div>
    <h3 className="font-marcellus text-xl mb-3 text-stone-900">{title}</h3>
    <p className="text-stone-600 text-sm leading-relaxed font-light">{description}</p>
  </div>
);

const ServiceCard = ({ title, description, icon: Icon }) => (
  // Changed hover border color to Teal
  <div className="group bg-white p-8 transition-all duration-300 border border-stone-100 hover:border-teal-700/30 hover:shadow-xl relative overflow-hidden">
    {/* Changed side bar color to Teal */}
    <div className="absolute top-0 left-0 w-1 h-0 bg-teal-700 group-hover:h-full transition-all duration-300"></div>
    {/* Changed icon hover color to Teal */}
    <div className="text-stone-400 group-hover:text-teal-700 transition-colors mb-4">
      <Icon size={32} strokeWidth={1.2} />
    </div>
    <h3 className="font-marcellus text-lg mb-2 text-stone-900">{title}</h3>
    <p className="text-stone-500 text-sm leading-relaxed font-light">{description}</p>
  </div>
);

const AboutPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      offset: 100,
    });
  }, []);

  return (
    <div className="bg-[#FDFBF7] font-montserrat text-stone-800 overflow-x-hidden">

      {/* --- Hero Section --- */}
      <div className="relative pt-12 pb-20 md:py-32 overflow-hidden">
        {/* Decorative background blur - Changed to Teal */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Image Side */}
            <div data-aos="fade-right" className="relative order-2 md:order-1">
              {/* Border accent changed to Teal */}
              <div className="absolute inset-0 border border-teal-700/30 translate-x-4 translate-y-4 z-0"></div>
              <img
                src={marketplaceImage1}
                alt="Sustainable Shopping"
                className="w-full h-[500px] object-cover relative z-10 shadow-xl"
              />
              {/* Badge border changed to Teal */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 shadow-xl z-20 max-w-[200px] border-t-4 border-teal-700 hidden md:block">
                <p className="font-marcellus text-3xl text-stone-900 mb-1">10k+</p>
                <p className="text-xs uppercase tracking-widest text-stone-500">Items Rehomed Successfully</p>
              </div>
            </div>

            {/* Text Side */}
            <div data-aos="fade-left" className="order-1 md:order-2">
              {/* Changed text color to Teal */}
              <span className="text-teal-700 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Our Mission</span>
              <h1 className="font-marcellus text-5xl md:text-6xl text-stone-900 leading-tight mb-8">
                Redefining Value, <span className="italic font-light text-stone-500">Restoring Stories</span>
              </h1>
              <p className="text-stone-600 mb-6 leading-relaxed text-lg font-light">
                At <strong>Reuse Realm</strong>, we believe that quality is timeless. 
                We provide a platform where pre-loved treasures find new homes, 
                bridging the gap between sustainable choices and modern needs.
              </p>
              <p className="text-stone-600 mb-10 leading-relaxed text-lg font-light">
                From vintage furniture to premium electronics, we facilitate secure exchanges 
                that extend the lifecycle of valuable goods and reduce waste.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-8 border-t border-stone-200 pt-8">
                <StatBox number="50K+" label="Active Users" />
                <StatBox number="100%" label="Secure Trades" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Our Values Section --- */}
      <div className="bg-white py-24 relative border-t border-stone-100">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto" data-aos="fade-up">
            <h2 className="font-marcellus text-4xl text-stone-900 mb-4">Why Choose Us</h2>
            {/* Divider changed to Teal */}
            <div className="w-24 h-[1px] bg-teal-700 mx-auto mb-6"></div>
            <p className="text-stone-500 font-light">Building a community of trust and sustainability. Here is what we stand for.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={ShieldCheck} 
              title="Verified Trust" 
              description="Every seller is verified and every high-value item is authenticated to ensure you get exactly what you pay for."
              delay="100"
            />
            <ValueCard 
              icon={Recycle} 
              title="Eco-Conscious" 
              description="By choosing second-hand, you are directly contributing to a circular economy and reducing your carbon footprint."
              delay="200"
            />
            <ValueCard 
              icon={Users} 
              title="Community First" 
              description="We foster a safe, transparent marketplace where buyers and sellers can connect directly without hidden fees."
              delay="300"
            />
          </div>
        </div>
      </div>

      {/* --- Community Section --- */}
      <div className="py-24 bg-[#FDFBF7]">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div data-aos="fade-right" className="order-2 md:order-1">
            <h2 className="font-marcellus text-4xl md:text-5xl text-stone-900 mb-6">
              A Marketplace <br /> <span className="text-teal-800">Built on Trust</span>
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6 font-light text-lg">
              Reuse Realm isn't just an app; it's a movement. We are changing the stigma around 
              "used" goods by highlighting the quality and history behind every item.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8 font-light text-lg">
              Whether you are decluttering your home or hunting for a vintage gem, 
              our platform ensures a seamless, premium experience usually reserved for new retail.
            </p>
            <Link
              to="/sell"
              className="inline-block border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
            >
              Start Selling Today
            </Link>
          </div>

          <div data-aos="zoom-in" className="flex justify-center order-1 md:order-2 relative">
             <div className="absolute inset-0 bg-stone-900/5 translate-x-4 translate-y-4"></div>
            <img
              src={marketplaceImage2}
              alt="Community interaction"
              className="w-full h-[600px] object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

        </div>
      </div>

      {/* --- Services Section --- */}
      <div className="bg-white py-24 border-t border-stone-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div data-aos="fade-right">
                {/* Changed text color to Teal */}
                <span className="text-teal-700 font-bold tracking-[0.2em] text-xs uppercase mb-2 block">How We Help</span>
                <h2 className="font-marcellus text-4xl text-stone-900">Features & Benefits</h2>
             </div>
             <p className="text-stone-500 max-w-md text-right font-light mt-4 md:mt-0" data-aos="fade-left">
                Making buying and selling simple, secure, and rewarding.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
            <ServiceCard
              icon={Search}
              title="Smart Discovery"
              description="Advanced filters help you find exactly what you need, from nearby electronics to vintage collectibles."
            />
            <ServiceCard
              icon={ShieldCheck}
              title="Secure Payments"
              description="We hold your payment safe in escrow until you verify the item meets your expectations."
            />
            <ServiceCard
              icon={Truck}
              title="Doorstep Pickup"
              description="Don't stress about logistics. We offer convenient pickup and delivery services for heavy items."
            />
            <ServiceCard
              icon={Tag}
              title="Instant Valuation"
              description="Not sure what it's worth? Use our AI tool to get a fair price estimate for your used goods."
            />
            <ServiceCard
              icon={Users}
              title="Seller Ratings"
              description="Transparent review system ensures you are dealing with reliable community members."
            />
            <ServiceCard
              icon={Recycle}
              title="Recycling Partners"
              description="Items that can't be sold? We partner with recyclers to ensure nothing goes to a landfill."
            />
          </div>
        </div>
      </div>

      {/* --- Testimonials Section (Dark Theme) --- */}
      <div className="bg-[#1c1c1c] text-stone-300 py-24 relative overflow-hidden">
        {/* Subtle background glow - Changed to Teal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal-900/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
             {/* Quote icon color changed */}
             <Quote size={40} className="text-teal-700/50 mx-auto mb-6" />
            <h2 className="font-marcellus text-4xl text-white mb-4">User Stories</h2>
            <p className="text-stone-400 font-light">Real experiences from our community.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Sold my old gaming setup in 24 hours. The buyer was verified, and the transaction was smooth.", author: "Rohan Das", loc: "Pune" },
              { text: "Found a vintage oak desk for my home office. It has so much character compared to new furniture.", author: "Sneha Reddy", loc: "Hyderabad" },
              { text: "I love the eco-friendly aspect. It feels good to give perfectly good items a second life.", author: "Vikram Singh", loc: "Delhi" }
            ].map((item, index) => (
              <div key={index} className="bg-stone-800/50 p-8 border border-stone-700/50 hover:border-teal-700/50 transition-colors" data-aos="fade-up" data-aos-delay={index * 150}>
                {/* Star color changed to Teal */}
                <div className="text-teal-500 text-xs tracking-widest mb-4">★★★★★</div>
                <p className="text-stone-300 italic mb-6 text-lg font-marcellus leading-relaxed">"{item.text}"</p>
                <div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-widest">{item.author}</h4>
                  <p className="text-xs text-stone-500 mt-1">{item.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CTA Section --- */}
      <div className="bg-teal-50 py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-marcellus text-4xl text-stone-900 mb-6" data-aos="fade-up">Join the Reuse Revolution</h2>
          <p className="max-w-2xl mx-auto text-stone-600 mb-10 font-light text-lg" data-aos="fade-up" data-aos-delay="100">
            Start browsing thousands of unique items or turn your clutter into cash today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6" data-aos="fade-up" data-aos-delay="200">
            <Link
              to="/products"
              className="bg-stone-900 text-white hover:bg-teal-700 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-stone-900/20"
            >
              Start Buying
            </Link>
            <Link
              to="/sell"
              className="bg-white text-stone-900 border border-stone-200 hover:border-stone-900 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
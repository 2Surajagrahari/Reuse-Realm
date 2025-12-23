import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

// Enhanced Icons with Hover Effects
const SocialIcon = ({ Icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    // Changed hover color to Teal
    className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-800 text-stone-400 hover:bg-teal-700 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
  >
    <Icon size={18} />
  </a>
);

const Footer = () => {
  return (
    // Dark Stone background
    <footer className="bg-[#1c1c1c] text-stone-300 font-montserrat border-t border-stone-800">
      <div className="container mx-auto pt-20 pb-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-1 space-y-6">
            <h3 className="font-marcellus text-3xl text-white tracking-wide">Reuse Realm</h3>
            <p className="text-sm text-stone-400 leading-7 font-light">
              The premium marketplace for buying and selling pre-loved goods. 
              Join our community to shop sustainably, declutter your home, and find unique treasures.
            </p>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="font-marcellus text-lg text-white mb-6">Marketplace</h4>
            <div className="flex flex-col space-y-3 text-sm font-light">
              {/* Updated links to match marketplace categories */}
              <Link to="/products/category/electronics" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-300 w-fit">Electronics</Link>
              <Link to="/products/category/furniture" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-300 w-fit">Furniture & Decor</Link>
              <Link to="/products/category/fashion" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-300 w-fit">Fashion</Link>
              <Link to="/products/category/vehicles" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-300 w-fit">Vehicles</Link>
              <Link to="/products/category/hobbies" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-300 w-fit">Hobbies & Sports</Link>
            </div>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-marcellus text-lg text-white mb-6">Support</h4>
            <div className="flex flex-col space-y-3 text-sm font-light">
              <Link to="/about" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-300 w-fit">About Us</Link>
              <Link to="/contact" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-300 w-fit">Help Center</Link>
              <Link to="/safety" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-300 w-fit">Safety Tips</Link>
              <Link to="/sell" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-300 w-fit">Selling Guide</Link>
              <Link to="/developers" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-300 w-fit">Developers</Link>
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-marcellus text-lg text-white mb-6">Stay Updated</h4>
            <p className="text-sm text-stone-400 mb-6 font-light">
              Subscribe to get alerts on new listings, price drops, and community news.
            </p>
            <form className="flex flex-col space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-stone-800 text-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-teal-700 border border-stone-700 transition-colors placeholder-stone-500 text-sm rounded-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-teal-400 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-stone-500">We respect your privacy. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-stone-800 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-stone-500 font-light">
               <p>&copy; 2025 Reuse Realm. All Rights Reserved.</p>
               <span className="hidden md:block w-1 h-1 bg-stone-700 rounded-full"></span>
               {/* Developer Credit */}
               <p className="group">
                 Designed & Developed by <span className="text-stone-300 group-hover:text-teal-400 transition-colors cursor-default font-medium">Tabish & Vishant</span>
               </p>
            </div>

            <div className="flex space-x-4">
               <SocialIcon href="#" Icon={Facebook} />
               <SocialIcon href="#" Icon={Twitter} />
               <SocialIcon href="#" Icon={Instagram} />
               <SocialIcon href="#" Icon={Linkedin} />
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
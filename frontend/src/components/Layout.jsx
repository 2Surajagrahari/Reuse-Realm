import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollToTop from './ScrollToTop';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic', // Smoother easing for the premium feel
    });
  }, []);

  return (
    // Applied global theme background, font, and flex layout for sticky footer
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] font-montserrat text-stone-800">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          // Custom styling to match Teal & Stone theme
          style: {
            background: '#1c1c1c', // Dark Stone
            color: '#fff',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '13px',
            borderRadius: '2px', // Rounded-sm
            padding: '12px 20px',
            borderLeft: '4px solid #0f766e', // Teal-700 accent
          },
          success: {
            iconTheme: {
              primary: '#0f766e', // Teal-700
              secondary: '#fff',
            },
          },
          error: {
            style: {
              borderLeft: '4px solid #ef4444', // Red border for errors
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <ScrollToTop />
      
      <Navbar />
      
      {/* flex-grow pushes the Footer to the bottom if content is short */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
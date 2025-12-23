import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Importing the video
import colabVideo from '../assets/colab.mp4'; 

// Unsplash Images for Second Hand Store
const categories = [
  { _id: '1', name: 'Electronics', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop', description: 'Upgraded your tech? Sell the old, buy the new.' },
  { _id: '2', name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop', description: 'Give your home a fresh look with pre-loved decor.' },
  { _id: '3', name: 'Vehicles', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop', description: 'Cars, bikes, and rides ready for a second journey.' },
  { _id: '4', name: 'Fashion', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop', description: 'Designer brands at a fraction of the price.' },
  { _id: '5', name: 'Hobbies', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop', description: 'Musical instruments, sports gear, and books.' },
];

const gridItems = [
  { _id: '1', title: 'Sell Your Phone', subtitle: 'Instant Cash', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop', link: '/sell' },
  { _id: '2', title: 'Vintage Decor', subtitle: 'Rare Finds', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop', link: '/products/category/furniture' },
  { _id: '3', title: 'Gaming Consoles', subtitle: 'Level Up', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS89rqviLwAYY9O_9qBmIh2JS3idQ886B4Blw&s' }
];

const newArrivals = [
  { _id: '68b15e83966360f5b90c2936', name: 'iPhone 13 Pro', price: '45,000', image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=600&auto=format&fit=crop' },
  { _id: '68b17de7843fba334ca746db', name: 'Royal Enfield Classic', price: '1,20,000', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop' },
  { _id: '68b17e15843fba334ca74730', name: 'IKEA 3-Seater Sofa', price: '12,500', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=600&auto=format&fit=crop' },
  { _id: '68b17e5d843fba334ca74778', name: 'MacBook Air M1', price: '52,000', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=600&auto=format&fit=crop' },
  { _id: '68b17e62843fba334ca747be', name: 'Canon DSLR Camera', price: '25,000', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop' },
  { _id: '68b17e65843fba334ca74804', name: 'Study Table', price: '3,500', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600&auto=format&fit=crop' },
];

const testimonials = [
  { quote: "Sold my old bike in 2 days! The process was verified and super safe.", author: "Rahul Verma" },
  { quote: "Found a barely used MacBook for half the retail price. Highly recommend!", author: "Priya Sharma" },
  { quote: "The best place to declutter your home and make some extra cash instantly.", author: "Vikram Singh" },
  { quote: "I bought a vintage sofa for my living room, the condition was exactly as described.", author: "Sneha Reddy" },
  { quote: "Finally a platform that feels premium even for second-hand goods.", author: "Fatima Siddiqui" },
];

const instagramPosts = [
  { _id: '1', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=400' },
  { _id: '2', image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=400' },
  { _id: '3', image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=400' },
  { _id: '4', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=400' },
  { _id: '5', image: 'https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?q=80&w=400' },
  { _id: '6', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400' },
];

// Components
const TestimonialCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    customPaging: i => (
      <div className="w-2 h-2 mx-1 rounded-full bg-stone-300 hover:bg-teal-700 transition-colors"></div>
    )
  };

  return (
    <section className="bg-[#fcf8f5] py-20 px-6 border-t border-b border-stone-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-xs font-bold tracking-[0.3em] text-teal-700 mb-10 uppercase">
          Stories from the Community
        </h2>
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-4 pb-8">
              <div className="text-4xl text-teal-800/20 mb-4 font-serif">“</div>
              <p className="text-xl md:text-3xl text-stone-700 font-marcellus leading-relaxed mb-8">
                {item.quote}
              </p>
              <div className="h-[1px] w-12 bg-teal-700 mx-auto mb-4"></div>
              <p className="text-sm font-semibold text-stone-900 uppercase tracking-wider">
                {item.author}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

const FeatureIconWrapper = ({ children, title, desc }) => (
  <div data-aos="fade-up" className="group p-6 rounded-lg hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-stone-100">
    <div className="text-stone-800 group-hover:text-teal-700 transition-colors duration-300 mb-6 flex justify-center transform group-hover:scale-110">
      {children}
    </div>
    <h3 className="font-marcellus text-xl text-stone-900 mb-3">{title}</h3>
    <p className="text-sm text-stone-500 font-light leading-relaxed">{desc}</p>
  </div>
);

// Icons
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const CashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TruckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const HomePage = () => {
  const categoryScrollRef = useRef(null);
  const arrivalsScrollRef = useRef(null);
  const [isCategoryPaused, setCategoryPaused] = useState(false);
  const [isArrivalsPaused, setArrivalsPaused] = useState(false);

  const handleScroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = ref.current.offsetWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (!isCategoryPaused && categoryScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          categoryScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          categoryScrollRef.current.scrollBy({ left: 320 + 48, behavior: 'smooth' });
        }
      }
    }, 4000); 
    return () => clearInterval(scrollInterval);
  }, [isCategoryPaused]);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (!isArrivalsPaused && arrivalsScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = arrivalsScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          arrivalsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          arrivalsScrollRef.current.scrollBy({ left: 320 + 32, behavior: 'smooth' });
        }
      }
    }, 4500);
    return () => clearInterval(scrollInterval);
  }, [isArrivalsPaused]);

  return (
    <div className="HomePageWrapper bg-[#FDFBF7] text-stone-800 font-montserrat overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-20 px-4 overflow-hidden" data-aos="fade-up">
         
        {/* Container for Content and Background Video */}
        <div className="container mx-auto text-center max-w-4xl relative z-10 flex flex-col items-center">
          
          {/* VIDEO BACKGROUND (Restricted Size, Behind Text) */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-[85%] md:w-[60%] 
                h-[220px] md:h-[340px] 
                -z-10 
                rounded-[2.5rem] 
                overflow-hidden 
                
                pointer-events-none">
             <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
             >
                <source src={colabVideo} type="video/mp4" />
             </video>
             {/* Gradient Overlay to blend edges */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-[#FDFBF7]"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-transparent to-[#FDFBF7]"></div>
          </div>

          <h2 className="text-teal-700 text-sm font-bold tracking-[0.3em] uppercase mb-4">The Marketplace</h2>
          
          {/* Main Heading Restored to Dark Gradient */}
          <h1 className="font-marcellus text-6xl sm:text-7xl md:text-8xl mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-stone-900 via-teal-900 to-stone-700 pb-2">
            Reuse Realm
          </h1>
          
          <div className="h-[1px] w-24 bg-stone-300 mx-auto mb-8"></div>
          
          {/* Description Restored to Dark Text */}
          <p className="text-stone-600 text-lg sm:text-xl font-light leading-relaxed mb-10 max-w-2xl">
              Buy and sell everything from premium electronics to vintage furniture. 
              Give your pre-loved items a second life in style.
          </p>
          
          <div className="w-full max-w-2xl mx-auto mb-10 relative shadow-xl shadow-teal-900/5 rounded-full bg-white">
             <input 
                type="text" 
                placeholder="Search for cars, mobiles, furniture..." 
                className="w-full p-4 pl-6 pr-32 border border-stone-200 rounded-full bg-transparent focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 shadow-sm font-light transition-all"
             />
             <button className="absolute right-2 top-2 bottom-2 bg-stone-900 text-white px-8 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-teal-700 transition-colors">
                Search
             </button>
          </div>

          <Link to="/products" className="inline-block border border-stone-900 px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-all duration-300 bg-white/50 backdrop-blur-sm">
            Browse Categories
          </Link>
        </div>
      </div>

      {/* Category Image Carousel */}
      <div className="relative mb-24 px-4" data-aos="fade-up">
        <button onClick={() => handleScroll(categoryScrollRef, 'left')} className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        
        <div
          ref={categoryScrollRef}
          className="flex space-x-6 md:space-x-10 overflow-x-auto pb-8 pt-4 horizontal-scrollbar px-4"
          onMouseEnter={() => setCategoryPaused(true)}
          onMouseLeave={() => setCategoryPaused(false)}
        >
          {categories.map((category) => (
            <div key={category._id} className="group flex-shrink-0 w-72 md:w-80 text-left cursor-pointer">
              <Link to={`/products/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="overflow-hidden rounded-sm relative shadow-sm">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-[28rem] md:h-[32rem] object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors z-20">
                      <h3 className="font-marcellus text-3xl text-white tracking-wide border-b border-white pb-2">{category.name}</h3>
                  </div>
                </div>
                <p className="text-sm text-stone-500 mt-4 h-10 font-light leading-snug text-center">{category.description}</p>
                <div className="flex justify-center mt-2">
                    <div className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-stone-800 group-hover:text-teal-700 transition-colors border-b border-transparent group-hover:border-teal-700 pb-1">
                      <span>Explore</span>
                    </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <button onClick={() => handleScroll(categoryScrollRef, 'right')} className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

     {/* Features Section */}
      <div className="container mx-auto px-4 py-16 border-t border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <FeatureIconWrapper title="Verified Sellers" desc="We ensure our community is safe and trustworthy for all transactions.">
            <ShieldIcon />
          </FeatureIconWrapper>
          <FeatureIconWrapper title="Instant Chat" desc="Negotiate prices and discuss details directly with the seller.">
            <ChatIcon />
          </FeatureIconWrapper>
          <FeatureIconWrapper title="Sell Quickly" desc="Post an ad in under 30 seconds and find buyers in your area.">
            <CashIcon />
          </FeatureIconWrapper>
          <FeatureIconWrapper title="Doorstep Pickup" desc="Arrange convenient pickups without the hassle of shipping.">
            <TruckIcon />
          </FeatureIconWrapper>
        </div>
      </div>

      {/* Image Grid Section */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gridItems.map(item => (
            <div key={item._id} className="group relative overflow-hidden h-96 md:h-[30rem]">
              <Link to={item.link}>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/20 transition-colors"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <span className="block text-white text-xs tracking-widest uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                    {item.subtitle}
                  </span>
                  <h3 className="text-white font-marcellus text-3xl md:text-4xl">{item.title}</h3>
                  <div className="w-0 group-hover:w-16 h-[1px] bg-white mt-4 transition-all duration-500"></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="bg-white py-20 border-t border-stone-100" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
               <h4 className="text-teal-700 font-bold tracking-widest text-xs uppercase mb-2">Just In</h4>
               <h2 className="font-marcellus text-4xl text-stone-900">Fresh Findings</h2>
            </div>
            <Link to="/products" className="text-sm font-bold tracking-widest uppercase border-b border-stone-300 hover:border-teal-700 hover:text-teal-700 transition-colors pb-1 mt-4 md:mt-0">
              View All Listings
            </Link>
          </div>
          
          <div className="relative">
            <button onClick={() => handleScroll(arrivalsScrollRef, 'left')} className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:text-teal-700 shadow-md rounded-full p-2 transition-colors border border-stone-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            <div
              ref={arrivalsScrollRef}
              className="flex space-x-8 overflow-x-auto pb-8 pt-2 horizontal-scrollbar px-2"
              onMouseEnter={() => setArrivalsPaused(true)}
              onMouseLeave={() => setArrivalsPaused(false)}
            >
              {newArrivals.map(product => (
                <div key={product._id} className="group flex-shrink-0 w-64 md:w-72">
                  <Link to={`/products/${product._id}`}>
                    <div className="overflow-hidden relative mb-4">
                      <div className="absolute top-2 left-2 bg-white/95 px-3 py-1 text-[10px] font-bold tracking-widest uppercase z-10 text-teal-800">New</div>
                      <img src={product.image} alt={product.name} className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 bg-white/95 py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <span className="text-xs font-bold uppercase tracking-widest text-stone-800">Contact Seller</span>
                      </div>
                    </div>
                    <h3 className="font-marcellus text-lg text-stone-900 truncate">{product.name}</h3>
                    <p className="text-stone-500 font-light mt-1">₹{product.price}</p>
                  </Link>
                </div>
              ))}
            </div>

            <button onClick={() => handleScroll(arrivalsScrollRef, 'right')} className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:text-teal-700 shadow-md rounded-full p-2 transition-colors border border-stone-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Promo Section */}
      <div className="bg-[#1c1c1c] text-white py-12 md:py-24 relative overflow-hidden">
        {/* Reusing glow for consistency */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-[#1c1c1c]/50 backdrop-blur-sm border border-white/10 p-6 md:p-12 mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2" data-aos="fade-right">
              <div className="relative aspect-[4/5] md:aspect-square overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop"
                  alt="Decluttering home"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 text-left" data-aos="fade-left">
              <span className="text-teal-200 font-bold tracking-widest text-xs uppercase mb-4 block">Declutter & Earn</span>
              <h2 className="font-marcellus text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
                Turn Clutter Into <br/> Cash
              </h2>
              <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed mb-8">
                Got items you no longer need? List them on Reuse Realm and find a buyer in minutes. 
                From vintage cameras to modern furniture, someone is looking for exactly what you have.
              </p>
              <Link
                to="/sell"
                className="inline-block bg-white text-black hover:bg-teal-50 font-medium py-4 px-10 transition-colors duration-300 text-sm uppercase tracking-widest"
              >
                Post an Ad Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialCarousel />

      {/* Newsletter Section */}
      <div className="bg-white py-24 text-center overflow-hidden" data-aos="fade-up">
        <div className="container mx-auto px-4 relative mb-20">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-[12rem] md:text-[14rem] font-marcellus text-stone-50 opacity-100 z-0">JOIN US</span>
          </div>
          <div className="relative z-10 max-w-lg mx-auto bg-white/90 backdrop-blur-sm p-6 rounded-xl">
            <h2 className="font-marcellus text-3xl sm:text-4xl text-stone-900 mb-2">Get Deal Alerts</h2>
            <p className="text-stone-500 mb-8 font-light">Sign up to get notified when items in your wishlist become available.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="Your Email Address" className="flex-1 p-3 bg-stone-50 border border-stone-200 focus:outline-none focus:border-stone-400 placeholder-stone-400" />
              <button
                type="submit"
                className="bg-stone-900 text-white font-bold p-3 px-8 uppercase tracking-widest hover:bg-teal-700 transition-colors"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border-t border-b border-white">
          {instagramPosts.map(post => (
            <a href="#" key={post._id} className="group overflow-hidden relative h-64">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 z-10 transition-colors flex items-center justify-center">
                 <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-0 group-hover:scale-100 duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <img src={post.image} alt="Instagram post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
            </a>
          ))}
        </div>
        <a href="#" className="inline-block mt-12 text-stone-900 border-b border-stone-900 pb-1 font-bold text-sm uppercase tracking-widest hover:text-teal-700 hover:border-teal-700 transition-colors">
          Follow us on Instagram
        </a>
      </div>
    </div>
  );
};

export default HomePage;
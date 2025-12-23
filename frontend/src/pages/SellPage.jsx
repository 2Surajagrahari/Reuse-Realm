import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  X,
  Image as ImageIcon,
  DollarSign,
  MapPin,
  Tag,
  FileText,
  Loader2,
  CheckCircle
} from 'lucide-react';
import api from '../api/AxiosAPI';

// --- Configuration ---
const CATEGORIES = ['Electronics', 'Furniture', 'Vehicles', 'Fashion', 'Hobbies', 'Others'];
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

// --- Helper Components ---

const InputLabel = ({ icon: Icon, label, required }) => (
  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 flex items-center gap-2">
    {Icon && <Icon size={14} className="text-teal-700" />}
    {label} {required && <span className="text-red-500">*</span>}
  </label>
);

const SellPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    condition: '',
    price: '',
    location: '',
    contactPhone: ''
  });

  // Image State
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => previews.forEach(url => URL.revokeObjectURL(url));
  }, [previews]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...files]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setIsSubmitting(true);

    // Create FormData for file upload
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    // Append images (Must match backend upload.array('images'))
    images.forEach(image => data.append('images', image));

    try {
      // ACTUAL API CALL
      await api.post('/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/'); // Redirect to Home or Products page
      }, 1500);
    } catch (error) {
      console.error("Error creating listing:", error);
      const errorMsg = error.response?.data?.message || "Failed to post ad. Please try again.";
      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <CheckCircle size={64} className="text-teal-700 mx-auto mb-4" />
          <h2 className="font-marcellus text-3xl text-stone-900 mb-2">Listing Published!</h2>
          <p className="text-stone-500">Your item is now live on Reuse Realm.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen font-montserrat text-stone-800 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-10" data-aos="fade-down">
          <h1 className="font-marcellus text-4xl md:text-5xl text-stone-900 mb-3">Sell an Item</h1>
          <div className="h-[1px] w-20 bg-teal-700 mx-auto mb-4"></div>
          <p className="text-stone-500 font-light text-sm tracking-wide">
            Turn your unused items into cash. Create a listing in minutes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* --- Left Column: Image Upload --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm">
              <InputLabel icon={ImageIcon} label="Photos" required />

              {/* Dropzone */}
              <div className="border-2 border-dashed border-stone-300 rounded-sm bg-stone-50 hover:bg-teal-50 hover:border-teal-300 transition-colors cursor-pointer relative aspect-square flex flex-col items-center justify-center text-center p-4 group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <UploadCloud size={24} className="text-teal-700" />
                </div>
                <p className="text-sm font-bold text-stone-700">Click to Upload</p>
                <p className="text-xs text-stone-400 mt-1">or drag and drop</p>
                <p className="text-[10px] text-stone-400 mt-4 uppercase tracking-widest">Max 5 Photos</p>
              </div>

              {/* Previews */}
              {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <AnimatePresence>
                    {previews.map((src, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="relative aspect-square rounded-sm overflow-hidden border border-stone-200 group"
                      >
                        <img src={src} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-white/90 text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        >
                          <X size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="bg-teal-50 border border-teal-100 p-5 rounded-sm">
              <h4 className="font-marcellus text-teal-900 mb-2">Photo Tips</h4>
              <ul className="text-xs text-teal-800 list-disc list-inside space-y-1 font-light">
                <li>Use good lighting.</li>
                <li>Show multiple angles.</li>
                <li>Capture any defects clearly.</li>
              </ul>
            </div>
          </div>

          {/* --- Right Column: Item Details --- */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-sm border border-stone-200 shadow-sm">

              {/* Item Name */}
              <div className="mb-6">
                <InputLabel icon={Tag} label="Listing Title" required />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. iPhone 13 Pro - 128GB - Mint Condition"
                  required
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-800 focus:outline-none focus:border-teal-700 focus:bg-white transition-all text-sm placeholder-stone-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Category */}
                <div>
                  <InputLabel icon={Tag} label="Category" required />
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-800 focus:outline-none focus:border-teal-700 focus:bg-white transition-all text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Category</option>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <InputLabel icon={CheckCircle} label="Condition" required />
                  <div className="relative">
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-800 focus:outline-none focus:border-teal-700 focus:bg-white transition-all text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Condition</option>
                      {CONDITIONS.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <InputLabel icon={DollarSign} label="Price (₹)" required />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                    min="0"
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-800 focus:outline-none focus:border-teal-700 focus:bg-white transition-all text-sm placeholder-stone-400"
                  />
                </div>
                <div>
                  <InputLabel icon={MapPin} label="Location" required />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Indiranagar, Bangalore"
                    required
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-800 focus:outline-none focus:border-teal-700 focus:bg-white transition-all text-sm placeholder-stone-400"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-6">
                <InputLabel icon={FileText} label="Contact Phone" />
                <input
                  type="text"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="Optional: Enter phone number"
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-800 focus:outline-none focus:border-teal-700 focus:bg-white transition-all text-sm placeholder-stone-400"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <InputLabel icon={FileText} label="Description" required />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Describe your item in detail (brand, age, defects, etc.)"
                  required
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-800 focus:outline-none focus:border-teal-700 focus:bg-white transition-all text-sm placeholder-stone-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-stone-900 text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-teal-700 rounded-sm transition-all duration-300 shadow-lg shadow-stone-900/10 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Posting...
                    </>
                  ) : (
                    'Post Ad Now'
                  )}
                </button>
              </div>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SellPage;
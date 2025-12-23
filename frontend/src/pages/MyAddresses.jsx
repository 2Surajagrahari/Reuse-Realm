import React, { useState, useEffect } from 'react';
import api from '../api/AxiosAPI';
import { MapPin, Plus, Trash2, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: ''
  });

  // Fetch addresses on page load
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await api.get('/addresses');
      setAddresses(res.data);
    } catch (err) {
      console.error('Error fetching addresses', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddAddress = () => {
    setIsAdding(true);
    setFormData({
      fullName: '',
      addressLine1: '',
      city: '',
      state: '',
      postalCode: '',
      phoneNumber: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/addresses', formData);
      setAddresses(res.data); // backend returns updated list
      setIsAdding(false);
    } catch (err) {
      console.error('Error adding address', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      const res = await api.delete(`/addresses/${id}`);
      setAddresses(res.data);
    } catch (err) {
      console.error('Error deleting address', err);
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen font-montserrat text-stone-800 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-stone-200 pb-6">
          <div>
             <h2 className="font-marcellus text-3xl md:text-4xl text-stone-900 mb-2">My Address Book</h2>
             <p className="text-stone-500 text-sm font-light">Manage your shipping locations for faster checkouts.</p>
          </div>
          
          {!isAdding && (
            <button
              onClick={handleAddAddress}
              // Changed button color to Teal
              className="bg-teal-700 text-white py-3 px-6 rounded-sm hover:bg-teal-800 transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-teal-900/10"
            >
              <Plus size={16} /> Add New Address
            </button>
          )}
        </div>

        {/* Add Address Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit} 
              className="mb-10 bg-white p-8 rounded-sm shadow-xl border border-stone-100 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-marcellus text-xl text-stone-900">Add New Destination</h3>
                 <button type="button" onClick={() => setIsAdding(false)} className="text-stone-400 hover:text-red-500 transition-colors">
                    <X size={20} />
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Full Name</label>
                  {/* Changed input focus color to Teal */}
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-teal-700 focus:bg-white transition-all" placeholder="e.g. Jane Doe" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Address Line 1</label>
                  <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} required className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-teal-700 focus:bg-white transition-all" placeholder="Street address, P.O. box, etc." />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-teal-700 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleInputChange} required className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-teal-700 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Postal Code</label>
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-teal-700 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Phone Number</label>
                  <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-teal-700 focus:bg-white transition-all" />
                </div>
              </div>

              <div className="flex gap-4 pt-8 border-t border-stone-100 mt-6">
                <button type="submit" className="bg-stone-900 text-white px-8 py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-teal-700 transition-colors">Save Address</button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-8 py-3 rounded-sm text-xs font-bold uppercase tracking-widest border border-stone-200 hover:border-stone-900 transition-colors">Cancel</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Addresses List */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-stone-400">
             <Loader2 className="animate-spin mr-2" /> Loading addresses...
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-stone-200 rounded-sm bg-white">
             <MapPin size={48} className="mx-auto text-stone-300 mb-4" strokeWidth={1} />
             <p className="text-stone-500 mb-6 font-light">You have no saved addresses yet.</p>
             <button onClick={handleAddAddress} className="text-teal-700 hover:text-teal-900 font-bold text-sm uppercase tracking-widest border-b border-teal-700 pb-1">Add your first address</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map(addr => (
              <div key={addr._id} className="group bg-white border border-stone-200 p-6 rounded-sm hover:shadow-lg hover:border-teal-700/30 transition-all duration-300 relative">
                <div className="flex items-start justify-between mb-4">
                   <div className="bg-stone-100 p-3 rounded-full text-stone-500 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                      <MapPin size={20} />
                   </div>
                   <button 
                      onClick={() => handleDelete(addr._id)} 
                      className="text-stone-300 hover:text-red-500 transition-colors p-2"
                      title="Delete Address"
                   >
                      <Trash2 size={16} />
                   </button>
                </div>
                
                <h3 className="font-marcellus text-lg text-stone-900 mb-2">{addr.fullName}</h3>
                <div className="text-sm text-stone-500 space-y-1 font-light leading-relaxed">
                   <p>{addr.addressLine1}</p>
                   <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                   <p className="pt-2 font-medium text-stone-800">{addr.phoneNumber}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddresses;
import React, { useState, useEffect } from 'react';
import api from '../api/AxiosAPI';
import { User, Store, MapPin, Phone, Mail, Save, Edit2, Loader2 } from 'lucide-react';

const SellerProfile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const emptyForm = {
        displayName: '',
        bio: '',
        location: '',
        contactPhone: '',
        contactEmail: '',
        preferredMeetupTimes: '',
    };

    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                // Assuming backend endpoint changed to /seller-profile or using user data
                const { data } = await api.get('/users/profile'); 

                if (data) {
                    setProfile(data);
                    setFormData({
                        displayName: data.name || '',
                        bio: data.bio || '',
                        location: data.location || '',
                        contactPhone: data.phoneNumber || '',
                        contactEmail: data.email || '',
                        preferredMeetupTimes: data.preferredMeetupTimes || '',
                    });
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                // Fallback for demo purposes if backend isn't updated
                setError('Please complete your seller profile to start listing items.');
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.put('/users/profile', formData);
            setProfile(data);
            setFormData({ ...formData, ...data });
            setIsEditing(false);
            alert('Seller profile updated successfully!');
        } catch (err) {
            console.error(err);
            alert('Error saving profile.');
        }
    };

    return (
        <div
            className="bg-white p-8 rounded-sm shadow-xl border border-stone-100 max-w-4xl mx-auto"
            data-aos="fade-up"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-stone-100 gap-4">
                <div>
                    <h2 className="font-marcellus text-3xl text-stone-900 flex items-center gap-3">
                        <Store className="text-teal-700" size={28} strokeWidth={1.5} /> 
                        Seller Profile
                    </h2>
                    <p className="text-stone-500 text-sm mt-1 font-light">
                        This information will be visible to buyers on your listings.
                    </p>
                </div>
                
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    // Changed button color to Teal
                    className={`flex items-center gap-2 font-bold py-3 px-6 rounded-sm transition-all uppercase tracking-widest text-xs ${
                        isEditing 
                        ? 'bg-stone-200 text-stone-600 hover:bg-stone-300' 
                        : 'bg-teal-700 text-white hover:bg-teal-800 shadow-lg shadow-teal-900/10'
                    }`}
                >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <><Edit2 size={14} /> Edit Profile</>
                    )}
                </button>
            </div>

            {loading && (
                <div className="flex justify-center py-12 text-teal-700">
                    <Loader2 className="animate-spin" size={32} />
                </div>
            )}
            
            {error && !profile.email && !loading && (
                <div className="bg-teal-50 border border-teal-100 text-teal-800 p-4 rounded-sm mb-8 text-sm text-center">
                    {error}
                </div>
            )}

            {/* Form Section */}
            <form onSubmit={submitHandler}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Display Name */}
                    <div>
                        <label htmlFor="displayName" className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
                            <User size={14} /> Display Name
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full p-4 bg-stone-50 border border-stone-200 text-stone-800 rounded-sm focus:outline-none focus:border-teal-700 focus:bg-white transition-all disabled:opacity-60"
                            placeholder="e.g. Vintage Finder"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
                            <MapPin size={14} /> City / Area
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full p-4 bg-stone-50 border border-stone-200 text-stone-800 rounded-sm focus:outline-none focus:border-teal-700 focus:bg-white transition-all disabled:opacity-60"
                            placeholder="e.g. Indiranagar, Bangalore"
                        />
                    </div>

                    {/* Contact Phone */}
                    <div>
                        <label htmlFor="contactPhone" className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
                            <Phone size={14} /> Public Phone
                        </label>
                        <input
                            type="tel"
                            id="contactPhone"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full p-4 bg-stone-50 border border-stone-200 text-stone-800 rounded-sm focus:outline-none focus:border-teal-700 focus:bg-white transition-all disabled:opacity-60"
                            placeholder="+91 98765 43210"
                        />
                    </div>

                    {/* Contact Email */}
                    <div>
                        <label htmlFor="contactEmail" className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
                            <Mail size={14} /> Public Email
                        </label>
                        <input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full p-4 bg-stone-50 border border-stone-200 text-stone-800 rounded-sm focus:outline-none focus:border-teal-700 focus:bg-white transition-all disabled:opacity-60"
                            placeholder="contact@example.com"
                        />
                    </div>

                    {/* Bio - Full Width */}
                    <div className="md:col-span-2">
                        <label htmlFor="bio" className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
                            About Seller
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            rows="4"
                            className="w-full p-4 bg-stone-50 border border-stone-200 text-stone-800 rounded-sm focus:outline-none focus:border-teal-700 focus:bg-white transition-all disabled:opacity-60 resize-none"
                            placeholder="Tell buyers about what you usually sell (e.g., 'I specialize in vintage cameras and restored furniture.')"
                        />
                    </div>

                    {/* Meetup Times - Full Width */}
                    <div className="md:col-span-2">
                        <label htmlFor="preferredMeetupTimes" className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
                            Preferred Meetup Times
                        </label>
                        <input
                            type="text"
                            id="preferredMeetupTimes"
                            name="preferredMeetupTimes"
                            value={formData.preferredMeetupTimes}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full p-4 bg-stone-50 border border-stone-200 text-stone-800 rounded-sm focus:outline-none focus:border-teal-700 focus:bg-white transition-all disabled:opacity-60"
                            placeholder="e.g. Weekends 10 AM - 4 PM, Weekdays after 6 PM"
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-10 flex justify-end">
                        <button
                            type="submit"
                            // Changed button color to Teal
                            className="bg-teal-700 text-white font-bold py-3 px-8 rounded-sm hover:bg-teal-800 transition-all uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl shadow-teal-900/20"
                        >
                            <Save size={16} /> Save Profile
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SellerProfile;
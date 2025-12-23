import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter, Edit2, Trash2, ArrowRight } from 'lucide-react';

const sampleReviews = [
  {
    id: 1,
    productId: 101,
    productName: 'iPhone 13 Pro (128GB)',
    productImage: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=500',
    rating: 5,
    title: 'Excellent Condition!',
    comment: 'Phone looks brand new, battery health is 98%. Seller was very responsive and shipped quickly.',
    date: '2023-10-15',
    helpful: 12,
    verified: true
  },
  {
    id: 2,
    productId: 102,
    productName: 'Vintage Leather Jacket',
    productImage: 'https://images.unsplash.com/photo-1551028919-ac7bcb7d7162?auto=format&fit=crop&q=80&w=500',
    rating: 4,
    title: 'Great find, fits well',
    comment: 'The leather is high quality and well-maintained. A bit stiffer than expected but looks amazing.',
    date: '2023-10-10',
    helpful: 5,
    verified: true
  },
  {
    id: 3,
    productId: 103,
    productName: 'Sony PlayStation 4',
    productImage: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&q=80&w=500',
    rating: 3,
    title: 'Controller stick drift',
    comment: 'Console works fine, but the controller has noticeable drift. Seller mentioned "minor wear" but this affects gameplay.',
    date: '2023-10-05',
    helpful: 2,
    verified: false
  },
  {
    id: 4,
    productId: 104,
    productName: 'Antique Wooden Chair',
    productImage: 'https://images.unsplash.com/photo-1503602642458-2321114453ad?auto=format&fit=crop&q=80&w=500',
    rating: 5,
    title: 'Beautiful piece',
    comment: 'Exactly as described. Adds so much character to my living room. Pickup was easy.',
    date: '2023-09-28',
    helpful: 8,
    verified: true
  }
];

const MyReviews = () => {
  const [reviews, setReviews] = useState(sampleReviews);
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [editForm, setEditForm] = useState({
    rating: 0,
    title: '',
    comment: ''
  });

  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'rating-high':
        return b.rating - a.rating;
      case 'rating-low':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  // Filter reviews based on rating
  const filteredReviews = sortedReviews.filter(review => {
    if (filterBy === 'all') return true;
    return review.rating === parseInt(filterBy);
  });

  const handleEditReview = (review) => {
    setEditingId(review.id);
    setEditForm({
      rating: review.rating,
      title: review.title,
      comment: review.comment
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      rating: 0,
      title: '',
      comment: ''
    });
  };

  const handleSaveEdit = (id) => {
    const updatedReviews = reviews.map(review =>
      review.id === id
        ? { ...review, ...editForm, date: new Date().toISOString().split('T')[0] }
        : review
    );
    setReviews(updatedReviews);
    setEditingId(null);
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  const handleRatingChange = (newRating) => {
    setEditForm({
      ...editForm,
      rating: newRating
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  return (
    <div className="bg-[#FDFBF7] min-h-screen font-montserrat text-stone-800 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-stone-200 pb-6">
          <div>
            <h2 className="font-marcellus text-3xl md:text-4xl text-stone-900 mb-2">My Feedback</h2>
            <p className="text-stone-500 text-sm font-light">
              {totalReviews} review{totalReviews !== 1 ? 's' : ''} • Average Rating: {averageRating.toFixed(1)}/5
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            <div className="flex items-center">
              <label htmlFor="sort" className="text-stone-500 text-xs font-bold uppercase tracking-widest mr-2 whitespace-nowrap">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                // Changed focus border to Teal
                className="bg-white border border-stone-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
              >
                <option value="recent">Most Recent</option>
                <option value="rating-high">Highest Rating</option>
                <option value="rating-low">Lowest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>

            <div className="flex items-center">
              <label htmlFor="filter" className="text-stone-500 text-xs font-bold uppercase tracking-widest mr-2 whitespace-nowrap">Filter:</label>
              <div className="relative">
                 <select
                    id="filter"
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="bg-white border border-stone-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 appearance-none pr-8"
                 >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                 </select>
                 <Filter size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-stone-200 rounded-sm bg-white">
            <Star size={48} className="mx-auto text-stone-300 mb-4" strokeWidth={1} />
            <h3 className="text-xl text-stone-900 mb-2 font-marcellus">No Feedback Yet</h3>
            <p className="text-stone-500 mb-6 font-light">Share your experience with items you've purchased.</p>
            <Link
              to="/products"
              // Changed button color to Teal
              className="inline-block bg-teal-700 text-white py-3 px-8 rounded-sm hover:bg-teal-800 transition-colors text-xs font-bold uppercase tracking-widest shadow-lg shadow-teal-900/10"
            >
              Start Buying
            </Link>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-stone-200 rounded-sm bg-white">
            <Filter size={48} className="mx-auto text-stone-300 mb-4" strokeWidth={1} />
            <h3 className="text-xl text-stone-900 mb-2 font-marcellus">No Matches Found</h3>
            <p className="text-stone-500 mb-6 font-light">Try adjusting your filters to see more reviews.</p>
            <button
              onClick={() => setFilterBy('all')}
              className="text-teal-700 font-bold text-sm uppercase tracking-widest border-b border-teal-700 pb-1 hover:text-teal-900 hover:border-teal-900 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white border border-stone-200 p-6 rounded-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <Link to={`/products/${review.productId}`}>
                      <div className="w-20 h-20 bg-stone-100 rounded-sm overflow-hidden border border-stone-200">
                          <img
                            src={review.productImage}
                            alt={review.productName}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                      </div>
                    </Link>
                  </div>

                  {/* Review Content */}
                  <div className="flex-grow">
                    <Link to={`/products/${review.productId}`} className="font-bold text-stone-900 hover:text-teal-700 text-lg transition-colors">
                      {review.productName}
                    </Link>

                    <div className="flex items-center mt-2 mb-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={16} 
                            // Changed star color to Teal/Stone
                            className={star <= review.rating ? 'text-teal-500 fill-teal-500' : 'text-stone-300'} 
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="ml-3 bg-teal-50 text-teal-800 text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm border border-teal-100">
                          Verified Purchase
                        </span>
                      )}
                    </div>

                    <h4 className="font-marcellus text-stone-900 text-lg mb-2">{review.title}</h4>
                    <p className="text-stone-600 mb-4 text-sm font-light leading-relaxed">{review.comment}</p>

                    <div className="flex flex-wrap items-center justify-between pt-4 border-t border-stone-100">
                      <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">
                        <span>{formatDate(review.date)}</span>
                        {review.helpful > 0 && (
                          <span className="ml-3 border-l border-stone-300 pl-3">{review.helpful} found helpful</span>
                        )}
                      </div>

                      <div className="flex space-x-4 mt-2 md:mt-0">
                        <button
                          onClick={() => handleEditReview(review)}
                          className="flex items-center gap-1 text-stone-500 hover:text-teal-700 text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                          <Edit2 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="flex items-center gap-1 text-stone-400 hover:text-red-600 text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit Form */}
                {editingId === review.id && (
                  <div className="mt-6 pt-6 border-t border-stone-200 bg-stone-50/50 p-6 rounded-sm">
                    <h4 className="font-marcellus text-stone-900 mb-4 text-lg">Update Feedback</h4>

                    <div className="mb-4">
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            className="focus:outline-none hover:scale-110 transition-transform"
                          >
                            <Star 
                                size={24} 
                                className={star <= editForm.rating ? 'text-teal-500 fill-teal-500' : 'text-stone-300'} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="title" className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Headline</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={editForm.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-all"
                        placeholder="Sum up your experience"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="comment" className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Details</label>
                      <textarea
                        id="comment"
                        name="comment"
                        value={editForm.comment}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-all resize-none"
                        placeholder="What did you like or dislike?"
                      ></textarea>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={handleCancelEdit}
                        className="px-6 py-2 border border-stone-300 text-stone-600 rounded-sm hover:bg-stone-100 hover:text-stone-900 transition-colors text-xs font-bold uppercase tracking-widest"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(review.id)}
                        className="bg-teal-700 text-white px-6 py-2 rounded-sm hover:bg-teal-800 transition-colors text-xs font-bold uppercase tracking-widest shadow-md"
                      >
                        Save Update
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
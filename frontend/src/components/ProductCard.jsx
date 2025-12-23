import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addItemToCart } from '../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { Check, ShoppingBag, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const isFavorited = wishlist.some((p) => p._id === product._id);

  const [isAdded, setIsAdded] = useState(false);

  const addToCartHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdded) return;

    const newItem = {
      product: product._id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.basePrice,
      selectedCustomizations: {}, // Default for quick add
      measurements: {},
    };

    dispatch(addItemToCart(newItem));
    setIsAdded(true);

    // Custom Toast Notification styled for Teal theme
    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
          max-w-md w-full bg-white shadow-xl rounded-sm pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 border-teal-700`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-12 w-12 rounded-sm object-cover"
                  src={product.imageUrl || "https://placehold.co/100x100"}
                  alt={product.name}
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-bold text-stone-900 font-marcellus">
                  {product.name}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Added to your bag successfully!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-stone-100">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                navigate('/checkout');
              }}
              className="w-full border border-transparent rounded-none rounded-r-sm p-4 flex items-center justify-center text-xs font-bold uppercase tracking-widest text-teal-700 hover:text-teal-900 focus:outline-none"
            >
              View Bag
            </button>
          </div>
        </div>
      ),
      { duration: 3000 }
    );

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const toggleWishlistHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorited) {
      dispatch(removeFromWishlist(product._id));
      toast.error(`${product.name} removed from saved items`);
    } else {
      dispatch(addToWishlist(product));
      toast.success(`${product.name} saved for later!`);
    }
  };

  return (
    <div className="group relative bg-white overflow-hidden rounded-sm border border-stone-100 transition-all duration-300 hover:shadow-lg hover:border-stone-200">
      <Link to={`/products/${product._id}`} className="block cursor-pointer">
        
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlistHandler}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 shadow-sm ${
            isFavorited ? 'bg-white text-red-500' : 'bg-white/80 text-stone-400 hover:text-stone-900'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart size={18} className={isFavorited ? 'fill-current' : ''} />
        </button>

        {/* Category Badge */}
        {product.category && (
            <div className="absolute top-3 left-3 z-10">
                <span className="bg-stone-900/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                    {product.category}
                </span>
            </div>
        )}

        {/* Product Image */}
        <div className="relative overflow-hidden bg-stone-100 aspect-[3/4]">
          <img
            src={product.imageUrl || "https://placehold.co/600x800/f2f2f2/334155?text=Reuse+Realm"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          
          {/* Quick Add Overlay (Desktop) */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex justify-center pb-6 bg-gradient-to-t from-black/40 to-transparent">
             <button
                onClick={addToCartHandler}
                disabled={isAdded}
                className={`w-full bg-white text-stone-900 font-bold text-xs uppercase tracking-widest py-3 px-4 shadow-lg hover:bg-teal-700 hover:text-white transition-colors flex items-center justify-center gap-2 ${isAdded ? 'opacity-75 cursor-not-allowed' : ''}`}
             >
                {isAdded ? (
                    <>
                        <Check size={14} /> Added
                    </>
                ) : (
                    <>
                        <ShoppingBag size={14} /> Add to Bag
                    </>
                )}
             </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 text-center">
          <h3 className="font-marcellus text-lg text-stone-900 truncate px-1 group-hover:text-teal-700 transition-colors" title={product.name}>
            {product.name}
          </h3>
          <p className="text-stone-500 text-sm font-bold mt-1 font-montserrat">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.basePrice)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Loader2,
    AlertTriangle,
    ShoppingBag,
    Calendar,
    Hash,
    CircleDollarSign,
    ChevronRight,
    Package,
    Truck,
    CheckCircle2,
    XCircle,
    Hourglass,
    Archive,
} from 'lucide-react';

import { orderListRequest, orderListSuccess, orderListFail } from '../features/orders/orderSlice';
import api from '../api/AxiosAPI';

// --- Configuration & Helpers ---

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Updated Status Colors for Teal/Stone Theme
const STATUS_CONFIG = {
    'Pending Confirmation': {
        icon: Hourglass,
        color: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    'Confirmed': {
        icon: Archive,
        color: 'bg-sky-100 text-sky-800 border-sky-200',
    },
    'Processing': {
        icon: Loader2,
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        animate: true,
    },
    'Shipped': {
        icon: Truck,
        color: 'bg-violet-100 text-violet-800 border-violet-200',
    },
    'Delivered': {
        icon: CheckCircle2,
        // Changed to Teal
        color: 'bg-teal-100 text-teal-800 border-teal-200',
    },
    'Cancelled': {
        icon: XCircle,
        color: 'bg-red-100 text-red-800 border-red-200',
    },
    'Default': {
        icon: Package,
        color: 'bg-stone-100 text-stone-800 border-stone-200',
    }
};


// --- UI Sub-components ---

const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.Default;
    const Icon = config.icon;

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wide leading-none rounded-sm border ${config.color}`}>
            <Icon className={`h-3 w-3 ${config.animate ? 'animate-spin' : ''}`} />
            <span>{status}</span>
        </div>
    );
};

const LoadingSkeleton = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-sm border border-stone-200 animate-pulse">
                <div className="flex justify-between items-center">
                    <div className="h-4 bg-stone-200 rounded w-1/4"></div>
                    <div className="h-8 bg-stone-200 rounded w-1/3 md:w-1/5"></div>
                </div>
                <div className="mt-4 h-4 bg-stone-200 rounded w-1/2"></div>
            </div>
        ))}
    </div>
);

const ErrorDisplay = ({ message }) => (
    <div className="flex flex-col items-center justify-center text-center bg-red-50 text-red-800 p-8 rounded-sm border border-red-200">
        <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
        <h3 className="font-marcellus text-xl">Could Not Load Orders</h3>
        <p className="mt-1 text-sm font-light text-red-700">{message}</p>
    </div>
);

const EmptyState = () => (
    <div className="text-center bg-white p-12 rounded-sm border border-stone-200 shadow-sm">
        <ShoppingBag className="mx-auto h-16 w-16 text-stone-300" strokeWidth={1} />
        <h2 className="mt-6 font-marcellus text-2xl text-stone-900">No Order History</h2>
        <p className="mt-2 text-stone-500 max-w-sm mx-auto font-light text-sm">When you buy an item, it will appear here. Start your treasure hunt today!</p>
        <Link
            to="/products"
            // Changed button color to Teal
            className="mt-8 inline-flex items-center gap-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest py-3 px-8 hover:bg-teal-700 transition-colors duration-300"
        >
            Browse Marketplace
        </Link>
    </div>
);

const OrderRow = ({ order, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            // Changed hover border color to Teal
            className="bg-white rounded-sm border border-stone-200 hover:border-teal-700/50 hover:shadow-md transition-all duration-300 group"
        >
            <Link to={`/orders/${order._id}`} className="block">
                {/* --- Mobile & Tablet Layout --- */}
                <div className="p-5 md:hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">Order ID</p>
                            <p className="font-mono text-sm text-stone-800">#{order._id.slice(-8).toUpperCase()}</p>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                            <StatusBadge status={order.orderStatus} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t border-stone-100 pt-4 text-sm text-stone-600">
                        <div>
                            <p className="flex items-center gap-2 text-stone-400 text-xs uppercase tracking-wide mb-1">
                                <Calendar className="h-3 w-3" /> Date
                            </p>
                            <p>{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="text-right">
                            <p className="flex items-center justify-end gap-2 text-stone-400 text-xs uppercase tracking-wide mb-1">
                                <CircleDollarSign className="h-3 w-3" /> Total
                            </p>
                            <p className="font-bold text-stone-900">₹{Number(order.totalPrice || 0).toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* --- Desktop Layout --- */}
                <div className="hidden md:grid grid-cols-[2fr,1fr,1fr,1.5fr,auto] gap-6 items-center px-6 py-5">
                    <div>
                        <p className="font-mono text-sm text-stone-600 group-hover:text-teal-700 transition-colors">#{order._id}</p>
                    </div>
                    <p className="text-stone-600 text-sm font-light">{formatDate(order.createdAt)}</p>
                    <p className="font-bold text-stone-800 text-sm">₹{Number(order.totalPrice || 0).toFixed(2)}</p>
                    <div><StatusBadge status={order.orderStatus} /></div>
                    <div className="text-right">
                        <ChevronRight className="h-5 w-5 text-stone-300 group-hover:text-teal-700 transition-colors" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};


// --- Main Page Component ---

const MyOrdersPage = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                dispatch(orderListRequest());
                const { data } = await api.get('/orders/myorders');
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                dispatch(orderListSuccess(sortedData));
            } catch (err) {
                dispatch(orderListFail(err.response?.data?.message || err.message));
            }
        };
        fetchMyOrders();
    }, [dispatch]);

    const renderContent = () => {
        if (loading) return <LoadingSkeleton />;
        if (error) return <ErrorDisplay message={error} />;
        if (!orders || orders.length === 0) return <EmptyState />;

        return (
            <div className="space-y-4">
                {/* --- Desktop Header --- */}
                <div className="hidden md:grid grid-cols-[2fr,1fr,1fr,1.5fr,auto] gap-6 px-6 py-3 text-left text-xs font-bold text-stone-400 uppercase tracking-widest">
                    <span>Order ID</span>
                    <span>Date</span>
                    <span>Total</span>
                    <span>Status</span>
                    <span className="text-right"></span>
                </div>
                {/* --- Orders List --- */}
                {orders.map((order, index) => (
                    <OrderRow key={order._id} order={order} index={index} />
                ))}
            </div>
        );
    };

    return (
        <div className="bg-[#FDFBF7] min-h-screen font-montserrat text-stone-800">
            <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
                <header className="mb-12" data-aos="fade-down">
                    <h1 className="font-marcellus text-4xl md:text-5xl text-stone-900 mb-3">
                        My Orders
                    </h1>
                    {/* Teal Separator */}
                    <div className="h-[1px] w-20 bg-teal-700 mb-4"></div>
                    <p className="text-stone-500 font-light text-sm tracking-wide">
                        Track your purchases and view past transactions.
                    </p>
                </header>

                <main>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={loading ? 'loading' : error ? 'error' : orders?.length || 0}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default MyOrdersPage;
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import FeaturedEvents from "../components/FeaturedEvents";
import AllEvents from "../components/AllEvents";
import Footer from "../components/Footer";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';
import { Search, ListFilter, Calendar, ArrowDownUp } from "lucide-react"; // Icons for filters

// Simple loading spinner component for a better visual
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full">
        <div className="w-16 h-16 border-4 border-t-cyan-500 border-slate-700 rounded-full animate-spin"></div>
    </div>
);

export default function EventsPage() {
    // All your existing state and logic is preserved
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDateRange, setSelectedDateRange] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(null);

    const fetchCategories = useCallback(async () => {
        // ... your existing fetchCategories logic
        setCategoriesLoading(true);
        setCategoriesError(null);
        try {
            const { data } = await api.get("/categories");
            setCategories([...data, { _id: "hackathon-id", name: "Hackathon" }]);
        } catch (err) {
            setCategoriesError(err.response?.data?.message || err.message);
        } finally {
            setCategoriesLoading(false);
        }
    }, []);

    const fetchEvents = useCallback(async () => {
        // ... your existing fetchEvents logic
        setLoading(true);
        setError(null);
        try {
            const queryParams = new URLSearchParams({
                keyword: searchKeyword,
                category: selectedCategory,
                dateRange: selectedDateRange,
                sortBy,
                order: sortOrder,
            });
            const { data } = await api.get(`/events?${queryParams.toString()}`);
            setEvents(data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }, [searchKeyword, selectedCategory, selectedDateRange, sortBy, sortOrder]);

    useEffect(() => {
        fetchEvents();
        fetchCategories();
    }, [fetchEvents, fetchCategories]);

    const handleRegisterClick = (eventId) => {
        // ... your existing handleRegisterClick logic
        if (!isAuthenticated) {
            toast.error("Please login to register for this event.");
            navigate("/login");
        } else {
            // Future registration logic
        }
    };

    const featuredEvents = events.filter(event => event.isFeatured);

    // --- RENDER STATES ---
    if (loading || categoriesLoading) {
        return <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    }

    if (error || categoriesError) {
        return <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center text-center text-xl text-red-400">Error: {error || categoriesError}</div>;
    }

    // --- MAIN COMPONENT RENDER ---
    const filterInputClasses = "w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition";

    return (
        <div className="relative bg-slate-900 text-white pt-28 min-h-screen overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900 to-transparent opacity-50 z-0"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-16">
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                        Upcoming Events
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-400">
                        Discover amazing events happening on campus. From tech talks to cultural festivals, find your next opportunity to learn, connect, and grow.
                    </p>
                </motion.header>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-12 p-6 bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="relative lg:col-span-2">
                            <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} />
                            <input type="text" placeholder="Search events by name..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} className={filterInputClasses} />
                        </div>
                        <div className="relative">
                             <ListFilter className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} />
                             <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={filterInputClasses}>
                                <option value="">All Categories</option>
                                {categories.map((cat) => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                            </select>
                        </div>
                         <div className="relative">
                            <Calendar className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} />
                            <select value={selectedDateRange} onChange={(e) => setSelectedDateRange(e.target.value)} className={filterInputClasses}>
                                <option value="">All Dates</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="past">Past</option>
                            </select>
                        </div>
                        <div className="relative">
                            <ArrowDownUp className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} />
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={filterInputClasses}>
                                <option value="date">Sort by Date</option>
                                <option value="title">Sort by Title</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {featuredEvents.length > 0 && (
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8">Featured Events</h2>
                        <FeaturedEvents events={featuredEvents} onRegister={handleRegisterClick} />
                    </motion.section>
                )}

                <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <h2 className="text-3xl font-bold text-white mb-8">All Events</h2>
                    <AllEvents events={events} onRegister={handleRegisterClick} />
                </motion.section>
            </div>

            <Footer />
        </div>
    );
}
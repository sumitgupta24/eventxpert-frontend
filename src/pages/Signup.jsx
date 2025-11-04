import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Mail, Lock, Eye, EyeOff, User, Hash, Briefcase, Users, Camera, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';

export default function Signup() {
  // All state and logic from your previous version is preserved
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [profilePicture, setProfilePicture] = useState("https://i.pravatar.cc/150");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [gender, setGender] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [societyName, setSocietyName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const name = `${firstName} ${lastName}`.trim();
      const signupData = { name, email, password, role };
      if (profilePictureFile) {
        const reader = new FileReader();
        reader.readAsDataURL(profilePictureFile);
        await new Promise(resolve => {
          reader.onloadend = () => {
            signupData.profilePicture = reader.result;
            resolve();
          };
        });
      } else {
        signupData.profilePicture = profilePicture;
      }
      if (role === "student" || role === "organizer") {
        signupData.gender = gender;
        signupData.rollNo = rollNo;
        signupData.department = department;
      }
      if (role === "organizer") {
        signupData.societyName = societyName;
      }
      const { data } = await api.post("/users", signupData);
      login(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Registration Successful!");
      if (data.role === "student") navigate("/student");
      else if (data.role === "organizer") navigate("/organizer");
      else if (data.role === "admin") navigate("/admin");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition";
  const iconInputClasses = `${inputClasses} pl-10 pr-4`;
  const selectClasses = `${inputClasses} px-4`;

  return (
    <div className="relative flex items-center justify-center bg-slate-900 text-white px-4 py-24 min-h-screen overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gradient-to-tr from-cyan-950 via-slate-900 to-purple-950 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Left Column: Branding */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-slate-900/30">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                EventXpert
            </h2>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
                Unlock the Future of Campus Events.
            </h1>
            <p className="mt-4 text-slate-400">
                Join a platform designed to make every event seamless, engaging, and unforgettable.
            </p>
            <ul className="mt-8 space-y-4 text-slate-300">
                <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                    AI-Powered Event Scheduling
                </li>
                <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                    Instant QR Code Check-ins
                </li>
                <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                    Real-time Collaboration Tools
                </li>
            </ul>
        </div>
        
        {/* Right Column: Form */}
        <div className="p-8 md:p-12">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white">Create Your Account</h2>
                <p className="text-slate-400 mt-2">Let's get you started.</p>
            </div>
            <div className="flex justify-center mb-6">
                <label htmlFor="profile-picture-upload" className="relative group w-24 h-24 rounded-full overflow-hidden cursor-pointer border-2 border-slate-700 hover:border-cyan-500 transition-colors">
                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={24} className="text-white" />
                    </div>
                </label>
                <input id="profile-picture-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>

            <form className="space-y-4" onSubmit={handleSignup}>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`${inputClasses} px-4`} required />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className={`${inputClasses} px-4`} required />
                </div>
                <div className="relative"><Mail className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} /><input type="email" placeholder="your.email@college.edu" value={email} onChange={(e) => setEmail(e.target.value)} className={iconInputClasses} required /></div>
                <div className="relative">
                    <Lock className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} />
                    <input type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${iconInputClasses} pr-10`} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"><AnimatePresence mode="wait">{showPassword ? <motion.div key="eye-off"><EyeOff size={18} /></motion.div> : <motion.div key="eye"><Eye size={18} /></motion.div>}</AnimatePresence></button>
                </div>
                <div className="relative">
                    <Lock className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} />
                    <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${iconInputClasses} pr-10`} required />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"><AnimatePresence mode="wait">{showConfirmPassword ? <motion.div key="eye-off-2"><EyeOff size={18} /></motion.div> : <motion.div key="eye-2"><Eye size={18} /></motion.div>}</AnimatePresence></button>
                </div>
                <select value={role} onChange={(e) => setRole(e.target.value)} className={selectClasses}>
                    <option value="student">Sign up as a Student</option>
                    <option value="organizer">Sign up as an Organizer</option>
                </select>
                <AnimatePresence>
                    {(role === "student" || role === "organizer") && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                        <div className="relative"><User className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} /><select value={gender} onChange={(e) => setGender(e.target.value)} className={iconInputClasses}><option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
                        <div className="relative"><Hash className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} /><input type="text" placeholder="Roll Number" value={rollNo} onChange={(e) => setRollNo(e.target.value)} className={iconInputClasses} /></div>
                        <div className="relative"><Briefcase className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} /><input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} className={iconInputClasses} /></div>
                    </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {role === "organizer" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="relative mt-4"><Users className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} /><input type="text" placeholder="Society/Club Name" value={societyName} onChange={(e) => setSocietyName(e.target.value)} className={iconInputClasses} /></div>
                    </motion.div>
                    )}
                </AnimatePresence>
                <motion.button whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(34, 211, 238, 0.4)" }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full py-3 mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white text-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? "Creating Account..." : "Create Account"}
                </motion.button>
            </form>
            {error && <p className="text-red-400 text-center mt-4 text-sm">{error}</p>}
            <p className="mt-6 text-center text-slate-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-cyan-400 hover:underline">Sign in here</Link>
            </p>
        </div>
      </motion.div>
    </div>
  );
}
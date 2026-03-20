import React, { useState } from 'react';
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider).catch((err: any) => setError(err.message));
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center"
      >
        <div className="mb-8">
          <div className="w-20 h-20 bg-orange-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-orange-200">
            <span className="text-white text-4xl font-bold">RK</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ramayan Kids</h1>
          <p className="text-gray-600 italic serif">An Interactive Learning Journey</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 py-4 px-6 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
        >
          <LogIn className="w-5 h-5 text-orange-500" />
          Continue with Google
        </button>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

        <p className="mt-8 text-xs text-gray-400 uppercase tracking-widest font-medium">
          For Parents & Educators
        </p>
      </motion.div>
    </div>
  );
}

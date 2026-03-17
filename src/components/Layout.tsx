import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Smartphone, Settings, LogOut, Globe } from 'lucide-react';
import { auth } from '../firebase';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';
import { Language } from '../translations';

export default function Layout() {
  const location = useLocation();
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { path: '/', icon: Smartphone, label: t('journey') },
    { path: '/parent', icon: LayoutDashboard, label: t('parentDashboard') },
    { path: '/admin', icon: Settings, label: t('adminPanel') },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6 border-bottom border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">RK</div>
            <span className="font-bold text-gray-900">Ramayan Kids</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-orange-50 text-orange-600 font-medium'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 space-y-4">
          {/* Language Selector */}
          <div className="px-4 py-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Globe className="w-3 h-3" />
              {t('language')}
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>

          <div className="p-4 border-t border-gray-50">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <img 
                src={user?.photoURL || 'https://picsum.photos/seed/user/40/40'} 
                className="w-8 h-8 rounded-full" 
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.displayName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button 
              onClick={() => auth.signOut()}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

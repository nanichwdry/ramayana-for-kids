import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  BookOpen,
  Download,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function ParentDashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-500">Monitoring Arjun's Learning Journey</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all">
          <Download className="w-4 h-4" />
          Weekly Report
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={TrendingUp} label="Progress" value="65%" color="orange" />
        <StatCard icon={Clock} label="Time Spent" value="4.2h" color="blue" />
        <StatCard icon={Award} label="Quiz Avg" value="88%" color="emerald" />
        <StatCard icon={BookOpen} label="Chapters" value="12/48" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Learning Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <ActivityItem 
                title="Birth of Rama" 
                time="2 hours ago" 
                score="100%" 
                status="completed" 
              />
              <ActivityItem 
                title="Childhood Adventures" 
                time="Yesterday" 
                score="85%" 
                status="completed" 
              />
              <ActivityItem 
                title="Vishwamitra's Visit" 
                time="2 days ago" 
                score="--" 
                status="started" 
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Values Learned</h3>
            <div className="flex flex-wrap gap-3">
              {['Truth', 'Duty', 'Respect', 'Courage', 'Patience'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-emerald-500" />
              <h3 className="text-lg font-bold text-gray-900">Parental Controls</h3>
            </div>
            <div className="space-y-4">
              <ToggleSetting label="Daily Time Limit (30m)" active={true} />
              <ToggleSetting label="Auto-Play Next" active={false} />
              <ToggleSetting label="Show Subtitles" active={true} />
              <ToggleSetting label="Quiz Mode" active={true} />
            </div>
          </div>

          <div className="bg-orange-600 p-6 rounded-3xl shadow-lg text-white">
            <h3 className="font-bold mb-2">Upgrade to Premium</h3>
            <p className="text-sm text-orange-100 mb-4">Unlock all 48 chapters and exclusive mini-games.</p>
            <button className="w-full bg-white text-orange-600 py-3 rounded-xl font-bold text-sm">
              View Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colors: any = {
    orange: 'bg-orange-50 text-orange-600',
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div className={`w-10 h-10 ${colors[color]} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function ActivityItem({ title, time, score, status }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${status === 'completed' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
        <div>
          <p className="font-bold text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-900">{score}</p>
        <p className="text-[10px] text-gray-400 uppercase font-bold">Score</p>
      </div>
    </div>
  );
}

function ToggleSetting({ label, active }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 font-medium">{label}</span>
      <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-all ${active ? 'bg-orange-500' : 'bg-gray-200'}`}>
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`} />
      </div>
    </div>
  );
}

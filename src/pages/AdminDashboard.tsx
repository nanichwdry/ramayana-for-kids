import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Video, 
  Globe, 
  BookOpen,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('lessons');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-500">Manage story arcs, lessons, and translations</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all">
          <Plus className="w-5 h-5" />
          New Lesson
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-100">
        {['Story Arcs', 'Lessons', 'Quizzes', 'Glossary'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative ${
              activeTab === tab.toLowerCase() ? 'text-orange-600' : 'text-gray-400'
            }`}
          >
            {tab}
            {activeTab === tab.toLowerCase() && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search lessons..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-gray-600 font-medium">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Lesson</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Arc</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Languages</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <LessonRow 
              title="Birth of Rama" 
              arc="Ayodhya Kand" 
              langs={['EN', 'TE', 'HI']} 
              status="published" 
            />
            <LessonRow 
              title="Childhood Adventures" 
              arc="Ayodhya Kand" 
              langs={['EN', 'TE']} 
              status="published" 
            />
            <LessonRow 
              title="Vishwamitra's Visit" 
              arc="Ayodhya Kand" 
              langs={['EN']} 
              status="draft" 
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LessonRow({ title, arc, langs, status }: any) {
  return (
    <tr className="hover:bg-gray-50/50 transition-all">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-gray-900">{title}</p>
            <p className="text-xs text-gray-500">Lesson 01</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-600">{arc}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-1">
          {langs.map((l: string) => (
            <span key={l} className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
              {l}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
          status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
        }`}>
          {status === 'published' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
          {status.toUpperCase()}
        </div>
      </td>
      <td className="px-6 py-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-all">
          <MoreVertical className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
}

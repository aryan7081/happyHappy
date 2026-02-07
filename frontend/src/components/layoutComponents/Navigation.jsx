import React from 'react';
import { Activity, CreditCard, Dumbbell, Calendar } from 'lucide-react';

export const Navigation = ({ activeTab, setActiveTab }) => {
    const navItems = [
      { id: 'overview', label: 'Overview', icon: Activity },
      { id: 'membership', label: 'Membership', icon: CreditCard },
      { id: 'workouts', label: 'Workouts', icon: Dumbbell },
      { id: 'classes', label: 'Classes', icon: Calendar }
    ];
  
    return (
      <nav className="flex space-x-8 mb-8">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === id
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    );
  };

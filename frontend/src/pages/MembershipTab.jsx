import React from 'react';
import { CheckCircle } from 'lucide-react';
import { MembershipPlanCard } from '../components/MembershipPlanCard';

export const MembershipTab = ({ user, membershipPlans, onSelectPlan , membershipDetail}) => (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Membership</h2>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" />
                Active
              </span>
              <span className="text-gray-600">Plan: {membershipDetail.membership_plan}</span>
              <span className="text-gray-600">Expires: {membershipDetail.end_date}</span>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Upgrade Plan
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Usage This Month</h3>
            <p className="text-2xl font-bold text-blue-600">Workout this month count</p>
            <p className="text-sm text-gray-600">Gym visits</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Classes Attended</h3>
            <p className="text-2xl font-bold text-green-600">12</p>
            <p className="text-sm text-gray-600">This month</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Savings</h3>
            <p className="text-2xl font-bold text-purple-600">$156</p>
            <p className="text-sm text-gray-600">Compared to day passes</p>
          </div>
        </div>
      </div>
  
      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {membershipPlans.map((plan) => (
            <MembershipPlanCard
              key={plan.id}
              plan={plan}
              currentPlan="User's current plan"
              onSelectPlan={onSelectPlan}
            />
          ))}
        </div>
      </div>
    </div>
  );
import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

export const WelcomeBanner = ({ user , membershipDetail}) => (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user ? user.name?.split(' ')[0]: null}!</h2>
          <p className="text-blue-100 mb-4">Ready to crush your fitness goals today?</p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Current Plan: {membershipDetail ? membershipDetail.membership_plan: null}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>streak day count streak</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-100">Member since</p>
          <p className="text-lg font-semibold">{membershipDetail ? membershipDetail.start_date:null}</p>
        </div>
      </div>
    </div>
  );
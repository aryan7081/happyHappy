import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const ClassesTab = ({ upcomingClasses }) => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Fitness Classes</h2>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          View Schedule
        </button>
      </div>
  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Classes</h3>
          <div className="space-y-4">
            {upcomingClasses.map((cls, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{cls.class}</h4>
                  <p className="text-sm text-gray-600">with {cls.instructor}</p>
                  <p className="text-sm text-gray-500">{cls.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">{cls.spots} spots left</p>
                  <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Bookings</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">HIIT Training</h4>
                  <p className="text-sm text-gray-600">Tomorrow, 9:00 AM</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Yoga Flow</h4>
                  <p className="text-sm text-gray-600">Friday, 6:00 PM</p>
                </div>
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
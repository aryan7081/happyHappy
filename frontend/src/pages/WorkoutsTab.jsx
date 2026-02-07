import React from 'react';
import { Dumbbell } from 'lucide-react';

export const WorkoutsTab = ({ recentWorkouts }) => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Workouts</h2>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Start New Workout
        </button>
      </div>
  
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workout History</h3>
          <div className="space-y-4">
            {recentWorkouts.map((workout, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{workout.type}</h4>
                    <p className="text-sm text-gray-600">{workout.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{workout.duration}</p>
                  <p className="text-sm text-gray-600">{workout.calories} calories</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">This Week</span>
                <span className="font-medium">5 workouts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Time</span>
                <span className="font-medium">4h 15m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Calories Burned</span>
                <span className="font-medium">1,420</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Duration</span>
                <span className="font-medium">51 min</span>
              </div>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Favorite Workouts</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Upper Body</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">32 times</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Cardio</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">28 times</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Lower Body</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">24 times</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
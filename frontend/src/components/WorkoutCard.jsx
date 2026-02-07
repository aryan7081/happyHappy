import React from 'react';

export const WorkoutCard = ({ workout }) => (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium text-gray-900">{workout.type}</p>
        <p className="text-sm text-gray-600">{workout.date}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{workout.duration}</p>
        <p className="text-sm text-gray-600">{workout.calories} cal</p>
      </div>
    </div>
  );

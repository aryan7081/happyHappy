import React from 'react';

export const ClassCard = ({ cls }) => (
    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
      <div>
        <p className="font-medium text-gray-900">{cls.class}</p>
        <p className="text-sm text-gray-600">{cls.instructor}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{cls.time}</p>
        <p className="text-sm text-green-600">{cls.spots} spots left</p>
      </div>
    </div>
  );

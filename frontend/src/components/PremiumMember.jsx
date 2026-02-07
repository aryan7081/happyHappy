import React from 'react';
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";

const PremiumMember = ({ name, membershipPlan, dateJoined, expiryDate }) => {
  console.log("this:",name)
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white px-4">
      {/* Top Section */}
      <div className="flex flex-col items-center gap-6">
        {/* Profile Image */}
        <div className="relative group">
          <img
            src="/assets/testProfile.jpg"
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-yellow-400 shadow-lg object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Profile Info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-yellow-300 tracking-wide">{name}</h2>
          <p className="text-sm text-gray-400 mt-1">{membershipPlan} Plan</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 w-64 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

      {/* Bottom Section */}
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-3 text-gray-300">
          <FaCalendarAlt className="text-yellow-300" />
          <p className="text-sm">Member Since: <span className="text-white">{dateJoined}</span></p>
        </div>
        <div className="flex items-center justify-center gap-3 text-gray-300">
          <FaRegClock className="text-yellow-300" />
          <p className="text-sm">Next Billing: <span className="text-white">{expiryDate}</span></p>
        </div>
      </div>
    </div>
  );
};

export default PremiumMember;

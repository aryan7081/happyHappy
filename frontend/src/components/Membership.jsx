import React from 'react'

const Membership = ({ membershipPlanName, price, description, duration, handleBuy, planId }) => {
  return (
    <div className="w-72 flex flex-col rounded-2xl bg-[#1a1a1a] text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Header */}
      <div className="flex flex-col items-center gap-2 py-6 border-b border-gray-700">
        <h3 className="text-lg font-semibold">{membershipPlanName}</h3>
        <p className="text-2xl font-bold text-yellow-400">₹{price}</p>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 text-sm px-6 py-6 flex-grow text-gray-300">
        <p className="text-violet-300">{duration}</p>
        <p>✅ 24/7 Gym Access</p>
        <p>✅ Trainer Onboarding Included</p>
        <p>{description}</p>
      </div>

      {/* CTA */}
      <div className="flex justify-center py-4">
        <button
          onClick={() => handleBuy(planId)}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-full transition-all duration-200"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}

export default Membership

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MembershipContext } from '../context/MembershipContext';
import Membership from '../components/Membership';
import { useNavigate } from "react-router-dom";
import PremiumMember from '../components/PremiumMember';
import config from '../config'
import { CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      localStorage.removeItem("payment_done");
    };
  }, []);
  const { user, isAuthenticated } = useContext(AuthContext);
  const { isSubscribedMember, membershipDetail, checkMembershipStatus, availablePlans, fetchAvailablePlans } = useContext(MembershipContext);

  useEffect(() => {
    fetchAvailablePlans();
  }, [fetchAvailablePlans]);

  const handleBuy = async (planId) => {
    if (!isAuthenticated) {
      alert("Login first");
      return;
    }
    try {
      const payload = {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Token ${user.token}`
        },
        body: JSON.stringify({ plan_id: planId })
      };
      const response = await fetch(`${config.apiBaseUrl}/api/memberships/`, payload);
      const data = await response.json();
      navigate(`/payment?membership_id=${data.id}&amount=${data.price}`);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.token) {
      checkMembershipStatus(user.token);
    }
  }, [isAuthenticated, user, checkMembershipStatus]);

  useEffect(() => {
    if (isAuthenticated && user?.token) {
      checkMembershipStatus(user.token);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl">
        Please login to access the dashboard.
      </div>
    );
  }
  console.log("Membership Status:", isSubscribedMember);
  if (isSubscribedMember) { navigate("/dashboard")
  return;
    // return (
    //   <div className="bg-black min-h-screen text-white pt-20 px-4">
    //     <PremiumMember
    //       membershipPlan={membershipDetail.membership_plan}
    //       expiryDate={membershipDetail.end_date}
    //       name = {user.name}
    //       dateJoined = {membershipDetail.start_date}
    //     />
    //   </div>
    // );
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible membership options designed to fit your lifestyle and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {availablePlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                plan.popular ? 'border-blue-600 transform scale-105' : 'border-gray-200'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button onClick={()=>handleBuy(plan.id)} className={`w-full py-3 px-6 rounded-full font-bold transition-all ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Dashboard;

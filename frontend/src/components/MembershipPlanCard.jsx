import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

export const MembershipPlanCard = ({ plan, currentPlan, onSelectPlan }) => {
    const isCurrentPlan = currentPlan === plan.name;
    
    return (
      <div
        className={`relative bg-white p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
          plan.popular 
            ? 'border-blue-500 shadow-md' 
            : isCurrentPlan
            ? 'border-green-500 bg-green-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </span>
          </div>
        )}
        
        {isCurrentPlan && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              Current Plan
            </span>
          </div>
        )}
  
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <div className="flex items-baseline justify-center">
            <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
            <span className="text-gray-600 ml-1">{plan.period}</span>
          </div>
        </div>
  
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
  
        <button
          disabled={isCurrentPlan}
          onClick={() => onSelectPlan(plan)}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isCurrentPlan
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : plan.popular
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
        </button>
      </div>
    );
  };
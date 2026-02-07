import React, { useState, useEffect, useContext } from 'react';
import { Navigation } from './Navigation';
import { OverviewTab } from '../../pages/OverviewTab';
import { MembershipTab } from '../../pages/MembershipTab';
import { WorkoutsTab } from '../../pages/WorkoutsTab';
import { ClassesTab } from '../../pages/ClassesTab';
import { AuthContext } from '../../context/AuthContext';
import { MembershipContext } from '../../context/MembershipContext';

export const GymDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { user, isAuthenticated } = useContext(AuthContext);
    const { membershipDetail, checkMembershipStatus } = useContext(MembershipContext);
    
    useEffect(() => {
        if (isAuthenticated && user?.token) {
          checkMembershipStatus(user.token);
        }
      }, [isAuthenticated, user?.token, checkMembershipStatus]);
  
    const membershipPlans = [
      {
        id: 1,
        name: "Basic",
        price: "$29",
        period: "/month",
        features: [
          "Access to gym equipment",
          "Locker room access",
          "Basic workout tracking",
          "Mobile app access"
        ],
        popular: false
      },
      {
        id: 2,
        name: "Premium",
        price: "$49",
        period: "/month",
        features: [
          "All Basic features",
          "Group fitness classes",
          "Personal trainer consultation",
          "Nutrition guidance",
          "Advanced analytics"
        ],
        popular: true
      },
      {
        id: 3,
        name: "Elite",
        price: "$79",
        period: "/month",
        features: [
          "All Premium features",
          "Unlimited personal training",
          "Priority class booking",
          "Massage therapy sessions",
          "Meal planning service"
        ],
        popular: false
      }
    ];
  
    const recentWorkouts = [
      { date: "Today", type: "Upper Body", duration: "45 min", calories: 320 },
      { date: "Yesterday", type: "Cardio", duration: "30 min", calories: 280 },
      { date: "2 days ago", type: "Lower Body", duration: "50 min", calories: 380 },
      { date: "3 days ago", type: "Full Body", duration: "60 min", calories: 420 }
    ];
  
    const upcomingClasses = [
      { time: "09:00 AM", class: "HIIT Training", instructor: "Sarah Wilson", spots: 3 },
      { time: "11:30 AM", class: "Yoga Flow", instructor: "Mike Chen", spots: 8 },
      { time: "02:00 PM", class: "Strength Training", instructor: "Emma Davis", spots: 1 },
      { time: "06:00 PM", class: "Spin Class", instructor: "John Martinez", spots: 5 }
    ];
  
    const handleSelectPlan = (plan) => {
      console.log('Selected plan:', plan);
      // Handle plan selection logic here
    };
  
    const renderTabContent = () => {
      switch (activeTab) {
        case 'overview':
          return <OverviewTab user={user} recentWorkouts={recentWorkouts} membershipDetail = {membershipDetail} upcomingClasses={upcomingClasses} />;
        case 'membership':
          return <MembershipTab user={user} membershipPlans={membershipPlans} membershipDetail = {membershipDetail} onSelectPlan={handleSelectPlan} />;
        case 'workouts':
          return <WorkoutsTab recentWorkouts={recentWorkouts} />;
        case 'classes':
          return <ClassesTab upcomingClasses={upcomingClasses} />;
        default:
          return <OverviewTab user={user} recentWorkouts={recentWorkouts} upcomingClasses={upcomingClasses} />;
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <Header user={user} /> */}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          {renderTabContent()}
        </div>
      </div>
    );
  };

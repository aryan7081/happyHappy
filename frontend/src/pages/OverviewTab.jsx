import React from 'react';
import { Activity, Target, Clock, TrendingUp } from 'lucide-react';
import { WelcomeBanner } from '../components/WelcomeBanner';
import { StatCard } from '../components/StatCard';
import { WorkoutCard } from '../components/WorkoutCard';
import { ClassCard } from '../components/ClassCard';

export const OverviewTab = ({ user, recentWorkouts, upcomingClasses, membershipDetail}) => (
    <div className="space-y-8">
      <WelcomeBanner user={user} membershipDetail = {membershipDetail}/>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Activity}
          title="Workouts This Month"
          value="Workout this month count"
          subtitle="3 more than last month"
          trend="+18%"
        />
        <StatCard
          icon={Target}
          title="Total Workouts"
          value="totalWorkouts count"
          subtitle="Since joining"
        />
        <StatCard
          icon={Clock}
          title="Current Streak"
          value={`streak days count`}
          subtitle="Personal best: 12 days"
        />
        <StatCard
          icon={TrendingUp}
          title="Avg. Duration"
          value="47 min"
          subtitle="Per workout session"
          trend="+5%"
        />
      </div>
  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Workouts</h3>
          <div className="space-y-3">
            {recentWorkouts.map((workout, index) => (
              <WorkoutCard key={index} workout={workout} />
            ))}
          </div>
        </div>
  
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Classes</h3>
          <div className="space-y-3">
            {upcomingClasses.map((cls, index) => (
              <ClassCard key={index} cls={cls} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
import React from 'react';
import UserDashboard from '../../components/UserDashboard';
import Clock from '../../components/Clock';
import Hr from '../../components/Hr';

export default function LifecyclePage() {
  return (
    <>
      <Hr text="Advanced Salygos ir React gyvavymo ciklas useEffect" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <UserDashboard />
        <div className='card'>
          <Clock />
        </div>
      </div>
    </>
  );
}
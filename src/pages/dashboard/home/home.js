import React from 'react';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';

import './home.scss';

const KPIs = ({ kpis }) => {
  return (
    <div className='kpis'>
      {kpis.map((kpi, index) => (
        <div className='kpi-container' key={index}>
          <h2>{kpi.data}</h2>
          <h3>{kpi.label}</h3>
        </div>
      ))}
    </div>
  )
}

const DashbboardHome = () => {
  const kpis = [
    { data: 54, label: 'This is a test' },
    { data: 4, label: 'Nombre d\'utilisateurs' },
    { data: 23, label: 'Utilisateurs connectés' },
    { data: 56, label: 'Voleurs' },
    { data: 1000, label: 'This is a test' },
    { data: 543, label: 'This is a test' },
  ];

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-home'>
          <h1>KPIs</h1>
          <KPIs kpis={kpis} />
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardHome;

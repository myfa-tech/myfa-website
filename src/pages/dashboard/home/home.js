import React, { useEffect, useState } from 'react';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';

import './home.scss';
import { fetchKPIs } from '../../../services/kpis';

const KPIs = ({ kpis }) => {
  return (
    <div className='kpis'>
      {kpis.map((kpi, index) => (
        <div className='kpi-container' key={index}>
          <h2>{kpi.result}</h2>
          <h3>{kpi.label}</h3>
        </div>
      ))}
    </div>
  )
}

const DashbboardHome = () => {
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedKPIs = await fetchKPIs();

      setKpis(fetchedKPIs);
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-home'>
          <h1>Accueil</h1>
          <KPIs kpis={kpis} />
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardHome;

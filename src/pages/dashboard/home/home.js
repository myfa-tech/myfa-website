import React, { useEffect, useState } from 'react';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';

import './home.scss';
import { fetchKPIs } from '../../../services/kpis';

const getColor = (id, value) => {
  const colors = {
    week_nb_paid_fruits_baskets: (13/4),
    week_nb_paid_legumes_baskets: (6/4),
    week_nb_paid_sauces_baskets: (1/4),
    week_nb_paid_myfa_baskets: (5/4),

    month_nb_paid_fruits_baskets: 13,
    month_nb_paid_legumes_baskets: 6,
    month_nb_paid_sauces_baskets: 1,
    month_nb_paid_myfa_baskets: 5,
  };

  if (value < (colors[id] / 2)) {
    return 'red';
  } else if (value >= (colors[id] / 2) && value < colors[id]) {
    return 'orange';
  } else {
    return 'green';
  }
};

const KPIs = ({ kpis }) => {
  const { generalKpis, weekKpis, monthKpis } = kpis;

  return (
    <div className='kpis-container'>
      <h2>Cette semaine</h2>
      <div className='kpis'>
        {weekKpis.map((kpi, index) => (
          <div className={`kpi-container ${getColor(kpi.id, kpi.result)}`} key={index}>
            <h2>{kpi.result}</h2>
            <h3>{kpi.label}</h3>
          </div>
        ))}
      </div>

      <h2>Ce mois</h2>
      <div className='kpis'>
        {monthKpis.map((kpi, index) => (
          <div className={`kpi-container ${getColor(kpi.id, kpi.result)}`} key={index}>
            <h2>{kpi.result}</h2>
            <h3>{kpi.label}</h3>
          </div>
        ))}
      </div>

      <h2>Total</h2>
      <div className='kpis'>
        {generalKpis.map((kpi, index) => (
          <div className='kpi-container' key={index}>
            <h2>{kpi.result}</h2>
            <h3>{kpi.label}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

const DashbboardHome = () => {
  const [generalKpis, setGeneralKpis] = useState([]);
  const [weekKpis, setWeekKpis] = useState([]);
  const [monthKpis, setMonthKpis] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedKPIs = await fetchKPIs();
      const generalKpis = fetchedKPIs.filter(kpi => kpi.section === 'general');
      const weekKpis = fetchedKPIs.filter(kpi => kpi.section === 'week');
      const monthKpis = fetchedKPIs.filter(kpi => kpi.section === 'month');

      setGeneralKpis(generalKpis);
      setWeekKpis(weekKpis);
      setMonthKpis(monthKpis);
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-home'>
          <h1>Accueil</h1>
          <KPIs kpis={{ generalKpis, weekKpis, monthKpis }} />
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardHome;

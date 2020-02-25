import React, { useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from "sanitize-html";

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';

import './home.scss';
import { fetchKPIs } from '../../../services/kpis';
import { fetchGoals, updateGoalById } from '../../../services/kpi-goals';

const KPIs = ({ kpis, goals, setGoals, editGoal }) => {
  const { generalKpis, weekKpis, monthKpis } = kpis;

  const getColor = (id, value) => {
    if (!goals) {
      return '';
    }

    const month_nb_paid_fruits_baskets = goals.find(g => g.id === 'month_nb_paid_fruits_baskets').value;
    const week_nb_paid_fruits_baskets = month_nb_paid_fruits_baskets / 4;
    const month_nb_paid_legumes_baskets = goals.find(g => g.id === 'month_nb_paid_legumes_baskets').value;
    const week_nb_paid_legumes_baskets = month_nb_paid_legumes_baskets / 4;
    const month_nb_paid_sauces_baskets = goals.find(g => g.id === 'month_nb_paid_sauces_baskets').value;
    const week_nb_paid_sauces_baskets = month_nb_paid_sauces_baskets / 4;
    const month_nb_paid_myfa_baskets = goals.find(g => g.id === 'month_nb_paid_myfa_baskets').value;
    const week_nb_paid_myfa_baskets = month_nb_paid_myfa_baskets / 4;

    const colors = {
      week_nb_paid_fruits_baskets,
      month_nb_paid_fruits_baskets,
      month_nb_paid_legumes_baskets,
      week_nb_paid_legumes_baskets,
      month_nb_paid_sauces_baskets,
      week_nb_paid_sauces_baskets,
      month_nb_paid_myfa_baskets,
      week_nb_paid_myfa_baskets,
    };

    if (value < (colors[id] / 2)) {
      return 'red';
    } else if (value >= (colors[id] / 2) && value < colors[id]) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  const handleGoalChange = (id, value) => {
    let goalIndex = goals.findIndex(g => g.id === id);
    goals[goalIndex].value = sanitizeHtml(value);

    setGoals([...goals]);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const updateGoal = (id) => {
    const value = goals.find(g => g.id === id).value;
    editGoal(id, value);
  };

  const getGoal = (id) => {
    return (goals.find(g => g.id === id) || {}).value;
  };

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
            <ContentEditable
              className='goal'
              tagName='div'
              html={getGoal(kpi.id)} // innerHTML of the editable div
              disabled={false} // use true to disable edition
              onChange={(e) => handleGoalChange(kpi.id, e.target.value)} // handle innerHTML change
              onBlur={() => updateGoal(kpi.id)}
              onKeyDown={(e) => handleKeyDown(e, kpi.id)}
            />
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
  const [goals, setGoals] = useState([]);

  const editGoal = (id, value) => {
    updateGoalById(id, value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedKPIs = await fetchKPIs();
      const fetchedGoals = await fetchGoals();

      const generalKpis = fetchedKPIs.filter(kpi => kpi.section === 'general');
      const weekKpis = fetchedKPIs.filter(kpi => kpi.section === 'week');
      const monthKpis = fetchedKPIs.filter(kpi => kpi.section === 'month');

      setGeneralKpis(generalKpis);
      setWeekKpis(weekKpis);
      setMonthKpis(monthKpis);

      setGoals(fetchedGoals);
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-home'>
          <h1>Accueil</h1>
          {goals.length && <KPIs goals={goals} setGoals={setGoals} editGoal={editGoal} kpis={{ generalKpis, weekKpis, monthKpis }} />}
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardHome;

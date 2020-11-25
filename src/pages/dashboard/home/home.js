import React, { useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';

import './home.scss';
import { fetchKPIs } from '../../../services/kpis';
import { fetchGoals, updateGoalById } from '../../../services/kpi-goals';
import { isEmployeeLoggedIn } from '../../../services/auth';

const KPIs = ({ kpis, goals, setGoals, editGoal }) => {
  const { generalKpis, monthKpis } = kpis;
  const isEmployee = isEmployeeLoggedIn();

  const getColor = (id, value) => {
    if (!goals) {
      return '';
    }

    const colors = {};

    goals.filter(g => g.id.includes('month')).forEach(goal => {
      colors[goal.id] = Number(goal.value);
    });

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

    goals[goalIndex].value = value;

    setGoals([...goals]);
  };

  const handleKeyDown = (e, id) => {
    if ((!Number.isInteger(Number(e.key)) && e.key !== 'Backspace' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') || e.key === ' ') {
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
              disabled={isEmployee} // use true to disable edition
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
      const monthKpis = fetchedKPIs.filter(kpi => kpi.section === 'month');

      setGeneralKpis(generalKpis);
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
          {goals.length && <KPIs goals={goals} setGoals={setGoals} editGoal={editGoal} kpis={{ generalKpis, monthKpis }} />}
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardHome;

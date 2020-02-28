import React, { useEffect, useState } from 'react';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';
import Table from '../../../components/dashboard/Table';

import { fetchUsers } from '../../../services/users';

import './users.scss';

const DashbboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [timeFilter, setTimeFilter] = useState(null);

  const columns = [
    {
      text: 'Prénom',
      dataField: 'firstname',
    },
    {
      text: 'Nom',
      dataField: 'lastname',
    },
    {
      text: 'Email',
      dataField: 'email',
      headerStyle: () => {
        return { width: '300px' };
      },
    },
    {
      text: 'Phone',
      dataField: 'phone',
      headerStyle: () => {
        return { width: '180px' };
      },
    },
    {
      text: 'Paniers payés',
      dataField: 'qtyPaidBaskets',
      headerStyle: () => {
        return { width: '120px' };
      },
    },
    {
      text: 'Date de création',
      dataField: 'createdAt',
      headerStyle: () => {
        return { width: '180px' };
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, [timeFilter]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let fetchedUsers = await fetchUsers(timeFilter);

    fetchedUsers = fetchedUsers.map(user => {
      let qtyPaidBaskets = 0;
      let date = new Date(user.createdAt);

      if (user.qtyPaidBaskets < 3) {
        qtyPaidBaskets = `${user.qtyPaidBaskets} 👶🏽`;
      } else if (user.qtyPaidBaskets < 10) {
        qtyPaidBaskets = `${user.qtyPaidBaskets} 👩🏽‍🦱`;
      } else {
        qtyPaidBaskets = `${user.qtyPaidBaskets} 👵🏽`;
      }

      return {
        ...user,
        qtyPaidBaskets,
        createdAt: date.toLocaleDateString('fr-FR'),
      };
    });

    if (fetchedUsers.length < 15) {
      for (let i = 0; i < 15; i++) {
        if (!fetchedUsers[i]) {
          fetchedUsers.push({ _id: i, email: '' });
        }
      }
    }

    setUsers(fetchedUsers);
  };

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-users'>
          <h1>
            <span>Utilisateurs</span>
            <button onClick={() => setTimeFilter('month')}>Ce mois-ci</button>
            <button onClick={() => setTimeFilter('week')}>Cette semaine</button>
            <button onClick={() => setTimeFilter('today')}>Aujourd'hui</button>
          </h1>
          <div className='users'>
            <Table data={users} columns={columns} />
          </div>
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardUsers;

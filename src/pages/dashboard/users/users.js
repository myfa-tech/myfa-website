import React, { useEffect, useState } from 'react';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';
import Table from '../../../components/dashboard/Table';

import { fetchUsers } from '../../../services/users';

import './users.scss';

const DashbboardUsers = () => {
  const [users, setUsers] = useState([]);

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
    },
    {
      text: 'Phone',
      dataField: 'phone',
    },
    {
      text: 'Paniers payés',
      dataField: 'qtyPaidBaskets',
    },
    {
      text: 'Date de création',
      dataField: 'createdAt',
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      let fetchedUsers = await fetchUsers();

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

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-users'>
          <h1>Utilisateurs</h1>
          <div className='users'>
            <Table data={users} columns={columns} />
          </div>
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardUsers;

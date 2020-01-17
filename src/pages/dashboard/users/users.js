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
      Header: 'Prénom',
      accessor: 'firstname',
    },
    {
      Header: 'Nom',
      accessor: 'lastname',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
    {
      Header: 'Country',
      accessor: data => {
        if (!!data.countryCode) {
          const codes = {
            CIV: '🇨🇮',
            CAM: '🇨🇲',
            SEN: '🇸🇳',
            FRA: '🇫🇷',
          };

          return `${codes[data.countryCode]} ${data.countryCode}`;
        }

        return ''
      }
    },
    {
      Header: 'Date de création',
      accessor: data => {
        if (!!data.createdAt) {
          const date = new Date(data.createdAt);
          const day = date.getDay();
          const month = date.getMonth();
          const year = date.getFullYear();

          return `${day}/${month}/${year}`;
        }

        return ''
      },
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchUsers();

      if (fetchedUsers.length < 15) {
        for (let i = 0; i < 15; i++) {
          if (!fetchedUsers[i]) {
            fetchedUsers.push({ email: '' });
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

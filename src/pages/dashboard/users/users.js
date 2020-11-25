import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';
import Table from '../../../components/dashboard/Table';

import { fetchUsers } from '../../../services/users';

import './users.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const DashbboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [timeFilter, setTimeFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const columns = [
    {
      text: 'Prénom',
      dataField: 'firstname',
      sort: true,
    },
    {
      text: 'Nom',
      dataField: 'lastname',
      sort: true,
    },
    {
      text: 'Email',
      dataField: 'email',
      sort: true,
      headerStyle: () => {
        return { width: '300px' };
      },
    },
    {
      text: 'Phone',
      dataField: 'phone',
      sort: true,
      headerStyle: () => {
        return { width: '180px' };
      },
    },
    {
      text: 'Paniers payés',
      dataField: 'qtyPaidBaskets',
      sort: true,
      headerStyle: () => {
        return { width: '120px' };
      },
    },
    {
      text: 'Date de création',
      dataField: 'createdAt',
      sort: true,
      sortFunc: (a, b, order) => {
        if (order === 'asc') {
          return (new Date(b) > new Date(a)) ? 1 : -1;
        }

        return (new Date(b) < new Date(a)) ? -1 : 1;
      },
      headerStyle: () => {
        return { width: '180px' };
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, [timeFilter]);

  const handleFilterClicked = (type) => {
    setIsLoading(type);
    setTimeFilter(type);
  };

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
            <div>
              <button onClick={() => handleFilterClicked('month')}>
                {
                  isLoading === 'month' ?
                  <ClipLoader
                    css={spinnerStyle}
                    sizeUnit={'px'}
                    size={25}
                    color={'#000'}
                    loading={true}
                  /> :
                  'Ce mois-ci'
                }
              </button>
              <button onClick={() => handleFilterClicked('week')}>
                {
                  isLoading === 'week' ?
                  <ClipLoader
                    css={spinnerStyle}
                    sizeUnit={'px'}
                    size={25}
                    color={'#000'}
                    loading={true}
                  /> :
                  'Cette semaine'
                }
              </button>
              <button onClick={() => handleFilterClicked('today')}>
                {
                  isLoading === 'today' ?
                  <ClipLoader
                    css={spinnerStyle}
                    sizeUnit={'px'}
                    size={25}
                    color={'#000'}
                    loading={true}
                  /> :
                  'Aujourd\'hui'
                }
              </button>
            </div>
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

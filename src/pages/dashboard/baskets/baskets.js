import React, { useEffect, useState } from 'react';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';
import Table from '../../../components/dashboard/Table';

import { fetchBaskets } from '../../../services/baskets';

import './baskets.scss';

const DashbboardBaskets = () => {
  const [baskets, setBaskets] = useState([]);

  const columns = [
    {
      Header: 'Référence courte',
      accessor: data => {
        if (!!data.orderRef) {
          return data.orderRef.substr(0, 13);
        }

        return ''
      },
    },
    {
      Header: 'Type',
      accessor: 'name',
    },
    {
      Header: 'Email utilisateur',
      accessor: 'userEmail',
    },
    {
      Header: 'Prix',
      accessor: 'price',
    },
    {
      Header: 'Tél. Destinataire',
      accessor: 'recipientPhone',
    },
    {
      Header: 'Payé',
      accessor: data => {
        if (!!data.paid && typeof data.paid !== 'undefined') {
          return '✅';
        } else if (!data.paid && typeof data.paid !== 'undefined') {
          return '❌';
        }

        return '';
      },
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
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const fetchedBaskets = await fetchBaskets();

      if (fetchedBaskets.length < 10) {
        for (let i = 0; i < 10; i++) {
          if (!fetchedBaskets[i]) {
            fetchedBaskets.push({ email: '' });
          }
        }
      }

      setBaskets(fetchedBaskets);
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-baskets'>
          <h1>Paniers</h1>
          <div className='baskets'>
            <Table data={baskets} columns={columns} />
          </div>
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardBaskets;

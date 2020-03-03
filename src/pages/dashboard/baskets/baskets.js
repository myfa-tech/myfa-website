import React, { useEffect, useState } from 'react';
import { Type } from 'react-bootstrap-table2-editor';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';
import Table from '../../../components/dashboard/Table';

import { fetchBaskets, updateBasketById } from '../../../services/baskets';

import './baskets.scss';

const getRelation = (code) => {
  const relations = {
    AM: 'Ami(e)',
    CO: 'Conjoint(e)',
    EN: 'Enfant',
    FR: 'Frère',
    GM: 'Grand-Mère',
    GP: 'Grand-Père',
    ME: 'Mère',
    NE: 'Neveu',
    NI: 'Nièce',
    ON: 'Oncle',
    PE: 'Père',
    SO: 'Soeur',
    TA: 'Tante',
    AU: 'Autre',
  }

  return relations[code] || code;
};

const getDeliveryZone = (code) => {
  const zones = {
    '2PL': '2 Plateaux',
    'AB': 'Abobo',
    'AD': 'Adjamé',
    'AT': 'Attécoubé',
    'CO': 'Cocody',
    'KO': 'Koumassi',
    'MA': 'Marcory',
    'PL': 'Plateau',
    'PB': 'Port-Bouet',
    'RI': 'Riviera',
    'TR': 'Treichville',
    'YO': 'Yopougon',
  }

  return zones[code] || code;
}

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const isPendingBasketOverOneHour = (row) => {
  // getTime give time in milliseconds - we want diff in hours
  let hoursDiff = (new Date().getTime() - new Date(row.createdAt).getTime())/(1000*3600);

  return !!(row.status === 'pending' && hoursDiff > 1);
};

const DashbboardBaskets = () => {
  const [baskets, setBaskets] = useState([]);
  const [timeFilter, setTimeFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    fetchData();
  }, [timeFilter]);

  const handleFilterClicked = (type) => {
    setIsLoading(type);
    setTimeFilter(type);
  };

  const rowClasses = (row, rowIndex) => {
    if (isPendingBasketOverOneHour(row)) {
      return 'warning';
    }
  };

  const columns = [
    {
      text: 'Référence',
      dataField: 'orderRef',
      editable: false,
      headerStyle: () => {
        return { width: '90px' };
      }
    },
    {
      text: 'Type',
      dataField: 'name',
      editable: false,
      headerStyle: () => {
        return { width: '80px' };
      }
    },
    {
      text: '@ utilisateur',
      dataField: 'userEmail',
      editable: false,
      headerStyle: () => {
        return { width: '200px' };
      }
    },
    {
      text: 'Destinataire',
      dataField: 'recipient.label',
      formatter: (cell, row, rowIndex) => {
        return `${row.recipient.firstname} ${row.recipient.lastname} (${getRelation(row.recipient.relation)})`;
      },
      editable: false,
      headerStyle: () => {
        return { width: '250px' };
      }
    },
    {
      text: 'Tél. Destin. ✏️',
      dataField: 'recipient.phone',
      headerStyle: () => {
        return { width: '120px' };
      }
    },
    {
      text: 'Zone ✏️',
      dataField: 'recipient.zone',
      formatter: (cell, row, rowIndex) => {
        return getDeliveryZone(row.recipient.zone);
      },
      editor: {
        type: Type.SELECT,
        options: [
          { value: '2PL', label:  '2 Plateaux' },
          { value: 'AB',  label: 'Abobo' },
          { value: 'AD',  label: 'Adjamé' },
          { value: 'AT',  label: 'Attécoubé' },
          { value: 'CO',  label: 'Cocody' },
          { value: 'KO',  label: 'Koumassi' },
          { value: 'MA',  label: 'Marcory' },
          { value: 'PL',  label: 'Plateau' },
          { value: 'PB',  label: 'Port-Bouet' },
          { value: 'RI',  label: 'Riviera' },
          { value: 'TR',  label: 'Treichville' },
          { value: 'YO',  label: 'Yopougon' },
        ],
      },
      headerStyle: () => {
        return { width: '110px' };
      }
    },
    {
      text: 'Statut ✏️',
      dataField: 'status',
      formatter: (cell, row, rowIndex) => {
        if (row.status === 'pending') {
          return 'paiement 🏃🏽‍♀️';
        } else if (row.status === 'paid') {
          return 'payé 💰';
        } else if (row.status === 'preparing') {
          return 'préparation 🧺';
        } else if (row.status === 'delivered') {
          return 'livré ✅';
        } else if (row.status === 'canceled') {
          return 'canceled ❌';
        }
      },
      editor: {
        type: Type.SELECT,
        options: [{
          value: 'pending',
          label: 'paiement 🏃🏽‍♀️',
        }, {
          value: 'paid',
          label: 'payé 💰',
        }, {
          value: 'preparing',
          label: 'préparation 🧺',
        }, {
          value: 'delivered',
          label: 'livré ✅',
        }, {
          value: 'canceled',
          label: 'annulé ❌',
        }],
      },
      headerStyle: () => {
        return { width: '100px' };
      }
    },
    {
      text: 'Création',
      editable: false,
      formatter: (cell, row, rowIndex) => {
        return new Date(row.createdAt).toLocaleDateString('fr-FR')
      },
      dataField: 'createdAt',
      sort: true
    },
    {
      text: 'Livraison',
      editable: false,
      formatter: (cell, row, rowIndex) => {
        return row.deliveredAt ? new Date(row.deliveredAt).toLocaleDateString('fr-FR') : '';
      },
      dataField: 'deliveredAt',
      sort: true
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let fetchedBaskets = await fetchBaskets(timeFilter);

    if (fetchedBaskets.length < 10) {
      for (let i = 0; i < 10; i++) {
        if (!fetchedBaskets[i]) {
          fetchedBaskets.push({ _id: i, email: '' });
        }
      }
    }

    setBaskets(fetchedBaskets);
    setIsLoading(null);
  };

  const saveCell = async (oldValue, newValue, row, column) => {
    if (!!newValue) {
      await updateBasketById(row._id, { [column.dataField]: newValue });
      fetchData();
    }
  };

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-baskets'>
          <h1>
            <span>Paniers</span>
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
          </h1>
          <div className='baskets'>
            <Table editable={true} data={baskets} columns={columns} rowClasses={rowClasses} onSaveCell={saveCell} />
          </div>
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardBaskets;

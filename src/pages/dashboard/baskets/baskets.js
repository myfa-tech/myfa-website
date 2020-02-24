import React, { useEffect, useState } from 'react';
import { Type } from 'react-bootstrap-table2-editor';

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

const DashbboardBaskets = () => {
  const [baskets, setBaskets] = useState([]);

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
    let fetchedBaskets = await fetchBaskets();

    if (fetchedBaskets.length < 10) {
      for (let i = 0; i < 10; i++) {
        if (!fetchedBaskets[i]) {
          fetchedBaskets.push({ _id: i, email: '' });
        }
      }
    }

    setBaskets(fetchedBaskets);
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
          <h1>Paniers</h1>
          <div className='baskets'>
            <Table editable={true} data={baskets} columns={columns} onSaveCell={saveCell} />
          </div>
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardBaskets;

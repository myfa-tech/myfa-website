import React, { useEffect, useState } from 'react';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';
import Table from '../../../components/dashboard/Table';

import { fetchBaskets } from '../../../services/baskets';

import './baskets.scss';

const getRelation = (code) => {
  const relations = {
    AM: 'Ami(e)',
    CO: 'Conjoint(e)',
    EN: 'Enfant',
    FR: 'Frère',
    GM: 'Grand',
    GP: 'Grand',
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
      Header: 'Numéro',
      accessor: data => {
        return data.count || '';
      },
    },
    {
      Header: 'Référence',
      accessor: data => {
        return data.orderRef || '';
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
      Header: 'Destinataire',
      accessor: data => {
        return data.recipient ? `${data.recipient.firstname} ${data.recipient.lastname} (${getRelation(data.recipient.relation)})` : '';
      },
    },
    {
      Header: 'Tél. Destinataire',
      accessor: 'recipient.phone',
    },
    {
      Header: 'Zone de livraison',
      accessor: data => {
        return data.recipient ? getDeliveryZone(data.recipient.zone) : '';
      },
    },
    {
      Header: 'Statut',
      accessor: data => {
        if (data.status === 'pending') {
          return 'paiement 🏃🏽‍♀️';
        } else if (data.status === 'paid') {
          return 'payé 💰';
        } else if (data.status === 'preparing') {
          return 'en préparation 🧺';
        } else if (data.status === 'delivered') {
          return 'livré ✅';
        }

        return '';
      },
    },
    {
      Header: 'Date de création',
      accessor: data => {
        if (!!data.createdAt) {
          const date = new Date(data.createdAt);

          return date.toLocaleDateString('fr-FR');
        }

        return '';
      },
    },
    {
      Header: 'Date de livraison',
      accessor: data => {
        if (!!data.deliveredAt) {
          const date = new Date(data.deliveredAt);

          return date.toLocaleDateString('fr-FR');
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

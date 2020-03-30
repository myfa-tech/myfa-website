import React, { useEffect, useState } from 'react';
import { Type } from 'react-bootstrap-table2-editor';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import Typography from '@material-ui/core/Typography';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';
import Table from '../../../components/dashboard/Table';
import PeopleInfoPopover from '../../../components/PeopleInfoPopover';

import { fetchBaskets, updateBasketById } from '../../../services/baskets';

import './baskets.scss';

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
  // getTime gives time in milliseconds - we want diff in hours
  let hoursDiff = (new Date().getTime() - new Date(row.createdAt).getTime())/(1000*3600);

  return !!(row.status === 'pending' && hoursDiff > 1);
};

const isBasketCanceled = (row) => (row.status === 'canceled');

const DashbboardBaskets = () => {
  const [baskets, setBaskets] = useState([]);
  const [timeFilter, setTimeFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [popoverInfo, setPopoverInfo] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

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
    } else if (isBasketCanceled(row)) {
      return 'canceled';
    }
  };

  const handlePeopleInfoPopoverOpen = (event, recipientInfo) => {
    setPopoverInfo(recipientInfo);
    setAnchorEl(event.currentTarget);
  };

  const handlePeopleInfoPopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const columns = [
    {
      text: 'Référence',
      dataField: 'orderRef',
      sort: true,
      editable: false,
      headerStyle: () => {
        return { width: '90px' };
      }
    },
    {
      text: 'Type',
      dataField: 'name',
      editable: false,
      sort: true,
      headerStyle: () => {
        return { width: '80px' };
      }
    },
    {
      text: '@ utilisateur',
      dataField: 'userEmail',
      editable: false,
      sort: true,
      headerStyle: () => {
        return { width: '200px' };
      }
    },
    {
      text: 'Destinataire',
      dataField: 'recipient.label',
      sort: true,
      formatter: (cell, row, rowIndex) => {
        return <Typography
          aria-owns={open ? 'mouse-over-realtive-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={(e) => handlePeopleInfoPopoverOpen(e, row.recipient)}
          onMouseLeave={handlePeopleInfoPopoverClose}
        >
          {row.recipient.firstname} {row.recipient.lastname}
        </Typography>
      },
      editable: false,
      headerStyle: () => {
        return { width: '250px' };
      }
    },
    {
      text: 'Zone ✏️',
      dataField: 'recipient.zone',
      sort: true,
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
          return 'annulé ❌';
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
      },
      sort: true,
    },
    {
      text: 'Création',
      editable: false,
      formatter: (cell, row, rowIndex) => {
        return new Date(row.createdAt).toLocaleDateString('fr-FR')
      },
      dataField: 'createdAt',
      sort: true,
    },
    {
      text: 'Livraison ✏️',
      editable: true,
      formatter: (cell, row, rowIndex) => {
        return row.deliveredAt ? new Date(row.deliveredAt).toLocaleDateString('fr-FR') : '';
      },
      editor: {
        type: Type.DATE,
      },
      dataField: 'deliveredAt',
      sort: true,
    },
    {
      text: 'Commentaire ✏️',
      dataField: 'comment',
      editable: true,
      headerStyle: () => {
        return { width: '150px' };
      },
      formatter: (cell, row, rowIndex) => {
        return row.comment.length >= 15 ? <Typography
          aria-owns={open ? 'mouse-over-comment-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={(e) => handleCommentPopoverOpen(e, row.comment)}
          onMouseLeave={handleCommentPopoverClose}
        >
          {row.comment.substr(0, 15)}...
        </Typography> :
        row.comment
      },
    },
  ];

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
    console.log('saving stuff')
    if (!!newValue) {
      const newBasket = await updateBasketById(row._id, { [column.dataField]: newValue });
      let id = baskets.findIndex(b => b._id === newBasket._id);

      baskets[id] = { ...newBasket };

      setBaskets([...baskets]);
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
        <PeopleInfoPopover
          anchorEl={anchorEl}
          info={popoverInfo}
          open={open}
          handlePopoverClose={handlePeopleInfoPopoverClose}
        />
        <CommentPopover
          anchorEl={commentAnchorEl}
          info={comment}
          open={commentPopoverOpen}
          handlePopoverClose={handleCommentPopoverClose}
        />
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardBaskets;

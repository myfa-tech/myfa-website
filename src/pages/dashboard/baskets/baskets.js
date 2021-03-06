import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import Typography from '@material-ui/core/Typography';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';
import Table from '../../../components/dashboard/Table';
import PeopleInfoPopover from '../../../components/PeopleInfoPopover';
import CommentPopover from '../../../components/CommentPopover';
import BasketItemsPopover from '../../../components/BasketItemsPopover';
import TableSelectEditor from '../../../components/TableSelectEditor';
import NewOrderModal from '../../../components/dashboard/NewOrderModal';

import { fetchBaskets, updateBasketById } from '../../../services/baskets';
import usePopover from '../../../hooks/usePopover';
import useTranslate from '../../../hooks/useTranslate';

import './baskets.scss';

const STATUS_EDITOR_OPTIONS = [{
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
}];

const ZONE_EDITOR_OPTIONS = [
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
];

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

const isBasketDelivered = (row) => (row.status === 'delivered');

const ConfirmChangeStatusModal = ({ showModal, cancelChange, confirmChange }) => {
  return (
    <Modal dialogClassName='modal-90w modal-75w' show={showModal} onHide={cancelChange} id='confirm-change-modal'>
      <Modal.Header closeButton className='header-text'>Supprimer une demande</Modal.Header>
      <Modal.Body>
        <div>
          <p>Etes-vous sûr(e) de vouloir changer le statut ?</p>

          <Row>
            <Col xs={6}>
              <button type='button' className='cancel-button' onClick={cancelChange}>Annuler</button>
            </Col>
            <Col xs={6}>
              <button type='button' className='confirm-button' onClick={confirmChange}>Confirmer</button>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const DashbboardBaskets = () => {
  const [baskets, setBaskets] = useState([]);
  const [timeFilter, setTimeFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [editStatusField, setEditStatusField] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [t] = useTranslate();

  const [
    popoverInfo,
    setPopoverInfo,
    anchorEl,
    setAnchorEl,
    open,
    handlePeopleInfoPopoverOpen,
    handlePeopleInfoPopoverClose,
  ] = usePopover({}, null);
  const [
    popoverComment,
    setPopoverComment,
    popoverCommentAnchorEl,
    setPopoverCommentAnchorEl,
    commentPopoverOpen,
    handleCommentPopoverOpen,
    handleCommentPopoverClose,
  ] = usePopover('', null);
  const [
    popoverItems,
    setPopoverItems,
    popoverItemsAnchorEl,
    setPopoverItemsAnchorEl,
    itemsPopoverOpen,
    handleItemsPopoverOpen,
    handleItemsPopoverClose,
  ] = usePopover([], null);

  useEffect(() => {
    fetchData();
  }, [timeFilter]);

  const handleFilterClicked = (type) => {
    setIsLoading(type);
    setTimeFilter(type);
  };

  const isToday = (someDate) => {
    const today = new Date();
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear();
  };

  const rowClasses = (row, rowIndex) => {
    let classes = '';

    if (isPendingBasketOverOneHour(row)) {
      classes += 'warning ';
    } else if (isBasketCanceled(row)) {
      classes += 'canceled ';
    } else if (isBasketDelivered(row)) {
      classes += 'done ';
    } else {
      classes += 'blank ';
    }

    if (!!row.deliveredAt && row.deliveredAt !== ' ') {
      let dateParts = row.deliveredAt.split('/');
      const date = new Date(dateParts[2], Number(dateParts[0]) - 1, dateParts[1]);

      if (isToday(date)) {
        classes += 'is-delivery-today ';
      }
    }

    return classes;
  };

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
      },
      formatter: (cell, row, rowIndex) => {
        const basket = baskets.find(b => b._id === row._id);
        let items = basket.items || basket.itemsTranslate;

        // Type MYFA and has items and is not an array
        if (basket.name === 'MYFA' && basket.items && !basket.items[0]) {
          items = Object.values(basket.items).reduce((acc, cur) => [...acc, ...(cur.map(item => item.label))], []);
        } else if (basket.name === 'details') {
          items = basket.itemsTranslate.map(it => `${t(it.label)} x ${it.qty}`);
        } else {
          items = basket.itemsTranslate.map(it => `${t(`ingredients.${it.label}`)} x ${it.qty}`);
        }

        return <Typography
          aria-owns={open ? 'mouse-over-items-popover' : undefined}
          aria-haspopup='true'
          onMouseEnter={(e) => handleItemsPopoverOpen(e, items)}
          onMouseLeave={handleItemsPopoverClose}
        >
          {row.name}
        </Typography>
      },
    },
    {
      text: 'Utilisateur',
      dataField: 'user',
      editable: false,
      formatter: (cell, row, rowIndex) => {
        return row.user ? <Typography
          aria-owns={open ? 'mouse-over-realtive-popover' : undefined}
          aria-haspopup='gridtrue'
          onMouseEnter={(e) => handlePeopleInfoPopoverOpen(e, row.user)}
          onMouseLeave={handlePeopleInfoPopoverClose}
        >
           {row.user.firstname} {row.user.lastname}
        </Typography> : row.userEmail
      },
      sort: true,
      headerStyle: () => {
        return { width: '200px' };
      }
    },
    {
      text: 'Destinataire',
      dataField: 'recipient.label',
      editable: false,
      sort: true,
      formatter: (cell, row, rowIndex) => {
        return <Typography
          aria-owns={open ? 'mouse-over-realtive-popover' : undefined}
          aria-haspopup='gridtrue'
          onMouseEnter={(e) => handlePeopleInfoPopoverOpen(e, row.recipient)}
          onMouseLeave={handlePeopleInfoPopoverClose}
        >
          {row.recipient.firstname} {row.recipient.lastname}
        </Typography>
      },
      headerStyle: () => {
        return { width: '180px' };
      }
    },
    {
      text: 'Zone',
      editable: false,
      dataField: 'recipient.zone',
      sort: true,
      formatter: (cell, row, rowIndex) => {
        return getDeliveryZone(row.recipient.zone);
      },
      headerStyle: () => {
        return { width: '90px' };
      }
    },
    {
      text: 'Statut',
      dataField: 'status',
      editable: false,
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
      headerStyle: () => {
        return { width: '120px' };
      },
      sort: true,
    },
    {
      text: 'Création',
      editable: false,
      headerStyle: () => {
        return { width: '100px' };
      },
      formatter: (cell, row, rowIndex) => {
        return new Date(row.createdAt).toLocaleDateString('fr-FR')
      },
      dataField: 'createdAt',
      sort: true,
      sortFunc: (a, b, order) => {
        if (order === 'asc') {
          return (new Date(b) > new Date(a)) ? 1 : -1;
        }

        return (new Date(b) < new Date(a)) ? 1 : -1;
      },
    },
    {
      text: 'Livraison',
      editable: false,
      headerStyle: () => {
        return { width: '110px' };
      },
      formatter: (cell, row, rowIndex) => {
        return (row.deliveredAt === ' ') ? ' ' : new Date(row.deliveredAt).toLocaleDateString('fr-FR');
      },
      dataField: 'deliveredAt',
      sort: true,
      sortFunc: (a, b, order) => {
        if (order === 'asc') {
          if (a === ' ') {
            return -1;
          } else if (b === ' ') {
            return 1;
          }

          return (new Date(b) < new Date(a)) ? 1 : -1;
        }

        if (a === ' ') {
          return 1;
        } else if (b === ' ') {
          return -1;
        }

        return (new Date(b) > new Date(a)) ? 1 : -1;
      },
    },
    {
      text: 'Message',
      dataField: 'message',
      editable: false,
      headerStyle: () => {
        return { width: '75px' };
      },
      formatter: (cell, row, rowIndex) => (
        <p className='message-container'>{row.message}</p>
      ),
    },
    {
      text: 'Comment',
      dataField: 'comment',
      editable: false,
      headerStyle: () => {
        return { width: '110px' };
      },
      formatter: (cell, row, rowIndex) => (
        <p className='comment-container'>{row.comment}</p>
      ),
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

  const toggleShowConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);

    if (!!showConfirmModal && typeof window !== 'undefined') {
      setEditStatusField(null);
      window.location.reload();
    }
  };

  const confirmChangeStatus = async () => {
    const { row, column, newValue } = editStatusField;

    const newBasket = await updateBasketById(row._id, { [column.dataField]: newValue });
    const newBaskets = baskets.map(b => (b._id === row._id) ? newBasket : b);

    setBaskets(newBaskets);
    toggleShowConfirmModal();
  };

  const saveCell = async (oldValue, newValue, row, column) => {
    if (!!newValue) {
      let newBasket = {};

      if (column.dataField === 'status') {
        setEditStatusField({ row, newValue, column });
        toggleShowConfirmModal();
        return;
      } else if (column.dataField.includes('.')) {
        const parts = column.dataField.split('.');
        newBasket = await updateBasketById(row._id, { [parts[0]]: { ...row[parts[0]], [parts[1]]: newValue } });
      } else {
        newBasket = await updateBasketById(row._id, { [column.dataField]: newValue });
      }

      const newBaskets = baskets.map(b => (b._id === row._id) ? newBasket : b);

      setBaskets(newBaskets);
    }
  };

  const toggleShowNewOrderModal = () => {
    setShowNewOrderModal(!showNewOrderModal);
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

            <button className='add-order' onClick={toggleShowNewOrderModal}>Ajouter une commande</button>
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
          anchorEl={popoverCommentAnchorEl}
          comment={popoverComment}
          open={commentPopoverOpen}
          handlePopoverClose={handleCommentPopoverClose}
        />
        <BasketItemsPopover
          anchorEl={popoverItemsAnchorEl}
          items={popoverItems}
          open={itemsPopoverOpen}
          handlePopoverClose={handleItemsPopoverClose}
        />
        <ConfirmChangeStatusModal
          showModal={showConfirmModal}
          cancelChange={toggleShowConfirmModal}
          confirmChange={confirmChangeStatus}
        />
        {showNewOrderModal && <NewOrderModal showModal={showNewOrderModal} toggleModal={toggleShowNewOrderModal} />}
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardBaskets;

import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import Typography from '@material-ui/core/Typography';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';
import Table from '../../../components/dashboard/Table';
import PeopleInfoPopover from '../../../components/PeopleInfoPopover';
import TableSelectEditor from '../../../components/TableSelectEditor';
import Modal from '../../../components/Modal';

import fetchRequests from '../../../services/requests/fetchRequests';
import updateRequest from '../../../services/requests/updateRequest';
import usePopover from '../../../hooks/usePopover';

import './requests.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

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

const isRequestCanceled = (row) => (row.status === 'canceled');

const isRequestDelivered = (row) => (row.status === 'delivered');

const ConfirmChangeStatusModal = ({ showModal, cancelChange, confirmChange }) => {
  return (
    <Modal isOpen={showModal} closeModal={cancelChange} id='confirm-change-modal'>
      <h2 className='header-text'>Supprimer une demande</h2>
      <div>
        <p>Etes-vous sûr(e) de vouloir changer le statut ?</p>

        <div className='btns-container'>
          <button type='button' className='cancel-button' onClick={cancelChange}>Annuler</button>
          <button type='button' className='confirm-button' onClick={confirmChange}>Confirmer</button>
        </div>
      </div>
    </Modal>
  );
};

const DashbboardRequests = () => {
  const [requests, setRequests] = useState([]);
  const [timeFilter, setTimeFilter] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editStatusField, setEditStatusField] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [
    popoverInfo,
    setPopoverInfo,
    anchorEl,
    setAnchorEl,
    open,
    handlePeopleInfoPopoverOpen,
    handlePeopleInfoPopoverClose,
  ] = usePopover({}, null);

  const rowClasses = (row, rowIndex) => {
    let classes = '';

    if (isRequestCanceled(row)) {
      classes += 'canceled ';
    } else if (isRequestDelivered(row)) {
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
      text: 'Type',
      editable: false,
      dataField: 'type',
      sort: true,
    },
    {
      text: 'Client',
      editable: false,
      dataField: 'user',
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
    },
    {
      text: 'Contact',
      editable: false,
      dataField: 'contact',
      formatter: (cell, row, rowIndex) => {
        return row.contact ? <Typography
          aria-owns={open ? 'mouse-over-realtive-popover' : undefined}
          aria-haspopup='gridtrue'
          onMouseEnter={(e) => handlePeopleInfoPopoverOpen(e, row.contact)}
          onMouseLeave={handlePeopleInfoPopoverClose}
        >
           {row.contact.firstname} {row.contact.lastname}
        </Typography> : ''
      },
      sort: true,
    },
    {
      text: 'Statut ✏️',
      editable: true,
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
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <TableSelectEditor { ...editorProps } options={STATUS_EDITOR_OPTIONS} value={value} />
      ),
      sort: true,
    },
    {
      text: 'Details',
      dataField: 'details',
      editable: false,
      sort: true,
    },
    {
      text: 'Date de création',
      dataField: 'createdAt',
      editable: false,
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

  const toggleShowConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);

    if (!!showConfirmModal && typeof window !== 'undefined') {
      setEditStatusField(null);
      window.location.reload();
    }
  };

  const saveCell = async (oldValue, newValue, row, column) => {
    if (!!newValue) {
      let newRequest = {};

      if (column.dataField === 'status') {
        setEditStatusField({ row, newValue, column });
        toggleShowConfirmModal();
        return;
      } else if (column.dataField.includes('.')) {
        const parts = column.dataField.split('.');
        newRequest = await updateRequest(row._id, { [parts[0]]: { ...row[parts[0]], [parts[1]]: newValue } });
      } else {
        newRequest = await updateRequest(row._id, { [column.dataField]: newValue });
      }

      const newRequests = requests.map(b => (b._id === row._id) ? newRequest : b);

      setRequests(newRequests);
    }
  };

  const confirmChangeStatus = async () => {
    const { row, column, newValue } = editStatusField;

    const newRequest = await updateRequest(row._id, { [column.dataField]: newValue });
    const newRequests = requests.map(b => (b._id === row._id) ? newRequest : b);

    setRequests(newRequests);
    toggleShowConfirmModal();
  };

  const fetchData = async () => {
    let fetchedRequests = await fetchRequests(timeFilter);

    fetchedRequests = fetchedRequests.map(user => {
      let qtyPaidRequests = 0;
      let date = new Date(user.createdAt);

      if (user.qtyPaidRequests < 3) {
        qtyPaidRequests = `${user.qtyPaidRequests} 👶🏽`;
      } else if (user.qtyPaidRequests < 10) {
        qtyPaidRequests = `${user.qtyPaidRequests} 👩🏽‍🦱`;
      } else {
        qtyPaidRequests = `${user.qtyPaidRequests} 👵🏽`;
      }

      return {
        ...user,
        qtyPaidRequests,
        createdAt: date.toLocaleDateString('fr-FR'),
      };
    });

    if (fetchedRequests.length < 15) {
      for (let i = 0; i < 15; i++) {
        if (!fetchedRequests[i]) {
          fetchedRequests.push({ _id: i, email: '' });
        }
      }
    }

    setRequests(fetchedRequests);
  };

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-requests'>
          <h1>
            <span>Demandes</span>
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
          <div className='requests'>
            <Table editable={true} onSaveCell={saveCell} data={requests} rowClasses={rowClasses} columns={columns} />
          </div>
        </div>
        <PeopleInfoPopover
          anchorEl={anchorEl}
          info={popoverInfo}
          open={open}
          handlePopoverClose={handlePeopleInfoPopoverClose}
        />
        <ConfirmChangeStatusModal
          showModal={showConfirmModal}
          cancelChange={toggleShowConfirmModal}
          confirmChange={confirmChangeStatus}
        />
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardRequests;

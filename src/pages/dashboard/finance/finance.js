import React, { useEffect, useState } from 'react';
import { Type } from 'react-bootstrap-table2-editor';
import { FaRegTrashAlt } from 'react-icons/fa';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';
import Table from '../../../components/dashboard/Table';
import FinanceModal from '../../../components/dashboard/FinanceModal';
import TableSelectEditor from '../../../components/TableSelectEditor';

import { deleteRequestById, fetchRequests, updateRequestById } from '../../../services/finance';

import './finance.scss';
import DeleteRequestModal from '../../../components/dashboard/DeleteRequestModal/DeleteRequestModal';

const STATUS_EDITOR_OPTIONS = [
  { value: 'pending', label:  'En attente' },
  { value: 'pinged',  label: 'Relance' },
  { value: 'accepted',  label: 'Accepté' },
  { value: 'denied',  label: 'Refusé' },
];

const FinancePage = () => {
  const [requests, setRequests] = useState([]);
  const [showFinanceModal, setShowFinanceModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);

  const columns = [
    {
      text: 'Intitulé',
      editable: false,
      dataField: 'label',
    },
    {
      text: 'Prix (€)',
      editable: false,
      dataField: 'price',
    },
    {
      text: 'Qui ?',
      editable: false,
      dataField: 'userEmail',
    },
    {
      text: 'Date de création',
      dataField: 'createdAt',
      editable: false,
      formatter: (cell, row, rowIndex) => {
        return new Date(row.createdAt).toLocaleDateString('fr-FR')
      },
    },
    {
      text: 'Commentaire ✏️',
      dataField: 'comment',
    },
    {
      text: 'Status ✏️',
      dataField: 'status',
      formatter: (cell, row, rowIndex) => {
        if (row.status === 'pending') {
          return <span className='status-pill pending'>En attente</span>;
        } else if (row.status === 'pinged') {
          return <span className='status-pill pinged'>Relance</span>;
        } else if (row.status === 'accepted') {
          return <span className='status-pill accepted'>Accepté</span>;
        } else if (row.status === 'denied') {
          return <span className='status-pill denied'>Refusé</span>;
        }
      },
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <TableSelectEditor { ...editorProps } options={STATUS_EDITOR_OPTIONS} value={value} />
      ),
    },
    {
      text: 'Supprimer',
      editable: false,
      isDummyField: true,
      formatter: (cell, row) => (
        <FaRegTrashAlt
          className='delete-request-button'
          onClick={() => {
            setItemToDelete(row);
            setShowDeleteRequestModal(true);
          }}
        />
      ),
    }
  ];

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, [showFinanceModal, showDeleteRequestModal]);

  const toggleFinanceModal = () => {
    setShowFinanceModal(!showFinanceModal);
  };

  const fetchData = async () => {
    let fetchedRequests = await fetchRequests();

    setRequests(fetchedRequests);
  };

  const toggleDeleteRequestModal = () => {
    setShowDeleteRequestModal(!showDeleteRequestModal);
    setItemToDelete(null);
  }

  const saveCell = async (oldValue, newValue, row, column) => {
    if (!!newValue) {
      const newRequest = await updateRequestById(row._id, { [column.dataField]: newValue });

      const newRequests = requests.map(r => (r._id === row._id) ? newRequest : r);

      setRequests(newRequests);
    }
  };

  const confirmDeleteRequest = async () => {
    await deleteRequestById(itemToDelete._id);
    toggleDeleteRequestModal();
  };

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-finance'>
          <h1><span>Demandes finance</span> <button className='add-request' onClick={toggleFinanceModal}>Ajouter une demande</button></h1>
          <div className='requests'>
            <Table editable={true} data={requests} columns={columns} onSaveCell={saveCell} />
          </div>
        </div>
        {showFinanceModal && <FinanceModal showModal={showFinanceModal} toggleModal={toggleFinanceModal} />}
        {showDeleteRequestModal &&
          <DeleteRequestModal
            confirmDelete={confirmDeleteRequest}
            showModal={showDeleteRequestModal}
            toggleModal={toggleDeleteRequestModal}
            labelToDelete={itemToDelete.label}
          />
        }
      </DashboardShell>
    </DashboardLayout>
  );
};

export default FinancePage;

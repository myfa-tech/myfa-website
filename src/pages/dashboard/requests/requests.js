import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import Typography from '@material-ui/core/Typography';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';
import Table from '../../../components/dashboard/Table';
import PeopleInfoPopover from '../../../components/PeopleInfoPopover';

import fetchRequests from '../../../services/requests/fetchRequests';
import usePopover from '../../../hooks/usePopover';

import './requests.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const DashbboardRequests = () => {
  const [requests, setRequests] = useState([]);
  const [timeFilter, setTimeFilter] = useState(null);
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

  const columns = [
    {
      text: 'Type',
      dataField: 'type',
      sort: true,
    },
    {
      text: 'Client',
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
      text: 'Details',
      dataField: 'details',
      sort: true,
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
    let fetchedRequests = await fetchRequests(timeFilter);

    fetchedRequests = fetchedRequests.map(user => {
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
            <Table data={requests} columns={columns} />
          </div>
        </div>
        <PeopleInfoPopover
          anchorEl={anchorEl}
          info={popoverInfo}
          open={open}
          handlePopoverClose={handlePeopleInfoPopoverClose}
        />
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardRequests;

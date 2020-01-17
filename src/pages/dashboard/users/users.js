import React, { useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table'

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';

import './users.scss';
import { fetchUsers } from '../../../services/users';

const DashbboardUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchUsers();

      if (fetchedUsers.length < 10) {
        for (let i = 0; i < 10; i++) {
          if (!fetchedUsers[i]) {
            fetchedUsers.push({ email: '' });
          }
        }
      }

      setUsers(fetchedUsers);
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-users'>
          <h1>Utilisateurs</h1>
          <Table data={users} />
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

const Table = ({ data }) => {
  const columns = [
    {
      Header: 'Prénom',
      accessor: 'firstname',
    },
    {
      Header: 'Nom',
      accessor: 'lastname',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
    {
      Header: 'Country',
      accessor: data => {
        if (!!data.countryCode) {
          const codes = {
            CIV: '🇨🇮',
            CAM: '🇨🇲',
            SEN: '🇸🇳',
            FRA: '🇫🇷',
          };

          return `${codes[data.countryCode]} ${data.countryCode}`;
        }

        return ''
      }
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
    }
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  return (
    <div className='users'>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DashbboardUsers;

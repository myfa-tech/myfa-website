import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './Table.scss';

const { SearchBar } = Search;

const Table = ({ data, columns, editable, onSaveCell, rowClasses }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <ToolkitProvider
        keyField='_id'
        data={data}
        columns={columns}
        search
      >
        {
          props => (
            <div>
              <SearchBar placeholder='Rechercher' className='search-bar' {...props.searchProps} />

              <BootstrapTable
                {...props.baseProps}
                rowClasses={rowClasses}
                cellEdit={ !!editable ? cellEditFactory({ mode: 'click', blurToSave: true, afterSaveCell: onSaveCell }) : undefined}
              />
            </div>
          )
        }
      </ToolkitProvider>

      <span role='img' aria-label='scroll to top' className='scroll-button' onClick={scrollToTop}>
        🔝
      </span>
    </>
  )
};

export default Table;

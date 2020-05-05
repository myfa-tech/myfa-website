import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';

import useFetchStocks from '../../../hooks/useFetchStocks';

import './stocks.scss';

const DashbboardStocks = () => {
  const [stocks, setStocks] = useFetchStocks([]);

  const getColor = (diff) => diff < 0 ? 'red' : 'green';

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-stocks'>
          <h1>Stocks de produits</h1>
          <div className='stock-items-container'>
            {stocks.map(stock => {
              const diff = stock.have - stock.need;
              const color = getColor(diff);

              return (
                <div className='stock-item-container'>
                  <ListGroup horizontal>
                    <ListGroup.Item>{stock.have}</ListGroup.Item>
                    <ListGroup.Item className={color}>{diff}</ListGroup.Item>
                    <ListGroup.Item>{stock.need}</ListGroup.Item>
                  </ListGroup>
                  <h2>{stock.label}</h2>
                </div>
              )
            })}
          </div>
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

export default DashbboardStocks;

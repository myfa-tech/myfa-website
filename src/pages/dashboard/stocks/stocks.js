import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import DashboardLayout from '../../../components/dashboard/Layout';
import DashboardShell from '../../../components/dashboard/Shell';

import { isFlorianLoggedIn } from '../../../services/auth';
import useFetchStocks from '../../../hooks/useFetchStocks';

import './stocks.scss';

const DashbboardStocks = () => {
  const [stocks, editStocks] = useFetchStocks([]);

  const getColor = (diff) => diff < 0 ? 'red' : 'green';

  const editStock = (stock, adding, index) => {
    stocks[index] = { ...stock, have: stock.have + adding }
    editStocks([...stocks], stocks[index]);
  };

  return (
    <DashboardLayout>
      <DashboardShell>
        <div className='dashboard-stocks'>
          <h1>Stocks de produits</h1>
          <div className='stock-items-container'>
            {stocks.map((stock, index) => {
              const diff = stock.have - stock.need;
              const color = getColor(diff);

              return (
                <div className='stock-item-container'>
                  <div className='counter-container'>
                    {isFlorianLoggedIn() ? <Button variant="secondary" size="sm" onClick={() => editStock(stock, -1, index)}>-</Button> : null}
                    <ListGroup horizontal>
                      <ListGroup.Item>{stock.have}</ListGroup.Item>
                      <ListGroup.Item className={color}>{diff}</ListGroup.Item>
                      <ListGroup.Item>{stock.need}</ListGroup.Item>
                    </ListGroup>
                    {isFlorianLoggedIn() ? <Button variant="secondary" size="sm" onClick={() => editStock(stock, 1, index)}>+</Button> : null}
                  </div>
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

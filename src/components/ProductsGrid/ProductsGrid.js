import React from 'react';

import useTranslate from '../../hooks/useTranslate';

import './ProductsGrid.scss';

import defaultBasketSrc from '../../images/default-basket.png';

const ProductsGrid = ({
  availableProducts,
  onItemClicked,
  shouldProductByHighlighted,
  suppPrice,
  shouldSuppPriceBeDisplayed,
}) => {
  const [t] = useTranslate();

  return (
    <div id='products-grid'>
      {availableProducts.map(product => (
        <div key={product.id} className='ingredient-container' onClick={() => onItemClicked({ ...product })}>
          <img src={product.img || defaultBasketSrc} className={shouldProductByHighlighted(product) ? 'selected' : ''} />
          <div>
            {t(`ingredients.${product.labelTranslate}`)}
            {!!shouldSuppPriceBeDisplayed && shouldSuppPriceBeDisplayed(product) ?
              <p className='supp-prices'>+{suppPrice} €</p> : null
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;

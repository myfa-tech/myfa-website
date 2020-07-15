import React, { lazy, Suspense, useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FaCheck } from 'react-icons/fa';

import ButtonWithLoader from '../../components/ButtonWithLoader';
import SEO from '../../components/seo';
const CartProductModal = lazy(() => import('../../components/CartProductModal'));
import Layout from '../../components/layout';
import SectionLoader from '../../components/SectionLoader';
import MYFAButton from '../../components/Button';

import { fetchProducts } from '../../services/products';
import EventEmitter from '../../services/EventEmitter';
import CartStorage from '../../services/CartStorage';
import UserStorage from '../../services/UserStorage';
import useFetchProductInfo from '../../hooks/useFetchProductInfo';
import getProductDetailsImage from '../../utils/getProductDetailsImage';
import useTranslate from '../../hooks/useTranslate';
import useProductComment from '../../hooks/useProductComment';
import storeBg from '../../images/store-bg.jpg';

import './unique_product.scss';

const QTY_MAX = 10;

const UniqueProductPage = () => {
  const [t] = useTranslate();
  const [product, setProduct] = useFetchProductInfo({});
  const [qty, setQty] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const [showCartProductModal, setShowCartProductModal] = useState(false);
  const [otherProducts, setOtherProducts] = useState([]);
  const { comment, commentError, isCommentSendingLoading, isCommentSent, handleCommentChange, sendComment } = useProductComment('');

  const user = UserStorage.getUser();

  const eventEmitter = new EventEmitter();

  useEffect(() => {
    const asyncFunc = async () => {
      let fetchedProducts = await fetchProducts({ category: product.category });
      fetchedProducts = fetchedProducts.filter(p => p.name !== product.name);

      setOtherProducts([...fetchedProducts]);
    };

    if (!!Object.keys(product).length) {
      asyncFunc();
    }
  }, [product]);

  const goToProduct = (productName) => {
    if (typeof window !== 'undefined') {
      window.location.assign(`/products/${productName}`);
    }
  };

  const addProductToCart = async () => {
    await CartStorage.addProductToCart({ ...product }, qty);
    setIsDone(true);
    toggleCartProductModal();
  };

  const toggleCartProductModal = () => setShowCartProductModal(!showCartProductModal);

  const updateQty = (adding) => {
    let newQty = qty + adding;

    if (newQty > 0 && newQty <= QTY_MAX) {
      setQty(newQty);
    }

    setIsDone(false);
  };

  return !!Object.keys(product).length ? (
    <Layout
      className='unique-product'
      headerBackground={storeBg}
      headerBackgroundPosition='center center'
      headerDescription={t('unique_product.description')}
    >
      <SEO title='Produit' />

      <section id='unique-product'>
        <Row>
          <Col md='4' className='imgs-col'>
            <div className='product-img-container'>
              <div className='images-container'>
                <img src={getProductDetailsImage(product.image)} alt={product.imgAlt} />
              </div>
              <p>{t('unique_product.photo_disclaimer')}</p>
            </div>
          </Col>
          <Col md='8'>
            <h1>{t(product.labelTranslate)}</h1>

            <h2>
              <span className='new-price'>{product.price} € - {product.priceCFA} FCFA</span>
            </h2>

            <p className='description'>{t(product.descriptionTranslate)}</p>

            <div className='qty-container'>
              <h4>{t('unique_product.qty')}</h4>

              <ButtonGroup className='qty-buttons' variant='contained' color='primary' aria-label='contained primary button group'>
                <Button className='qty-button' onClick={() => updateQty(-1)}>-</Button>
                <Button className='qty-display'>{qty}</Button>
                <Button className='qty-button' onClick={() => updateQty(1)}>+</Button>
              </ButtonGroup>

              {qty === QTY_MAX ? <p className='max-qty-msg'>{t('unique_product.max_qty_reached')}</p> : null}

              {isDone ?
                <span className='order-button isDone'>
                  <FaCheck color='#6c6' />
                </span> :
                <button type='button' className='order-button' onClick={addProductToCart}>{t('unique_product.add_to_cart')}</button>
              }
            </div>

            <h3>{t('unique_product.other_products')}</h3>

            <div className='other-products-row'>
              {otherProducts.map(otherProduct => (
                <div key={otherProduct.name} className='product-card' onClick={() => goToProduct(otherProduct.name)}>
                  <img src={getProductDetailsImage(otherProduct.image)} />
                  <h4>{t(otherProduct.labelTranslate)}</h4>
                </div>
              ))}
            </div>

            <div className='comment-form'>
              <h3>{t('unique_product.suggestion_title')}</h3>

              {!!user ?
                <>
                  <TextField
                    type='text'
                    className='full-width form-input big-form-input'
                    variant='outlined'
                    error={commentError}
                    multiline
                    label='Message'
                    placeholder={t('unique_product.suggestion_placeholder')}
                    name='comment'
                    value={comment}
                    onChange={handleCommentChange}
                  />

                  <ButtonWithLoader
                    isLoading={isCommentSendingLoading}
                    label={t('unique_product.suggestion_button')}
                    onClick={sendComment}
                    className='send-comment-button'
                    success={isCommentSent}
                    successLabel={`${t('unique_product.suggestion_button_success')} ✅`}
                  />
                </> :
                <div className='suggestion-login-container'>
                  <MYFAButton
                    onClick={() => eventEmitter.emit('showLogin')}
                    type='button'
                    label={t('unique_product.suggestion_login')}
                  />
                </div>
              }
            </div>
          </Col>
        </Row>

        {showCartProductModal &&
          <Suspense fallback={<SectionLoader />}>
            <CartProductModal
              showCartProductModal={showCartProductModal}
              toggleCartProductModal={toggleCartProductModal}
              product={product}
            />
          </Suspense>
        }
      </section>
    </Layout>
  ) : null;
};

export default UniqueProductPage;

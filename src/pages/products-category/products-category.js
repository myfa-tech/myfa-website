import React, { lazy, Suspense, useState }  from 'react';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import ProductsGrid from '../../components/ProductsGrid';
import SectionLoader from '../../components/SectionLoader';
const CartProductModal = lazy(() => import('../../components/CartProductModal'));

import fruitsImage from '../../images/fruits-basket-bg.jpg';
import grocerySweetImage from '../../images/morning-pack-bg.jpg';
import healthyImage from '../../images/beauty-basket-bg.jpg';
import veggiesImage from '../../images/veggies-bg.jpg';
import grocerySaltyImage from '../../images/grocery-salty-bg.jpg';

import CartStorage from '../../services/CartStorage';
import useTranslate from '../../hooks/useTranslate';
import useFetchProductsByCat from '../../hooks/useFetchProductsByCat';

const ProductsCategory = () => {
  let category = window.location.pathname.split('/details-categories/')[1];
  const [t] = useTranslate();
  const [productForCart, setProductForCart] = useState(null);
	const [showCartProductModal, setShowCartProductModal] = useState(false);
  const [products, setProducts] = useFetchProductsByCat(category);

  const getBgImage = () => {
    if (typeof window !== 'undefined') {
      let cat = window.location.pathname.split('/details-categories/')[1];
      let images = {
        'fruits': fruitsImage,
        'grocery-salty': grocerySaltyImage,
        'grocery-sweet': grocerySweetImage,
        'healthy': healthyImage,
        'veggies': veggiesImage,
      };

      return images[cat];
    }
  };

  const toggleCartProductModal = () => {
		if (!!showCartProductModal) {
			setProductForCart(null);
		}

		setShowCartProductModal(!showCartProductModal);
  };

  const goToProductPage = (productName) => {
    if (typeof window !== 'undefined') {
      window.location.assign(`/products/${productName}`);
    }
  };

  const addProductToCart = async (e, product) => {
    e.stopPropagation();

		await CartStorage.addProductToCart({ ...product });

		setProductForCart(product);
		toggleCartProductModal();
  };

  return (
    <Layout
      className='products-category-page'
      headerBackground={getBgImage()}
      headerDescription={t(`products_category.${category}_title`)}
      headerBackgroundPosition='center center'
    >
      <SEO title='Produits' />

      <div className='products-category-container'>
        <ProductsGrid
          products={products}
          onItemClicked={goToProductPage}
          onItemCartClicked={addProductToCart}
        />
      </div>
      {showCartProductModal &&
				<Suspense fallback={<SectionLoader />}>
					<CartProductModal
						showCartProductModal={showCartProductModal}
						toggleCartProductModal={toggleCartProductModal}
						product={productForCart}
					/>
				</Suspense>
			}
    </Layout>
  );
};

export default ProductsCategory;

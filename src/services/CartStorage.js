
import EventEmitter from './EventEmitter';
import { isUserLoggedIn } from './auth';
import { createCart, deleteSavedCart, getCart, updateCart } from './cart';

const eventEmitter = new EventEmitter();

const addBasketToCart = async (basket, qty = 1) => {
  if (typeof window !== 'undefined') {
    let cart = await getCartFromStorage();
    let isNewCart = false;

    delete basket.availableBases;
    delete basket.availableFruits;
    delete basket.availableVeggies;
    delete basket.availableSauces;
    delete basket.availableSupps;
    delete basket.img;

    if (!cart || !Object.keys(cart).length) {
      isNewCart = true;
      cart = {};
      cart.baskets = [];
      cart.products = { items: [], recipient: null };
    }

    for (let i=0; i<qty; i++) {
      cart.baskets.push(basket);
    }

    if (isUserLoggedIn()) {
      if (isNewCart) {
        await createCart(cart);
      } else {
        await updateCart({ baskets: cart.baskets });
      }
    } else {
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }

    eventEmitter.emit('editCart');

    return cart;
  }

  return {};
};

const addProductToCart = async (product, qty = 1) => {
  if (typeof window !== 'undefined') {
    let cart = {};
    let isNewCart = false;

    if (isUserLoggedIn()) {
      cart = await getCart();
    } else {
      cart = JSON.parse(window.localStorage.getItem('cart'));
    }

    if (!cart || !Object.keys(cart).length) {
      isNewCart = true;
      cart = {};
      cart.baskets = [];
      cart.products = { items: [], recipient: null };
    }

    product.qty = qty;
    product.price = product.price * qty;

    let productIndex = cart.products.items.findIndex(p => p.name === product.name);

    if (productIndex >= 0) {
      cart.products.items[productIndex] = {
        ...cart.products.items[productIndex],
        qty: cart.products.items[productIndex].qty + product.qty,
        price: cart.products.items[productIndex].price + product.price,
      };
    } else {
      cart.products.items.push(product);
    }

    if (isUserLoggedIn()) {
      if (isNewCart) {
        await createCart(cart);
      } else {
        await updateCart({ products: cart.products });
      }
    } else {
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }

    eventEmitter.emit('editCart');

    return cart;
  }

  return {};
};

const editCart = async (cart) => {
  if (isUserLoggedIn()) {
    await updateCart({ ...cart });
  } else {
    window.localStorage.setItem('cart', JSON.stringify({ ...cart }));
  }

  eventEmitter.emit('editCart');
};

const getCartFromStorage = async () => {
  if (typeof window !== 'undefined') {
    let cart = JSON.parse(window.localStorage.getItem('cart'));

    if (isUserLoggedIn()) {
      if (!!cart && (!!cart.baskets || !!cart.products)) {
        await createCart(cart);
        window.localStorage.removeItem('cart');
      }

      cart = await getCart();
    }

    return cart;
  }

  return {};
};

const setCart = (cart = {}) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }

  return cart;
};

const deleteBasketsByType = async (basketTypeToRemove) => {
  if (typeof window !== 'undefined') {
    let cart = await getCartFromStorage();

    let filteredBaskets = cart.baskets.filter(b => b.type !== basketTypeToRemove);

    filteredBaskets.forEach(b => {
      delete b.img;
    });

    if (isUserLoggedIn()) {
      if (filteredBaskets.length === 0) {
        await deleteSavedCart();
      } else {
        await updateCart({ baskets: filteredBaskets });
      }
    } else {
      cart.baskets = filteredBaskets;
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }

    eventEmitter.emit('editCart');
  }
};

const deleteBasketByIndex = async (basketIndex) => {
  if (typeof window !== 'undefined') {
    let cart = await getCartFromStorage();

    cart.baskets.splice(basketIndex, 1);

    cart.baskets.forEach(b => {
      delete b.img;
    });

    if (!cart.baskets.length && !cart.products.items.length) {
      await deleteCart();
      eventEmitter.emit('editCart');
      return;
    }

    await editCart({ ...cart });
    eventEmitter.emit('editCart');
  }
};

const deleteProductByIndex = async (productIndex) => {
  if (typeof window !== 'undefined') {
    let cart = await getCartFromStorage();

    cart.products.items.splice(productIndex, 1);

    if (cart.products.items.length === 0) {
      cart.products.recipient = {};

      if (!cart.baskets.length) {
        await deleteCart();
        eventEmitter.emit('editCart');
        return;
      }
    }

    await editCart(cart);
    eventEmitter.emit('editCart');
  }
};

const deleteCart = async () => {
  if (typeof window !== 'undefined') {
    if (isUserLoggedIn()) {
      await deleteSavedCart();
    } else {
      window.localStorage.removeItem('cart');
    }
  }
};

export default {
  addBasketToCart,
  addProductToCart,
  deleteBasketByIndex,
  deleteProductByIndex,
  deleteBasketsByType,
  deleteCart,
  editCart,
  getCartFromStorage,
  setCart,
};

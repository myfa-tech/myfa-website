
import EventEmitter from './EventEmitter';
import { isUserLoggedIn } from './auth';
import { createCart, deleteSavedCart, getCart, updateCart } from './cart';

const eventEmitter = new EventEmitter();

const addToCart = async (basket, qty = 1) => {
  if (typeof window !== 'undefined') {
    let cart = {};
    let isNewCart = false;

    delete basket.availableBases;
    delete basket.availableFruits;
    delete basket.availableVeggies;
    delete basket.availableSauces;
    delete basket.availableSupps;

    if (isUserLoggedIn()) {
      cart = await getCart();
    } else {
      cart = JSON.parse(window.localStorage.getItem('cart'));
    }

    if (!cart || !Object.keys(cart).length) {
      isNewCart = true;
      cart = {};
      cart.baskets = [];
    }

    for (let i=0; i<qty; i++) {
      cart.baskets.push(basket);
    }

    cart.baskets.forEach(b => {
      delete b.img;
    });

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

const getCartFromStorage = async () => {
  if (typeof window !== 'undefined') {
    let cart = JSON.parse(window.localStorage.getItem('cart'));

    if (isUserLoggedIn()) {
      if (!!cart && !!cart.baskets) {
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
    let cart = {};

    if (isUserLoggedIn()) {
      cart = await getCart();
    } else {
      cart = JSON.parse(window.localStorage.getItem('cart'));
    }

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
  addToCart,
  deleteBasketsByType,
  deleteCart,
  getCartFromStorage,
  setCart,
};

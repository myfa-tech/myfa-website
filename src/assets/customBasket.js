import fruitsLegumesMyfaSrc from '../images/fruits-legumes-myfa.jpg';
import bananaSrc from '../images/banana.png';
import akpiSrc from '../images/akpi.png';
import attiekeSrc from '../images/attieke.png';
import carrotSrc from '../images/carrot.png';
import citronSrc from '../images/citron.png';
import coconutSrc from '../images/coconut.png';
import maggieSrc from '../images/maggie.png';
import fishPasteSrc from '../images/fish-paste.png';
import garlicSrc from '../images/garlic.png';
import gingerSrc from '../images/ginger.png';
import gomboSrc from '../images/gombo.png';
import beansSrc from '../images/beans.png';
import palmOilSrc from '../images/palm-oil.png';
import mangoSrc from '../images/mango.png';
import orangeSrc from '../images/orange.png';
import peanutPasteSrc from '../images/peanut-paste.png';
import pepperSrc from '../images/pepper.png';
import plantainSrc from '../images/plantain.png';
import potatoSrc from '../images/potato.png';
import saltSrc from '../images/salt.png';
import tomatoSrc from '../images/tomato.png';
import whiteOnionSrc from '../images/white-onion.png';
import yamSrc from '../images/yam.png';

const availableBases = [
  { id: 'bapl', type: 'bases', label: 'Bananes plantain', img: plantainSrc },
  { id: 'boat', type: 'bases', label: '2 boules d’attiéké', img: attiekeSrc },
];

const availableFruits = [
  { id: 'bana', type: 'fruits', label: 'Bananes', img: bananaSrc },
  { id: 'noco', type: 'fruits', label: 'Noix de coco', img: coconutSrc },
  { id: 'mang', type: 'fruits', label: 'Mangues', img: mangoSrc },
  { id: 'oran', type: 'fruits', label: 'Oranges', img: orangeSrc },
];

const availableSauces = [
  { id: 'hupa', type: 'sauces', label: 'Huile de palme', img: palmOilSrc },
  { id: 'gomb', type: 'sauces', label: 'Gombos', img: gomboSrc },
  { id: 'oibl', type: 'sauces', label: 'Oignons blancs', img: whiteOnionSrc },
  { id: 'cuep', type: 'sauces', label: 'Cubes d’épices', img: maggieSrc },
  { id: 'popo', type: 'sauces', label: 'Pourdre de poisson', img: fishPasteSrc },
  { id: 'goai', type: 'sauces', label: 'Gousse d’ail', img: garlicSrc },
  { id: 'toma', type: 'sauces', label: 'Tomates', img: tomatoSrc },
  { id: 'citr', type: 'sauces', label: 'Citrons', img: citronSrc },
  { id: 'paar', type: 'sauces', label: 'Pate d’arachide', img: peanutPasteSrc },
  { id: 'seba', type: 'sauces', label: 'Sel baleine', img: saltSrc },
  { id: 'pomo', type: 'sauces', label: 'Poivre moulu', img: pepperSrc },
  { id: 'grak', type: 'sauces', label: 'Graines d’akpi', img: akpiSrc },
  { id: 'gimo', type: 'sauces', label: 'Gingembre moulu', img: gingerSrc },
];

const availableSupps = [
  { id: 'bapl', type: 'supps', label: 'Bananes plantain', img: plantainSrc },
  { id: 'boat', type: 'supps', label: '2 boules d’attiéké', img: attiekeSrc },
  { id: 'bana', type: 'supps', label: 'Bananes', img: bananaSrc },
  { id: 'noco', type: 'supps', label: 'Noix de coco', img: coconutSrc },
  { id: 'mang', type: 'supps', label: 'Mangues', img: mangoSrc },
  { id: 'oran', type: 'supps', label: 'Oranges', img: orangeSrc },
  { id: 'caro', type: 'supps', label: 'Carottes', img: carrotSrc },
  { id: 'igna', type: 'supps', label: 'Ignames', img: yamSrc },
  { id: 'pote', type: 'supps', label: 'Pomme de terre', img: potatoSrc },
  { id: 'oibl', type: 'supps', label: 'Oignons blancs', img: whiteOnionSrc },
  { id: 'hari', type: 'supps', label: 'Haricots verts', img: beansSrc },
  { id: 'gimo', type: 'supps', label: 'Gingembre moulu', img: gingerSrc },
  { id: 'hupa', type: 'supps', label: 'Huile de palme', img: palmOilSrc },
  { id: 'gomb', type: 'supps', label: 'Gombos', img: gomboSrc },
  { id: 'cuep', type: 'supps', label: 'Cubes d’épices', img: maggieSrc },
  { id: 'popo', type: 'supps', label: 'Pourdre de poisson', img: fishPasteSrc },
  { id: 'goai', type: 'supps', label: 'Gousse d’ail', img: garlicSrc },
  { id: 'toma', type: 'supps', label: 'Tomates', img: tomatoSrc },
  { id: 'citr', type: 'supps', label: 'Citrons', img: citronSrc },
  { id: 'paar', type: 'supps', label: 'Pate d’arachide', img: peanutPasteSrc },
  { id: 'seba', type: 'supps', label: 'Sel baleine', img: saltSrc },
  { id: 'pomo', type: 'supps', label: 'Poivre moulu', img: pepperSrc },
  { id: 'grak', type: 'supps', label: 'Graines d’akpi', img: akpiSrc },
];

const availableVeggies = [
  { id: 'pote', type: 'veggies', label: 'Pomme de terre', img: potatoSrc },
  { id: 'oibl', type: 'veggies', label: 'Oignons blancs', img: whiteOnionSrc },
  { id: 'caro', type: 'veggies', label: 'Carottes', img: carrotSrc },
  { id: 'igna', type: 'veggies', label: 'Ignames', img: yamSrc },
  { id: 'hari', type: 'veggies', label: 'Haricots verts', img: beansSrc },
];

const customBasketDetails = {
  name: 'MYFA',
  type: 'myfa',
  label: 'Panier MYFA 🙌🏾',
  homeDesc: 'À vous de le composer !',
  imgAlt: 'panier myfa',
  img: fruitsLegumesMyfaSrc,
  realPrice: 27.99,
  reduction: 7,
  price: 25.99,
  description: 'Avec ce panier, on vous laisse faire la composition qui convient le mieux à vos proches. Vous pouvez y mettre un peu de chaque panier et bien plus encore !',
};

export { availableBases, availableFruits, availableSauces, availableSupps, availableVeggies, customBasketDetails };

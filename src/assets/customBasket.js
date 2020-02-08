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
  { id: 'bapl', label: 'Bananes plantain', img: plantainSrc },
  { id: 'boat', label: '2 boules d’attiéké', img: attiekeSrc },
];

const availableFruits = [
  { id: 'bana', label: 'Bananes', img: bananaSrc },
  { id: 'noco', label: 'Noix de coco', img: coconutSrc },
  { id: 'mang', label: 'Mangues', img: mangoSrc },
  { id: 'oran', label: 'Oranges', img: orangeSrc },
];

const availableSauces = [
  { id: 'hupa', label: 'Huile de palme', img: palmOilSrc },
  { id: 'gomb', label: 'Gombos', img: gomboSrc },
  { id: 'oibl', label: 'Oignons blancs', img: whiteOnionSrc },
  { id: 'cuep', label: 'Cubes d’épices', img: maggieSrc },
  { id: 'popo', label: 'Pourdre de poisson', img: fishPasteSrc },
  { id: 'goai', label: 'Gousse d’ail', img: garlicSrc },
  { id: 'toma', label: 'Tomates', img: tomatoSrc },
  { id: 'citr', label: 'Citrons', img: citronSrc },
  { id: 'paar', label: 'Pate d’arachide', img: peanutPasteSrc },
  { id: 'seba', label: 'Sel baleine', img: saltSrc },
  { id: 'pomo', label: 'Poivre moulu', img: pepperSrc },
  { id: 'grak', label: 'Graines d’akpi', img: akpiSrc },
  { id: 'gimo', label: 'Gingembre moulu', img: gingerSrc },
];

const availableSupps = [
  { id: 'bapl', label: 'Bananes plantain', img: plantainSrc },
  { id: 'boat', label: '2 boules d’attiéké', img: attiekeSrc },
  { id: 'bana', label: 'Bananes', img: bananaSrc },
  { id: 'noco', label: 'Noix de coco', img: coconutSrc },
  { id: 'mang', label: 'Mangues', img: mangoSrc },
  { id: 'oran', label: 'Oranges', img: orangeSrc },
  { id: 'caro', label: 'Carottes', img: carrotSrc },
  { id: 'igna', label: 'Ignames', img: yamSrc },
  { id: 'pote', label: 'Pomme de terre', img: potatoSrc },
  { id: 'oibl', label: 'Oignons blancs', img: whiteOnionSrc },
  { id: 'hari', label: 'Haricots verts', img: beansSrc },
  { id: 'gimo', label: 'Gingembre moulu', img: gingerSrc },
  { id: 'hupa', label: 'Huile de palme', img: palmOilSrc },
  { id: 'gomb', label: 'Gombos', img: gomboSrc },
  { id: 'cuep', label: 'Cubes d’épices', img: maggieSrc },
  { id: 'popo', label: 'Pourdre de poisson', img: fishPasteSrc },
  { id: 'goai', label: 'Gousse d’ail', img: garlicSrc },
  { id: 'toma', label: 'Tomates', img: tomatoSrc },
  { id: 'citr', label: 'Citrons', img: citronSrc },
  { id: 'paar', label: 'Pate d’arachide', img: peanutPasteSrc },
  { id: 'seba', label: 'Sel baleine', img: saltSrc },
  { id: 'pomo', label: 'Poivre moulu', img: pepperSrc },
  { id: 'grak', label: 'Graines d’akpi', img: akpiSrc },
];

const availableVeggies = [
  { id: 'pote', label: 'Pomme de terre', img: potatoSrc },
  { id: 'oibl', label: 'Oignons blancs', img: whiteOnionSrc },
  { id: 'caro', label: 'Carottes', img: carrotSrc },
  { id: 'igna', label: 'Ignames', img: yamSrc },
  { id: 'hari', label: 'Haricots verts', img: beansSrc },
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

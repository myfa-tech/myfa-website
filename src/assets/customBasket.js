import fruitsLegumesMyfaSrc from '../images/fruits-legumes-myfa.jpg';

const availableBases = [
  { id: 'bapl', label: 'Bananes plantain' },
  { id: 'boat', label: '2 boules d’attiéké' },
];

const availableFruits = [
  { id: 'bana', label: 'Bananes' },
  { id: 'noco', label: 'Noix de coco' },
  { id: 'mang', label: 'Mangues' },
  { id: 'oran', label: 'Oranges' },
];

const availableSauces = [
  { id: 'hupa', label: 'Huile de palme' },
  { id: 'gomb', label: 'Gombos' },
  { id: 'oibl', label: 'Oignons blancs' },
  { id: 'cuep', label: 'Cubes d’épices' },
  { id: 'popo', label: 'Pourdre de poisson' },
  { id: 'goai', label: 'Gousse d’ail' },
  { id: 'toma', label: 'Tomates' },
  { id: 'citr', label: 'Citrons' },
  { id: 'paar', label: 'Pate d’arachide' },
  { id: 'seba', label: 'Sel baleine' },
  { id: 'pomo', label: 'Poivre moulu' },
  { id: 'grak', label: 'Graines d’akpi' },
  { id: 'gimo', label: 'Gingembre moulu' },
];

const availableSupps = [
  { id: 'bapl', label: 'Bananes plantain' },
  { id: 'boat', label: '2 boules d’attiéké' },
  { id: 'bana', label: 'Bananes' },
  { id: 'noco', label: 'Noix de coco' },
  { id: 'mang', label: 'Mangues' },
  { id: 'oran', label: 'Oranges' },
  { id: 'caro', label: 'Carottes' },
  { id: 'igna', label: 'Ignames' },
  { id: 'pote', label: 'Pomme de terre' },
  { id: 'oibl', label: 'Oignons blancs' },
  { id: 'hari', label: 'Haricots verts' },
  { id: 'gimo', label: 'Gingembre moulu' },
  { id: 'hupa', label: 'Huile de palme' },
  { id: 'gomb', label: 'Gombos' },
  { id: 'cuep', label: 'Cubes d’épices' },
  { id: 'popo', label: 'Pourdre de poisson' },
  { id: 'goai', label: 'Gousse d’ail' },
  { id: 'toma', label: 'Tomates' },
  { id: 'citr', label: 'Citrons' },
  { id: 'paar', label: 'Pate d’arachide' },
  { id: 'seba', label: 'Sel baleine' },
  { id: 'pomo', label: 'Poivre moulu' },
  { id: 'grak', label: 'Graines d’akpi' },
];

const availableVeggies = [
  { id: 'pote', label: 'Pomme de terre' },
  { id: 'oibl', label: 'Oignons blancs' },
  { id: 'caro', label: 'Carottes' },
  { id: 'igna', label: 'Ignames' },
  { id: 'hari', label: 'Haricots verts' },
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


import fruitsSrc from '../images/fruits-legumes.jpg';
import saucesSrc from '../images/sauces.jpg';
import veggiesSrc from '../images/veggies.jpg';

const baskets = [
  {
    name: 'Fruits',
    type: 'fruits',
    label: 'Panier Fruits 🍌',
    homeDesc: 'Bananes, oranges, noix de coco...',
    imgAlt: 'panier fruits',
    img: fruitsSrc,
    realPrice: 5.99,
    reduction: 20,
    price: 4.99,
    description: 'Le panier Fruits rassemble jusqu\'à 6 kilos de saveurs dont vous pouvez faire profiter vos proches.',
    items: [
      '1kg de bananes',
      '1kg d\'oranges',
      '1 noix de coco',
      '1kg de poires',
      '1kg de mangues ',
      '1kg d\'avocats ',
    ],
  },
  {
    name: 'Légumes',
    type: 'legumes',
    label: 'Panier Légumes 🧅',
    homeDesc: 'Oignons, carottes, Ignames...',
    imgAlt: 'panier légumes',
    img: veggiesSrc,
    realPrice: 11.99,
    reduction: 20,
    price: 9.99,
    description: 'Chez MYFA, nous tenons à mettre en valeur les cultures vivrières qui rentrent dans la consommation locale. Avec ce panier, vous rendez heureux vos proches et les vendeurs/ producteurs avec qui nous sommes en contact direct ! 😉',
    items: [
      '1kg de carottes',
      '1kg de pommes de terre',
      '1kg d\'oignons blancs',
      '1kg d\'ignames',
      '1kg de choux rouges',
      '1kg de haricots verts',
    ],
  },
  {
    name: 'Sauces',
    type: 'sauces',
    label: 'Panier Sauces 🍗🍖',
    homeDesc: 'Poivre, sel, gingembre...',
    imgAlt: 'panier sauces',
    img: saucesSrc,
    realPrice: 23.99,
    reduction: 8,
    price: 0.99, // 21.99,
    description: 'Tout bon plat se doit d\'être accompagné d\'une sauce adéquate. La sauce Arachide ou encore la sauce Djoumgblé... Permettez à vos proches de toutes les réaliser ! 😉',
    items: [
      '1 bouteille d\'huile de palme 1L',
      '1kg de gombos',
      '1kg d\'oignons blancs',
      '1 tablier de 60 cubes d\'épices de 10gr',
      '1kg de piments frais',
      '1kg de tomates',
      '1kg de citrons',
      '70g de graines d\'akpi',
      '425g  de pâte d\'arachide Dakatine',
      '500g de sel Baleine',
      '50g de poivre moulu',
      '30g de gingembre moulu',
      '4 gousses d\'ail',
    ],
  },
]

export default baskets


import fruitsSrc from '../images/fruits.jpg';
import saucesSrc from '../images/sauces.jpg';
import veggiesSrc from '../images/veggies.jpg';


// import fruitsWebPSrc from '../images/fruits.webp';
// import saucesWebPSrc from '../images/sauces.webp';
// import veggiesWebPSrc from '../images/veggies.webp';

const baskets = [
  {
    name: 'Fruits',
    type: 'fruits',
    label: 'Panier Fruits 🍌',
    labelTranslate: 'home_page.baskets.fruits_basket_title',
    homeDesc: 'Bananes, oranges, noix de coco...',
    homeDescTranslate: 'home_page.baskets.fruits_basket_home_description',
    imgAlt: 'panier fruits',
    img: fruitsSrc,
    price: 5.99,
    description: 'Le panier Fruits rassemble jusqu\'à 6 kilos de saveurs dont vous pouvez faire profiter vos proches.',
    descriptionTranslate: 'home_page.baskets.fruits_basket_description',
    items: [
      '1kg de bananes',
      '1kg d\'oranges',
      '1 noix de coco',
      '1 ananas',
      '1kg de mangues ',
      '1kg d\'avocats ',
    ],
    itemsTranslate: [
      '1kg_bananas',
      '1kg_oranges',
      '1_coconut',
      '1_pineapple',
      '1kg_mangos',
      '1kg_avocados',
    ],
  },
  {
    name: 'Légumes',
    type: 'legumes',
    label: 'Panier Légumes 🧅',
    labelTranslate: 'home_page.baskets.vegetables_basket_title',
    homeDesc: 'Oignons, carottes, Ignames...',
    homeDescTranslate: 'home_page.baskets.vegetables_basket_home_description',
    imgAlt: 'panier légumes',
    img: veggiesSrc,
    price: 12.99,
    description: 'Chez MYFA, nous tenons à mettre en valeur les cultures vivrières qui rentrent dans la consommation locale. Avec ce panier, vous rendez heureux vos proches et les vendeurs/ producteurs avec qui nous sommes en contact direct ! 😉',
    descriptionTranslate: 'home_page.baskets.vegetables_basket_description',
    items: [
      '1kg de carottes',
      '1kg de pommes de terre',
      '1kg d\'oignons rouges',
      '1kg d\'ignames',
      '1 choux rouge',
      '400g de haricots verts',
    ],
    itemsTranslate: [
      '1kg_carots',
      '2kg_potatoes',
      '1kg_red_onions',
      '1kg_yams',
      '1_red_cabbage',
      '400g_french_beans',
    ],
  },
  {
    name: 'Sauces',
    type: 'sauces',
    label: 'Panier Sauces 🍗🍖',
    labelTranslate: 'home_page.baskets.sauces_basket_title',
    homeDesc: 'Poivre, sel, gingembre...',
    homeDescTranslate: 'home_page.baskets.sauces_basket_home_description',
    imgAlt: 'panier sauces',
    img: saucesSrc,
    price: 23.99,
    description: 'Tout bon plat se doit d\'être accompagné d\'une sauce adéquate. La sauce Arachide ou encore la sauce Djoumgblé... Permettez à vos proches de toutes les réaliser ! 😉',
    descriptionTranslate: 'home_page.baskets.sauces_basket_description',
    items: [
      '1 bouteille d\'huile de palme 1L',
      '250g de gombos',
      '1kg d\'oignons rouges',
      '1 tablier de 50 cubes d\'épices de 10gr',
      '300g de piments frais',
      '1kg de tomates',
      '1kg de citrons',
      '70g de graines d\'akpi',
      '425g  de pâte d\'arachide Dakatine',
      '500g de sel Baleine',
      '50g de poivre moulu',
      '30g de gingembre moulu',
      '4 gousses d\'ail',
    ],
    itemsTranslate: [
      '1L_palm_oil',
      '250g_gombos',
      '1kg_red_onions',
      '50_maggie_10gr',
      '300g_fresh_chili',
      '1kg_tomatoes',
      '1kg_lime',
      '70g_akpi',
      '425g_peanut_paste',
      '200g_salt',
      '50g_pepper_pouder',
      '30g_ginger_pouder',
      '4_garlics',
    ],
  },
];

export default baskets;

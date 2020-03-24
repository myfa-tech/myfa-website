import myfaSrc from '../images/myfa.jpg';
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
import myfaWebPSrc from '../images/myfa.webp';

const availableBases = [
  { id: 'bapl', type: 'bases', label: 'Bananes plantain (1kg)', labelTranslate: '1kg_plantain', img: plantainSrc },
  { id: 'boat', type: 'bases', label: '2 boules d’attiéké', labelTranslate: '2_attiekes', img: attiekeSrc },
];

const availableFruits = [
  { id: 'bana', type: 'fruits', label: 'Bananes (1kg)', labelTranslate: '1kg_bananas', img: bananaSrc },
  { id: 'noco', type: 'fruits', label: '1 Noix de coco', labelTranslate: '1kg_plantain', img: coconutSrc },
  { id: 'mang', type: 'fruits', label: 'Mangues (1kg)', labelTranslate: '1kg_mangos', img: mangoSrc },
  { id: 'oran', type: 'fruits', label: 'Oranges (1kg)', labelTranslate: '1kg_oranges', img: orangeSrc },
];

const availableVeggies = [
  { id: 'pote', type: 'veggies', label: 'Pomme de terre (2kg)', labelTranslate: '2kg_potatoes', img: potatoSrc },
  { id: 'oibl', type: 'veggies', label: 'Oignons rouges (1kg)', labelTranslate: '1kg_red_onions', img: whiteOnionSrc },
  { id: 'caro', type: 'veggies', label: 'Carottes (1kg)', labelTranslate: '1kg_carots', img: carrotSrc },
  { id: 'igna', type: 'veggies', label: 'Ignames (1kg)', labelTranslate: '1kg_yams', img: yamSrc },
  { id: 'hari', type: 'veggies', label: 'Haricots verts (400g)', labelTranslate: '400g_french_beans', img: beansSrc },
];

const availableSauces = [
  { id: 'hupa', type: 'sauces', label: 'Huile de palme (1btl)', labelTranslate: '1L_palm_oil', img: palmOilSrc },
  { id: 'gomb', type: 'sauces', label: 'Gombos (250g)', labelTranslate: '250g_gombos', img: gomboSrc },
  { id: 'oibl', type: 'sauces', label: 'Oignons rouges (1kg)', labelTranslate: '1kg_red_onions', img: whiteOnionSrc },
  { id: 'cuep', type: 'sauces', label: '50 Cubes d’épices', labelTranslate: '50_maggie_10gr', img: maggieSrc },
  { id: 'popo', type: 'sauces', label: 'Pourdre de poisson (40g)', labelTranslate: '40g_fish_pouder', img: fishPasteSrc },
  { id: 'goai', type: 'sauces', label: '4 Gousses d’ail', labelTranslate: '4_garlics', img: garlicSrc },
  { id: 'toma', type: 'sauces', label: 'Tomates (1kg)', labelTranslate: '1kg_tomatoes', img: tomatoSrc },
  { id: 'citr', type: 'sauces', label: 'Citrons (1kg)', labelTranslate: '1kg_lime', img: citronSrc },
  { id: 'paar', type: 'sauces', label: 'Pate d’arachide (1 pot)', labelTranslate: '425g_peanut_paste', img: peanutPasteSrc },
  { id: 'seba', type: 'sauces', label: 'Sel baleine (200g)', labelTranslate: '200g_salt', img: saltSrc },
  { id: 'pomo', type: 'sauces', label: 'Poivre moulu (50g)', labelTranslate: '50g_pepper_pouder', img: pepperSrc },
  { id: 'grak', type: 'sauces', label: 'Graines d’akpi (70g)', labelTranslate: '70g_akpi', img: akpiSrc },
  { id: 'gimo', type: 'sauces', label: 'Gingembre moulu (30g)', labelTranslate: '30g_ginger_pouder', img: gingerSrc },
];

const availableSupps = [
  { id: 'bapl', type: 'supps', label: 'Bananes plantain (1kg)', labelTranslate: '1kg_plantain', img: plantainSrc },
  { id: 'boat', type: 'supps', label: '2 boules d’attiéké', labelTranslate: '2_attiekes', img: attiekeSrc },
  { id: 'bana', type: 'supps', label: 'Bananes (1kg)', labelTranslate: '1kg_bananas', img: bananaSrc },
  { id: 'noco', type: 'supps', label: '1 Noix de coco', labelTranslate: '1_coconut', img: coconutSrc },
  { id: 'mang', type: 'supps', label: 'Mangues (1kg)', labelTranslate: '1kg_mangos', img: mangoSrc },
  { id: 'oran', type: 'supps', label: 'Oranges (1kg)', labelTranslate: '1kg_oranges', img: orangeSrc },
  { id: 'caro', type: 'supps', label: 'Carottes (1kg)', labelTranslate: '1kg_carots', img: carrotSrc },
  { id: 'igna', type: 'supps', label: 'Ignames (1kg)', labelTranslate: '1kg_yams', img: yamSrc },
  { id: 'pote', type: 'supps', label: 'Pommes de terre (2kg)', labelTranslate: '2kg_potatoes', img: potatoSrc },
  { id: 'oibl', type: 'supps', label: 'Oignons rouges (1kg)', labelTranslate: '1kg_red_onions', img: whiteOnionSrc },
  { id: 'hari', type: 'supps', label: 'Haricots verts (400g)', labelTranslate: '400g_french_beans', img: beansSrc },
  { id: 'gimo', type: 'supps', label: 'Gingembre moulu (30g)', labelTranslate: '30g_ginger_pouder', img: gingerSrc },
  { id: 'hupa', type: 'supps', label: 'Huile de palme (1btl)', labelTranslate: '1L_palm_oil', img: palmOilSrc },
  { id: 'gomb', type: 'supps', label: 'Gombos (250g)', labelTranslate: '250g_gombos', img: gomboSrc },
  { id: 'cuep', type: 'supps', label: '50 Cubes d’épices', labelTranslate: '50_maggie_10gr', img: maggieSrc },
  { id: 'popo', type: 'supps', label: 'Pourdre de poisson (40g)', labelTranslate: '40g_fish_pouder', img: fishPasteSrc },
  { id: 'goai', type: 'supps', label: '4 Gousses d’ail', labelTranslate: '4_garlics', img: garlicSrc },
  { id: 'toma', type: 'supps', label: 'Tomates (1kg)', labelTranslate: '1kg_tomatoes', img: tomatoSrc },
  { id: 'citr', type: 'supps', label: 'Citrons (1kg)', labelTranslate: '1kg_lime', img: citronSrc },
  { id: 'paar', type: 'supps', label: 'Pate d’arachide (1 pot)', labelTranslate: '425g_peanut_paste', img: peanutPasteSrc },
  { id: 'seba', type: 'supps', label: 'Sel baleine (200g)', labelTranslate: '200g_salt', img: saltSrc },
  { id: 'pomo', type: 'supps', label: 'Poivre moulu (50g)', labelTranslate: '50g_pepper_pouder', img: pepperSrc },
  { id: 'grak', type: 'supps', label: 'Graines d’akpi (70g)', labelTranslate: '70g_akpi', img: akpiSrc },
];

const customBasketDetails = {
  name: 'MYFA',
  type: 'myfa',
  label: 'Panier MYFA 🙌🏾',
  labelTranslate: 'home_page.baskets.custom_basket_title',
  homeDesc: 'À vous de le composer !',
  homeDescTranslate: 'home_page.baskets.custom_basket_home_description',
  imgAlt: 'panier myfa',
  img: myfaSrc,
  realPrice: 27.99,
  reduction: 7,
  price: 25.99,
  description: 'Avec ce panier, on vous laisse faire la composition qui convient le mieux à vos proches. Vous pouvez y mettre un peu de chaque panier et bien plus encore !',
  descriptionTranslate: 'home_page.baskets.custom_basket_description',
};

export { availableBases, availableFruits, availableSauces, availableSupps, availableVeggies, customBasketDetails };

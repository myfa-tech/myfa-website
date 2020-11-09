import React from 'react';

import SEO from '../../components/seo';
import Layout from '../../components/Layout';
import FadeInAccordion from '../../components/FadeInAccordion/FadeInAccordion';

import useTranslate from '../../hooks/useTranslate';

import './faq.scss';

const FaqPage = () => {
  const questions = [
    {
      title: "Myfa, c'est quoi ?",
      content: "MYFA, c'est le tiers de confiance de la diaspora Ivoirienne. Grâce à MYFA, faites parvenir du ravitaillement alimentaire à vos proches. Courses au détails, packs pré-composés (cartons), paniers pour le plaisir d'offrir, nous garantissons des produits le plus souvent locaux et bons.",
    },
    {
      title: "Comment se fait la sélection des produits ?",
      content: "Nous travaillons le plus possible avec des producteurs locaux afin de vous proposer des produits frais et bons. Pour les produits non frais, nous sommes en partenariat avec de grandes surfaces.",
    },
    {
      title: "Le transit se fait-il depuis la France jusqu'en Côte d'Ivoire ?",
      content: "Non. La composition et l'acheminement des commandes se font directement en Côte d'Ivoire. Seul l'acte d'achat se fait sur le site, où que vous soyez.",
    },
    {
      title: "Est-il possible de se faire livrer dans mon secteur ?",
      content: "Actuellement, les livraisons sont réalisées dans les 12 quartiers composant la ville d'Abidjan. Votre secteur n'en fait pas partie ? Faites le nous savoir. Nous souhaitons élargir notre zone de livraison.",
    },
    {
      title: "Qui effectue la livraison ?",
      content: "Pour la livraison, nous passons par un prestataire de service qui se déplace jusqu'au lieu de livraison.",
    },
    {
      title: "Quels sont les moyens de paiement acceptés ?",
      content: "Les cartes de crédit (Visa, Visa Débit, MasterCard, American Express) sont acceptées en ligne.",
    },
    {
      title: "Puis-je utiliser MYFA si je me trouve en Côte d'Ivoire ?",
      content: "MYFA a pour coeur de cible la diaspora Ivoirienne. Cependant, il est tout à fait possible de réaliser un achat en étant en Côte d'ivoire. Les prix sont également affichés en FCFA.",
    },
    {
      title: "Pouvons nous payer en espèce à réception de la commande ?",
      content: "Le paiement en espèce n'est pas disponible, puisqu'il est réalisable sur le site internet.",
    },
    {
      title: "Comment utiliser un code promo ?",
      content: "Dès réception d'un code promo, il vous suffit de le renseigner au moment du paiement. La réduction sera appliquée.",
    },
  ];

  return (
    <Layout className='faq' color='green'>
      <SEO title='FAQ' />

      <div id='faq'>
        <div className='title-container'>
          <h2>Questions fréquentes</h2>
          <h3>Trouvez ici les réponses aux questions fréquemment posées sur le fonctionnement de MYFA. Si vous ne trouvez pas ce qu’il vous faut, n’hésitez pas à nous contacter sur whatsapp au <a href='https://wa.me/22584215154'>+22584215154</a> ou directement à l'adresse <a href='mailto:infos@myfa.fr'>infos@myfa.fr</a>.</h3>
        </div>

        <div className='questions-container'>
          {questions.map(q => (
            <FadeInAccordion title={q.title} content={q.content} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage;

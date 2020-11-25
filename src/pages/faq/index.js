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
      content: "MYFA, c'est le tiers de confiance de la diaspora Ivoirienne. Grâce à MYFA, faites réaliser des prestations sur place, pour vous ou pour vos proches. Avec l'accès au tableau de bord depuis votre espace client, suivez de près vos dépenses réalisées.",
    },
    {
      title: "La prestation que je souhaite n'est pas proposée par MYFA",
      content: "Dans tous les cas, après chaque envoi de formulaire nous vous contactons pour en savoir plus sur la prestation à réaliser : à l'issue de cet appel, vous saurez si votre souhait est réalisable.",
    },
    {
      title: "Est-il possible de se faire livrer dans mon secteur ?",
      content: "Actuellement, les livraisons sont réalisées dans les 12 quartiers composant la ville d'Abidjan. Votre secteur n'en fait pas partie ? Faites le nous savoir. Nous souhaitons élargir notre zone de livraison.",
    },
    {
      title: "Quels sont les moyens de paiement acceptés ?",
      content: "Les cartes de crédit (Visa, Visa Débit, MasterCard, American Express) sont acceptées en ligne. Vous pouvez également régler vos devis grâce à votre porte feuille MYFA, que vous pouvez recharger à tout moment.",
    },
    {
      title: "Puis-je utiliser MYFA si je me trouve en Côte d'Ivoire ?",
      content: "MYFA a pour coeur de cible la diaspora Ivoirienne. Cependant, il est tout à fait possible de réaliser un achat en étant en Côte d'ivoire. Les prix sont également affichés en FCFA.",
    },
    {
      title: "Comment utiliser un code promo ?",
      content: "Les périodes de promotions seront communiquées, l'application de chaque code promo se retrouvera d'office sur votre devis.",
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

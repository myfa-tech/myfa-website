import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share';
import SEO from '../../components/seo';

import Layout from '../../components/layout';
import './articles.scss';

import florianSrc from '../../images/florian.png';

const Article = (props) => (
  <Layout>
    <SEO
      title="En plein confinement, je trouve un emploi"
      description="De cette Pandémie Covid-19 qui sévit dans le monde entier, plusieurs entreprises sont en baisse d’activité. Le confinement étant de rigueur dans la plupart des pays, est née une crise financière et seules quelques grandes entreprises arrivent à stabiliser leur activité économique."
      type="article"
      url="https://www.myfa.fr/articles/profiter-confinement-ameliorer-startup"
      keywords="panier, courses, diaspora, click, collect, cote, ivoire, cameroun, blog, article, confinement, améliorer, site, startup, test-and-learn"
    />
    <Container className='article-container'>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>Comment profiter du confinement pour améliorer le site de ma startup ?</h1>

          <div className='author'>
            <img src={florianSrc} alt='florian' />
            <div>
              <span>Florian Adonis</span>
              <span className='date'>{moment.utc(1587127098339).format('D MMM YYYY')}</span>
            </div>
          </div>

          <p>
            En règle générale, je n’utilise que très peu de citations dans mes écrits, mais
            ces quelques mots de Bruce Lee me semblaient adéquats à la situation mondiale actuelle :
          </p>

          <p className='citation'>
            Notez que l’arbre le plus rigide se fissure plus facilement, tandis que le bambou ou
            le saule survit en pliant avec le vent. -- Bruce Lee
          </p>

          <p>
            Il y a quelques jours, en raison du Covid-19, nos services de livraison de paniers ont été perturbés. Les
            contacts entre les personnes devant être réduits à leur strict minimum, nous avons pris cette décision lourde de
            conséquences, avec la volonté de revenir plus forts, une fois la tempête passée.
          </p>

          <p>
            Chez MYFA, "ralentissement des livraisons" ne rime pas avec "arrêt des activités", loin de là. Nous
            avons pris contact avec des acteurs importants de la scène ivoirienne, intégré une nouvelle personne à
            l’équipe, et prévoyons d’en intégrer une seconde. Nous vous en dirons plus, dans les semaines à venir.
          </p>

          <p>
            Aujourd’hui je souhaiterais vous parler du temps que nous gagnons grâce à cette crise, pour améliorer
            l’expérience utilisateur sur le site et analyser ce qui fonctionne bien et moins bien lors des différents
            parcours utilisateurs.
          </p>

          <p>
            L'aventure MYFA a débuté avec du test-and-learn. Les fonctionnalités présentent sur le site de MYFA (www.myfa.fr),
            relèvent d'un processus méticuleux. Nous commençons par penser à la fonctionnalité; ensuite nous en parlons à
            certains utilisateurs. De ces discussions émanent leurs inquiétudes, leurs impressions quant à cette fonctionnalité,
            puis nous la retravaillons et leur présentons une maquette sur un outils de design graphique. Une fois la fonctionnalité
            validée, nous la développons, et la publions sur une adresse de test pour permettre à l’équipe en interne chez MYFA
            de tester de A à Z cette nouvelle fonctionnalité et détecter d’éventuels bugs créés. Après cette période de tests,
            la fonctionnalité est mise en ligne, mais ce n’est pas la fin du processus. Une fois qu’elle est accessible au grand
            public, nous surveillons, grâce à des outils de monitoring, son taux d’acceptation par les utilisateurs de MYFA. Si
            elle délivre réellement de la valeur ajoutée, nous la gardons. Sinon, elle est retirée au profit d’autres fonctionnalités
            plus utiles.
          </p>

          <p>
            Cette période de confinement nous permet de passer du temps sur les outils de monitoring afin d'analyser
            plus finement les moindres défauts de notre plateforme et les corriger. Chez MYFA, notre ambition est de fournir à
            nos clients une expérience toujours plus proche de la perfection et rendre agréable leurs visites sur notre
            site (www.myfa.fr).
          </p>

          <p>
            Profitons de ces temps difficiles pour nous améliorer et améliorer ce qu’on sait faire de mieux. Dans mon cas,
            il s’agit de la startup que j’ai co-fondée avec <a href='https://www.linkedin.com/in/doris-somon'>Doris</a> et <a href='https://www.linkedin.com/in/alexandre-meschberger-97891012a'>Alexandre</a>,
            mais il existe une myriade de choses que l’on peut faire pour sortir de cette crise encore plus fort.
          </p>

          <p>
            Merci d’avoir pris le temps de lire ces quelques mots, n’hésitez pas à me contacter sur Twitter (<a href='https://twitter.com/florian_adonis'>@florian_adonis</a>),
            où je suis le plus actif, pour discuter test-and-learn et itérations en temps de crise.
          </p>

          <p>Stay safe ✌🏽</p>

          <div>
            <div className='sharing-title'>Partagez</div>
            <FacebookShareButton url={props.location.href} className='sharing-buttons'>
              <FacebookIcon size={32} round={false} borderRadius={6} />
            </FacebookShareButton>
            <TwitterShareButton
              url={props.location.href}
              title='Comment profiter du confinement pour améliorer le site de ma startup ?'
              via='myfa_fr'
              hashtags={['livraison', 'confinement', 'toutpourlamyfa']}
              className='sharing-buttons'
            >
              <TwitterIcon size={32} round={false} borderRadius={6} />
            </TwitterShareButton>
          </div>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default Article
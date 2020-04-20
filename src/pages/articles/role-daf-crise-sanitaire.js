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

import alexSrc from '../../images/alex.png';

const Article = (props) => (
  <Layout>
    <SEO
      title="Mon rôle de DAF chez MYFA en temps de crise sanitaire"
      description="A travers les derniers articles de Doris, Manuella et Florian, vous l’aurez bien compris, malgré la crise inédite que nous traversons, il n’est pas question pour nous de tout arrêter ! Plus que jamais, nous sommes demandés. Plus que jamais ,vous avez besoin de nous. Plus que jamais, vos proches ont besoin de vous."
      type="article"
      url="https://www.myfa.fr/articles/role-daf-crise-sanitaire"
      keywords="panier, courses, diaspora, click, collect, cote, ivoire, cameroun, blog, article, covid-19, cfo, daf, confinement, startup"
    />
    <Container className='article-container'>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>Mon rôle de DAF chez MYFA en temps de crise sanitaire</h1>

          <div className='author'>
            <img src={alexSrc} alt='alexandre' />
            <div>
              <span>Alexandre Meschberger</span>
              <span className='date'>{moment.utc(1587384797364).format('D MMM YYYY')}</span>
            </div>
          </div>

          <p>
            A travers les derniers <a href='https://www.myfa.fr/fr/#blog'>articles</a> de <a href='https://www.linkedin.com/in/doris-somon'>Doris</a>, <a href='https://www.linkedin.com/in/manuella-sani-29a59b1a5'>Manuella</a> et <a href='https://www.linkedin.com/in/florianadonis'>Florian</a>, vous l’aurez bien compris,
            malgré la crise inédite que nous traversons, il n’est pas question pour nous de tout arrêter !
          </p>

          <p>
            Plus que jamais, nous sommes demandés. Plus que jamais ,vous avez besoin de nous. Plus que jamais,
            vos proches ont besoin de vous.
          </p>

          <p>
            Aujourd’hui, le confinement nous oblige à rester chez nous, à limiter nos déplacements, à réduire
            notre activité. Mais nous n’arrêterons pas.
          </p>

          <p>
            La « Team MYFA » a dû s’adapter. Chaque poste, chaque mission ont dû être aménagés pour préserver
            la sécurité de toute l’équipe.
          </p>

          <p>
            Moi, je suis Alexandre, « le DAF » ! Même si je me trouve à plus de 6.000 km de vos proches,
            je n’ai pas arrêté. Toujours là, je continue à participer au développement de MYFA. Cela fait
            maintenant cinq semaines que je suis en télétravail. Je fais partie des « chanceux » : mes missions
            peuvent se faire à distance ! Même si les réunions à Station F avec toute l’équipe me manquent, nos réunions
            « en visio » nous permettent de rester performants et de maintenir un bon rythme de travail.
          </p>

          <p>
            Depuis quelques temps, nous jouons un double rôle : adapter notre travail durant le confinement
            pour rester à l’écoute de nos clients et penser à l’après, l’après confinement.
          </p>

          <p>
            Plus encore que dans une entreprise arrivée à maturité, l’après représente chez une start-up
            énormément de choses car lorsque nous affichons encore une croissance à trois chiffres, il est
            difficile de savoir de quoi sera fait le lendemain !
          </p>

          <p>
            Mais nous devons prévoir tous les scénarios possibles ! Aujourd’hui, nous sommes rivés sur
            Abidjan, ancienne capitale de la Côte d’Ivoire. Mais demain, nous irons aller ailleurs.
          </p>

          <p>
            Nous avons donc dû trouver un moyen de travailler correctement à distance. Par chance, nous
            y étions déjà préparés. Une partie de notre équipe se trouvant tantôt à Station F, tantôt en Côte d’Ivoire
            et tantôt à son domicile, nous avions ainsi déjà l’habitude de travailler à distance et d’utiliser des
            logiciels de télétravail. Mais pas sur d’aussi longues durées… Ainsi, pour se motiver, nous faisons deux
            voire trois réunions par semaine !
          </p>

          <p>
            Pour faire face à la réduction de notre activité, nous avons dû faire des choix, revoir notre
            stratégie de lancement et notre stratégie de développement.
          </p>

          <p>
            Notre objectif n’a en revanche pas changé : maintenir des prix attractifs pour soutenir le plus de
            personnes possible. En particulier en ces temps difficiles. Nous nous sommes retroussés les manches.
            Florian et Doris ont cherché des partenaires locaux proposant des produits de qualité afin de satisfaire
            vos proches. Ils m’ont transmis les prix de ces produits et nous avons ainsi pu définir les prix de vente
            les plus attractifs possible incluant la livraison afin de ne pas exposer vos proches au Covid-19.
          </p>

          <p>
            Maintenant, nous devons nous préparer à l’après !
          </p>

          <p>
            À bientôt pour un prochain épisode !
          </p>

          <p>
            N’hésitez pas à nous suivre sur nos réseaux sociaux et à vous abonner à notre newsletter directement
            sur notre site internet ! <a href='https://www.myfa.fr'>https://www.myfa.fr</a>
          </p>

          <div>
            <div className='sharing-title'>Partagez</div>
            <FacebookShareButton url={props.location.href} className='sharing-buttons'>
              <FacebookIcon size={32} round={false} borderRadius={6} />
            </FacebookShareButton>
            <TwitterShareButton
              url={props.location.href}
              title='Mon rôle de DAF chez MYFA en temps de crise sanitaire'
              via='myfa_fr'
              hashtags={['CFO', 'covid19', 'toutpourlamyfa']}
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
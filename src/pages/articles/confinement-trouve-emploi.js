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

import manuellaSrc from '../../images/manuella.png';

const Article = (props) => (
  <Layout>
    <SEO
      title="En plein confinement, je trouve un emploi"
      description="De cette Pandémie Covid-19 qui sévit dans le monde entier, plusieurs entreprises sont en baisse d’activité. Le confinement étant de rigueur dans la plupart des pays, est née une crise financière et seules quelques grandes entreprises arrivent à stabiliser leur activité économique."
      type="article"
      url="https://www.myfa.fr/articles/confinement-trouve-emploi"
      keywords="panier, courses, diaspora, click, collect, cote, ivoire, cameroun, blog, article, covid-19, job, emploi, confinement, startup"
    />
    <Container className='article-container'>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>En plein confinement, je trouve un emploi</h1>

          <div className='author'>
            <img src={manuellaSrc} alt='manuella' />
            <div>
              <span>Manuella Sani</span>
              <span className='date'>{moment.utc(1586690758064).format('D MMM YYYY')}</span>
            </div>
          </div>

          <h2>Confinée... mais embauchée</h2>

          <p>
            De cette Pandémie Covid-19 qui sévit dans le monde entier, plusieurs entreprises sont en baisse d’activité.
            Le confinement étant de rigueur dans la plupart des pays, est née une crise financière et seules quelques
            grandes entreprises arrivent à stabiliser leur activité économique.
          </p>

          <p>
            Plusieurs entreprises à travers le monde sont touchées par cette crise. En France par exemple,
            400.000 entreprises ont obtenu de l’Etat le placement en chômage partiel de 4 millions de salariés.
            La majorité d’entre elles sont les PME.
          </p>

          <p>
            Certes, de cette crise sanitaire on observe des PME touchées, mais également des TPEs (Toutes Petites Entreprises)
            pour qui le Covid-19 s’est avéré comme une opportunité : c’est le cas de l’entreprise MYFA dans laquelle j’ai été
            recrutée en tant que Responsable des Opérations.
          </p>

          <h2>Mon aventure chez MYFA : le commencement</h2>

          <p>
            Vous vous en doutez, la recherche d'emploi est rendue plus compliquée par la situation actuelle.
            C’est ainsi que, malgré tout, confiante et décidée j’ai envoyé ma candidature à cette Startup française
            pour le poste mentionné plus haut. Mes expériences professionnelles précédentes (Chez SOCINT et PRO ABIDJAN MOTORS CENTER)
            m'ont mises en confiance face à l'ampleur des missions proposées. Quelques jours plus tard, je recevais un appel
            pour un entretien.
          </p>

          <p>
            Grande fut ma surprise d'avoir été reçue ce jour-là par 2 jeunes belles personnes
            (<a href='https://www.linkedin.com/in/doris-somon'>Doris Somon</a> & <a href='https://www.linkedin.com/in/florianadonis'>Florian Adonis</a>)
            qui me semblaient, si aimables et animées par un esprit de challenge. Cette impression n'aura fait que susciter en moi,
            de la curiosité et l'envie d'intégrer cette famille. La crise Covid-19 arrivant, le doute est né en moi,
            mais je croyais fermement à une réponse positive de leur part. Et bim ! Grande fut ma joie. Je m'en souviens
            encore comme si c'était hier - du mercredi 13 mars, où je recevais un e-mail de Doris, co-fondatrice de MYFA m'annonçant
            que j'avais été retenue pour le poste de Responsable des Opérations.
          </p>

          <h2>Moi, nouveau membre de la MYFA</h2>

          <p>
            MYFA est une Startup française crée il y a moins d'un an, par Doris et Florian. Elle a pour objectif de permettre
            à la diaspora et toute personne vivant sur le territoire Ivoirien de faire parvenir un panier de biens alimentaires,
            à destination de leurs familles, amis et proches en Côte d'Ivoire. Responsable des Opérations chez MYFA,
            un grand challenge pour moi. En effet, les nouvelles missions que je m'apprêtais à accomplir relevaient du domaine
            de l'inconnu jusqu’alors :
          </p>

          <ul>
            <li>Le suivi des commandes réalisées</li>
            <li>La  gestion clientèle</li>
            <li>La validation des paniers</li>
            <li>Le suivi de la prise en charge de la livraison</li>
            <li>Le suivi et fidélisation des clients</li>
            <li>Le traitement des litiges clients.</li>
          </ul>

          <h2>Vos proches, notre priorité</h2>

          <p>
            Chez MYFA, comme dans toute start up, tout est une question de challenge.
            Nous voyons dans la crise que nous traversons, l'occasion de rappeler ce pourquoi nous existons :
            prendre soin de vos proches. Pour ce faire, voici la liste des paniers proposés, la description est disponible sur le site.
          </p>

          <ul>
            <li>Panier Légumes</li>
            <li>Panier Sauces</li>
            <li>Panier Fruits</li>
            <li>Paniers MYFA</li>
          </ul>

          <p>
            D'autres paniers tendent à exister, comme celui dédié aux jeunes mamans ou encore ceux que l'on aimerait offrir
            à l'occasion des différentes fêtes tout au long de l'année (ramadan, fête des mères, des pères, etc.)
          </p>

          <p>
            Ce travail n'est possible que grâce à l'efficacité, la persévérance et le courage de l’équipe MYFA à faire
            progresser l’entreprise. Ainsi, je vous invite à nous suivre dans notre aventure MYFA, via nos différents réseaux.
          </p>

          <ul>
            <li>Facebook - <b><a href='https://www.facebook.com/myfa.fr'>Myfa.fr</a></b></li>
            <li>Instagram - <b><a href='https://www.instagram.com/myfa.fr'>@myfa.fr</a></b></li>
            <li>Linkedin - <b><a href='https://www.linkedin.com/company/26271759'>MYFA</a></b></li>
            <li>Twitter - <b><a href='https://twitter.com/myfa_fr'>@myfa_fr</a></b></li>
          </ul>

          <p>
            <a href='www.myfa.fr'>www.myfa.fr</a> :  un seul clic pour faire plaisir à tous vos proches.
          </p>

          <div>
            <div className='sharing-title'>Partagez</div>
            <FacebookShareButton url={props.location.href} className='sharing-buttons'>
              <FacebookIcon size={32} round={false} borderRadius={6} />
            </FacebookShareButton>
            <TwitterShareButton
              url={props.location.href}
              title='Récession : comment je parviens à maintenir la croissance de ma Start up ?'
              via='myfa_fr'
              hashtags={['livraison', 'covid19', 'toutpourlamyfa']}
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
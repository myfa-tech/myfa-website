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

import dorisSrc from '../../images/doris.png';
import teamMeetingSrc from '../../images/team-meeting.jpg';

const Article = (props) => (
  <Layout>
    <SEO
      title="Récession : comment je parviens à maintenir la croissance de ma Start up ?"
      description="C'est la deuxième fois que je commence par un titre comme celui-ci. J'ai utilisé le même dans mon dernier article, sur LinkedIn : c'était le 1er avril dernier, j'y annonçais la fermeture de MYFA, en guise de poisson d'avril. Rire au lieu de paniquer, tel est mon remède."
      type="article"
      url="https://www.myfa.fr/articles/recession-croissance-startup"
      keywords="panier, courses, diaspora, click, collect, cote, ivoire, cameroun, blog, article, covid-19, recession, croissance, startup"
    />
    <Container className='article-container'>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>Récession : comment je parviens à maintenir la croissance de ma Start up ?</h1>

          <div className='author'>
            <img src={dorisSrc} alt='doris' />
            <div>
              <span>Doris Somon</span>
              <span className='date'>{moment.utc(1586690758064).format('D MMM YYYY')}</span>
            </div>
          </div>

          <h2>Coronavirus 1 - Économie française 0</h2>

          <p>
            C'est la deuxième fois que je commence par un titre comme celui-ci. J'ai utilisé le même dans
            <a href='https://www.linkedin.com/pulse/coronavirus-1-myfa-0-doris-somon-/'>mon dernier article</a>,
            sur LinkedIn : c'était le 1er avril dernier, j'y annonçais la fermeture de <a href='https://www.myfa.fr'>MYFA</a>,
            en guise de poisson d'avril. Rire au lieu de paniquer, tel est mon remède.
          </p>

          <p>
            En effet, je parle de panique car la nouvelle est tombée :
            <span className='italic'>"Le PIB chute de 6% au premier trimestre 2020, la France entre en récession."</span>
            - <a href='https://www.lemonde.fr/planete/live/2020/04/08/coronavirus-suivez-la-mobilisation-massive-de-reservistes-au-profit-de-50-ehpad-de-la-region-parisienne_6035907_3244.html'>Le Monde</a>
          </p>

          <p>
            Ayant démarré l'activité de ma Start up en début d'année, ce genre de scénario n'est pas vraiment celui que
            j'avais imaginé... Et pour cause, tout avait si bien commencé : entrée à la Station F, lancement du site,
            arrivée des premières commandes... Le scénar parfait.
          </p>

          <p>
            Suis-je en train de baisser les bras ? Non, loin de là. Je vais vous dire pourquoi :
          </p>

          <ul>
            <li><b>On ne peut lutter contre les événements naturels.</b> Qui a déjà tenté de rentrer en conflit avec un ouragan par exemple ? Que cette personne n'hésite pas à me contacter, j'ai 2-3 choses à dire au Corona moi.</li>
            <li><b>Je crois en MYFA.</b> Prendre soins des proches, c'est la promesse que nous faisons chez MYFA. La situation actuelle nous prouve qu'il ne faut pas attendre que le pire arrive pour le faire.</li>
            <li><b>Je suis entourée d'une belle équipe.</b> La partie suivante leur est dédiée ! 👇🏾</li>
          </ul>

          <h2>Loin des yeux, tous dans mon coeur.</h2>

          <p>
            J'étais seule quand l'idée de MYFA m'est venue. Ne sachant pas garder une bonne idée pour moi,
            j'en ai parlé à <a href='https://www.linkedin.com/in/florianadonis'>Florian Adonis</a>,
            qui n'a pas mis trop de temps avant de me suivre dans mon aventure (Merci encore Flo !).
          </p>

          <p>
            Ensemble, nous avons décidé de faire confiance à <a href='https://www.linkedin.com/in/alexandre-meschberger-97891012a'>Alexandre Meschberger</a>
            en lui confiant la partie financière de la boîte.
          </p>

          <Row>
            <Col sm={3} className='img-container'>
              <img src={teamMeetingSrc} alt='team' className='team-meeting-img' />
            </Col>
            <Col sm={9}>
              <p>
                Ensemble mais à trois cette fois-ci, nous accueillons <a href='https://www.linkedin.com/in/manuella-sani-29a59b1a5'>Manuella Sani</a> depuis le 1er avril dernier,
                et ça ce n'est pas un poisson d'avril.
              </p>
              <p>
                Nous sommes à présent 4 : 2 à Abidjan, 2 à Paris.
              </p>
              <p>
                À l'image des 4 Fantastiques, nous travaillons ensemble non pas pour sauver la Terre,
                mais pour prendre soin de vos proches (chaque chose en son temps). Nous mettons tout en oeuvre pour que les livraisons
                de paniers se fassent dans le respect des règles de sécurité : masques, gel désinfectant, prise de distance, etc.
              </p>
            </Col>
          </Row>

          <p>
            La crise que nous traversons nous rend plus forts, plus unis.
          </p>

          <h2>Il y a du bon à rester chez soi</h2>

          <p>
            Restez chez soi, c'est d'abord la meilleure manière d'arriver à bout de ce virus.
          </p>

          <p>
            Pour les personnes ayant un business ou désirantes d'en avoir, ce n'est pas problématique.
            Laissez moi vous raconter ce que rester chez moi m'a permis de faire, en étant en lancement d'entreprise :
          </p>

          <ul>
            <li>
              <b>Agrandir mon réseau.</b> LinkedIn, quel endroit magique tout de même.
              J'ai enfin pris le temps de mettre mon profil bien à jour, de répondre aux messages que j'avais en attente,
              d'écrire un article, de commenter des publications intéressantes... et même de "rencontrer"
              des acteurs qui vont pouvoir nous aider (les 4 fantastiques) à améliorer MYFA.
            </li>
            <li>
              <b>Former le nouveau membre de mon équipe.</b> Un ordinateur, une webcam, des ateliers Google (entre autres),
              telle est l'équation parfaite pour former Manuella malgré la distance.
            </li>
            <li>
              <b>Améliorer mes compétences.</b> En temps normal, il y a beaucoup de choses que je remets à demain,
              me disant que j'ai la vie devant moi. Aujourd'hui, j'accorde du temps à tout ce (et tous ceux) que j'aime :
              je prends goût à l'UI design via Figma, je me prends pour Tracy Chapman quand je joue de la guitare...
              Bref, je vais au bout de ma curiosité.
            </li>
          </ul>

          <p>
            La liste est plus longue que ça, mais il faut savoir s'arrêter au bon moment.
          </p>

          <p>
            Par cet article je veux donner de l'espoir aux entrepreneurs, qui se font du soucis pour leur entreprise.
          </p>

          <p>
            Mes pensées vont vers ceux qui sont touchés de près ou de loin par ce fléau.
          </p>

          <p className='citation'>
            Nous travaillerons ensemble pour soutenir le courage là où il y a la peur, pour encourager la négociation là où
            il y a le conflit, et donner l'espoir là où règne le désespoir. Nelson Mandela, Homme d'état, Président (1918 - 2013)
          </p>

          <p>
            Merci de m’avoir lue.
          </p>

          <p>
            <a href='https://twitter.com/hashtag/toutpourlamyfa' target='_blank' rel="noopener noreferrer">#toutpourlamyfa</a>
            <br />
            <a href='https://twitter.com/hashtag/covid19' target='_blank' rel="noopener noreferrer">#covid19</a>
            <br />
            <a href='https://twitter.com/hashtag/livraison' target='_blank' rel="noopener noreferrer">#livraison</a>
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
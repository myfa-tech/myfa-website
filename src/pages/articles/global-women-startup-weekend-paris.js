import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share'

import SEO from '../../components/seo'

import Layout from '../../components/layout'
import './articles.scss'

import dorisSrc from '../../images/doris.png'
import florianSrc from '../../images/florian-2.jpeg'
import coverSrc from '../../images/wsw-cover.jpeg'

const Article = (props) => (
  <Layout>
    <SEO
      title="Global Startup Weekend Women Paris 2019: MYFA y sera"
      description="On est d’accord, le nom de l’évènement est long. Mais le principe est simple ! « Women », vous l’aurez compris, signifie que les porteuses de projets sont uniquement des femmes (Who run the world ? demandez à Beyoncé)."
      type="article"
      img={coverSrc}
      url="https://www.myfa.fr/articles/global-women-startup-weekend-paris"
      keywords="panier, courses, diaspora, click, collect, cote, ivoire, cameroun, blog, article, application, mobile, tech, technologie, telecharger, télécharger, startup, frenchtech, women, startup, weekend"
    />
    <Container className='article-container'>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>Global Startup Weekend Women Paris 2019: MYFA y sera</h1>

          <div className='author'>
            <img src={dorisSrc} alt='doris' />
            <div>
              <span>Doris Somon</span>
              <span className='date'>{moment.utc(1569517808660).format('D MMM YYYY')}</span>
            </div>
          </div>

          <p>
            <img className='cover' alt='wonder woman' src={coverSrc} />
          </p>
          <p>
            On est d’accord, le nom de l’évènement est long. Mais le principe est simple !
          </p>

          <p>
            « Women », vous l’aurez compris, signifie que les porteuses de projets sont uniquement des femmes
            (Who run the world ? demandez à Beyoncé).
          </p>

          <p>
            L’évènement se déroule sur tout ce weekend : du 27 au 29 septembre 2019.
          </p>

          <p>
            L’idée est de permettre aux porteuses de projet de parler de leur Start up à
            travers un pitch de 60 secondes : en découle une composition d’équipe avec
            laquelle elles pourront travailler sur différents aspects de leur projet
            (business model,exécution et validation).
          </p>

          <p>
            Retrouvez <a href='http://communities.techstars.com/france/paris/startup-weekend/15272' target='_blank' rel="noopener noreferrer">ici</a> tous les détails de l’évènement.
          </p>

          <h2>Premier évènement pour MYFA</h2>

          <p>
            Ce weekend représente ma première prise de parole en public pour parler de MYFA,
            en demandant un accompagnement qui plus est.
          </p>

          <p>
            Pour nous, le but est de se faire connaître en tant que dirigeants de la Start up,
            et de faire aimer cette dernière. Nous attendons de cet évènement d'accroître notre
            équipe le temps du weekend afin d’avancer ensemble sur la création de MYFA.
          </p>
          <p>
            Mais de qui je parle derrière ce « nous » ?
          </p>
          <p>
            De Florian, CTO & Co-founder de MYFA.
          </p>
          <h2>La tech, c’est lui</h2>
          <Row>
            <Col sm={3} className='img-container'>
              <img src={florianSrc} alt='Florian' className='florian' />
            </Col>
            <Col>
              <p>
                « Doris m’a approché il y a quelques mois avec cette idée, que j’ai trouvé tout de suite intéressante.
                Il lui fallait quelqu’un qui allait pouvoir l’accompagner lors de cette aventure entrepreneuriale,
                quelqu’un qui allait lui permettre de mettre en place la tech de MYFA de manière efficace.
                J’ai fait de mon mieux, le futur en jugera. Ce week-end, c’est la première fois que MYFA aura
                une exposition publique, et c’est une chance pour nous d’approcher des talents et obtenir
                un regard extérieur quant au projet que nous sommes en train de monter.
              </p>
            </Col>
          </Row>
          <p>
            Nous y trouverons peut-être une 3e associée, qui sait. Je pense que c’est aussi, pour Doris,
            l’occasion de prendre la mesure de son rôle de CEO, à travers l’exercice du pitch, incontournable
            de la vie entrepreneuriale. On ne peut tirer que du positif de ce week end. »
          </p>
          <p>-- Florian</p>
          <h2>
            Passez le weekend avec nous !
          </h2>
          <p>
            Nous vous invitons avec plaisir à suivre nos aventures durant ce weekend a travers
            les réseaux suivants :
          </p>

          <ul>
            <li>
              Twitter - <a href='https://twitter.com/myfa_fr' target='_blank' rel="noopener noreferrer">myfa_fr</a>, pour suivre en temps réel nos réactions et notre évolution au cours de l’évènement
            </li>
            <li>
              Instagram – <a href='https://www.instagram.com/myfa.fr' target='_blank' rel="noopener noreferrer">myfa.fr</a>, pour liker nos photos !
            </li>
          </ul>

          <p>
            Nous avons également une page Facebook (<a href='https://www.facebook.com/Myfafr-669561290229467/' target='_blank' rel="noopener noreferrer">myfa.fr</a>)
            et LinkedIn (<a href='https://www.linkedin.com/company/26271759' target='_blank' rel="noopener noreferrer">MYFA</a>)
            que vous pouvez suivre si vous souhaitez être au courant des
            articles sortant, des partenariats effectués, des promotions et autres informations
            concernant Florian, MYFA et moi !
          </p>

          <p className='quote'>
            Parles si tu as des mots plus forts que le silence, ou garde le silence.
            Euripide (Poète, -480 - -406)
          </p>

          <p>
            <a href='https://twitter.com/search?q=%23toutpourlamyfa&src=typed_query' target='_blank' rel="noopener noreferrer">#toutpourlamyfa</a>
            <br />
            <a href='https://twitter.com/search?q=%23globalstartupweekendwomen&src=typed_query' target='_blank' rel="noopener noreferrer">#globalstartupweekendwomen</a>
            <br />
            <a href='https://twitter.com/search?q=%23pitch&src=typed_query' target='_blank' rel="noopener noreferrer">#pitch</a>
            <br />
            <a href='https://twitter.com/search?q=%23entrepreunariat&src=typed_query' target='_blank' rel="noopener noreferrer">#entrepreunariat</a>
          </p>

          <div>
            <div className='sharing-title'>Partagez</div>
            <FacebookShareButton url={props.location.href} className='sharing-buttons'>
              <FacebookIcon size={32} round={false} borderRadius={6} />
            </FacebookShareButton>
            <TwitterShareButton
              url={props.location.href}
              title='Global Startup Weekend Women Paris 2019: MYFA y sera 🌍'
              via='myfa_fr'
              hashtags={['entreprenariat', 'afrique', 'toutpourlamyfa']}
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
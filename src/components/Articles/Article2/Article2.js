import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { Helmet } from 'react-helmet'

import '../Article.scss'

import dorisSrc from '../../../assets/images/doris.jpg'
import florianSrc from '../../../assets/images/florian.jpeg'
import coverSrc from '../../../assets/images/wsw-cover.jpeg'

const Article2 = () => (
  <Container className='article-container'>
    <Helmet>
      <title>Global Startup Weekend Women Paris 2019: MYFA y sera</title>
      <meta name="description" content="On est d’accord, le nom de l’évènement est long. Mais le principe est simple ! « Women », vous l’aurez compris, signifie que les porteuses de projets sont uniquement des femmes (Who run the world ? demandez à Beyoncé)." />
      <meta name="author" content="Myfa SAS" />
      <meta name="keywords" content="panier, courses, diaspora, click, collect, cote, ivoire, cameroun, blog, article, application, mobile, tech, technologie, telecharger, télécharger, startup, frenchtech, women, startup, weekend" />

      <meta property="og:url"           content="https://www.myfa.fr/articles/global-women-startup-weekend-paris" />
      <meta property="og:type"          content="article" />
      <meta property="og:title"         content="Global Startup Weekend Women Paris 2019: MYFA y sera" />
      <meta property="og:description"   content="On est d’accord, le nom de l’évènement est long. Mais le principe est simple ! « Women », vous l’aurez compris, signifie que les porteuses de projets sont uniquement des femmes (Who run the world ? demandez à Beyoncé)." />
    </Helmet>

    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h1>Global Startup Weekend Women Paris 2019: MYFA y sera</h1>

        <div className='author'>
          <img src={dorisSrc} />
          <div>
            <span>Doris Somon</span>
            <span className='date'>{moment.utc(1569517808660).format('D MMM YYYY')}</span>
          </div>
        </div>

        <p>
          <img src={coverSrc} />
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
          Retrouvez <a href='http://communities.techstars.com/france/paris/startup-weekend/15272' target='_blank'>ici</a> tous les détails de l’évènement.
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
              quelqu’un qui allait lui permettre de mettre en place la tech de Myfa de manière efficace.
              J’ai fait de mon mieux, le futur en jugera. Ce week-end, c’est la première fois que Myfa aura
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

        <p>
          <ul>
            <li>
              Twitter - <a href='https://twitter.com/myfa_fr' target='_blank'>myfa_fr</a>, pour suivre en temps réel nos réactions et notre évolution au cours de l’évènement
            </li>
            <li>
              Instagram – <a href='https://www.instagram.com/myfa.fr' target='_blank'>myfa.fr</a>, pour liker nos photos !
            </li>
          </ul>
        </p>

        <p>
          Nous avons également une page Facebook (<a href='https://www.facebook.com/Myfafr-669561290229467/' target='_blank'>myfa.fr</a>)
          et LinkedIn (<a href='https://www.linkedin.com/company/26271759' target='_blank'>MYFA</a>)
          que vous pouvez suivre si vous souhaitez être au courant des
          articles sortant, des partenariats effectués, des promotions et autres informations
          concernant Florian, MYFA et moi !
        </p>

        <p className='quote'>
          Parles si tu as des mots plus forts que le silence, ou garde le silence.
          Euripide (Poète, -480 - -406)
        </p>

        <p>
          <a href='https://twitter.com/search?q=%23toutpourlamyfa&src=typed_query' target='_blank'>#toutpourlamyfa</a>
          <a href='https://twitter.com/search?q=%23globalstartupweekendwomen&src=typed_query' target='_blank'>#globalstartupweekendwomen</a>
          <a href='https://twitter.com/search?q=%23pitch&src=typed_query' target='_blank'>#pitch</a>
          <a href='https://twitter.com/search?q=%23entrepreunariat&src=typed_query' target='_blank'>#entrepreunariat</a>
        </p>

        <div>
          <a data-size="large" className="twitter-share-button" href="https://twitter.com/intent/tweet" target='_blank'>
            Tweet
          </a>
          <div>
            <div
              className="fb-share-button"
              data-href="https://www.myfa.fr/articles/global-women-startup-weekend-paris"
              data-layout="button"
              data-size="large"
            />
          </div>
        </div>
      </Col>
    </Row>
  </Container>
)

export default Article2

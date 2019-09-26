import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { Helmet } from 'react-helmet'

import '../Article.scss'

import dorisSrc from '../../../assets/images/doris.jpg'

const Article2 = () => (
  <Container className='article-container'>
    <Helmet>
      <title>Global Startup Weekend Women Paris 2019: MYFA y sera</title>
      <meta name="description" content="On est d’accord, le nom de l’évènement est long. Mais le principe est simple ! « Women », vous l’aurez compris, signifie que les porteuses de projets sont uniquement des femmes (Who run the world ? demandez à Beyoncé)." />
      <meta name="author" content="Myfa SAS" />
      <meta name="keywords" content="panier, courses, diaspora, click, collect, cote, ivoire, cameroun, blog, article, application, mobile, tech, technologie, telecharger, télécharger, startup, frenchtech" />

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
      </Col>
    </Row>
  </Container>
)

export default Article2

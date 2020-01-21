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

import florianSrc from '../../images/florian.png'
import florianWorkingSrc from '../../images/florian_working.jpg'
import coverSrc from '../../images/stationf_batch_6.jpg'

const Article = (props) => (
  <Layout>
    <SEO
      title="From Nothing to Something"
      description="Vers le début de l’année 2018, j’ai rejoint l’association African Business Club, dont l’objectif est de mettre en relation les cadres de la diaspora Africaine et promouvoir le business en Afrique."
      type="article"
      img={coverSrc}
      url="https://www.myfa.fr/articles/from-nothing-to-something"
      keywords="panier, courses, diaspora, click, collect, cote, ivoire, cameroun, blog, article, application, mobile, tech, technologie, telecharger, télécharger, startup, frenchtech"
    />
    <Container className='article-container'>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>From nothing to something</h1>

          <div className='author'>
            <img src={florianSrc} alt='florian' />
            <div>
              <span>Florian Adonis</span>
              <span className='date'>{moment.utc(1579597049542).format('D MMM YYYY')}</span>
            </div>
          </div>

          <p>
            C’est un exercice complexe d’exprimer ce que l’on pense, ce que l’on ressent ou ce que l’on a vécu,
            à travers des mots. Aujourd'hui nous sommes incubés à la Station F, plus grand incubateur de startups au monde.
            Je ferai de mon mieux pour relater certains temps forts qui nous ont conduit jusqu'ici.
          </p>

          <p>
            <img className='cover' alt='station f batch 6' src={coverSrc} />
          </p>

          <p>
            Vers le début de l’année 2018, j’ai rejoint l’association African Business Club,
            dont l’objectif est de mettre en relation les cadres de la diaspora Africaine et promouvoir
            le business en Afrique. Au sein de cette association, j’ai pu rencontrer Doris, ma co-fondatrice,
            qui avait l’idée de créer une plateforme pour permettre aux gens de la diaspora de commander des
            produits locaux directement depuis la France. De fil en aiguille, nous avons discuté plus longuement,
            à plusieurs reprises, et avons décidé de mettre en place ce service.
          </p>

          <p>
            Durant la phase d’idéation 🤔, qui a consisté à étoffer la simple idée, et la transformer en projet,
            nous avons dû faire des études comparatives de la concurrence, des prix sur les marchés locaux,
            des charges qu’un tel service engendrerait, mais le plus important certainement : la forme que prendrait
            notre plateforme et ce qui y serait vendu. À l’heure où j’écris, ces deux choses ne sont et ne seront
            d’ailleurs peut-être jamais figées dans le marbre.
          </p>

          <Row>
            <Col>
              <p>
                La phase de conception 👷🏽‍♂️ a commencé le jour où nous avons décidé de mettre en place une application
                mobile et d’y vendre des fruits et des légumes. Quelle joie de pouvoir enfin commencer à écrire
                du code qui allait servir ma propre entreprise, bien qu’il s’agissait d’un POC, à l’époque. Après le POC
                vint le site vitrine, toujours en ligne au moment où j’écris, et qui sait, peut-être bientôt le site marchand 😉
              </p>
            </Col>
            <Col sm={3} className='img-container'>
              <img src={florianWorkingSrc} alt='Florian' className='florianWorking' />
            </Col>
          </Row>

          <p>
            À travers ces mots, je veux transmettre l’excitation de pouvoir créer quelque chose,
            à partir de rien. Aujourd’hui MYFA n’est pas un géant, loin de là, mais MYFA existe et aspire
            à devenir le leader des transactions transcontinentales. MYFA, ce sont des hommes et des femmes
            incubés à Station F et qui travaillent dans le but d’apporter une vraie solution aux problèmes
            de transparences que nous rencontrons sur notre très cher continent africain 🌍. À partir de rien,
            nous avons construit quelque chose, et nous n’arrêterons que lorsque nous aurons résolu
            ce pourquoi nous existons.
          </p>

          <p>
            <a href='https://twitter.com/hashtag/toutpourlamyfa' target='_blank' rel="noopener noreferrer">#toutpourlamyfa</a>
            <br />
            <a href='https://twitter.com/hashtag/Africa' target='_blank' rel="noopener noreferrer">#Africa</a>
            <br />
            <a href='https://twitter.com/hashtag/entrepreneuriat' target='_blank' rel="noopener noreferrer">#entrepreunariat</a>
          </p>

          <div>
            <div className='sharing-title'>Partagez</div>
            <FacebookShareButton url={props.location.href} className='sharing-buttons'>
              <FacebookIcon size={32} round={false} borderRadius={6} />
            </FacebookShareButton>
            <TwitterShareButton
              url={props.location.href}
              title='From nothing to something'
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
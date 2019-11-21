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
import coverSrc from '../../images/mobileone.png'

const Article = (props) => (
  <Layout>
    <SEO
      title="Vous, le premier membre de la myfa"
      description="La semaine dernière nous participions à la conférence MobileOne. Pendant deux jours, l'événement couvre tous les aspects liés au mobile, de la technique au marketing. Les différentes problématiques sont traitées sous forme de conférences de 30 minutes."
      type="article"
      img={coverSrc}
      url="https://www.myfa.fr/articles/premier-membre-myfa"
      keywords="mobileone, customer, panier, courses, diaspora, click, collect, cote, ivoire, cameroun, blog, article, application, mobile, tech, technologie, telecharger, télécharger, startup, frenchtech"
    />
    <Container className='article-container'>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>Vous, le premier membre de la myfa*</h1>

          <div className='author'>
            <img src={dorisSrc} alt='doris' />
            <div>
              <span>Doris Somon</span>
              <span className='date'>{moment.utc(1574315910413).format('D MMM YYYY')}</span>
            </div>
          </div>

          <p>
            <img className='cover' alt='mobile one' src={coverSrc} />
          </p>

          <p>
            La semaine dernière nous participions à la conférence MobileOne. Pendant deux jours,
            l'événement couvre tous les aspects liés au mobile, de la technique au marketing.
            Les différentes problématiques sont traitées sous forme de conférences de 30 minutes.
          </p>

          <p>
            De grands noms sont montés sur scène : Snapchat, Happn, Google Pay, Whoomies, et Myfa……
            Ah non, nous étions présents en tant que participants ! Pour mieux vous servir.
          </p>

          <p>
            En effet, l’application que vous attendez tous est en cours de finalisation.
            Et qui mieux que vous même peut nous aider à avoir une application proche de la perfection ? No one !
          </p>

          <p>
            Si il y a un élément que nous avons retenu lors de cet évent,
            c’est qu’il faut mettre le consommateur au centre de la stratégie d’entreprise.
            Il faut être « consumer centric ».
          </p>

          <p>
            <b>Alors, bienvenue dans la Myf !</b>
          </p>

          <p>
            Florian et moi recherchons des personnes non seulement intéressées par l’application (car prêtes
            à l’utiliser) mais surtout prêtes à tester la version bêta afin de, ensemble, en tirer une version
            finale qui réponde le plus à vos besoins.
          </p>

          <p>
            Pour faire partie de l’élite des premiers testeurs,
            il vous suffit de répondre au chatbot présentsur le site !
            Sinon, n’hésitez pas à vous adresser à nous via nos principaux réseaux sociaux
            que je ne vais pas manquer de vous repartager :
          </p>

          <ul>
            <li>Twitter : <a href="https://twitter.com/myfa_fr">@myfa_fr</a></li>
            <li>Instagram : <a href="https://www.instagram.com/myfa.fr">@myfa.fr</a></li>
          </ul>

          <p>
            À bientôt.
          </p>

          <p>
            *Myfa = famille
          </p>
          <p>
            <a href='https://twitter.com/hashtag/toutpourlamyfa' target='_blank' rel="noopener noreferrer">#toutpourlamyfa</a>
            <br />
            <a href='https://twitter.com/hashtag/mobileapp' target='_blank' rel="noopener noreferrer">#mobileapp</a>
            <br />
            <a href='https://twitter.com/hashtag/consumercentric' target='_blank' rel="noopener noreferrer">#consumercentric</a>
          </p>

          <div>
            <div className='sharing-title'>Partagez</div>
            <FacebookShareButton url={props.location.href} className='sharing-buttons'>
              <FacebookIcon size={32} round={false} borderRadius={6} />
            </FacebookShareButton>
            <TwitterShareButton
              url={props.location.href}
              title='Vous, le premier membre de la myfa'
              via='myfa_fr'
              hashtags={['consumercentric', 'mobileapp', 'toutpourlamyfa']}
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
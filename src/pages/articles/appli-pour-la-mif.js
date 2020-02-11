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
import doris2Src from '../../images/doris-2.jpg'
import logoSrc from '../../images/logo-1.png'

const Article = (props) => (
  <Layout>
    <SEO
      title="MYFA, une application pensée pour la mif"
      description="En tant que membre de la diaspora africaine, nous avons la mission de prendre en charge une partie des dépenses de nos proches restés au pays."
      type="article"
      img={logoSrc}
      url="https://www.myfa.fr/articles/appli-pour-la-mif"
      keywords="panier, courses, diaspora, click, collect, cote, ivoire, cameroun, blog, article, application, mobile, tech, technologie, telecharger, télécharger, startup, frenchtech"
    />
    <Container className='article-container'>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>MYFA, une application pensée pour la mif</h1>

          <div className='author'>
            <img src={dorisSrc} alt='doris' />
            <div>
              <span>Doris Somon</span>
              <span className='date'>{moment.utc(1566285169108).format('D MMM YYYY')}</span>
            </div>
          </div>

          <p>
            Hein ? Quoi ? Que veut dire “MYFA” ? <br />
            Cela veut dire “famille” en verlan.
            Le verlan étant une forme d'argot français qui consiste en
            l'inversion des syllabes d'un mot.
            Vous comprendrez donc d’où le chanteur Stromae tient son nom… <br />
            Le y ? juste pour le style !
          </p>

          <p>
            Si comme moi, vous êtes d’origine Africaine, ou même natif du continent
            avec de la famille restée là-bas, vous allez reconnaître les situations suivantes :
            « Pardon, mon téléphone m’a lâché, tu peux m’envoyer l’argent ? »,
            « J’ai besoin de 35 000 FCFA pour m’inscrire au foot, tu peux m’aider ? »,
            « J’ai besoin d’un laptop » … et j’en passe !
          </p>

          <p>
            En effet, en tant que membre de la diaspora africaine, vous avez la mission de prendre en
            charge une partie des dépenses de vos proches restés au pays. Ce n’est pas directement mon cas,
            mais c’est bel et bien celui de mes parents.
          </p>

          <p>
            Attendez, j’allais oublier… laissez-moi me présenter !
          </p>

          <Row>
            <Col sm={3} className='img-container'>
              <img src={doris2Src} alt='Doris' className='doris-2' />
            </Col>
            <Col>
              <p>
                Je m’appelle Doris SOMON, j’ai vu le jour au cours du mois de juillet 1995,
                et depuis… j’improvise. Aujourd’hui, je vis un vrai tournant : la création d’entreprise.
              </p>

              <p>
                Ce sourire ? J’essaye de le garder en toutes circonstances, même quand après six heures de
                vol pour aller dans mon cher pays d’origine qu’est le Cameroun, la première question que
                l’on me pose est « Qu’est-ce que tu m’as ramené ? ».
              </p>
            </Col>
          </Row>

          <p>
            Cette année, c’est décidé, l’envoi d’argent c’est terminé. Vous penserez que cette décision est brutale…
            loin de là, elle est très bien pensée. <br />
            Laissez-moi vous expliquer : <br />
            L’envoi d’argent ne me permet pas d’être sûre que le frigo de ma grand-mère est plein.
          </p>

          <p>
            Pour avoir cette certitude, j’ai décidé (en étant très bien accompagnée :
            Florian Adonis - <strong>CTO</strong>; Morgane CHASSON - <strong>Graphiste</strong>;
            Marc Blanchard - <strong>Business Angel</strong>) de créer MYFA :
            l’application pour vos proches, au loin.
          </p>

          <Row>
            <Col sm={3} className='img-container'>
              <img src={logoSrc} alt='logo MYFA' className='logo-img' />
            </Col>
            <Col>
              <p>
                Grâce à cette application, ce n’est plus un don financier qui est réalisé,
                mais plutôt la composition d’un panier alimentaire : d’ici, je fais des courses pour ma grand-mère,
                elle n’a plus qu’à se rendre dans le magasin choisi pour récupérer ce panier (entre nous,
                on sait qu’elle enverra un enfant aller le chercher).
              </p>
            </Col>
          </Row>

          <p>
            De cette manière, j’ai un certain contrôle sur l’argent que j’envoie au Cameroun. <br />
            Imaginons la situation suivante : tous les mois, j’envoie 100 euros à ma grand-mère.
            Jusqu’à présent, impossible de vérifier que cet argent est utilisé à bon escient.
            Grâce à MYFA, sur les 100 euros je peux faire 40-50 euros de courses,
            lui permettant de se faire plaisir avec le reste.
          </p>

          <p className='quote'>
            Que pouvez-vous faire pour promouvoir la paix dans le monde ? Rentrer chez vous et aimer votre famille !
            Mère Teresa (1910-1997)
          </p>

          <div>
            <div className='sharing-title'>Partagez</div>
            <FacebookShareButton url={props.location.href} className='sharing-buttons'>
              <FacebookIcon size={32} round={false} borderRadius={6} />
            </FacebookShareButton>
            <TwitterShareButton
              url={props.location.href}
              title='MYFA, une application pensée pour la mif 🌍'
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

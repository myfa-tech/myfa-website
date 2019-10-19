import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import SEO from '../../components/seo'

import Layout from '../../components/layout'
import './articles.scss'

import florianSrc from '../../images/florian.png'
import coverSrc from '../../images/taxis_abidjan.jpg'

const Article = () => (
  <Layout>
    <SEO
      title="Un voyage d’affaires à Abidjan"
      description="Si on nous avait dit, il y a 8 mois, lorsque nous nous lancions, que les choses se concrétiseraient aussi rapidement, je n’y aurais pas cru, et Doris non plus. Voilà déjà 1 semaine que nous sommes rentrés de notre premier “voyage d’affaires”, ni plus ni moins qu’en Côte d’Ivoire."
      type="article"
      url="https://www.myfa.fr/articles/voyage-abidjan"
      keywords="panier, courses, diaspora, click, collect, cote, ivoire, cameroun, blog, article, application, mobile, tech, technologie, telecharger, télécharger, startup, frenchtech"
    />
    <Container className='article-container'>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>Un voyage d’affaires à Abidjan</h1>

          <div className='author'>
            <img src={florianSrc} alt='florian' />
            <div>
              <span>Florian Adonis</span>
              <span className='date'>{moment.utc(1571515045369).format('D MMM YYYY')}</span>
            </div>
          </div>

          <p>
            Si on nous avait dit, il y a 8 mois, lorsque nous nous lancions,
            que les choses se concrétiseraient aussi rapidement, je n’y aurais pas cru,
            et Doris non plus. Voilà déjà 1 semaine que nous sommes rentrés de notre premier “voyage d’affaires”,
            ni plus ni moins qu’en Côte d’Ivoire. En Afrique, continent qui nous est cher.
          </p>

          <p>
            <img className='cover' alt='abidjan taxis' src={coverSrc} />
          </p>

          <p>
            L’objectif du voyage a été pour nous d’aller à la rencontre de chaînes de magasins,
            et discuter des possibilités de partenariats. Nous étions avertis quant aux imprévus
            des rendez-vous en Afrique, mais ne les avions jamais vécus.
          </p>

          <p>
            En Europe, et dans la culture occidentale, le schéma prédominant de prise de rendez-vous est le suivant :
            contacter la personne, convenir d’une heure et d’un lieu, arriver 5 - 10 minutes en avance,
            potentiellement attendre dans la salle d’attente jusqu’à 15 minutes après l’heure dite, et enfin,
            rencontrer la personne.
          </p>

          <p>
            En Afrique, disons que les choses peuvent se passer de manière plus “funky”.
            Les trois premières étapes sont généralement similaires, que vous soyez en Europe ou en Afrique.
            Les choses se corsent lors des étapes suivantes...
            Tout d’abord, le secrétariat vous reçoit en vous demandant si le rdv a bien été confirmé car
            vous n’êtes pas dans l’emploi du temps... À ce moment-là, vous commencez un peu à stresser,
            car vous avez fait 6000 kms pour ces rdvs et vous vous êtes mis sur votre 31,
            mais vous gardez confiance en pensant simplement que la secrétaire n’a pas été mise au courant.
            10, 15, 30, puis 40 minutes passent et vous êtes toujours dans cette même salle d’attente en espérant
            qu’on ne vous a pas oublié. Après 45 minutes d’attente, vous convenez avec la secrétaire qu’il vaut
            mieux partir et reprendre rdv avec la personne que vous deviez rencontrer. A cet instant,
            il y a ceux qui s’énerveraient et décideraient de changer d’interlocuteur, et il y a les gens comme nous.
            Ceux qui dissocient business et émotions, et qui sont prêts à tout pour obtenir ce qu’ils sont venus chercher.
            La deuxième tentative fut la bonne, et le rdv fut fructueux et riche en apprentissages.
          </p>

          <p>
            Au-delà des rdvs que nous avons pu avoir avec les enseignes de magasins,
            il est vrai qu’il est toujours plaisant pour Doris et pour moi, de nous rendre en Afrique.
            Discuter avec les gens dans un marché, leur demander s’ils reçoivent de l’argent venant de proches en Europe,
            aller visiter des points de ventes, remarquer les différences entre les magasins urbains et ruraux.
            Bref, Myfa nous demande un travail considérable au niveau de l’évaluation des besoins réels des populations,
            de leurs modes de fonctionnement, et il n’y a que sur le terrain que nous pourrons déceler les détails des rouages
            de la subvention aux besoins des populations locales par la diaspora.
          </p>

          <p>
            Forts de ces constatations et de cette première expérience, nous pouvons affirmer que nous serons souvent
            présents sur le continent africain, pour constamment améliorer l’expérience du Cash-to-Goods et donner le choix
            à la diaspora quant aux moyens. Restez donc à l’écoute.
          </p>

          <p>
            <a href='https://twitter.com/hashtag/toutpourlamyfa' target='_blank' rel="noopener noreferrer">#toutpourlamyfa</a>
            <br />
            <a href='https://twitter.com/hashtag/Africa' target='_blank' rel="noopener noreferrer">#Africa</a>
            <br />
            <a href='https://twitter.com/hashtag/entrepreneuriat' target='_blank' rel="noopener noreferrer">#entrepreunariat</a>
          </p>

          <div>
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              class="twitter-share-button"
              data-text="Encore un article cool de la @myfa_fr "
              data-hashtags="entreprenariat, afrique, toutpourlamyfa"
              data-show-count="false"
            >
              Tweet
            </a>
            {/* <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}
            <div>
              <div
                className="fb-share-button"
                data-href="https://www.myfa.fr/articles/voyage-abidjan"
                data-layout="button"
                data-size="large"
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default Article
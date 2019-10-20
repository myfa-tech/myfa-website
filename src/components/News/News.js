import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaQuoteLeft } from 'react-icons/fa'

import Slider from '../Slider'
import './News.scss'

const News = () => {
  const slides = [
    {
      id:'voyage-abidjan',
      description: 'Si on nous avait dit, il y a 8 mois, lorsque nous nous lancions, que les choses se concrétiseraient aussi rapidement, je n’y aurais pas cru, et Doris non plus. Voilà déjà 1 semaine que nous sommes rentrés de notre premier “voyage d’affaires”, ni plus ni moins qu’en Côte d’Ivoire. En Afrique, continent qui nous est cher.',
      url: '/articles/voyage-abidjan',
      author: 'florian'
    },
    {
      id:'global-women-startup-weekend-paris',
      description: 'On est d’accord, le nom de l’évènement est long. Mais le principe est simple ! « Women », vous l’aurez compris, signifie que les porteuses de projets sont uniquement des femmes (Who run the world ? demandez à Beyoncé).',
      url: '/articles/global-women-startup-weekend-paris',
      author: 'doris'
    },
    {
      id:'appli-pour-la-mif',
      description: 'Hein ? Quoi ? Que veut dire “Myfa” ? Cela veut dire “famille” en verlan. Le verlan étant une forme d&#39;argot français qui consiste en l&#39;inversion des syllabes d&#39;un mot. Vous comprendrez donc d’où le chanteur Stromae tient son nom… Le y ? juste pour le style...',
      url: '/articles/appli-pour-la-mif',
      author: 'doris'
    },
  ]

  return (
    <section id='news' className='section section-4'>
      <Container>
        <div className='title-container'>
          <h2>Actualités</h2>
        </div>

        <Slider
          slides={slides}
          type='articles'
        />
      </Container>
    </section>
  )
}

export default News

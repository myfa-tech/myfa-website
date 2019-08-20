import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import moment from 'moment'

import '../Article.scss'

import dorisSrc from '../../../assets/images/doris.png'

const Article1 = () => (
  <Container className='article-container'>
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h1>Myfa, une application pensée pour la mif</h1>

        <div className='author'>
          <img src={dorisSrc} />
          <div>
            <span>Doris Somon</span>
            <span className='date'>{moment.utc(1566285169108).format('D MMM YYYY')}</span>
          </div>
        </div>

        <p>
          Hein ? Quoi ? Que veut dire “Myfa” ? <br />
          Cela veut dire “famille” en verlan.
          Le verlan étant une forme d'argot français qui consiste en
          l'inversion des syllabes d'un mot.
          Vous comprendrez donc d’où le chanteur Stromae tient son nom… <br />
          Le y ? juste pour le style !
        </p>
      </Col>
    </Row>
  </Container>
)

export default Article1

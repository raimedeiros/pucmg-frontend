import React, { useEffect, useState } from 'react'
import {Container, Col, Row} from 'react-grid-system'
import './estoques.css'
import {FiBox} from 'react-icons/fi'
import Menu from '../Menu'
import api from '../../services/api'

interface Estoque{
  id: number;
  name: string;
  type:string;
  quantidade_produtos:number
}
const Estoques = ()=> {

  const [estoques,setEstoques] = useState<Estoque[]>([])

  useEffect(()=>{
    api.get('estoques').then(response=>{
      setEstoques(response.data)
    })
  },[])

  return(
    <Container id="page-estoques">
      <Row className="main-row">
        <Col md={2}>
          <Menu></Menu>
        </Col>
        <Col className="content-page" md={10}>
          <div className="main-padding">
            <h1 className="titulo-pagina">
              <FiBox></FiBox>Estoques
            </h1>
            <Row>
              {estoques.map(estoque=>(
                <Col md={4}>
                  <div className="card-estoque">
                    <div className="head-estoque">
                      <div className="icon-estoque">
                        <span><FiBox></FiBox></span>
                      </div>
                      <div className="box-titulo-estoque">
                        <div className="titulo-estoque">{estoque.name}</div>
                        <div className="tipo-estoque">{estoque.type}</div>
                      </div>
                    </div>
                    <div className="body-estoque">
                      <div className="quantidade-itens">
                        {estoque.quantidade_produtos}<span>itens</span>
                      </div>
                    </div>
                    <div className="footer-estoque">
                      <p className="alerta-amarelo">03 itens próximos ao vencimento</p>
                      <p className="alerta-vermelho">04 itens vencidos</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
export default Estoques
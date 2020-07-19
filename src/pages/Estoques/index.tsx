import React, { useEffect, useState } from 'react'
import {Container, Col, Row} from 'react-grid-system'
import './estoques.css'
import {FiBox,FiPlusCircle} from 'react-icons/fi'
import Menu from '../Menu'
import api from '../../services/api'
import Produtos from '../Produtos'
import { Link } from 'react-router-dom'

interface Estoque{
  id:number;
  name:string;
  type:string;
  quantidade_produtos:number
}
interface Produto{
  id:number;
  name:string;
}
const Estoques = ()=> {

  const [estoques,setEstoques] = useState<Estoque[]>([])
  const [estoqueSelecionado,setEstoqueSelecionado] = useState(0)

  useEffect(()=>{
    api.get('estoques').then(response=>{
      setEstoques(response.data)
    })
  },[estoques])

  function handleEstoqueSelecionado(estoque:number){
    setEstoqueSelecionado(estoque)
    console.log(estoqueSelecionado);
  }

  return(
    <Container id="page-estoques">
      <Row className="main-row">
        <Col md={2}>
          <Menu></Menu>
        </Col>

        <Col className="content-page" md={10}>
          <div className="main-padding">
            <Row>
              <Col className="titulo-pagina">
                <h1><FiBox></FiBox>Estoques</h1>
              </Col>
              <Col className="adicionar-item">
                <Link to='/estoques/create?'>
                  <button className="button-roxo"><FiPlusCircle></FiPlusCircle>Adicionar estoque</button>
                </Link> 
              </Col>
            </Row>
            <Row>
              {estoques.map(estoque=>(
                <Col md={4} key={estoque.id}>
                  <div className="card-estoque" onClick={()=>handleEstoqueSelecionado(estoque.id)}>
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
                        {estoque.quantidade_produtos}<span>{estoque.quantidade_produtos>1?'itens':'item'}</span>
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
            <Row>
              <Col>
                {
                  estoqueSelecionado>0 ? (
                    <Produtos estoqueSelecionado={estoqueSelecionado}></Produtos>
                  )
                  : ('')
                }
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
export default Estoques
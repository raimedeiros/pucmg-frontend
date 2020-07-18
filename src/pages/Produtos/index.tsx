import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-grid-system'
import {FiShoppingBag,FiPlusCircle,FiEdit,FiTrash2} from 'react-icons/fi'
import './produtos.css'
import api from '../../services/api'

type ProdutoProps = {
  estoqueSelecionado:number;
}
interface Produtos {
  id:number;
  name:string;
  expires:Date;
  quantity:number;
}
export default function Produtos({estoqueSelecionado}:ProdutoProps){
  
  const [produtos, setProdutos] = useState<Produtos[]>([])
  
  useEffect(()=>{
    api.get(`produtos?estoque=${estoqueSelecionado}`).then(response=>{
      setProdutos(response.data)
    })
  },[estoqueSelecionado])
  return(
    <div id="page-produtos">
      <Row>
        <Col className="titulo-pagina">
          <h1>
            <FiShoppingBag></FiShoppingBag>Produtos
          </h1>
        </Col>
        <Col className="adicionar-item">
          <button className="button-roxo"><FiPlusCircle></FiPlusCircle>Adicionar produto</button>
        </Col>
      </Row>
      <Row>
        <Col>
          <table className="lista-produtos">
            <thead>
              <tr>
                <th className="cell-name">Produto</th>
                <th>Validade</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                produtos.map(produto=>(
                  <tr className="linha-produto">
                      <td className="cell-name">{produto.name}</td>
                      <td className="cell-expires">{produto.expires}</td>
                      <td className="cell-amount">{produto.quantity}</td>
                      <td className="cell-actions"><FiEdit></FiEdit><FiTrash2></FiTrash2></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  )
}
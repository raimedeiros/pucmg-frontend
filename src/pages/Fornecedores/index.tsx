import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-grid-system';
import { FiShoppingBag, FiPlusCircle } from 'react-icons/fi';
import api from '../../services/api';
import Menu from '../Menu';

interface Fornecedor {
  id: string;
  name: string;
  address: string;
  phone: string;
}

const Fornecedores: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  useEffect(() => {
    api.get('fornecedores').then(response => {
      setFornecedores(response.data);
    });
  }, []);

  return (
    <Container id="page">
      <Row className="main-row">
        <Col md={2}>
          <Menu />
        </Col>

        <Col className="content-page" md={10}>
          <div className="main-padding">
            <Row>
              <Col className="titulo-pagina">
                <h1>
                  <FiShoppingBag />
                  Fornecedores
                </h1>
              </Col>
              <Col className="adicionar-item">
                <Link to="/fornecedores/create">
                  <button type="button" className="button-roxo">
                    <FiPlusCircle />
                    Adicionar fornecedor
                  </button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <table className="lista-tabela-padrao">
                  <thead>
                    <tr>
                      <th className="cell-name">Fornecedor</th>
                      <th>Endereço</th>
                      <th>Telefone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fornecedores.map(fornecedor => (
                      <tr className="linha-fornecedor" key={fornecedor.id}>
                        <td className="cell-name">{fornecedor.name}</td>
                        <td className="cell-amount">{fornecedor.address}</td>
                        <td className="cell-actions">{fornecedor.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Fornecedores;

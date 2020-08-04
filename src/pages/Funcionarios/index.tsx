import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-grid-system';
import { FiShoppingBag, FiPlusCircle, FiEdit } from 'react-icons/fi';
import api from '../../services/api';
import Menu from '../Menu';

interface Fornecedor {
  id: string;
  name: string;
  type: string;
}

const Fornecedores: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Fornecedor[]>([]);

  useEffect(() => {
    api.get('funcionarios').then(response => {
      setFuncionarios(response.data);
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
                  Funcionários
                </h1>
              </Col>
              <Col className="adicionar-item">
                <Link to="/funcionarios/create">
                  <button type="button" className="button-roxo">
                    <FiPlusCircle />
                    Adicionar funcionário
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
                      <th>Tipo</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funcionarios.map(funcionario => (
                      <tr className="linha-funcionario" key={funcionario.id}>
                        <td className="cell-name">{funcionario.name}</td>
                        <td className="cell-amount">{funcionario.type}</td>
                        <td className="cell-actions">
                          <Link to={`funcionarios/create/${funcionario.id}`}>
                            <FiEdit />
                          </Link>
                        </td>
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
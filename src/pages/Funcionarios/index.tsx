import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-grid-system';
import { FiShoppingBag, FiEdit, FiDelete } from 'react-icons/fi';
import ReactExport from 'react-export-excel';
import api from '../../services/api';
import Menu from '../Menu';

interface Fornecedor {
  id: string;
  name: string;
  type: string;
}

const Fornecedores: React.FC = () => {
  const { ExcelFile } = ReactExport;
  const { ExcelSheet } = ReactExport.ExcelFile;
  const { ExcelColumn } = ReactExport.ExcelFile;

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
            </Row>
            <Row>
              <Col>
                <table className="lista-tabela-padrao">
                  <thead>
                    <tr>
                      <th className="cell-name">Funcionário</th>
                      <th>Cargo</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funcionarios.map(funcionario => (
                      <tr className="linha-funcionario" key={funcionario.id}>
                        <td className="cell-name">{funcionario.name}</td>
                        <td className="cell-amount">{funcionario.type}</td>
                        <td className="cell-actions">
                          <Link to={`funcionarios/update/${funcionario.id}`}>
                            <FiEdit />
                          </Link>
                          <Link to={`funcionarios/delete/${funcionario.id}`}>
                            <FiDelete />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row>
              <Col className="baixar-dados">
                <ExcelFile
                  filename="planilha-de-dados"
                  element={
                    <button type="button" className="button-download">
                      Exportar dados
                    </button>
                  }
                >
                  <ExcelSheet data={funcionarios} name="Funcionários">
                    <ExcelColumn label="Funcionário" value="name" />
                    <ExcelColumn label="Tipo" value="type" />
                  </ExcelSheet>
                </ExcelFile>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Fornecedores;

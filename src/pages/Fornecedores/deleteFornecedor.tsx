import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Container, Col, Row } from 'react-grid-system';
import { FiBox } from 'react-icons/fi';

import Menu from '../Menu';
import api from '../../services/api';

interface DeleteFornecedorParams {
  fornecedor: string;
}
interface Fornecedor {
  name: string;
  address: string;
}
const DeleteFornecedor: React.FC = () => {
  const history = useHistory();
  const { params } = useRouteMatch<DeleteFornecedorParams>();
  const [fornecedor, setFornecedor] = useState<Fornecedor>();

  useEffect(() => {
    api.get(`/fornecedores/${params.fornecedor}`).then(response => {
      setFornecedor({
        name: response.data.name,
        address: response.data.address,
      });
    });
  }, [params.fornecedor]);

  async function handleDeleteFornecedor(): Promise<void> {
    api.delete(`/fornecedores/${params.fornecedor}`);
    history.push('/fornecedores');
  }

  return (
    <Container id="page">
      <Row className="main-row">
        <Col md={2}>
          <Menu />
        </Col>

        <Col className="content-page" md={10}>
          <div className="main-padding">
            <header>
              <Row>
                <Col className="titulo-pagina">
                  <h1>
                    <FiBox />
                    Remover fornecedor
                  </h1>
                </Col>
              </Row>
            </header>
            <Row>
              <Col>
                <strong>
                  Tem certeza que deseja remover o fornecedor abaixo?
                </strong>
                {fornecedor && (
                  <div>
                    <p>{fornecedor.name}</p>
                    <p>{fornecedor.address}</p>
                    <button
                      className="button-roxo"
                      type="button"
                      onClick={handleDeleteFornecedor}
                    >
                      Remover
                    </button>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteFornecedor;

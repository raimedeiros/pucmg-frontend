import React from 'react';
import { Row, Col, Container } from 'react-grid-system';
import { FiAlertCircle } from 'react-icons/fi';
import Menu from '../Menu';

const PermissaoNegada: React.FC = () => {
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
                <Col className="titulo-pagina" sm={12} md={6}>
                  <h1>
                    <FiAlertCircle />
                    Permissão negada
                  </h1>
                </Col>
              </Row>
            </header>
            <Row>
              <Col>
                <p>
                  <strong>Atenção:</strong>
                  Esta ação só é valida para gerentes.
                </p>
                <p>
                  Caso queira ter acesso ao controle de funcionários, peça
                  permissão ao seu gerente
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PermissaoNegada;

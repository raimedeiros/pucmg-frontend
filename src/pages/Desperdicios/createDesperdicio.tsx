import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Container, Col, Row } from 'react-grid-system';
import { FiBox, FiCheckCircle } from 'react-icons/fi';

import { isToday } from 'date-fns';
import api from '../../services/api';
import Menu from '../Menu';

interface CreateProductsParams {
  produto: string;
}

interface Produto {
  id: number;
  name: string;
  expires: Date;
  amount: number;
}
const CreateProduto: React.FC = () => {
  const { params } = useRouteMatch<CreateProductsParams>();
  const [produto, setProduto] = useState<Produto>();
  const history = useHistory();

  useEffect(() => {
    api.get(`produtos/${params.produto}`).then(response => {
      setProduto(response.data.produtos);
    });
  }, [params.produto]);

  async function handleAddDesperdicio(): Promise<void> {
    if (produto) {
      const { name, expires, amount } = produto;
      const today = new Date();
      const desperdício = {
        name,
        date: today,
        amount,
        reason: 'vencido',
      };
      await api.post('desperdicios', desperdício);
      await api.delete(`produtos/${produto.id}`);
    }
    history.push('/desperdicios');
    // await api.post('desperdicios', produto);
  }

  return (
    <Container id="page-create-produtos">
      <Row className="main-row">
        <Col md={2}>
          <Menu />
        </Col>

        <Col className="content-page" md={10}>
          <div className="main-padding">
            <Row>
              <Col className="titulo-pagina">
                <h1>
                  <FiBox />
                  Registrar desperdício
                </h1>
              </Col>
            </Row>
            {produto && (
              <Row>
                <Col>
                  <div>
                    <p>
                      Tem certeza que deseja adicionar este produto como
                      desperdício?
                    </p>
                    <strong>{produto.name}</strong>
                    <p>{`Quantidade: ${produto.amount}`}</p>
                    <button
                      type="button"
                      className="button-roxo"
                      onClick={handleAddDesperdicio}
                    >
                      <FiCheckCircle />
                      Registrar desperdício
                    </button>
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProduto;

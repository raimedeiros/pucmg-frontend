import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Container, Col, Row } from 'react-grid-system';
import { FiBox } from 'react-icons/fi';

import Menu from '../Menu';
import api from '../../services/api';

interface TiposFuncionario {
  id: number;
  name: string;
}
interface DeleteFuncionarioParams {
  funcionario: string;
}
interface Funcionario {
  name: string;
  type: string;
}
const DeleteFuncionario: React.FC = () => {
  const history = useHistory();
  const { params } = useRouteMatch<DeleteFuncionarioParams>();
  const [funcionario, setFuncionario] = useState<Funcionario>();

  useEffect(() => {
    api.get(`/funcionarios/${params.funcionario}`).then(response => {
      setFuncionario({
        name: response.data.funcionario.name,
        type: response.data.tipo_funcionario.name,
      });
    });
  }, [params.funcionario]);

  async function handleDeleteFuncionario(): Promise<void> {
    api.delete(`/funcionarios/${params.funcionario}`);
    history.push('/funcionarios');
  }

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
                  <FiBox />
                  Remover funcionário
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>
                  Tem certeza que deseja remover o funcionário abaixo?
                </strong>
                {funcionario && (
                  <div>
                    <p>{`${funcionario.name} (${funcionario.type})`}</p>
                    <button
                      className="button-roxo"
                      type="button"
                      onClick={handleDeleteFuncionario}
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

export default DeleteFuncionario;

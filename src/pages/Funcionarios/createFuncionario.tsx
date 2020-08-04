import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Container, Col, Row } from 'react-grid-system';
import { FiBox } from 'react-icons/fi';

import Menu from '../Menu';
import api from '../../services/api';

interface TiposFuncionario {
  id: number;
  name: string;
}
interface CreateFuncionarioParams {
  funcionario: string;
}
const CreateFuncionario: React.FC = () => {
  const { params } = useRouteMatch<CreateFuncionarioParams>();

  const [tiposFuncionario, setTiposFuncionario] = useState<TiposFuncionario[]>(
    [],
  );
  const [selectedTipoFuncionario, setSelectedTipoFuncionario] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
  });

  useEffect(() => {
    api.get(`/funcionarios/${params.funcionario}`).then(response => {
      const funcionario = {
        name: response.data.funcionario.name,
        type: response.data.tipo_funcionario.tipo,
      };
      setFormData(funcionario);
    });
  }, [params.funcionario]);

  useEffect(() => {
    api.get('/tipos-funcionarios').then(response => {
      setTiposFuncionario(response.data);
    });
  }, []);

  const history = useHistory();

  async function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    const { name } = formData;
    const data = {
      name,
      type: selectedTipoFuncionario,
    };
    await api.post('funcionarios', data);
    history.push('/funcionarios');
  }
  async function handleSelectedTipoEstoque(
    event: ChangeEvent<HTMLSelectElement>,
  ): Promise<void> {
    const tipoEstoque = event.target.value;
    setSelectedTipoFuncionario(tipoEstoque);
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
                  Adicionar funcionário
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <form className="form-padrao" onSubmit={handleSubmit}>
                  <div className="field">
                    <label htmlFor="name">
                      Nome
                      <div className="input-box">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="field">
                    <label htmlFor="type">
                      Tipo
                      <select
                        name="type"
                        id="type"
                        value={formData.type}
                        onChange={handleSelectedTipoEstoque}
                      >
                        <option value="0">
                          Selecione um tipo de funcionário
                          {formData.type}
                        </option>
                        {tiposFuncionario.map(tipoFuncionario => (
                          <option
                            key={tipoFuncionario.id}
                            value={tipoFuncionario.id}
                          >
                            {tipoFuncionario.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="submit-button">
                    <button type="submit" className="button-roxo">
                      Salvar
                    </button>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateFuncionario;
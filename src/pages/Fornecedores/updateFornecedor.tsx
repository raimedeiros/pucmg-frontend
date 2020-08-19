import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Container, Col, Row } from 'react-grid-system';
import { FiBox } from 'react-icons/fi';

import Menu from '../Menu';
import api from '../../services/api';

interface UpdateFornecedorParams {
  fornecedor: string;
}
const UpdateFornecedor: React.FC = () => {
  const { params } = useRouteMatch<UpdateFornecedorParams>();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    api.get(`/fornecedores/${params.fornecedor}`).then(response => {
      const fornecedor = {
        name: response.data.name,
        address: response.data.address,
        phone: response.data.phone,
      };
      setFormData(fornecedor);
    });
  }, [params.fornecedor]);

  const history = useHistory();

  async function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    const { name, address, phone } = formData;
    const data = {
      name,
      address,
      phone,
    };
    await api.post(`fornecedores/${params.fornecedor}`, data);
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
                    Atualizar fornecedor
                  </h1>
                </Col>
              </Row>
            </header>
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
                    <label htmlFor="address">
                      Endereço
                      <div className="input-box">
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="field">
                    <label htmlFor="phone">
                      Telefone
                      <div className="input-box">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
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

export default UpdateFornecedor;

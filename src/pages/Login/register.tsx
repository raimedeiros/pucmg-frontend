import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Col, Row } from 'react-grid-system';

import logo from '../../assets/Logo.svg';
import api from '../../services/api';
import './login.css';

interface TiposFuncionario {
  id: number;
  name: string;
}

const CreateFuncionario: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 0,
  });

  const history = useHistory();

  async function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    const { name, email, password } = formData;
    const data = {
      name,
      email,
      password,
    };
    await api.post('funcionarios', data);
    history.push('/');
  }

  return (
    <Container fluid id="page-login" className="page-register">
      <Row className="content">
        <Col className="logo" xs={12} offset={{ md: 4 }} md={4}>
          Despensa
        </Col>
        <Col xs={12} md={4} offset={{ md: 4 }}>
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
              <label htmlFor="email">
                E-mail
                <div className="input-box">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </label>
            </div>
            <div className="field">
              <label htmlFor="password">
                Senha
                <div className="input-box">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
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
    </Container>
  );
};

export default CreateFuncionario;

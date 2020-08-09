import React, { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import { FiLogIn, FiPlusCircle, FiUser, FiKey } from 'react-icons/fi';
import { Container, Row, Col } from 'react-grid-system';
import FacebookLogin from 'react-facebook-login';
import api from '../../services/api';

interface FacebookLoginProfile {
  name: string;
  email: string;
}
const Login: React.FC = () => {
  const history = useHistory();

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    history.push('/estoques');
  }
  async function responseFacebook(response: any): Promise<void> {
    console.log('data facebook: ', response);
    const funcionarioFacebook = {
      name: response.name,
      email: response.email,
    };
    console.log(funcionarioFacebook);
    api.post('funcionarios');
  }

  async function componentClicked(response: any): Promise<void> {
    console.log(response);
  }

  return (
    <Container fluid id="page-login">
      <Row className="content">
        <Col className="logo" xs={12} offset={{ md: 4 }} md={4}>
          Despensa
        </Col>
        <Col xs={12} md={4} offset={{ md: 4 }}>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="usuario">
                Usuário
                <div className="input-box">
                  <input type="text" name="usuario" id="usuario" />
                  <span className="dcr-input">
                    <FiUser />
                  </span>
                </div>
              </label>
            </div>
            <div className="field">
              <label htmlFor="senha">
                Senha
                <div className="input-box">
                  <input type="password" name="senha" id="senha" />
                  <span className="dcr-input">
                    <FiKey />
                  </span>
                </div>
              </label>
            </div>
            <div className="submit-button">
              <button type="submit" className="button-roxo">
                <FiLogIn />
                Entrar
              </button>
            </div>
          </form>
          <div className="novo-usuario">
            <Link to="/register">
              <FiPlusCircle />
              Criar novo usuário
            </Link>
          </div>
          <div>
            <FacebookLogin
              appId="1546719762173713"
              autoLoad
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

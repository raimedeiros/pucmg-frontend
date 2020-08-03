import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { FiLogIn, FiPlusCircle, FiUser, FiKey } from 'react-icons/fi';
import { Container, Row, Col } from 'react-grid-system';
import Logo from '../../assets/Logo.svg';

const Login: React.FC = () => {
  return (
    <Container fluid id="page-login">
      <Row className="content">
        <Col className="logo" xs={12} offset={{ md: 4 }} md={4}>
          <img src={Logo} alt="logo" />
        </Col>
        <Col xs={12} md={4} offset={{ md: 4 }}>
          <form>
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
            <Link to="/Estoques">
              <FiPlusCircle />
              Criar novo usuário
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

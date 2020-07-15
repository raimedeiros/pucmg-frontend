import React from 'react'
import {Link} from 'react-router-dom'
import './login.css'
import Logo from '../../assets/Logo.svg'
import {FiLogIn, FiPlusCircle, FiUser, FiKey} from 'react-icons/fi'
import { Container, Row, Col } from 'react-grid-system';

const Login = () => {
  return(
    <Container fluid id="page-login">
      <Row className="content">
         <Col className="logo" xs={12} offset={{md: 4}} md={4}>
          <img src={Logo} alt="logo"></img>
        </Col>
        <Col xs={12} md={4} offset={{md:4}}>
          <form>
            <div className="field">
              <label htmlFor="usuario">Usuário</label>
              <div className="input-box">
                <input type="text" name="usuario" id="usuario"/>
                <span className="dcr-input"><FiUser/></span>
              </div>
            </div>
            <div className="field">
              <label htmlFor="senha">Senha</label>
              <div className="input-box">
                <input type="password" name="senha" id="senha"/>
                <span className="dcr-input"><FiKey/></span>
              </div>
            </div>
            <div className="submit-button">
              <button type="submit" className="button-roxo"><FiLogIn/>Entrar</button>
            </div>  
          </form>
          <div className="novo-usuario">
            <Link to="#"><FiPlusCircle/>Criar novo usuário</Link>
          </div>
        </Col>  
      </Row>
    </Container>
  )
}

export default Login
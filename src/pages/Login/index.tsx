import React from 'react'
import {Link} from 'react-router-dom'
import './login.css'
import Logo from '../../assets/Logo.svg'
import {FiLogIn, FiPlusCircle, FiUser, FiKey} from 'react-icons/fi'

const Login = () => {
  return(
    <div id="page-login">
      <div className="content">
        <img className="logo" src={Logo} alt="logo"></img>
        <div className="form-login">
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
            <div className="align-right">
              <button type="submit" className="button-roxo"><FiLogIn/>Entrar</button>
            </div>  
          </form>
          <div className="novo-usuario align-right">
            <Link to="#"><FiPlusCircle/>Criar novo usuário</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
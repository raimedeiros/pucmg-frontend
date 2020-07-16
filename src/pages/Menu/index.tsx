import React from 'react'
import LogoMin from '../../assets/Logo-min.svg'
import './menu.css'
import {FiHome} from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Menu = () => {
  return(
    <div id="page-menu">
      <div className="menu-logo">
        <img src={LogoMin} alt="Logo"></img>
      </div>
      <div className="breadcrumbs">
        <FiHome></FiHome> Início {'>'} Estoque
      </div>
      <ul className="lista-menu">
        <li><Link to="/estoques">Estoques</Link></li>
        <li>Funcionários</li>
        <li>Desperdícios</li>
      </ul>
    </div>
  )
}

export default Menu
import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

import LogoMin from '../../assets/Logo-min.svg';
import './menu.css';

const Menu: React.FC = () => {
  return (
    <div id="page-menu">
      <div className="menu-logo">
        <img src={LogoMin} alt="Logo" />
      </div>
      <div className="breadcrumbs">
        <FiHome />
        <div>
          Início
          {' > '}
          Estoque
        </div>
      </div>
      <ul className="lista-menu">
        <li>
          <Link to="/estoques">Estoques</Link>
        </li>
        <li>
          <Link to="/desperdicios">Desperdícios</Link>
        </li>
        <li>Funcionários</li>
      </ul>
    </div>
  );
};

export default Menu;

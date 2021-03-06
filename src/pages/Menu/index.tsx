import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import './menu.css';

const Menu: React.FC = () => {
  const history = useHistory();
  const [flagMenu, setFlagMenu] = useState<boolean>(false);

  async function handleMenu(): Promise<void> {
    if (!flagMenu) {
      setFlagMenu(true);
    } else {
      setFlagMenu(false);
    }
  }

  function handleLogout(): void {
    localStorage.removeItem('tokens');
    history.push('/');
  }

  return (
    <div id="page-menu">
      <div
        className={`responsive-menu ${
          flagMenu ? 'mostrar-menu' : 'esconder-menu'
        }`}
      >
        <div className="menu-logo">
          <div className="logo-img">Despensa</div>
          <div className="menu-trigger">
            <button type="button" onClick={handleMenu}>
              <FiMenu size={30} />
            </button>
          </div>
        </div>
        <div className="lista-menu">
          <ul>
            <li>
              <Link to="/estoques">Estoques</Link>
            </li>
            <li>
              <Link to="/desperdicios">Desperdícios</Link>
            </li>
            <li>
              <Link to="/fornecedores">Fornecedores</Link>
            </li>
            <li>
              <Link to="/funcionarios">Funcionários</Link>
            </li>
            <li>
              <Link to="/relatorios/desperdicios">Relatório</Link>
            </li>
          </ul>
          <div className="link-sair">
            <FiLogOut />
            <button type="button" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Estoques from './pages/Estoques';
import CreateEstoque from './pages/Estoques/createEstoque';
import CreateProduto from './pages/Produtos/createProduto';
import Desperdicios from './pages/Desperdicios/index';
import CreateDesperdicios from './pages/Desperdicios/createDesperdicio';
import CreateFornecedor from './pages/Fornecedores/createFornecedor';
import Fornecedores from './pages/Fornecedores';
import Funcionarios from './pages/Funcionarios';
import CreateFuncionario from './pages/Funcionarios/createFuncionario';
import RelatorioDesperdicios from './pages/Relatorios/relatorioDesperdicios';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" exact />
        <Route component={Estoques} path="/estoques" exact />
        <Route component={Desperdicios} path="/desperdicios" exact />
        <Route component={Fornecedores} path="/fornecedores" exact />
        <Route component={Funcionarios} path="/funcionarios" exact />

        <Route component={CreateEstoque} path="/estoques/create" />
        <Route component={CreateProduto} path="/produtos/create/:estoque" />
        <Route
          component={CreateDesperdicios}
          path="/desperdicios/create/:produto"
        />
        <Route component={CreateFornecedor} path="/fornecedores/create" exact />
        <Route
          component={CreateFuncionario}
          path="/funcionarios/create/:funcionario?"
        />
        <Route
          component={RelatorioDesperdicios}
          path="/relatorios/desperdicios"
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

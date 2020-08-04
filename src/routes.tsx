import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Estoques from './pages/Estoques';
import CreateEstoque from './pages/Estoques/createEstoque';
import CreateProduto from './pages/Produtos/createProduto';
import Desperdicios from './pages/Desperdicios/index';
import CreateDesperdicios from './pages/Desperdicios/createDesperdicio';
import CreateFornecedor from './pages/Fornecedores/createFornecedor';
import Fornecedores from './pages/Fornecedores';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route component={Login} path="/" exact />
      <Route component={Estoques} path="/estoques" exact />
      <Route component={CreateEstoque} path="/estoques/create" />
      <Route component={CreateProduto} path="/produtos/create/:estoque" />
      <Route component={Desperdicios} path="/desperdicios" exact />
      <Route
        component={CreateDesperdicios}
        path="/desperdicios/create/:produto"
      />
      <Route component={Fornecedores} path="/fornecedores" exact />
      <Route component={CreateFornecedor} path="/fornecedores/create" exact />
    </BrowserRouter>
  );
};

export default Routes;

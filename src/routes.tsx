/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Login/register';
import Estoques from './pages/Estoques';
import CreateEstoque from './pages/Estoques/createEstoque';
import CreateProduto from './pages/Produtos/createProduto';
import Desperdicios from './pages/Desperdicios/index';
import CreateDesperdicios from './pages/Desperdicios/createDesperdicio';
import CreateFornecedor from './pages/Fornecedores/createFornecedor';
import Fornecedores from './pages/Fornecedores';
import Funcionarios from './pages/Funcionarios';
import UpdateFuncionario from './pages/Funcionarios/updateFuncionario';
import DeleteFuncionario from './pages/Funcionarios/deleteFuncionario';
import RelatorioDesperdicios from './pages/Relatorios/relatorioDesperdicios';

import { isAuthenticated } from './auth';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const [authCredentials, setAuthCredentials] = useState();
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated().credentials.facebook) {
          return <Component {...props} />;
        }
        return (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        );
      }}
    />
  );
};

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/app" component={() => <h1>Você está logado</h1>} />
        <Route component={Login} path="/" exact />
        <Route component={Register} path="/register" exact />
        <PrivateRoute component={Estoques} path="/estoques" exact />
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
          component={UpdateFuncionario}
          path="/funcionarios/update/:funcionario?"
        />
        <Route
          component={DeleteFuncionario}
          path="/funcionarios/delete/:funcionario?"
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

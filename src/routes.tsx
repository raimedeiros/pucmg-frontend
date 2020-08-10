/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-newline */

import React, { useState } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { AuthContext, useAuth } from './context/auth.js';

import Login from './pages/Login';
import Register from './pages/Register/register';
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

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { authTokens } = useAuth();
  console.log('private route');
  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const Routes: React.FC = () => {
  console.log('route');
  const existingTokens = localStorage.getItem('tokens');
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data: React.SetStateAction<string | null>) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <BrowserRouter>
        <Switch>
          <Route component={Register} path="/register" />
          <Route component={Login} path="/" exact />

          <PrivateRoute component={Estoques} path="/estoques" exact />
          <PrivateRoute component={Desperdicios} path="/desperdicios" exact />
          <PrivateRoute component={Fornecedores} path="/fornecedores" exact />
          <PrivateRoute component={Funcionarios} path="/funcionarios" exact />

          <PrivateRoute component={CreateEstoque} path="/estoques/create" />
          <PrivateRoute
            component={CreateProduto}
            path="/produtos/create/:estoque"
          />
          <PrivateRoute
            component={CreateDesperdicios}
            path="/desperdicios/create/:produto"
          />
          <PrivateRoute
            component={CreateFornecedor}
            path="/fornecedores/create"
            exact
          />
          <PrivateRoute
            component={UpdateFuncionario}
            path="/funcionarios/update/:funcionario?"
          />
          <PrivateRoute
            component={DeleteFuncionario}
            path="/funcionarios/delete/:funcionario?"
          />
          <PrivateRoute
            component={RelatorioDesperdicios}
            path="/relatorios/desperdicios"
          />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default Routes;

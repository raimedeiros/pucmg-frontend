import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

import Login from './pages/Login'
import Estoques from './pages/Estoques'
import CreateEstoque from './pages/Estoques/createEstoque'
import CreateProduto from './pages/Produtos/createProduto'
import CreateTipoEstoque from './pages/TipoEstoque'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Login} path="/" exact />
            <Route component={Estoques} path="/estoques" exact/>
            <Route component={CreateEstoque} path="/estoques/create"/>
            <Route component={CreateProduto} path="/produtos/create"/>
            <Route component={CreateTipoEstoque} path="/tipos-estoques/create"/>
        </BrowserRouter>
    )
}

export default Routes;
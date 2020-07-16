import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

import Login from './pages/Login'
import Estoques from './pages/Estoques'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Login} path="/" exact />
            <Route component={Estoques} path="/estoques"/>
        </BrowserRouter>
    )
}

export default Routes;
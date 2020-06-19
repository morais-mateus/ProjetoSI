import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastrar";
import Perfil from "./pages/Profile";
import EsqueceuSenha from "./pages/EsqueceuSenha";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Cadastro} />
        <Route path="/profile" component={Perfil} />
        <Route path="/remember" component={EsqueceuSenha} />
      </Switch>
    </BrowserRouter>
  );
}

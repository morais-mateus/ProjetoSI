import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastrar";
import Perfil from "./pages/Profile";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Cadastro} />
        <Route path="/profile" component={Perfil} />

      </Switch>
    </BrowserRouter>
  );
}

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi"; // Importação de icones

import api from "../../services/api";

import "./styles.css";

export default function Login() {
  const [pass, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    const credenciais = { email, pass };

    try {
      const response = await api.post("login", credenciais);

      // destruturando as informações retornadas pela api
      const { user, token } = response.data;

      const { id, nome, email } = user;

      alert(
        `Logado : ID: ${id}\n NOME: ${nome} \n EMAIL : ${email} \n Token : ${token}`
      );
      // salvando o token no localstorage

      localStorage.setItem("token", token);
      localStorage.setItem("id", id);

      history.push("/profile");
    } catch (error) {
      alert(`Erro ao realizar o Login! Tente Novamente` + error);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <h1> Faça Seu Login!</h1>
          <input
            placeholder="Digite o Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite o Senha"
            value={pass}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link to="/register">
            <FiLogIn size={16} color="#e02041" />
            Cadastre-se
          </Link>
        </form>
      </section>
    </div>
  );
}

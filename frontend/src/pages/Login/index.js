import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi"; // Importação de icones

import Button from '../../components/Button/Button';

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
    <main>
      <section>
        <form onSubmit={handleLogin}>
          <header>
            <a className="a1" href={"/"}>
              <img src="logo8.png"/>
            </a>
            <p>Área de login</p>
            <hr/>
          </header>
          <input type="text" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input input-texto"/>
          <input type="password" name="senha" placeholder="Senha" value={pass} onChange={e => setPassword(e.target.value)} className="input input-texto"/>
          <div className="margin-80-1">
            <input type="checkbox" name="lembrarUsuario" className="inline align-left"/>
            <label htmlFor="lembrarUsuario" className="inline align-left link-esqueceu-senha">Lembrar meu usuário</label>
            <a href={"/remember"} className="align-right a1">Esqueceu a senha?</a>
          </div>
          <div className="margin-80-1">
            <a className="a1"href={"/register"}>
              <button type="button" name="cadastrar" className="btn input" onAction={"/register"}>Cadastrar</button>
            </a>
            <button type="submit" name="enviar" className="btn input btn-enviar">Entrar</button>
          </div> 
        </form>
      </section>
    </main>
  );
}

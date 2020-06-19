import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";

export default function Register() {
  const [nome, setName] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const user_validado = true;
  const user_cuidador = true;

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = { nome, telefone, email, password, cpf, user_validado, user_cuidador };

    try {
      const response = await api.post("user/create", data);
      alert(`Cadastro Realizado com Sucesso! ! `);
      history.push("/");
    } catch (error) {
      alert(`Erro ao Cadastrar! Tente Novamente` + error);
    }
  }

  return (
    <main>
      <section>
        <form onSubmit={handleRegister}>
          <header>
            <a href={"/"}>
              <img src="logo8.png"/>
            </a>
            <p>Área de cadastro</p>
            <hr/>
          </header>
          <input type="text" name="nome" placeholder="Nome Completo" value={nome} onChange={e => setName(e.target.value)} className="input input-texto"/>
          <input type="text" name="telefone" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} className="input input-texto"/>
          <input type="text" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input input-texto"/>
          <input type="password" name="senha" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} className="input input-texto"/>
          <input type="password" name="confirmaSenha" placeholder="Confirme sua senha" value={cpf} onChange={e => setCpf(e.target.value)} className="input input-texto"/>
          <div className="margin-80">
            <a href={"/"} className="align-left">Já possui cadastro?</a>
            <input type="submit" name="cadastrar" className="btn input btn-enviar align-right" value="Cadastrar"/>
          </div>
        </form>
      </section>
    </main>
  );
}

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";

export default function Register() {
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const user_validado = true;
  const user_cuidador = true;

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = { nome, email, password, cpf, user_validado, user_cuidador };

    try {
      const response = await api.post("user/create", data);
      alert(`Cadastro Realizado com Sucesso! ! `);
      history.push("/");
    } catch (error) {
      alert(`Erro ao Cadastrar! Tente Novamente` + error);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Cadastro</h1>
          <p>Faça seu Cadastro, para entrar na comunidade PetParty!</p>
          <Link className="backlink" to="/">
            <FiArrowLeft size={16} color="#e02041 " />
            Não Tenho Cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome Completo"
            value={nome}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            placeholder="CPF"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

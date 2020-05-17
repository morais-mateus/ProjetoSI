import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
export default function Profile() {
  const history = useHistory();

  const [infoUser, setInfo] = useState([]);

  // pegando as variaveis do local storage
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
 

  // console.log(token);
  // console.log(id);

  useEffect(() => {
    api.post("info",{id} ).then(response => {
      setInfo(response.data);
    });
  }, [id]);
 
 



 

  return (
    <div className="profile-container">
      <header>
        <span>Bem Vindo, {infoUser.nome} </span>
     
      </header>
      <h1>Informações Pessoais</h1>
      <ul>
        <li>
          <p> Nome: {infoUser.nome}</p>
          <p> CPF : {infoUser.cpf}</p>
          <p> Email:{infoUser.email}</p>
          <p> Nome</p>
          <p> Nome</p>
          <p> Nome</p>
        </li>
      </ul>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";

export default function EsqueceuSenha() {

  return (
    <main>
		<section>
			<form>
				<header>
					<a href={"/"}>
						<img src="logo8.png"/>
					</a>
					<p>Área de recuperação de senha</p>
					<hr/>
				</header>
				<div className="margin-80 desc">
					<span>Para prosseguir por favor digite seu email no campo abaixo que enviaremos as instrucões para recuperação da sua senha</span>
				</div>
				<input type="text" name="email" placeholder="Email" className="input input-texto"/>
				<div className="margin-80">
					<a href={"/"} className="align-left">Voltar</a>
					<input type="submit" name="cadastrar" className="btn input btn-enviar align-right" value="Enviar"/>
				</div>
			</form>
		</section>
	</main>
  );
}

import * as Yup from "yup";
import User from "../models/User";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import mailer from "../config/mailer";

class UserController {
  async CriarUsuar(req, res) {
    // Validando campos de entrada

    // fim validacao dos campos

    /// Verificação email
    try {
      const userExists = await User.findOne({ email: req.body.email });
      // valida se o email já estava cadastrado
      if (userExists) {
        return res.status(400).send({ error: "Email já cadastrado no Banco!" });
      }

      // Gerando senha Aleatoria
      const pass = crypto.randomBytes(2).toString("hex");
      console.log("Senha Gerada -->" + pass);
      req.body.password = pass;
      console.log(pass);

      const now = new Date();
      console.log("hora atual" + now.getHours());
      now.setMinutes(now.getMinutes() + 5);

      req.body.passwordexpires = now;
      console.log("NOW--> " + now);
      console.log("EXPIRES--> " + req.body.passwordexpires);

      // criar usuário
      const {
        id,
        nome,
        email,
        user_cuidador,
        password,
        passwordexpires,
        cpf,
        usuario_validado,
      } = await User.create(req.body);

      // Enviando Email de senha
      const mail = await mailer.sendMail(
        {
          to: email,
          subject: " Sua senha Pet Party!",
          template: "auth/SenhaEmail",
          context: { pass },
        },
        (err) => {
          if (err)
            res.status(400).json({ error: " Error ao enviar o email" + err });
          else {
            return res.status(200).json({ error: " Email Enviado!" + err });
          }
        }
      );

      return res.json({
        id,
        nome,
        email,
        cpf,
        password,
        passwordexpires,
        user_cuidador,
        usuario_validado,
      });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Falha ao Cadastrar Usuario" } + err);
    }
  }


  // buscando informações do usuario
  async infoUser(req, res) {
    const { id } = await req.body;
    console.log("ID-->" + id);
    const user = await User.findById(id);
    console.log("User-->" + user);
    return res.json(user);
  }
}

export default new UserController();

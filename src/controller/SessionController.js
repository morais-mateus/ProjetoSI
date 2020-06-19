import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authConfig from "../config/auth";
import User from "../models/User";
import crypto from "crypto";
import mailer from "../config/mailer";

class SessionController {
  async store(req, res) {
    // LOGIN
    const { email, pass } = await req.body;
    const user = await User.findOne({ email }).select("+passwordexpires");

    if (!user) {
      return res.status(400).json({ error: "Email não cadastrado!" });
    }
    //cryptografa a senha que o usuario digitou e compara com a do usuario
    console.log("password banco->>" + user.password);

    let result = bcrypt.compareSync(pass, user.password);

    if (!result) {
      return res.status(400).json("Senha invalida! ");
    }
    console.log(user);
    const { id, nome, passwordexpires } = user;

    // Verifica se a senha temporaria nao está expirada
    const now = new Date();

    console.log("Login NOW -->" + now);
    console.log("PasswordExpires -->" + passwordexpires);

    if (passwordexpires != null) {
      if (now > passwordexpires)
        return res.status(400).send({
          error:
            "Senha expirada!, favor solicitar uma nova no Esqueci Minha senha",
        });
    }

    return res.json({
      user: {
        id,
        nome,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret),
    });
  }

  // ESQUECI A SENHA

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Email não cadastrado!" });
      }

      let token = crypto.randomBytes(3).toString("hex");

      // tempo de expiração do token de recuperacao;
      const now = new Date();
      console.log("hora atual" + now.getHours());
      now.setHours(now.getHours() + 1);
      console.log("" + now);
      var _id = user._id;
      const update = {
        passwordresetoken: token,
        passwordresetexpires: now,
        passwordexpires: null,
      };
      const filter = { _id };

      await User.updateOne(filter, update);

      // Enviando o codigo para resetar a senha
      const mail = await mailer.sendMail(
        {
          to: email,
          subject: " Token para resetar sua senha!",
          template: "auth/forgot_password",
          context: { token },
        },
        (err) => {
          if (err)
            res.status(400).json({ error: " Error ao enviar o email" + err });
          else {
            return res.status(200).json({ error: " Email Enviado!" + err });
          }
        }
      );
      console.log(mail);
    } catch (error) {
      return res
        .status(400)
        .send({ error: "Erro ao recuperar a senha" } + error);
    }
  }

  // RESET PASSWORD
  async resetPassword(req, res) {
    const { email, token, password } = req.body;
    try {
      const user = await User.findOne({ email }).select(
        "+passwordresetoken passwordresetexpires"
      );

      if (!user) {
        return res.status(400).json({ error: "Email não cadastrado!" });
      }

      if (token !== user.passwordresetoken)
        return res.status(400).send({ error: " Tokene invalido!" });

      const now = new Date();

      if (now > user.passwordresetexpires)
        return res
          .status(400)
          .send({ error: " Token expirado, favor fazer uma nova requisição" });

      user.password = password;

      await user.save();
      res.send();
    } catch (err) {
      return res.status(400).json({ error: "Error ao resetar a senha " } + err);
    }
  }

  // Primeiro Login

  async firstLogin(req, res) {
    try {
      let { token, password } = req.body;
      const { id } = jwt.decode(token);
      const user = await User.findOne({ _id: id }).select("+passwordexpires");
      //let result = bcrypt.compareSync(password, user.password);
      const salt = bcrypt.genSaltSync(10);
      password = await bcrypt.hash(req.body.password, salt);
      await User.updateOne({ _id: id }, { password, passwordexpires: null });

      return res.json(200);
    } catch (err) {
      return res.status(400).send({ error: "Erro ao trocar a senha" } + error);
    }
  }
}

export default new SessionController();

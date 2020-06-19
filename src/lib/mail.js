import nodemailer from "nodemailer";
import mailConfig from "../config/mail";
class Mail {
  constructor() {
    const { host, port, secute, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secute,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();

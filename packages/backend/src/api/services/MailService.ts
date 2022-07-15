import { Service } from "typedi";

import nodemailer, { Transporter } from "nodemailer";

@Service()
export class MailService {
  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465,
      secure: true,
      auth: {
        user: "support@strategicfolio.com",
        pass: "TMPacifitech#1",
      },
    });
  }

  async send(
    from: string,
    to: string,
    subject?: string,
    text?: string,
    html?: string
  ) {
    const info = await this.transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    return info;
  }
}

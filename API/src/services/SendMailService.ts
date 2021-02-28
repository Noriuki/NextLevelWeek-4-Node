import nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";
class SendMailService {
  client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
      });
      this.client = transporter;
    });
  }

  async execute(to: string, subject: string, variables: object, path: string) {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse({
      ...variables,
    });

    const message = await this.client.sendMail({
      from: "NPS <noreplay@nps.com.br>", // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: html, // plain text body
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();

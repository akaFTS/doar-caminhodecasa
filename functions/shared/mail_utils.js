const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const mjml2html = require("mjml");
const nodemailer = require("nodemailer");
const { htmlToText } = require("html-to-text");
const source = require("./mail_mjml");

async function sendMail(info) {
  const htmlVersion = importMJML(info);
  const textVersion = htmlToText(htmlVersion, {
    tags: { img: { format: "skip" } },
  });

  const transporter = nodemailer.createTransport({
    host: "mail.caminhodecasa.org.br",
    port: 587,
    secure: false,
    auth: {
      user: "carlos.alberto@caminhodecasa.org.br",
      pass: process.env.MAIL_PASSWORD,
    },
    ignoreTLS: true,
  });

  await transporter.sendMail({
    from: '"Associação Caminho de Casa" <atendimento@caminhodecasa.org.br>',
    to: info.email,
    subject: "Obrigado por sua doação!",
    text: textVersion,
    html: htmlVersion,
  });
}

function importMJML({ code, name, amount, paymentType }) {
  const template = handlebars.compile(source);
  const vars = {
    code,
    name,
    amount,
    payment: paymentType == "CREDIT_CARD" ? "Cartão de Crédito" : "PIX",
  };

  const { html } = mjml2html(template(vars));
  return html;
}

module.exports = { sendMail };

const handlebars = require("handlebars");
const process = require("process");
const mjml2html = require("mjml");
const nodemailer = require("nodemailer");
const { htmlToText } = require("html-to-text");
const source = require("./mail_mjml");

async function sendMail(info) {
  const htmlVersion = importMJML(info);
  const textVersion = htmlToText(htmlVersion, {
    tags: { img: { format: "skip" } },
  });

  await getTransport().sendMail({
    from: '"Associação Caminho de Casa" <atendimento@caminhodecasa.org.br>',
    to: info.email,
    subject: "Obrigado por sua doação!",
    text: textVersion,
    html: htmlVersion,
  });
}

async function sendCiclumPixMail(info) {
  const htmlVersion = `Você recebeu uma transação Pix.<br />Nome: ${info.name}<br />Email: ${info.email}<br />Valor: R$${info.amount},00`;

  await getTransport().sendMail({
    from: '"Associação Caminho de Casa" <atendimento@caminhodecasa.org.br>',
    to: "consultoria@ciclum.net",
    subject: "Novo Pix recebido",
    html: htmlVersion,
  });
}

function getTransport() {
  return nodemailer.createTransport({
    host: "mail.caminhodecasa.org.br",
    port: 587,
    secure: false,
    auth: {
      user: "carlos.alberto@caminhodecasa.org.br",
      pass: process.env.MAIL_PASSWORD,
    },
    ignoreTLS: true,
  });
}

function importMJML({ code, name, amount, paymentType }) {
  const template = handlebars.compile(source);
  const vars = {
    code,
    name,
    amount,
    payment: paymentType == "CREDIT_CARD" ? "Cartão de Crédito" : "Pix",
  };

  const { html } = mjml2html(template(vars));
  return html;
}

module.exports = { sendMail, sendCiclumPixMail };

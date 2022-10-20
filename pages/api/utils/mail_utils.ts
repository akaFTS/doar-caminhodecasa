import { compile } from 'handlebars';
import { env } from 'process';
import mjml2html from 'mjml';
import { createTransport, Transporter } from 'nodemailer';
import { htmlToText } from 'html-to-text';
import source from './mail_mjml';

export type MailInfo = {
  code?: string;
  name: string;
  amount: number;
  paymentType?: 'CREDIT_CARD' | 'PIX';
  email: string;
};

function importMJML({ code, name, amount, paymentType }: MailInfo): string {
  const template = compile(source);
  const vars = {
    code,
    name,
    amount,
    payment: paymentType === 'CREDIT_CARD' ? 'Cartão de Crédito' : 'Pix',
  };

  const { html } = mjml2html(template(vars));
  return html;
}

function getTransport(): Transporter {
  console.log('attempting to create transport');
  try {
    createTransport({
      host: 'mail.caminhodecasa.org.br',
      port: 587,
      secure: true,
      auth: {
        user: 'carlos.alberto@caminhodecasa.org.br',
        pass: env.MAIL_PASSWORD,
      },
      ignoreTLS: true,
    });

    console.log('create successful');
  } catch (e) {
    console.log('issue');
    console.log(e);
  }

  return createTransport({
    host: 'mail.caminhodecasa.org.br',
    port: 587,
    secure: true,
    auth: {
      user: 'carlos.alberto@caminhodecasa.org.br',
      pass: env.MAIL_PASSWORD,
    },
    ignoreTLS: true,
  });
}

export async function sendMail(info: MailInfo) {
  const htmlVersion = importMJML(info);
  const textVersion = htmlToText(htmlVersion, {
    tags: { img: { format: 'skip' } },
  });

  await getTransport().sendMail({
    from: '"Associação Caminho de Casa" <atendimento@caminhodecasa.org.br>',
    to: info.email,
    subject: 'Obrigado por sua doação!',
    text: textVersion,
    html: htmlVersion,
  });
}

export async function sendCiclumPixMail(info: MailInfo) {
  const htmlVersion = `Você recebeu uma transação Pix.<br />Nome: ${info.name}<br />Email: ${info.email}<br />Valor: R$${info.amount},00`;

  await getTransport().sendMail({
    from: '"Associação Caminho de Casa" <atendimento@caminhodecasa.org.br>',
    to: 'consultoria@ciclum.net',
    subject: 'Novo Pix recebido',
    html: htmlVersion,
  });
}

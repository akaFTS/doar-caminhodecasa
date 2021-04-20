const mjml = `<mjml>
<mj-body>
  <mj-section padding="0px 0px">
    <mj-column>
      <mj-image
        padding="0px 0px"
        src="https://i.imgur.com/BtoApSg.png"
      ></mj-image>
    </mj-column>
  </mj-section>

  <mj-section background-color="#EEEEEE">
    <mj-column>
      <mj-divider border-color="#c62828"></mj-divider>
      <mj-text
        padding-bottom="30px"
        align="center"
        font-weight="bold"
        font-size="26px"
        color="#2e7d32"
        font-family="helvetica"
      >
        Obrigado!
      </mj-text>

      <mj-text
        color="#444444"
        font-size="16px"
        line-height="20px"
        font-family="helvetica"
        align="center"
      >
        <span style="font-weight: bold">Sua doação foi realizada com sucesso.</span><br/>Graças a ela, continuaremos levando esperança a quem mais precisa.
      </mj-text>

      <mj-text
        color="#444444"
        padding-bottom="30px"
        font-size="16px"
        line-height="20px"
        font-family="helvetica"
      >
        <span style="font-weight:bold">Código:</span> #{{ code }}
        <br />
        <span style="font-weight:bold">Nome:</span> {{ name }}
        <br />
        <span style="font-weight:bold">Valor:</span> R\${{ amount }},00
        <br />
        <span style="font-weight:bold">Forma de Pagamento:</span> {{ payment }}
        <br />
      </mj-text>

      <mj-text
        color="#444444"
        font-size="16px"
        line-height="20px"
        font-family="helvetica"
      >
        Siga nossas páginas nas redes sociais para conhecer mais sobre nosso
        trabalho e acompanhar a prestação de contas:
      </mj-text>

      <mj-social
        padding-bottom="30px"
        font-size="14px"
        icon-size="40px"
        mode="horizontal"
      >
        <mj-social-element
          name="facebook-noshare"
          href="https://www.facebook.com/associacaocaminhodecasa/"
        >
          Facebook
        </mj-social-element>
        <mj-social-element
          name="instagram"
          background-color="#E1306C"
          href="https://www.instagram.com/associacao_caminhodecasa"
        >
          Instagram
        </mj-social-element>
      </mj-social>
    </mj-column>
  </mj-section>

  <mj-section background-color="#424242">
    <mj-column width="20%">
      <mj-image
        align="center"
        container-background-color="#424242"
        width="200px"
        padding="10px 20px"
        src="https://i.imgur.com/l9y6Ozl.png"
      ></mj-image>
    </mj-column>

    <mj-column width="70%">
      <mj-text
        color="#EEEEEE"
        font-size="12px"
        line-height="15px"
        font-family="helvetica"
      >
        <span style="font-weight:bold">ASSOCIAÇÃO CAMINHO DE CASA</span>
      </mj-text>

      <mj-text
        color="#EEEEEE"
        font-size="12px"
        line-height="15px"
        font-family="helvetica"
      >
        CNPJ 21.227.397/0001-29
        <br />
        R. Pe. Benedito de Camargo, 356, São Paulo/SP
        <br />
        atendimento@caminhodecasa.org.br
        <br />
      </mj-text>
    </mj-column>
  </mj-section>
</mj-body>
</mjml>`;

module.exports = mjml;

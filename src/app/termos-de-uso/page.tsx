import type { Metadata } from "next";
import Link from "next/link";

import { LegalPageShell } from "@/components/landing/legal-page-shell";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { ENTERPRISE_EMAIL } from "@/lib/site-urls";

export const metadata: Metadata = {
  title: "Termos de uso — Mensaliza",
  description:
    "Termos e condições de uso do site e da plataforma Mensaliza para cobrança mensal via WhatsApp.",
};

export default function TermosDeUsoPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal">
        <LegalPageShell title="Termos de uso">
          <p>
            Estes Termos de Uso (“Termos”) regem o acesso e a utilização do site
            mensaliza.com.br, do aplicativo web e demais interfaces do Mensaliza
            (em conjunto, a “Plataforma”), disponibilizados pela Mensaliza
            (“nós”, “nosso” ou “Mensaliza”).
          </p>
          <p>
            Ao acessar o site, solicitar uma demonstração, criar uma conta ou
            utilizar a Plataforma, você declara ter lido, compreendido e
            concordado com estes Termos e com a nossa{" "}
            <Link href="/politicas-de-privacidade">Política de Privacidade</Link>
            . Se não concordar, não utilize a Plataforma.
          </p>

          <h2>1. O que é o Mensaliza</h2>
          <p>
            O Mensaliza é um software de organização e cobrança mensal voltado a
            profissionais liberais e pequenos negócios que possuem assinantes ou
            clientes com mensalidade recorrente. A Plataforma permite, entre
            outras funções:
          </p>
          <ul>
            <li>cadastrar e organizar a base de assinantes;</li>
            <li>
              programar lembretes e mensagens de cobrança enviadas via WhatsApp
              na data de vencimento;
            </li>
            <li>
              facilitar o pagamento por Pix por meio de link ou instruções
              disponibilizadas ao assinante;
            </li>
            <li>
              centralizar o recebimento e a aprovação de comprovantes de
              pagamento no painel do profissional.
            </li>
          </ul>
          <p>
            <strong>Importante:</strong> o Mensaliza <strong>não</strong> é
            instituição de pagamento, gateway, adquirente, carteira digital nem
            intermediário financeiro. Não processamos, recebemos, retemos nem
            transferimos valores em nome do profissional. O Pix (ou outra forma
            de pagamento) ocorre diretamente entre o profissional e o seu
            cliente, na conta indicada pelo profissional.
          </p>

          <h2>2. Elegibilidade e cadastro</h2>
          <p>
            A Plataforma destina-se a pessoas físicas ou jurídicas com
            capacidade legal para contratar no Brasil. Ao se cadastrar, você
            declara que as informações fornecidas são verdadeiras, completas e
            atualizadas, e compromete-se a mantê-las assim.
          </p>
          <p>Você é responsável por:</p>
          <ul>
            <li>proteger suas credenciais de acesso e dispositivos;</li>
            <li>
              toda atividade realizada na conta, salvo uso indevido comprovado
              por falha de segurança nossa;
            </li>
            <li>
              notificar imediatamente o Mensaliza em caso de suspeita de acesso
              não autorizado.
            </li>
          </ul>

          <h2>3. Conta, planos e pagamento do serviço</h2>
          <p>
            O uso da Plataforma está sujeito ao plano contratado (limites de
            assinantes, funcionalidades e valores). Condições comerciais,
            preços e eventuais períodos de teste ou demonstração são confirmados
            na contratação ou na demonstração comercial.
          </p>
          <p>
            A mensalidade do Mensaliza (assinatura do software) é cobrada
            conforme o meio e o ciclo acordados na contratação. O atraso no
            pagamento da assinatura pode resultar em suspensão do acesso até a
            regularização, sem prejuízo das cobranças já devidas.
          </p>
          <p>
            Você pode cancelar a assinatura a qualquer momento, conforme as
            condições do plano, sem multa de fidelidade, salvo se houver
            condição específica expressamente acordada por escrito. O
            cancelamento não gera reembolso proporcional de períodos já
            iniciados, salvo disposição legal ou comercial em contrário.
          </p>

          <h2>4. Uso adequado da Plataforma</h2>
          <p>Você concorda em utilizar a Plataforma de forma lícita e ética, e em particular em:</p>
          <ul>
            <li>
              usar o Mensaliza apenas para cobranças legítimas relacionadas à
              sua atividade profissional;
            </li>
            <li>
              obter as bases legais e autorizações necessárias para cadastrar e
              contatar seus assinantes (incluindo envio de mensagens via
              WhatsApp);
            </li>
            <li>
              não utilizar a Plataforma para assédio, cobrança abusiva, ameaça,
              spam, fraude, lavagem de dinheiro ou qualquer prática ilícita;
            </li>
            <li>
              não tentar burlar limites técnicos, acessar áreas restritas,
              fazer engenharia reversa indevida ou comprometer a segurança do
              serviço;
            </li>
            <li>
              não reproduzir, sublicenciar ou revender a Plataforma sem
              autorização escrita.
            </li>
          </ul>
          <p>
            O tom e o conteúdo das mensagens de cobrança são de responsabilidade
            do profissional. O Mensaliza oferece automação e organização; a
            relação comercial e de atendimento com o assinante permanece sua.
          </p>

          <h2>5. Dados dos assinantes e comprovantes</h2>
          <p>
            Ao inserir dados de clientes/assinantes e ao receber comprovantes
            pela Plataforma, você declara ter legitimidade para tratá-los e
            compartilhá-los conosco na medida necessária à prestação do serviço.
            Em relação a esses dados, você atua, em regra, como controlador, e o
            Mensaliza como operador, nos termos da LGPD — conforme detalhado na{" "}
            <Link href="/politicas-de-privacidade">Política de Privacidade</Link>
            .
          </p>
          <p>
            A aprovação ou rejeição de comprovantes é decisão exclusiva do
            profissional. O Mensaliza não valida autenticidade bancária nem
            garante a efetivação do pagamento.
          </p>

          <h2>6. Integrações de terceiros</h2>
          <p>
            A Plataforma pode depender de serviços de terceiros, como
            infraestrutura em nuvem, e-mail e canais de mensageria (incluindo
            WhatsApp e provedores de API). O uso desses canais está também
            sujeito aos termos e políticas dos respectivos terceiros. Não
            controlamos a disponibilidade contínua do WhatsApp ou de redes de
            pagamento Pix.
          </p>

          <h2>7. Propriedade intelectual</h2>
          <p>
            O Mensaliza, sua marca, layout, código, textos, mockups e demais
            elementos da Plataforma são de nossa titularidade ou de licenciantes.
            Estes Termos não transferem qualquer direito de propriedade
            intelectual a você, além da licença limitada, não exclusiva e
            intransferível de uso da Plataforma durante a vigência da
            contratação, nos limites do plano.
          </p>
          <p>
            Os dados que você e seus assinantes inserem na conta permanecem sob
            a titularidade e responsabilidade do profissional, respeitada a
            legislação aplicável.
          </p>

          <h2>8. Disponibilidade, suporte e alterações</h2>
          <p>
            Buscamos manter a Plataforma disponível e segura, mas não
            garantimos funcionamento ininterrupto, livre de erros ou compatível
            com todo dispositivo. Manutenções, atualizações e interrupções
            temporárias podem ocorrer.
          </p>
          <p>
            Podemos modificar funcionalidades, limites e estes Termos para
            refletir evolução do produto, requisitos legais ou operacionais.
            Alterações relevantes serão comunicadas por meios razoáveis (por
            exemplo, e-mail ou aviso na Plataforma). O uso continuado após a
            vigência das alterações constitui aceitação, quando permitido pela
            lei.
          </p>

          <h2>9. Isenções e limitação de responsabilidade</h2>
          <p>Na máxima extensão permitida pela lei aplicável:</p>
          <ul>
            <li>
              o Mensaliza não se responsabiliza por valores de mensalidades
              entre você e seus clientes, inadimplência, comprovantes falsos ou
              disputas comerciais com assinantes;
            </li>
            <li>
              não nos responsabilizamos por falhas, bloqueios ou mudanças de
              política de canais de terceiros (WhatsApp, bancos, Pix etc.);
            </li>
            <li>
              não nos responsabilizamos por danos indiretos, lucros cessantes,
              perda de dados causada por uso inadequado da conta, ou prejuízos
              decorrentes de conteúdo enviado por você via mensagens
              automatizadas;
            </li>
            <li>
              nossa responsabilidade total, quando cabível, fica limitada ao
              valor pago por você ao Mensaliza nos 12 (doze) meses anteriores ao
              evento que deu causa à reclamação, salvo dolo ou culpa grave, ou
              quando a lei exigir outro tratamento.
            </li>
          </ul>

          <h2>10. Suspensão e encerramento</h2>
          <p>
            Podemos suspender ou encerrar o acesso, com ou sem aviso prévio
            razoável conforme a gravidade, se houver violação destes Termos,
            risco à segurança, uso ilícito, inadimplência ou determinação legal.
            Você pode encerrar o uso cancelando a assinatura e solicitando o
            encerramento da conta pelos canais de suporte.
          </p>

          <h2>11. Lei aplicável e foro</h2>
          <p>
            Estes Termos são regidos pelas leis da República Federativa do
            Brasil. Fica eleito o foro da comarca do domicílio do consumidor,
            quando aplicável o Código de Defesa do Consumidor; nos demais casos,
            o foro da comarca de nosso estabelecimento principal, salvo
            disposição legal imperativa em contrário.
          </p>

          <h2>12. Contato</h2>
          <p>
            Dúvidas sobre estes Termos podem ser enviadas para{" "}
            <a href={`mailto:${ENTERPRISE_EMAIL}`}>{ENTERPRISE_EMAIL}</a>.
          </p>
        </LegalPageShell>
      </main>
      <SiteFooter />
    </>
  );
}

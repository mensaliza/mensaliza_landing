import type { Metadata } from "next";
import Link from "next/link";

import { LegalPageShell } from "@/components/landing/legal-page-shell";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { CONTACT_EMAIL } from "@/lib/site-urls";

export const metadata: Metadata = {
  title: "Política de privacidade — Mensaliza",
  description:
    "Como o Mensaliza trata dados pessoais de profissionais, visitantes e assinantes, em conformidade com a LGPD.",
};

export default function PoliticasDePrivacidadePage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal">
        <LegalPageShell title="Política de privacidade">
          <p>
            Esta Política de Privacidade (“Política”) explica como o Mensaliza
            (“nós”, “nosso” ou “Mensaliza”) coleta, usa, armazena, compartilha e
            protege dados pessoais no site mensaliza.com, no aplicativo web e
            nos demais canais relacionados à Plataforma, em conformidade com a
            Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD) e demais
            normas aplicáveis.
          </p>
          <p>
            Ao utilizar nossos serviços, você declara ciência desta Política e
            dos nossos{" "}
            <Link href="/termos-de-uso">Termos de Uso</Link>. Se tiver dúvidas,
            fale conosco pelos canais indicados ao final.
          </p>

          <h2>1. Quem somos e papéis no tratamento</h2>
          <p>
            O Mensaliza oferece software de organização e cobrança mensal via
            WhatsApp para profissionais e pequenos negócios.{" "}
            <strong>Não processamos pagamentos nem detemos fundos</strong>: o
            Pix ou transferência ocorre diretamente entre o profissional e o
            assinante.
          </p>
          <p>Em regra:</p>
          <ul>
            <li>
              <strong>Dados do profissional e do visitante do site</strong> (conta,
              cadastro, uso da Plataforma, contato comercial): o Mensaliza atua
              como <strong>controlador</strong>.
            </li>
            <li>
              <strong>Dados dos assinantes/clientes finais</strong> cadastrados
              pelo profissional (nome, telefone, vencimentos, status de
              pagamento, comprovantes etc.): o profissional atua como{" "}
              <strong>controlador</strong>, e o Mensaliza como{" "}
              <strong>operador</strong>, tratando esses dados sob instruções do
              profissional e na medida necessária à prestação do serviço.
            </li>
          </ul>

          <h2>2. Quais dados tratamos</h2>
          <p>Podemos tratar as seguintes categorias, conforme o uso do serviço:</p>
          <ul>
            <li>
              <strong>Dados de cadastro e conta:</strong> nome, e-mail, telefone,
              dados da empresa (quando informados), senha (armazenada de forma
              segura/hash), preferências e configurações.
            </li>
            <li>
              <strong>Dados comerciais:</strong> informações de plano, faturamento
              da assinatura do software, histórico de demonstrações e suporte.
            </li>
            <li>
              <strong>Dados de assinantes inseridos pelo profissional:</strong>{" "}
              nome, telefone/WhatsApp, datas de vencimento, valores de
              referência, observações e status de cobrança.
            </li>
            <li>
              <strong>Comprovantes e arquivos:</strong> imagens ou documentos
              enviados para aprovação de pagamento, metadados associados (data,
              remetente quando disponível).
            </li>
            <li>
              <strong>Dados de uso e técnicos:</strong> logs de acesso, endereço
              IP, tipo de dispositivo/navegador, páginas visitadas, cookies e
              identificadores semelhantes, eventos de uso da Plataforma.
            </li>
            <li>
              <strong>Dados de comunicação:</strong> conteúdo e metadados de
              mensagens de suporte, e registros necessários ao envio de
              lembretes via canais de mensageria (ex.: WhatsApp), na medida
              permitida pelas APIs e políticas desses canais.
            </li>
          </ul>
          <p>
            Não solicitamos dados sensíveis de saúde, biometria ou semelhantes
            como requisito do serviço. Se o profissional inserir informações
            sensíveis em campos livres, ele é responsável pela base legal e pelo
            cuidado adicional exigidos pela LGPD.
          </p>

          <h2>3. Finalidades e bases legais</h2>
          <p>Tratamos dados pessoais para:</p>
          <ul>
            <li>
              prestar, operar, manter e melhorar a Plataforma (execução de
              contrato / procedimentos preliminares);
            </li>
            <li>
              enviar cobranças e lembretes automatizados conforme configuração do
              profissional (execução de contrato e legítimo interesse do
              controlador profissional, a quem cabe validar a base legal perante
              o assinante);
            </li>
            <li>
              autenticar usuários, prevenir fraudes e garantir segurança
              (legítimo interesse e cumprimento de obrigação legal, quando
              aplicável);
            </li>
            <li>
              prestar suporte, responder solicitações e enviar comunicações
              operacionais (execução de contrato e legítimo interesse);
            </li>
            <li>
              cumprir obrigações legais, regulatórias e ordens de autoridades;
            </li>
            <li>
              com consentimento, quando exigido — por exemplo, cookies não
              essenciais ou comunicações de marketing opcionais.
            </li>
          </ul>

          <h2>4. Cookies e tecnologias semelhantes</h2>
          <p>
            O site e a Plataforma podem usar cookies e tecnologias similares para
            funcionamento básico, preferências, medição de audiência e melhoria
            da experiência. Quando exigido, solicitaremos consentimento para
            cookies não essenciais. Você pode gerenciar cookies nas
            configurações do navegador; a desativação de cookies essenciais pode
            afetar o funcionamento do serviço.
          </p>

          <h2>5. Compartilhamento de dados</h2>
          <p>Podemos compartilhar dados pessoais com:</p>
          <ul>
            <li>
              <strong>Provedores de infraestrutura e operação</strong> (hospedagem,
              e-mail, monitoramento, armazenamento de arquivos), sob contratos
              que exigem confidencialidade e proteção adequada;
            </li>
            <li>
              <strong>Provedores de mensageria</strong> necessários ao envio de
              lembretes (incluindo WhatsApp e parceiros de API), limitados ao
              necessário para a entrega da mensagem;
            </li>
            <li>
              <strong>Parceiros de pagamento da assinatura do software</strong>{" "}
              (quando utilizados para cobrar o plano Mensaliza do profissional —
              não para processar o Pix do assinante final);
            </li>
            <li>
              <strong>Autoridades públicas</strong>, quando houver obrigação
              legal ou ordem válida;
            </li>
            <li>
              terceiros em caso de reorganização societária, fusão ou aquisição,
              com salvaguardas compatíveis com esta Política.
            </li>
          </ul>
          <p>
            <strong>Não vendemos</strong> dados pessoais. Não compartilhamos a
            base de assinantes do profissional para fins de marketing de
            terceiros.
          </p>

          <h2>6. Transferência internacional</h2>
          <p>
            Alguns provedores podem processar dados fora do Brasil. Nesses casos,
            adotamos salvaguardas previstas na LGPD (por exemplo, cláusulas
            contratuais e avaliação do nível de proteção), sempre que a
            transferência for necessária à operação do serviço.
          </p>

          <h2>7. Retenção</h2>
          <p>
            Mantemos dados pelo tempo necessário às finalidades desta Política,
            ao cumprimento do contrato e a obrigações legais (incluindo prazos de
            guarda fiscal e defesa em processos). Após o encerramento da conta,
            dados de assinantes e comprovantes podem ser excluídos ou anonimizados
            em prazo razoável, salvo retenção obrigatória ou solicitação legítima
            de manutenção pelo controlador profissional durante o período
            contratual.
          </p>

          <h2>8. Segurança</h2>
          <p>
            Adotamos medidas técnicas e organizacionais razoáveis para proteger
            dados pessoais contra acesso não autorizado, perda, alteração ou
            divulgação indevida — incluindo controles de acesso, criptografia em
            trânsito quando aplicável e práticas de desenvolvimento seguro. Nenhum
            sistema é absolutamente seguro; pedimos que você também proteja suas
            credenciais e dispositivos.
          </p>

          <h2>9. Direitos dos titulares</h2>
          <p>
            Nos termos da LGPD, titulares podem solicitar: confirmação de
            tratamento, acesso, correção, anonimização, bloqueio ou eliminação de
            dados desnecessários, portabilidade (quando aplicável), informação
            sobre compartilhamentos, informação sobre a possibilidade de não
            consentir e consequências, revogação do consentimento e oposição a
            tratamentos em bases legais cabíveis.
          </p>
          <p>
            <strong>Profissionais e visitantes:</strong> para exercer direitos
            relativos aos dados que controlamos, contate{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <p>
            <strong>Assinantes/clientes finais:</strong> em regra, o pedido deve
            ser dirigido ao profissional que cadastrou seus dados (controlador).
            Podemos apoiar o profissional na resposta, na qualidade de operador.
            Se recebermos um pedido diretamente, poderemos redirecioná-lo ao
            controlador competente.
          </p>
          <p>
            Você também pode apresentar reclamação à Autoridade Nacional de
            Proteção de Dados (ANPD).
          </p>

          <h2>10. Crianças e adolescentes</h2>
          <p>
            A Plataforma não se destina a menores de 18 anos como usuários
            contratantes. Se tomarmos conhecimento de cadastro indevido, poderemos
            remover a conta e os dados associados.
          </p>

          <h2>11. Alterações desta Política</h2>
          <p>
            Podemos atualizar esta Política para refletir mudanças legais,
            operacionais ou do produto. A data de “Última atualização” no topo da
            página indica a versão vigente. Em alterações relevantes,
            comunicaremos por meios razoáveis.
          </p>

          <h2>12. Contato do encarregado / privacidade</h2>
          <p>
            Para dúvidas, solicitações de titulares ou comunicações sobre
            privacidade e proteção de dados, escreva para{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> com o
            assunto “Privacidade / LGPD”.
          </p>
        </LegalPageShell>
      </main>
      <SiteFooter />
    </>
  );
}

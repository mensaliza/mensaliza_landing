import { NextResponse } from "next/server";
import { Resend } from "resend";

import { pricingTierOptionLabel, pricingTiers } from "@/lib/landing-content";
import {
  captureException,
  flushPostHog,
  getDistinctIdFromRequest,
} from "@/lib/posthog-server";
import { CONTACT_EMAIL } from "@/lib/site-urls";

export const runtime = "nodejs";

const TIER_IDS: Set<string> = new Set(pricingTiers.map((tier) => tier.id));

type DemoRequestBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subscribers?: unknown;
  message?: unknown;
  website?: unknown;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function tierLabel(id: string): string {
  const tier = pricingTiers.find((item) => item.id === id);
  if (!tier) return id;
  return pricingTierOptionLabel(tier);
}

export async function POST(request: Request) {
  let body: DemoRequestBody;

  try {
    body = (await request.json()) as DemoRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Não foi possível ler o formulário. Tente de novo." },
      { status: 400 }
    );
  }

  // Honeypot — bots fill hidden fields; humans leave them empty.
  if (asTrimmedString(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(body.name);
  const email = asTrimmedString(body.email);
  const phone = asTrimmedString(body.phone);
  const subscribers = asTrimmedString(body.subscribers);
  const message = asTrimmedString(body.message);

  if (name.length < 2) {
    return NextResponse.json(
      { error: "Informe seu nome.", field: "name" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Informe um e-mail válido.", field: "email" },
      { status: 400 }
    );
  }

  if (!TIER_IDS.has(subscribers)) {
    return NextResponse.json(
      { error: "Selecione o tamanho da base de assinantes.", field: "subscribers" },
      { status: 400 }
    );
  }

  if (message.length > 2000) {
    return NextResponse.json(
      { error: "A mensagem é longa demais (máx. 2000 caracteres).", field: "message" },
      { status: 400 }
    );
  }

  const distinctId =
    getDistinctIdFromRequest({ headers: request.headers }) ?? undefined;

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    captureException(
      new Error("RESEND_API_KEY is not configured"),
      distinctId,
      { source: "demo_request", stage: "config" },
    );
    await flushPostHog();
    return NextResponse.json(
      {
        error:
          "O envio está temporariamente indisponível. Tente de novo em alguns minutos.",
      },
      { status: 503 }
    );
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || "Mensaliza <onboarding@resend.dev>";
  const to = CONTACT_EMAIL;
  const subscribersLabel = tierLabel(subscribers);
  const subject = `Pedido de demonstração — ${name}`;

  const textLines = [
    "Novo pedido de demonstração pela landing.",
    "",
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `WhatsApp/telefone: ${phone || "—"}`,
    `Base de assinantes: ${subscribersLabel}`,
    "",
    "Mensagem:",
    message || "—",
  ];

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.5; color: #1a1a1a;">
      <p style="margin: 0 0 16px;">Novo pedido de demonstração pela landing.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 520px;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; width: 160px; color: #555;">Nome</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><strong>${escapeHtml(name)}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; color: #555;">E-mail</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; color: #555;">WhatsApp/telefone</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${phone ? escapeHtml(phone) : "—"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; color: #555;">Base de assinantes</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${escapeHtml(subscribersLabel)}</td>
        </tr>
      </table>
      <p style="margin: 20px 0 8px; color: #555;">Mensagem</p>
      <p style="margin: 0; white-space: pre-wrap;">${message ? escapeHtml(message) : "—"}</p>
    </div>
  `;

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send(
    {
      from,
      to: [to],
      replyTo: email,
      subject,
      text: textLines.join("\n"),
      html,
    },
    {
      idempotencyKey: `demo-request/${email.toLowerCase()}/${subscribers}/${Date.now()}`,
    }
  );

  if (error) {
    console.error("Resend error:", error.message);
    captureException(error, distinctId, {
      source: "demo_request",
      stage: "resend",
    });
    await flushPostHog();
    return NextResponse.json(
      {
        error:
          "Não foi possível enviar agora. Tente de novo ou escreva para " + to + ".",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}

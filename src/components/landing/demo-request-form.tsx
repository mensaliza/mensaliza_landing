"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";

import { LoginLink } from "@/components/landing/login-link";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { pricingTierOptionLabel, pricingTiers } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

const DEFAULT_TIER =
  pricingTiers.find((tier) => tier.popular)?.id ??
  pricingTiers[0]?.id ??
  "essential";

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "subscribers" | "message" | "form", string>
>;

function resolveInitialTier(param: string | null): string {
  if (param && pricingTiers.some((tier) => tier.id === param)) {
    return param;
  }
  return DEFAULT_TIER;
}

export function DemoRequestForm() {
  const searchParams = useSearchParams();
  const formId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subscribers, setSubscribers] = useState(() =>
    resolveInitialTier(searchParams.get("assinantes"))
  );
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fromUrl = searchParams.get("assinantes");
    if (fromUrl && pricingTiers.some((tier) => tier.id === fromUrl)) {
      setSubscribers(fromUrl);
    }
  }, [searchParams]);

  function validate(): FieldErrors {
    const next: FieldErrors = {};

    if (name.trim().length < 2) {
      next.name = "Informe seu nome.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Informe um e-mail válido.";
    }
    if (!pricingTiers.some((tier) => tier.id === subscribers)) {
      next.subscribers = "Selecione o tamanho da base.";
    }
    if (message.trim().length > 2000) {
      next.message = "A mensagem é longa demais (máx. 2000 caracteres).";
    }

    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subscribers,
          message: message.trim(),
          website,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        field?: keyof FieldErrors;
      } | null;

      if (!response.ok) {
        const messageText =
          payload?.error ?? "Não foi possível enviar. Tente de novo.";
        if (payload?.field) {
          setErrors({ [payload.field]: messageText });
        } else {
          setErrors({ form: messageText });
        }
        toast.error(messageText);
        return;
      }

      setSubmitted(true);
      setErrors({});
      toast.success("Pedido enviado. Retornamos em breve.");
    } catch {
      const messageText =
        "Falha de conexão. Verifique a internet e tente de novo.";
      setErrors({ form: messageText });
      toast.error(messageText);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 text-left text-foreground sm:p-8"
        role="status"
        aria-live="polite"
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckIcon className="size-5" strokeWidth={2.5} aria-hidden />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold tracking-[-0.01em] text-balance">
            Pedido recebido
          </h3>
          <p className="text-sm leading-relaxed text-foreground/72 text-pretty sm:text-base">
            Obrigado, {name.trim().split(/\s+/)[0] || "obrigado"}! Vamos
            responder no e-mail informado para marcar a demonstração — sem
            compromisso.
          </p>
        </div>
      </div>
    );
  }

  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const phoneId = `${formId}-phone`;
  const subscribersId = `${formId}-subscribers`;
  const messageId = `${formId}-message`;
  const formErrorId = `${formId}-form-error`;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-xl border border-border bg-card p-6 text-left text-foreground sm:p-8"
      aria-describedby={errors.form ? formErrorId : undefined}
    >
      <FieldGroup className="gap-5">
        <Field data-invalid={errors.name ? true : undefined}>
          <FieldLabel htmlFor={nameId}>Nome</FieldLabel>
          <Input
            id={nameId}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onBlur={() => {
              if (name.trim().length > 0 && name.trim().length < 2) {
                setErrors((prev) => ({ ...prev, name: "Informe seu nome." }));
              } else {
                setErrors((prev) => {
                  const { name: _, ...rest } = prev;
                  return rest;
                });
              }
            }}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            disabled={submitting}
            className="h-11 bg-background text-base md:text-base"
            placeholder="Seu nome"
          />
          {errors.name ? (
            <FieldError id={`${nameId}-error`}>{errors.name}</FieldError>
          ) : null}
        </Field>

        <Field data-invalid={errors.email ? true : undefined}>
          <FieldLabel htmlFor={emailId}>E-mail</FieldLabel>
          <Input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => {
              if (
                email.trim().length > 0 &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
              ) {
                setErrors((prev) => ({
                  ...prev,
                  email: "Informe um e-mail válido.",
                }));
              } else {
                setErrors((prev) => {
                  const { email: _, ...rest } = prev;
                  return rest;
                });
              }
            }}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            disabled={submitting}
            className="h-11 bg-background text-base md:text-base"
            placeholder="voce@email.com"
          />
          {errors.email ? (
            <FieldError id={`${emailId}-error`}>{errors.email}</FieldError>
          ) : null}
        </Field>

        <Field data-invalid={errors.phone ? true : undefined}>
          <FieldLabel htmlFor={phoneId}>
            WhatsApp{" "}
            <span className="font-normal text-muted-foreground">
              (opcional)
            </span>
          </FieldLabel>
          <Input
            id={phoneId}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            disabled={submitting}
            className="h-11 bg-background text-base md:text-base"
            placeholder="(11) 99999-9999"
          />
        </Field>

        <Field data-invalid={errors.subscribers ? true : undefined}>
          <FieldLabel htmlFor={subscribersId}>Base de assinantes</FieldLabel>
          <NativeSelect
            id={subscribersId}
            name="subscribers"
            value={subscribers}
            onChange={(event) => setSubscribers(event.target.value)}
            aria-invalid={errors.subscribers ? true : undefined}
            aria-describedby={
              errors.subscribers ? `${subscribersId}-error` : undefined
            }
            disabled={submitting}
            className="w-full [&_[data-slot=native-select]]:h-11 [&_[data-slot=native-select]]:bg-background [&_[data-slot=native-select]]:text-base"
          >
            {pricingTiers.map((tier) => (
              <NativeSelectOption key={tier.id} value={tier.id}>
                {pricingTierOptionLabel(tier)}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          {errors.subscribers ? (
            <FieldError id={`${subscribersId}-error`}>
              {errors.subscribers}
            </FieldError>
          ) : null}
        </Field>

        <Field data-invalid={errors.message ? true : undefined}>
          <FieldLabel htmlFor={messageId}>
            Mensagem{" "}
            <span className="font-normal text-muted-foreground">
              (opcional)
            </span>
          </FieldLabel>
          <Textarea
            id={messageId}
            name="message"
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${messageId}-error` : undefined}
            disabled={submitting}
            className="min-h-28 bg-background text-base md:text-base"
            placeholder="Conte um pouco do seu negócio ou o que quer ver na demonstração."
          />
          {errors.message ? (
            <FieldError id={`${messageId}-error`}>{errors.message}</FieldError>
          ) : null}
        </Field>

        {/* Honeypot */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label htmlFor={`${formId}-website`}>Website</label>
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        {errors.form ? (
          <p
            id={formErrorId}
            role="alert"
            className="text-sm font-medium text-destructive"
          >
            {errors.form}
          </p>
        ) : null}

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className={cn("h-11 w-full sm:w-auto", submitting && "opacity-90")}
          >
            {submitting ? (
              <>
                <Spinner data-icon="inline-start" />
                Enviando…
              </>
            ) : (
              "Pedir demonstração"
            )}
          </Button>
          <p className="text-sm text-foreground/72 text-pretty">
            Demonstração gratuita · Sem compromisso · Respondemos no e-mail. Ao
            enviar, você concorda com a{" "}
            <Link
              href="/politicas-de-privacidade"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Política de privacidade
            </Link>
            .
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}

/**
 * Google Tag Manager container ID (ex.: "GTM-XXXXXXX").
 * Sem a variável definida, o GTM não é carregado (útil em dev/preview).
 */
export function getGtmId() {
  return process.env.NEXT_PUBLIC_GTM_ID?.trim() || undefined;
}

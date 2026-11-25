/**
 * Meta (Facebook) Pixel ID (ex.: "1234567890123456").
 * Sem a variável definida, o pixel não é carregado (útil em dev/preview).
 */
export function getMetaPixelId() {
  return process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || undefined;
}

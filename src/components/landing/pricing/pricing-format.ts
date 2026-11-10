const reais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const centavos = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** R$ 149 */
export function formatReais(value: number) {
  return reais.format(value);
}

/** R$ 0,99 */
export function formatCentavos(cents: number) {
  return centavos.format(cents / 100);
}

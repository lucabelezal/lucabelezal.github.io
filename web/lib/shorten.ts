const ALPHABET =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Gera um código curto em base 62 (7 caracteres ≈ 3,5 trilhões de combinações).
export function generateCode(length = 7): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < length; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

// Base da URL curta. Por padrão usa a origem do próprio app, então o redirect
// em /r/<code> funciona de verdade. Configure NEXT_PUBLIC_SHORT_BASE para usar
// um domínio próprio (ex.: https://sho.rt).
export function shortBase(): string {
  const configured = process.env.NEXT_PUBLIC_SHORT_BASE;
  if (configured) return configured.replace(/\/$/, '');
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
}

export function buildShortUrl(code: string): string {
  return `${shortBase()}/r/${code}`;
}

// Aceita "uol.com.br" ou "https://uol.com.br" e devolve uma URL válida.
export function normalizeUrl(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withScheme);
    if (!url.hostname.includes('.')) return null;
    return url.toString();
  } catch {
    return null;
  }
}

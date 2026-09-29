export type ShortLink = {
  code: string;
  longUrl: string;
  shortUrl: string;
  createdAt: number;
};

const KEY = 'shortly.recent.v1';
const MAX = 20;

export function readRecent(): ShortLink[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ShortLink[]) : [];
  } catch {
    return [];
  }
}

function writeRecent(links: ShortLink[]): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(links.slice(0, MAX)));
  } catch {
    /* localStorage indisponível — ignora */
  }
}

export function addRecent(link: ShortLink): ShortLink[] {
  const next = [link, ...readRecent().filter((l) => l.code !== link.code)].slice(
    0,
    MAX,
  );
  writeRecent(next);
  return next;
}

export function findByCode(code: string): ShortLink | undefined {
  return readRecent().find((l) => l.code === code);
}

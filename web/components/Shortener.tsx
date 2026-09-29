'use client';

import {useEffect, useState} from 'react';
import {buildShortUrl, generateCode, normalizeUrl} from '@/lib/shorten';
import {addRecent, readRecent, type ShortLink} from '@/lib/storage';

type Mode = 'shorten' | 'qr';

function Icon({path}: {path: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  copy: 'M9 9h10v10H9zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1',
  check: 'M20 6 9 17l-5-5',
  visit: 'M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
  qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2z',
  share: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13',
};

export default function Shortener() {
  const [mode, setMode] = useState<Mode>('shorten');
  const [longUrl, setLongUrl] = useState('');
  const [result, setResult] = useState<ShortLink | null>(null);
  const [recent, setRecent] = useState<ShortLink[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    setRecent(readRecent());
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (mode === 'qr') return;
    const normalized = normalizeUrl(longUrl);
    if (!normalized) {
      setError('Informe uma URL válida (ex.: exemplo.com).');
      return;
    }
    setError('');
    const code = generateCode();
    const link: ShortLink = {
      code,
      longUrl: normalized,
      shortUrl: buildShortUrl(code),
      createdAt: Date.now(),
    };
    setResult(link);
    setRecent(addRecent(link));
  }

  function shortenAnother() {
    setResult(null);
    setLongUrl('');
    setError('');
    setCopied('');
  }

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(''), 1500);
    } catch {
      /* clipboard bloqueado — ignora */
    }
  }

  function visit(link: ShortLink) {
    window.open(link.shortUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="card" aria-label="Encurtador de URL">
      <div className="cardGrid">
        <div className="cardMain">
          <div className="tabs" role="tablist" aria-label="Modo">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'shorten'}
              className={mode === 'shorten' ? 'tab tab--active' : 'tab'}
              onClick={() => setMode('shorten')}>
              Shorten a Link
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'qr'}
              className={mode === 'qr' ? 'tab tab--active' : 'tab'}
              onClick={() => setMode('qr')}>
              Generate QR Code
            </button>
          </div>

          {mode === 'qr' ? (
            <p className="placeholder">
              QR Code chega numa próxima versão. Por enquanto, use “Shorten a
              Link”.
            </p>
          ) : result ? (
            <div className="result">
              <div className="field">
                <label htmlFor="short-link">Short link</label>
                <div className="inputRow">
                  <input
                    id="short-link"
                    readOnly
                    value={result.shortUrl}
                    onFocus={(e) => e.currentTarget.select()}
                  />
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => copy(result.shortUrl, 'result')}>
                    <Icon path={copied === 'result' ? ICONS.check : ICONS.copy} />
                    {copied === 'result' ? 'Copiado' : 'Copy'}
                  </button>
                </div>
              </div>

              <p className="muted small">
                Original:{' '}
                <a href={result.longUrl} target="_blank" rel="noopener noreferrer">
                  {result.longUrl}
                </a>
              </p>

              <div className="actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => visit(result)}>
                  <Icon path={ICONS.visit} />
                  Visit URL
                </button>
                <button type="button" className="btn" disabled title="Em breve">
                  <Icon path={ICONS.qr} />
                  QR
                </button>
                <button type="button" className="btn" disabled title="Em breve">
                  <Icon path={ICONS.share} />
                  Share
                </button>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={shortenAnother}>
                  Shorten Another Link
                </button>
              </div>
            </div>
          ) : (
            <form className="shortenForm" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="long-url">Long URL</label>
                <input
                  id="long-url"
                  type="text"
                  inputMode="url"
                  autoComplete="off"
                  placeholder="https://exemplo.com/uma-url-bem-longa"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  aria-invalid={Boolean(error)}
                />
              </div>
              {error ? <p className="error">{error}</p> : null}
              <button type="submit" className="btn btn--primary btn--block">
                Shorten a Link
              </button>
            </form>
          )}
        </div>

        <aside className="cardSide">
          <section className="recent" aria-label="Seus links recentes">
            <h2 className="recentTitle">Your Recent Links</h2>
            {recent.length === 0 ? (
              <p className="muted small">
                Nada por aqui ainda. Encurte um link e ele aparece nesta lista.
              </p>
            ) : (
              <ul className="recentList">
                {recent.map((link) => (
                  <li key={link.code} className="recentItem">
                    <div className="recentInfo">
                      <span className="recentLong">{link.longUrl}</span>
                      <span className="recentShort">{link.shortUrl}</span>
                    </div>
                    <div className="recentActions">
                      <button
                        type="button"
                        className="btn btn--sm"
                        onClick={() => visit(link)}>
                        <Icon path={ICONS.visit} />
                        Visit
                      </button>
                      <button
                        type="button"
                        className="btn btn--sm"
                        onClick={() => copy(link.shortUrl, link.code)}>
                        <Icon
                          path={copied === link.code ? ICONS.check : ICONS.copy}
                        />
                        {copied === link.code ? 'Copiado' : 'Copy'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>
    </section>
  );
}

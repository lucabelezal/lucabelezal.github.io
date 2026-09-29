'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {findByCode} from '@/lib/storage';

export default function RedirectPage() {
  const params = useParams<{code: string}>();
  const code = params?.code;
  const [status, setStatus] = useState<'loading' | 'notfound'>('loading');

  useEffect(() => {
    if (!code) {
      setStatus('notfound');
      return;
    }
    const link = findByCode(code);
    if (link) {
      window.location.replace(link.longUrl);
    } else {
      setStatus('notfound');
    }
  }, [code]);

  if (status === 'loading') {
    return (
      <main className="container center">
        <p className="muted">Redirecionando…</p>
      </main>
    );
  }

  return (
    <main className="container center">
      <h1>Link não encontrado</h1>
      <p className="muted">
        Este encurtador guarda os links no seu navegador. Abra o link no mesmo
        navegador em que ele foi criado.
      </p>
      <Link className="btn btn--primary" href="/">
        Voltar ao início
      </Link>
    </main>
  );
}

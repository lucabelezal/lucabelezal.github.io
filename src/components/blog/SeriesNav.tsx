import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

type Item = {title: string; href: string};

type Props = {
  seriesName?: string;
  prev?: Item;
  next?: Item;
};

export default function SeriesNav({seriesName, prev, next}: Props) {
  return (
    <nav className="seriesNav" aria-label={seriesName ?? 'Série'}>
      {seriesName && <div className="seriesNav__series">{seriesName}</div>}
      <div className="seriesNav__links">
        <div className="seriesNav__item seriesNav__item--prev">
          {prev ? (
            <Link to={prev.href}>
              ← <Translate id="seriesNav.previous">Anterior</Translate>
              <br />
              {prev.title}
            </Link>
          ) : (
            <span className="seriesNav__empty">—</span>
          )}
        </div>
        <div className="seriesNav__item seriesNav__item--next">
          {next ? (
            <Link to={next.href}>
              <Translate id="seriesNav.next">Próximo</Translate> →
              <br />
              {next.title}
            </Link>
          ) : (
            <span className="seriesNav__empty">—</span>
          )}
        </div>
      </div>
    </nav>
  );
}

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  label?: string;
};

export default function Pager({page, totalPages, onChange, label}: Props) {
  if (totalPages <= 1) return null;
  return (
    <nav className="pager" aria-label={label ?? 'Paginação'}>
      <button
        type="button"
        className="pagerButton"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}>
        &larr; Anterior
      </button>
      <span className="pagerInfo">
        página {page} de {totalPages}
      </span>
      <button
        type="button"
        className="pagerButton"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}>
        Próxima &rarr;
      </button>
    </nav>
  );
}

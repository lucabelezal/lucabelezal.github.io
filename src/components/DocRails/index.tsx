import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useTOCHighlight} from '@docusaurus/theme-common/internal';
import {
  useDocsSidebar,
  isActiveSidebarItem,
} from '@docusaurus/plugin-content-docs/client';
import type {PropSidebarItem} from '@docusaurus/plugin-content-docs';
import {areaHomeHref} from '@site/src/utils/areas';

export type TocHeading = {id: string; value: string; level: number};

const TOC_LINK = 'tocLink';
const TOC_ACTIVE = 'tocLink--active';

function renderSidebarItem(
  item: PropSidebarItem,
  activePath: string,
  index?: number,
): ReactNode {
  if (item.type === 'category') {
    return (
      <li key={`cat-${item.label}`}>
        <span className="railGroup">{item.label}</span>
        <ul className="railNav">
          {item.items.map((child) => renderSidebarItem(child, activePath))}
        </ul>
      </li>
    );
  }
  if (item.type === 'link') {
    const active = isActiveSidebarItem(item, activePath);
    return (
      <li key={item.href ?? item.label}>
        <Link to={item.href} aria-current={active ? 'page' : undefined}>
          {item.label}
          {index !== undefined ? (
            <span className="railCount">{String(index + 1).padStart(2, '0')}</span>
          ) : null}
        </Link>
      </li>
    );
  }
  return null;
}

// Rail esquerdo dentro de um capítulo: guia da área + caminho de volta.
export function AreaNav() {
  const sidebar = useDocsSidebar();
  const {pathname} = useLocation();
  if (!sidebar || sidebar.items.length === 0) return null;

  const home = areaHomeHref(pathname);

  return (
    <nav className="railCard" aria-label="Nesta área">
      <p className="railTitle">Nesta área</p>
      {home ? (
        <Link className="railBack" to={home}>
          <span aria-hidden="true">←</span> Visão geral
        </Link>
      ) : null}
      <ul className="railNav">
        {sidebar.items.map((item, i) => renderSidebarItem(item, pathname, i))}
      </ul>
    </nav>
  );
}

type Group = {heading: TocHeading; children: TocHeading[]};

// Agrupa os headings em h2 (seção) e h3 (subseção do h2 anterior).
function groupHeadings(toc: readonly TocHeading[]): Group[] {
  const groups: Group[] = [];
  for (const heading of toc) {
    if (heading.level <= 2 || groups.length === 0) {
      groups.push({heading, children: []});
    } else {
      groups[groups.length - 1].children.push(heading);
    }
  }
  return groups;
}

// Rail direito dentro de um capítulo: sumário das seções, com destaque da
// seção visível (scroll-spy do Docusaurus).
export function SectionSummary({
  toc,
  hidden,
}: {
  toc: readonly TocHeading[];
  hidden?: boolean;
}) {
  useTOCHighlight({
    linkClassName: TOC_LINK,
    linkActiveClassName: TOC_ACTIVE,
    minHeadingLevel: 2,
    maxHeadingLevel: 3,
  });

  if (hidden || toc.length === 0) return null;
  const groups = groupHeadings(toc);

  return (
    <nav className="railCard railCard--toc" aria-label="Sumário">
      <p className="railTitle">Sumário</p>
      <ul className="railNav tocNav">
        {groups.map((group) => (
          <li key={group.heading.id}>
            <a className={TOC_LINK} href={`#${group.heading.id}`}>
              {group.heading.value}
            </a>
            {group.children.length > 0 ? (
              <ul className="railNav tocNav">
                {group.children.map((child) => (
                  <li key={child.id}>
                    <a className={TOC_LINK} href={`#${child.id}`}>
                      {child.value}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}

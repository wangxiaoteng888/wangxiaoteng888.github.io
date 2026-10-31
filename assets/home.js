(() => {
  'use strict';
  const catalog = window.TENSOR_LAB_CATALOG;
  const container = document.getElementById('catalog-groups');
  if (!catalog || !container) return;
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  for (const group of catalog) {
    const section = element('section', 'topic');
    const intro = element('div', 'topic-intro');
    const heading = element('div', 'topic-heading');
    const title = element('h3', '', group.title);
    title.id = 'topic-' + group.id;
    section.setAttribute('aria-labelledby', title.id);
    heading.append(element('span', 'topic-number', group.number), title);
    intro.append(heading, element('p', 'topic-subtitle', group.subtitle), element('p', 'topic-description', group.description));
    const list = element('div', 'topic-pages');
    for (const page of group.pages) {
      const link = element('a', 'page-row');
      link.href = page.path;
      const copy = element('span');
      copy.append(element('span', 'page-title', page.title), element('span', 'page-description', page.description));
      const arrow = element('span', 'page-arrow', '↗');
      arrow.setAttribute('aria-hidden', 'true');
      link.append(copy, element('span', 'page-type', page.type), arrow);
      list.append(link);
    }
    section.append(intro, list);
    container.append(section);
  }
  document.getElementById('catalog-count').textContent = `${catalog.length} 个主题 / ${catalog.reduce((sum, group) => sum + group.pages.length, 0)} 个页面`;
})();

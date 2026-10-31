(() => {
  'use strict';
  const catalog = window.TENSOR_LAB_CATALOG;
  if (!catalog || document.querySelector('tensor-navigation')) return;
  const root = new URL('../', document.currentScript.src);
  const current = document.body.dataset.labPage || 'home';
  const href = path => new URL(path, root).href;
  const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  const pages = catalog.flatMap(group => group.pages);
  const currentPage = pages.find(page => page.id === current);
  // 独立的 Shadow DOM 避免各教程原有的样式影响目录。
  const content = document.createElement('div');
  content.className = 'lab-content';
  for (const child of [...document.body.childNodes]) content.append(child);
  document.body.append(content);
  let main = content.querySelector('main');
  if (!main) main = content;
  if (!main.id) main.id = 'lab-main';
  if (!main.hasAttribute('tabindex')) main.tabIndex = -1;
  const skip = document.createElement('a');
  skip.className = 'lab-skip-link';
  skip.href = '#' + main.id;
  skip.textContent = '跳到正文';
  document.body.prepend(skip);
  const host = document.createElement('tensor-navigation');
  const shadow = host.attachShadow({ mode: 'open' });
  const logo = '<span class="logo" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';
  const groups = catalog.map(group => `<section class="nav-group" aria-labelledby="group-${escape(group.id)}"><h2 id="group-${escape(group.id)}"><span>${escape(group.number)}</span> ${escape(group.title)} <small>${escape(group.subtitle)}</small></h2>${group.pages.map(page => `<a class="page-link" href="${escape(href(page.path))}"${page.id === current ? ' aria-current="page"' : ''}><span class="page-dot" aria-hidden="true"></span><span>${escape(page.title)}</span>${page.id === current ? '<span class="current-mark" aria-hidden="true">↗</span>' : ''}</a>`).join('')}</section>`).join('');
  shadow.innerHTML = `
    <style>
      :host{font:14px/1.5 'Segoe UI','Microsoft YaHei',sans-serif;color:#203b32;--green:#17634f;--muted:#7a867e;--line:#dde3da}
      *{box-sizing:border-box}a{color:inherit;text-decoration:none}button{font:inherit;cursor:pointer}a:focus-visible,button:focus-visible{outline:3px solid #ad582b;outline-offset:3px}
      .sidebar{position:fixed;inset:0 auto 0 0;width:264px;z-index:40;background:#fafbf6;border-right:1px solid var(--line);display:flex;flex-direction:column;padding:30px 18px 18px}
      .brand{display:flex;align-items:center;gap:12px;padding:0 12px 28px}.brand strong{display:block;font-size:21px;letter-spacing:.02em;font-weight:700}.brand small{display:block;color:var(--muted);font:10px/1.7 Consolas,monospace;letter-spacing:.16em;margin-top:3px}
      .logo{width:29px;height:29px;display:grid;grid-template-columns:1fr 1fr;gap:4px;flex-shrink:0}.logo i{background:var(--green);border-radius:1px}.logo i:last-child{background:#b9784c}
      nav{overflow-y:auto;flex:1;scrollbar-width:thin;padding:3px 2px 18px}.overview{display:flex;align-items:center;gap:11px;padding:11px 13px;border-radius:5px;font-weight:600;margin:0 0 30px}.overview-icon{font-size:18px;line-height:1}.overview:hover,.page-link:hover{background:#edf1e8}
      [aria-current=page]{color:var(--green);background:#e4eee3!important}.nav-group{margin-bottom:27px}.nav-group h2{font-size:12px;margin:0 12px 10px;font-weight:700;display:flex;align-items:center;gap:7px}.nav-group h2>span{font:10px Consolas,monospace;color:#8d988e;margin-right:2px}.nav-group small{font-size:10px;color:var(--muted);font-weight:400;letter-spacing:.02em}
      .page-link{display:flex;align-items:center;gap:9px;min-height:39px;margin:3px 0;padding:10px 12px;border-radius:5px;font-size:12px;line-height:1.4}.page-link[aria-current]{font-weight:650}.page-dot{width:4px;height:4px;border-radius:50%;background:#b9c5b7;flex-shrink:0}.page-link[aria-current] .page-dot{background:var(--green)}.current-mark{margin-left:auto;color:var(--green)}
      .sidebar-footer{border-top:1px solid var(--line);padding:17px 12px 0}.footer-caption{font-size:11px;color:var(--muted);margin:0 0 10px}.discussion-link{display:flex;justify-content:space-between;font-size:12px;color:var(--green);padding-bottom:14px}.discussion-link:hover{text-decoration:underline}.repo-link{display:flex;align-items:center;justify-content:space-between;font:12px Consolas,monospace;color:#56695e}.repo-link:hover{color:var(--green)}
      .mobile-bar,.backdrop,.close{display:none}
      @media(max-width:980px){
        .mobile-bar{position:fixed;inset:0 0 auto;height:58px;background:#fafbf6;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 18px;z-index:45}.mobile-brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:15px}.mobile-brand .logo{width:21px;height:21px;gap:3px}.menu-button{display:flex;align-items:center;gap:7px;padding:7px 10px;border:1px solid #d3ddcf;border-radius:5px;background:transparent;color:var(--green);font-size:12px}
        .sidebar{width:min(300px,85vw);z-index:60;transform:translateX(-100%);transition:transform .2s ease;visibility:hidden;padding-top:28px}.sidebar.open{transform:translateX(0);visibility:visible}.brand{padding-right:30px}.close{display:block;position:absolute;right:16px;top:22px;border:0;background:transparent;font-size:24px;color:#66756a;padding:4px 8px}.backdrop:not([hidden]){display:block;position:fixed;inset:0;background:#1c302c66;border:0;z-index:55}.overview{margin-bottom:24px}
      }
      @media(prefers-reduced-motion:reduce){.sidebar{transition:none}}
      @media print{:host{display:none}}
    </style>
    <div class="mobile-bar"><a class="mobile-brand" href="${escape(href(''))}">${logo}张量实验室</a><button class="menu-button" aria-label="打开学习目录" aria-expanded="false" aria-controls="sidebar"><span aria-hidden="true">☰</span> 目录</button></div>
    <button class="backdrop" hidden aria-label="关闭学习目录" tabindex="-1"></button>
    <aside class="sidebar" id="sidebar" aria-label="张量实验室目录">
      <button class="close" aria-label="关闭学习目录">×</button>
      <a class="brand" href="${escape(href(''))}">${logo}<span><strong>张量实验室</strong><small>ATTENTION / TENSOR LAB</small></span></a>
      <nav aria-label="学习目录"><a class="overview" href="${escape(href(''))}"${current === 'home' ? ' aria-current="page"' : ''}><span class="overview-icon" aria-hidden="true">⊞</span> 实验室首页</a>${groups}</nav>
      <div class="sidebar-footer"><a class="discussion-link" href="#discussion">本页讨论 <span aria-hidden="true">↓</span></a><p class="footer-caption">从一个张量开始，理解每一步。</p><a class="repo-link" href="https://github.com/wangxiaoteng888/wangxiaoteng888.github.io" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></div>
    </aside>`;
  document.body.insertBefore(host, content);
  const sidebar = shadow.querySelector('.sidebar');
  const menu = shadow.querySelector('.menu-button');
  const close = shadow.querySelector('.close');
  const backdrop = shadow.querySelector('.backdrop');
  const mobile = matchMedia('(max-width: 980px)');
  let open = false;
  function setOpen(value, restoreFocus = true) {
    open = Boolean(value && mobile.matches);
    sidebar.classList.toggle('open', open);
    sidebar.inert = mobile.matches && !open;
    sidebar.toggleAttribute('aria-modal', open);
    if (open) { sidebar.setAttribute('role', 'dialog'); sidebar.setAttribute('aria-modal', 'true'); }
    else sidebar.removeAttribute('role');
    backdrop.hidden = !open;
    menu.setAttribute('aria-expanded', String(open));
    content.inert = open;
    skip.inert = open;
    shadow.querySelector('.mobile-bar').inert = open;
    document.body.classList.toggle('lab-menu-open', open);
    if (open) close.focus();
    else if (restoreFocus && mobile.matches) menu.focus();
  }
  menu.addEventListener('click', () => setOpen(true));
  close.addEventListener('click', () => setOpen(false));
  backdrop.addEventListener('click', () => setOpen(false));
  shadow.querySelector('.discussion-link').addEventListener('click', () => setOpen(false, false));
  mobile.addEventListener('change', () => setOpen(false, false));
  shadow.addEventListener('keydown', event => {
    if (!open) return;
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
    if (event.key === 'Tab') {
      const focusable = [...sidebar.querySelectorAll('a,button')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && shadow.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && shadow.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  setOpen(false, false);
  window.addEventListener('pageshow', () => setOpen(false, false));
  if (currentPage) document.title = currentPage.title.includes('张量实验室') ? currentPage.title : currentPage.title + ' · 张量实验室';
  const discussions = document.createElement('script');
  discussions.src = href('assets/discussions.js?v=20261031');
  document.head.append(discussions);
})();

(() => {
  'use strict';
  const content = document.querySelector('.lab-content');
  if (!content || document.querySelector('tensor-discussion')) return;
  const root = new URL('../', document.currentScript.src);
  const pageId = document.body.dataset.labPage || 'home';
  const page = (window.TENSOR_LAB_CATALOG || []).flatMap(group => group.pages).find(item => item.id === pageId);
  const repository = 'wangxiaoteng888/wangxiaoteng888.github.io';
  const allDiscussions = `https://github.com/${repository}/issues?q=label%3Asite-discussion`;
  const host = document.createElement('tensor-discussion');
  const shadow = host.attachShadow({ mode: 'open' });
  host.id = 'discussion';
  shadow.innerHTML = `
    <style>
      :host{display:block;max-width:1400px;margin:38px auto 42px;padding:0 4vw;box-sizing:border-box;color:#203b32;font:14px/1.7 'Segoe UI','Microsoft YaHei',sans-serif;scroll-margin-top:80px}
      *{box-sizing:border-box}h2,p{margin:0}a{color:#17634f;text-decoration:none}button{font:inherit;cursor:pointer}a:focus-visible,button:focus-visible{outline:3px solid #ad633b;outline-offset:4px}
      .discussion{border-top:2px solid #b7cab8;padding-top:25px}.heading{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:10px}.heading-title{display:flex;align-items:baseline;gap:13px}h2{font-size:24px;line-height:1.4;font-weight:650;letter-spacing:-.02em}.count{font:11px Consolas,'Microsoft YaHei',sans-serif;color:#7b8b7a;white-space:nowrap}.page-name{font-size:11px;color:#7c897d}.intro{font-size:13px;color:#6c7c70;margin-bottom:22px}
      .join-row{display:flex;align-items:center;justify-content:space-between;gap:22px;background:#edf2e8;border:1px solid #d6e0d0;border-radius:6px;padding:18px 20px}.join-title{display:block;font-size:14px;font-weight:600;margin-bottom:4px}.join-note{font-size:11px;color:#6e7d6b}.join-link{display:flex;align-items:center;gap:19px;padding:9px 15px;border-radius:4px;background:#17634f;color:#fffef9;white-space:nowrap;font-size:12px}.join-link:hover{background:#0f4c3c}
      .status{font-size:12px;color:#7a8878;padding:26px 0}.status:empty{display:none}.status.error{color:#946037}.empty{margin:24px 0;border:1px dashed #d2ddcc;border-radius:6px;padding:29px 20px;text-align:center;color:#748470}.empty-icon{font-size:25px;line-height:1.4;color:#94ac94;margin-bottom:8px}.empty strong{display:block;color:#536b57;font-weight:500;font-size:13px;margin-bottom:5px}.empty p{font-size:11px}.comments{list-style:none;padding:0;margin:23px 0 0}.comment{border:1px solid #dce3d5;border-radius:6px;background:#fffef9;margin-bottom:15px;padding:18px 20px}.comment-header{display:flex;align-items:center;gap:10px;font-size:12px;margin-bottom:13px}.avatar{display:flex;align-items:center;justify-content:center;background:#e5eee1;border-radius:50%;width:29px;height:29px;flex-shrink:0;font:600 13px Consolas,monospace;color:#3b6c4c}.author{font-weight:600}.author:hover{text-decoration:underline}.date{font-size:10px;color:#8b9684;margin-left:auto;white-space:nowrap}.comment-body{white-space:pre-wrap;overflow-wrap:anywhere;font-size:13px;line-height:1.9;max-height:420px;overflow:auto;color:#405244}.comment-original{display:inline-block;margin-top:12px;font-size:10px;color:#7a8b72}.comment-original:hover{text-decoration:underline}.foot{display:flex;align-items:center;justify-content:space-between;gap:15px;border-top:1px solid #dce3d5;padding-top:14px;font-size:10px;color:#889480}.foot a{color:#6b8165}.refresh{border:1px solid #d5dfce;border-radius:4px;background:transparent;color:#4e6e50;padding:5px 10px;font-size:11px}.refresh:hover{background:#eaf0e4}.refresh:disabled{cursor:wait;opacity:.55}.pagination{font-size:11px;margin:15px 0;color:#7b8874}
      @media(max-width:680px){:host{padding:0 5%;margin-top:26px}.discussion{padding-top:21px}.heading{align-items:start;gap:10px;flex-wrap:wrap}.heading-title{gap:10px}h2{font-size:22px}.intro{font-size:12px;margin-bottom:17px}.join-row{flex-direction:column;align-items:stretch;gap:14px;padding:17px}.join-link{justify-content:center}.join-title{font-size:13px}.comment{padding:15px}.comment-header{flex-wrap:wrap}.date{font-size:9px}.comment-body{font-size:12px}.foot{align-items:start}}
      @media print{:host{display:none}}
    </style>
    <section class="discussion" aria-labelledby="discussion-title">
      <div class="heading"><div class="heading-title"><h2 id="discussion-title">讨论区</h2><span class="count"></span></div><span class="page-name"></span></div>
      <p class="intro">这一步哪里没看懂？有什么补充或勘误？一起把问题聊清楚。</p>
      <div class="join-row"><div><span class="join-title">留下你的问题与想法</span><p class="join-note">使用 GitHub 账号发言，公开留言会显示在这里。</p></div><a class="join-link" target="_blank" rel="noopener noreferrer">参与讨论 <span aria-hidden="true">↗</span></a></div>
      <p class="status" role="status" aria-live="polite">正在加载留言…</p>
      <div class="empty" hidden><div class="empty-icon" aria-hidden="true">↳</div><strong>还没有留言，来开启这一页的讨论吧。</strong><p>可以写下疑问、分享理解，或指出需要改进的地方。</p></div>
      <ol class="comments" aria-label="本页留言"></ol>
      <p class="pagination" hidden></p>
      <div class="foot"><span>本页独立讨论 · <a class="all-link" target="_blank" rel="noopener noreferrer">查看实验室全部讨论 ↗</a></span><button class="refresh" type="button">刷新留言</button></div>
    </section>`;
  content.append(host);
  if (location.hash === '#discussion') requestAnimationFrame(() => host.scrollIntoView({ block: 'start' }));
  const find = selector => shadow.querySelector(selector);
  const status = find('.status');
  const refresh = find('.refresh');
  const join = find('.join-link');
  find('.page-name').textContent = page ? page.title : '张量实验室 · 交流与建议';
  join.href = allDiscussions;
  find('.all-link').href = allDiscussions;
  let topic;
  let active = false;
  let observer;
  const cacheKey = `tensor-lab-discussion-v1:${repository}:${pageId}`;

  async function readJSON(url, github = false) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(url, {
        signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer',
        headers: github ? { Accept: 'application/vnd.github.text+json' } : {}
      });
      if (!response.ok) throw new Error('Discussion request failed: ' + response.status);
      return await response.json();
    } finally { clearTimeout(timer); }
  }
  let configPromise;
  function getConfig() {
    if (!configPromise) {
      configPromise = readJSON(new URL('assets/discussions.json', root).href)
        .then(config => {
          const item = config.topics && config.topics[pageId];
          if (config.repository !== repository || !Number.isSafeInteger(item?.number) || item.number < 1) throw new Error('Missing page discussion');
          topic = item;
          join.href = `https://github.com/${repository}/issues/${topic.number}#new_comment_field`;
        }).catch(error => { configPromise = undefined; throw error; });
    }
    return configPromise;
  }
  getConfig().catch(() => {});

  function render(data) {
    const total = Math.max(0, Number(data.total) || 0);
    const comments = data.comments.filter(comment => !comment.minimized);
    find('.count').textContent = `${total} 条留言`;
    find('.comments').replaceChildren();
    find('.empty').hidden = total !== 0;
    status.textContent = data.locked ? '此讨论已暂停接收新留言，仍可查看已有留言。' : '';
    join.textContent = data.locked ? '查看讨论 ↗' : '参与讨论 ↗';
    for (const comment of comments) {
      const entry = document.createElement('li');
      entry.className = 'comment';
      const header = document.createElement('div');
      header.className = 'comment-header';
      const login = comment.login || 'GitHub 用户';
      const avatar = document.createElement('span');
      avatar.className = 'avatar'; avatar.setAttribute('aria-hidden', 'true'); avatar.textContent = login.slice(0, 1).toUpperCase();
      const author = document.createElement('a');
      author.className = 'author'; author.textContent = login;
      author.href = `https://github.com/${encodeURIComponent(login)}`;
      author.target = '_blank'; author.rel = 'noopener noreferrer';
      const date = document.createElement('time');
      date.className = 'date';
      const timestamp = new Date(comment.created);
      if (!Number.isNaN(timestamp.getTime())) { date.dateTime = timestamp.toISOString(); date.textContent = timestamp.toLocaleString('zh-CN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
      header.append(avatar, author, date);
      const body = document.createElement('div');
      body.className = 'comment-body'; body.textContent = comment.text || '（此留言没有文本内容，可在 GitHub 查看。）';
      const original = document.createElement('a');
      original.className = 'comment-original'; original.textContent = '在 GitHub 查看与回复 ↗';
      original.href = `https://github.com/${repository}/issues/${topic.number}#issuecomment-${Number(comment.id) || 0}`;
      original.target = '_blank'; original.rel = 'noopener noreferrer';
      entry.append(header, body, original);
      find('.comments').append(entry);
    }
    const pagination = find('.pagination');
    pagination.hidden = total <= comments.length;
    pagination.textContent = `这里显示最近一页的 ${comments.length} 条留言，共 ${total} 条。更多内容可在 GitHub 讨论页查看。`;
  }

  async function load(force = false) {
    if (active) return;
    if (observer) observer.disconnect();
    active = true;
    refresh.disabled = true;
    refresh.textContent = '正在刷新…';
    status.classList.remove('error');
    status.textContent = '正在加载留言…';
    try {
      await getConfig();
      if (!force) {
        try {
          const cached = JSON.parse(sessionStorage.getItem(cacheKey));
          if (cached && cached.issue === topic.number && Date.now() - cached.saved < 90000 && Array.isArray(cached.comments)) { render(cached); return; }
        } catch { /* 缓存不可用时照常读取公开留言。 */ }
      }
      const api = `https://api.github.com/repos/${repository}/issues/${topic.number}`;
      const issue = await readJSON(api, true);
      const total = Math.max(0, Number(issue.comments) || 0);
      const lastPage = Math.max(1, Math.ceil(total / 30));
      const replies = total ? await readJSON(`${api}/comments?per_page=30&page=${lastPage}`, true) : [];
      const data = {
        issue: topic.number, total, locked: Boolean(issue.locked), saved: Date.now(),
        comments: replies.map(comment => ({ id: comment.id, login: comment.user?.login, created: comment.created_at, text: comment.body_text ?? comment.body, minimized: Boolean(comment.minimized) }))
      };
      render(data);
      try { sessionStorage.setItem(cacheKey, JSON.stringify(data)); } catch { /* 隐私模式和存储配额不影响讨论功能。 */ }
    } catch {
      status.classList.add('error');
      status.textContent = '暂时没能读取留言。你仍可点击“参与讨论”在 GitHub 查看或发言，也可以稍后刷新。';
    } finally {
      active = false;
      refresh.disabled = false;
      refresh.textContent = '刷新留言';
    }
  }
  refresh.addEventListener('click', () => load(true));
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) load(); }, { rootMargin: '300px' });
    observer.observe(host);
  } else load();
})();

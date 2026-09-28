const postsUrl = 'posts/index.json';
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const root = document.querySelector('#blog-root');

function escapeHtml(value) {
  return value.replace(/[&<>"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
}

function inlineMarkdown(text) {
  return escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function parseMarkdown(markdown) {
  const source = markdown.replace(/\r/g, '');
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  const frontmatter = {};
  if (match) match[1].split('\n').forEach((line) => {
    const [key, ...value] = line.split(':');
    if (value.length) frontmatter[key.trim()] = value.join(':').trim();
  });
  const lines = (match ? source.slice(match[0].length) : source).split('\n');
  const blocks = [];
  const headings = [];
  const special = (line) => /^(#{1,6} |```|---\s*$|[-*] |\d+\. |>|\||!\[)/.test(line);
  const cells = (line) => line.slice(1, -1).split('|').map((cell) => cell.trim());
  for (let i = 0; i < lines.length;) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    if (line.startsWith('```')) {
      const code = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) code.push(lines[i++]);
      i++;
      blocks.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
    } else if (/^#{1,6} /.test(line)) {
      const level = Math.min(3, Math.max(2, line.match(/^#+/)[0].length));
      const title = line.replace(/^#+\s*/, '');
      const id = `section-${headings.length + 1}`;
      headings.push({ id, level, title: title.replace(/[`*_]/g, '') });
      blocks.push(`<h${level} id="${id}">${inlineMarkdown(title)}</h${level}>`);
      i++;
    } else if (line === '---') {
      blocks.push('<hr />'); i++;
    } else if (/^!\[/.test(line)) {
      const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
      if (image) blocks.push(`<figure><img src="${image[2] === '/case_study/case-study2.jpg' ? 'images/card-tokenization.png' : escapeHtml(image[2])}" alt="${escapeHtml(image[1])}" /></figure>`);
      i++;
    } else if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(cells(lines[i++].trim()));
      const header = rows.shift();
      if (rows.length && rows[0].every((cell) => /^:?-+:?$/.test(cell))) rows.shift();
      blocks.push(`<div class="table-scroll"><table><thead><tr>${header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
    } else if (/^>/.test(line)) {
      const quote = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) quote.push(lines[i++].trim().replace(/^>\s?/, ''));
      blocks.push(`<blockquote>${inlineMarkdown(quote.join(' '))}</blockquote>`);
    } else if (/^([-*] |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const items = [];
      while (i < lines.length && /^([-*] |\d+\. )/.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^([-*] |\d+\. )/, ''));
      const tag = ordered ? 'ol' : 'ul';
      blocks.push(`<${tag}>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</${tag}>`);
    } else {
      const paragraph = [];
      while (i < lines.length && lines[i].trim() && !special(lines[i].trim())) paragraph.push(lines[i++].trim());
      blocks.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    }
  }
  return { frontmatter, html: blocks.join(''), headings };
}

function dateLabel(post) { return post.date ? dateFormat.format(new Date(`${post.date}T00:00:00`)) : String(post.year); }

async function renderArticle(post) {
  const response = await fetch(`posts/${post.slug}.md`);
  if (!response.ok) throw new Error('Post not found');
  const { frontmatter, html, headings } = parseMarkdown(await response.text());
  document.title = `${frontmatter.title} — Shivam Batra`;
  root.className = 'article section';
  const overview = headings.length ? `<nav class="article-overview" aria-label="Section overview"><p>On this page</p><ol>${headings.map((heading) => `<li class="overview-level-${heading.level}"><a href="#${heading.id}">${escapeHtml(heading.title)}</a></li>`).join('')}</ol></nav>` : '';
  root.innerHTML = `<div class="article-layout">${overview}<div class="article-main"><a class="back-link" href="blog.html">← All writing</a><p class="article-meta">${dateLabel(post)} · ${escapeHtml(post.topic)}</p><h1>${escapeHtml(frontmatter.title)}</h1><p class="lede">${escapeHtml(frontmatter.excerpt || frontmatter.lede || '')}</p><div class="article-body">${html}</div></div></div>`;
}

function renderList(posts) {
  const list = document.querySelector('#post-list');
  list.innerHTML = posts.map((post) => `<a class="markdown-post" href="blog.html?post=${encodeURIComponent(post.slug)}"><time>${dateLabel(post)}</time><div><h2>${escapeHtml(post.title)}</h2><p>${escapeHtml(post.description)}</p></div><span class="arrow">↗</span></a>`).join('');
}

async function start() {
  try {
    const response = await fetch(postsUrl);
    if (!response.ok) throw new Error('Post index unavailable');
    const posts = await response.json();
    const slug = new URLSearchParams(location.search).get('post');
    const post = posts.find((item) => item.slug === slug);
    if (slug && post) await renderArticle(post); else renderList(posts);
  } catch (error) {
    root.innerHTML = '<p class="intro">The blog needs to be opened from a local server or deployed site.</p>';
  }
}
start();

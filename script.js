const glow = document.querySelector('.cursor-glow');
const githubUser = 'shivambats';
window.addEventListener('pointermove', (event) => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; }, { passive: true });
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]); }
function shortDate(value) { return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value)); }
async function renderWritings() { const root = document.querySelector('#recent-writings'); try { const posts = await (await fetch('posts/index.json')).json(); root.innerHTML = posts.slice(0, 4).map((post) => `<a class="timeline-item" href="blog.html?post=${encodeURIComponent(post.slug)}"><time>${post.date ? shortDate(post.date).replace(',', '<br />') : post.year}</time><span class="timeline-dot"></span><div><h2>${escapeHtml(post.title)}</h2><span>${escapeHtml(post.description)}</span></div><i>↗</i></a>`).join(''); } catch { root.innerHTML = '<p class="loading-copy">Recent writings are unavailable right now.</p>'; } }
async function renderProjectUpdates() {
  const root = document.querySelector('#project-updates');
  try {
    const response = await fetch('data/project-updates.json');
    if (!response.ok) throw new Error('Project updates unavailable');
    const updates = await response.json();
    root.innerHTML = updates
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((update) => {
        const url = update.url && /^https?:\/\//.test(update.url) ? update.url : null;
        return `<article class="update-card"><div class="update-project"><span>${escapeHtml(update.mainProject)}</span><time datetime="${escapeHtml(update.date)}">${shortDate(update.date)}</time></div><div><p class="update-type">${escapeHtml(update.type)}</p><h3>${escapeHtml(update.title)}</h3><p>${escapeHtml(update.summary)}</p></div>${url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${escapeHtml(update.mainProject)}">↗</a>` : ''}</article>`;
      }).join('');
    if (!updates.length) root.innerHTML = '<p class="loading-copy">No project updates yet.</p>';
  } catch {
    root.innerHTML = '<p class="loading-copy">Project updates are unavailable right now.</p>';
  }
}
async function renderCommits() {
  const root = document.querySelector('#recent-commits');
  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=pushed`, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!response.ok) throw new Error('GitHub repositories unavailable');

    const repos = (await response.json()).filter((repo) => !repo.fork && !repo.archived).slice(0, 4);
    const results = await Promise.allSettled(repos.map(async (repo) => {
      const commitsResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/commits?author=${githubUser}&per_page=6`, {
        headers: { Accept: 'application/vnd.github+json' }
      });
      if (!commitsResponse.ok) throw new Error(`Commits unavailable for ${repo.full_name}`);
      return (await commitsResponse.json()).map((item) => ({
        repo: repo.full_name,
        sha: item.sha,
        url: item.html_url,
        date: item.commit.author?.date || item.commit.committer?.date,
        message: item.commit.message
      }));
    }));
    const commits = results.filter((result) => result.status === 'fulfilled')
      .flatMap((result) => result.value)
      .filter((commit) => commit.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);

    if (!commits.length) {
      root.innerHTML = `<p class="loading-copy">No public commits found. <a href="https://github.com/${githubUser}" target="_blank" rel="noopener noreferrer">View GitHub profile ↗</a></p>`;
      return;
    }
    root.innerHTML = commits.map((commit) => `<a class="commit-item" href="${escapeHtml(commit.url)}" target="_blank" rel="noopener noreferrer"><time>${shortDate(commit.date)}</time><div><p>${escapeHtml(commit.repo)}</p><h2>${escapeHtml(commit.message.split('\n')[0])}</h2></div><i>↗</i></a>`).join('');
  } catch {
    root.innerHTML = `<p class="loading-copy">GitHub is unavailable right now. <a href="https://github.com/${githubUser}" target="_blank" rel="noopener noreferrer">View GitHub profile ↗</a></p>`;
  }
}
renderWritings(); renderProjectUpdates(); renderCommits();

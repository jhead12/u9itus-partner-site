// Where a request on your domain is fetched from on U9itus.
//
// U9ITUS_PAGE_URL is your published page, e.g. https://u9itus.com/portal/your-company.
// "/" shows that page; every other path (the page's scripts, styles and images)
// comes from the same U9itus host. U9itus serves only your page and its files
// there, and sends any other path to U9itus itself.

export function pageUrl(env = process.env) {
  const raw = (env.U9ITUS_PAGE_URL || '').trim();
  if (!raw) return null;
  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) {
    return null;
  }
  if (!/^\/portal\/[a-z0-9-]+\/?$/.test(url.pathname)) return null;
  url.pathname = url.pathname.replace(/\/$/, '');
  url.search = '';
  url.hash = '';
  return url;
}

/** The U9itus URL to fetch for a path and query on your domain, or null when U9ITUS_PAGE_URL is unusable. */
export function targetFor(pathname, search, env = process.env) {
  const page = pageUrl(env);
  if (!page) return null;
  const target = new URL(pathname === '/' || pathname === '' ? page.pathname : pathname, page.origin);
  target.search = search || '';
  return target;
}

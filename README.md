# U9itus community page on your own domain

This small Next.js project shows your published U9itus community page on your own
address, such as `community.yourcompany.com`, through your own Vercel account. It has
no pages of its own: every request is fetched from U9itus, so the page is always the
one you last published, and there is nothing to rebuild or keep in sync. You can add
your own pages next to it later.

## Set it up

1. **Deploy.** Use the **Deploy to Vercel** button under *Your own domain* in the U9itus
   portal builder (or import this repository in Vercel). When Vercel asks for
   `U9ITUS_PAGE_URL`, paste your page address from that panel, for example
   `https://u9itus.com/portal/your-company`.
2. **Add your domain in Vercel.** Project → Settings → Domains. A subdomain is
   recommended: add a `CNAME` record at your DNS host (Vercel shows the exact value,
   usually `cname.vercel-dns.com`). It doesn't touch your main site or your email.
   For a whole domain, Vercel shows an `A` record instead.
3. **Tell U9itus the domain.** Enter it under *Your own domain* in the portal builder
   and save. U9itus only serves your page on a domain entered there, and tells search
   engines that address is the page's main one.

Your page must be published in U9itus. Until it is, or until the domain is saved
there, your domain shows a "not connected yet" page.

## How it works

`middleware.js` rewrites every request to the U9itus host from `U9ITUS_PAGE_URL`:
`/` goes to your page, and every other path (the page's scripts, styles and images)
to the same host. It sends the domain the visitor typed in the `X-U9itus-Site`
header. U9itus answers that domain only with your page and its files; any other path
redirects to U9itus itself.

No keys or secrets are stored here.

## Try it locally

```bash
npm install
U9ITUS_PAGE_URL=https://u9itus.com/portal/your-company npm run dev
npm test
```

Locally the visitor's domain is `localhost`, so U9itus answers "not connected" unless
the page's domain is set to a name that resolves to your machine.

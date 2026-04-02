export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const target = process.env.API_TARGET || 'http://localhost:3000';
  const apiKey = process.env.API_KEY;

  const proxyUrl = `${target}${url.pathname}${url.search}`;

  const headers = new Headers(req.headers);
  headers.set('x-api-key', apiKey);
  headers.delete('host');

  const res = await fetch(proxyUrl, {
    method: req.method,
    headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
  });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

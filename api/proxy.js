export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const target = process.env.API_TARGET || 'http://localhost:3000';
  const apiKey = process.env.API_KEY;

  const originalPath = url.searchParams.get('__path') || url.pathname;
  const search = new URLSearchParams(url.searchParams);
  search.delete('__path');
  const qs = search.toString() ? `?${search.toString()}` : '';
  const proxyUrl = `${target}${originalPath}${qs}`;

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

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

const API_TARGET = process.env.API_TARGET || 'http://localhost:3000';
const PORT = process.env.PORT || 8080;

// /v1/* をバックエンドAPIへプロキシ
app.use('/v1', createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
}));

// /health をバックエンドAPIへプロキシ
app.use('/health', createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
}));

// 静的ファイル配信
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`BFF server running on http://localhost:${PORT}`);
  console.log(`API proxy target: ${API_TARGET}`);
});

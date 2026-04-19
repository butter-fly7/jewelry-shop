const http = require('http');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const mime = {
  'html': 'text/html',
  'js': 'application/javascript',
  'css': 'text/css',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'svg': 'image/svg+xml',
  'ico': 'image/x-icon',
  'woff2': 'font/woff2',
  'woff': 'font/woff',
  'ttf': 'font/ttf',
  'json': 'application/json',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  let filePath = path.join(distDir, urlPath);

  // For SPA routing: if file doesn't exist, serve index.html
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).slice(1).toLowerCase();
  const contentType = mime[ext] || 'text/plain';

  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', 'no-cache');
  res.end(fs.readFileSync(filePath));
});

server.listen(3456, () => {
  console.log('Server running at http://localhost:3456');
});

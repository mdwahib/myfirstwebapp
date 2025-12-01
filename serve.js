const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8000;
const BASE_DIR = path.join(__dirname, 'src');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function sendFile(res, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(statusCode, {
    'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
  });
  fs.createReadStream(filePath).pipe(res);
}

function serveFallback(res) {
  const fallback = path.join(BASE_DIR, 'index.html');
  sendFile(res, fallback);
}

function handler(req, res) {
  const urlPath = req.url.split('?')[0];
  const requested = urlPath === '/' ? '/index.html' : urlPath;
  const target = path.join(BASE_DIR, requested);

  if (!target.startsWith(BASE_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(target, (err, stats) => {
    if (err || !stats.isFile()) {
      serveFallback(res);
      return;
    }

    sendFile(res, target);
  });
}

const server = http.createServer(handler);

server.listen(PORT, () => {
  console.log(`Serving src/ at http://localhost:${PORT}`);
});

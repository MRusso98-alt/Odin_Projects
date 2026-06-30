const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath;

  switch (req.url) {
    case '/':
      filePath = 'index.html';
      break;
    case '/about':
      filePath = 'about.html';
      break;
    case '/contact':
      filePath = 'contact-me.html';
      break;
    default:
      filePath = '404.html';
      res.statusCode = 404;
  }

  const fullPath = path.join(__dirname, filePath);

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      res.statusCode = 500;
      res.end('Server error');
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.end(content);
  });
});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080');
});
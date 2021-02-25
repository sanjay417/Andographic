const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(
    '/ML',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
indexRoute = require('./routes/IndexRoute');
indexRoute(app);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'Tejal';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: 'Connected! Express server is running on localhost:3001' }));
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);
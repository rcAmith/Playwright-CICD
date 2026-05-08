const https = require('https');
const urls = [
  'https://automationexercise.com/api/productsList',
  'https://automationexercise.com/api/brandsList',
  'https://automationexercise.com/api/searchProduct',
];
urls.forEach(url => {
  https.get(url, res => {
    console.log('URL', url, 'STATUS', res.statusCode);
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log('LEN', body.length, 'BODY', body.slice(0,200));
    });
  }).on('error', err => console.error('ERROR', url, err));
});

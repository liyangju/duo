const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Serve the index.html file in the "page" directory
app.use('/page', express.static(path.join(__dirname, 'page')));

// Serve the xm.json file in the "line" directory
app.use('/y', express.static(path.join(__dirname, 'line')));


const blackList = ['35.190.191.', '34.149.204.188', '129.146.231.214', '18.212.151.96', '76.76.21.21'];

app.get('/', async (req, res) => {
  console.log(req.socket.remoteAddress)


  const userAgent = req.headers['user-agent'];
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (blackList.includes(ip)) {
    return res.send('兄弟嘛呢！！！别扒了，直接复制食用不香吗?');
  }

  if (userAgent === 'okhttp/3.15' || userAgent === 'okhttp/5.0.0-alpha.10' || userAgent === 'okhttp/3.12.10' || userAgent === 'http/3.12.11' || userAgent === 'okhttp/3.12.13' || userAgent === 'okhttp/4.10.0' || userAgent === 'okhttp/4.11.0') {
    try {
      const { data } = await axios.get('/y/xm.json');
      res.send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('服务器错误');
    }
  } else {
    res.redirect('/page');
  }
});

app.listen(80, () => {
  console.log(`Server listening at http://127.0.0.1`);
});

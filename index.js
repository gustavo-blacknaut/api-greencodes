const express = require('express');
const uuid = require('uuid');
const axios = require('axios')
const fs = require('fs');
const app = express();
app.use(express.json());
function saveHTMLFile(html, tabCode) {fs.writeFile(`./paginas/${tabCode}.html`, html, function(error) {if (error) {console.error(error)}})}

function loadHTMLFile(tabCode, callback) {
  fs.readFile(`./paginas/${tabCode}.html`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    callback(data);
  });
}

app.post('/create-tab', (req, res) => {
  const tabCode = uuid.v4();
  saveHTMLFile(req.body.html, tabCode);
  res.send({ tabCode });
});

app.get('/transcript/:tabCode', (req, res) => {
  loadHTMLFile(req.params.tabCode, (html) => {
    res.send(html);
  });
});

app.listen(25524, () => {
  console.log(`Servidor iniciado na porta 25524`);
});


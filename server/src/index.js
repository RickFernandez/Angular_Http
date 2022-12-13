const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multiParty = require('connect-multiparty');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

const multiPartyMiddleware = multiParty({ uploadDir: './uploads' });
app.post('/upload', multiPartyMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({ message: files });
});

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(8000, () => {
  console.log('Servidor porta 8000');
});

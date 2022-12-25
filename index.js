const fs = require('fs').promises;
const express = require('express');
const { engine } = require('express-handlebars');
const app = express();

app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.listen(3000, console.log('¡Servidor encendido!'));
app.get('/', (req, res) => {
  res.render('home', { layout: false });
});

app.get('/canciones', async (req, res) => {
  const songs = await fs.readFile('./repertorio.json', 'utf8');
  res.json(JSON.parse(songs));
});
app.post('/canciones', async (req, res) => {
  const songs = await fs.readFile('./repertorio.json', 'utf8');
  const songsJson = JSON.parse(songs);
  songsJson.push(req.body);
  await fs.writeFile('./repertorio.json', JSON.stringify(songsJson, null, 2));
  res.json(JSON.parse(songs));
});
app.put('/canciones/:id', (req, res) => {
  res.json({});
});
app.delete(' /canciones/:id', (req, res) => {
  res.json({});
});

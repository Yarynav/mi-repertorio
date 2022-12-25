const fs = require('fs').promises;
const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const errorText =
  'Ha ocurrido un problema en el servidor, por favor intente más tarde si el problema persiste contactenos a través de nuestra área de soporte';

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
app.put('/canciones/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const songs = await fs.readFile('./repertorio.json', 'utf8');
    const songsJson = JSON.parse(songs);
    const editableSongIndex = songsJson.findIndex((e) => e.id == id);
    songsJson[editableSongIndex] = req.body;
    await fs.writeFile('./repertorio.json', JSON.stringify(songsJson, null, 2));
    res.json(songsJson);
  } catch {
    res.status(500).json({ error: errorText });
  }
});
app.delete(' /canciones/:id', (req, res) => {
  res.json({});
});

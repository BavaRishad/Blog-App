import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from 'body-parser';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get('/', (req, res) => {
  res.render('index.ejs', { posts });
});

app.get('/create', (req, res) => {
  res.render('create.ejs');
});

app.post('/create', (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: posts.length + 1, title, content, date: new Date().toLocaleDateString() });
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(post => post.id === parseInt(req.params.id));
  res.render('edit.ejs', { post });
});

app.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(post => post.id === parseInt(req.params.id));
  if (post){
    post.title = title;
    post.content = content;
    post.date =  new Date().toLocaleDateString() + " " + " " + '( Edited )' + " " + new Date().toLocaleTimeString();
  }
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  posts = posts.filter(post => post.id !== parseInt(req.params.id));
  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

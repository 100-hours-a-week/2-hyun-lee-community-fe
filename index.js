import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app =express()
const PORT = process.env.PORT || 8000;



app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/board', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'board.html'));
});

app.get('/create-post', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'create-post.html'));
});

app.get('/detail-post', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'detail-post.html'));
});

app.get('/edit-post', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'edit-post.html'));
});

app.get('/edit-user', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'edit-user.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/edit-user-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'edit-user-password.html'));
});



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
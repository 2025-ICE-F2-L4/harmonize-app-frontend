const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server works!');
});

app.get('/api', (req, res) => {
    res.json({ message: 'API works!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server works on http://localhost:${PORT}`);
});

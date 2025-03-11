const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// rutes 
app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log(`Corriendo en http://localhost:${PORT}`);
})
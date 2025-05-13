const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const songRoutes = require('./Routes/songRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', songRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
const express = require('express');
const { parseData } = require('./controller/index');

const app = express();
app.use(express.json())

const port = 3003;
app.listen(port, () => console.log(`Server running on port ${port}.`));

app.get('/top5', parseData);

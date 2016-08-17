const path = require('path');
const express = require('express');
const app = express();

const subdir = '/hn';

app.use(subdir, express.static(__dirname))

app.get(subdir, (request, response) => {
	response.render(path.join(__dirname, 'index.html'));
});

app.listen(3000);


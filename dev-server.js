const webpack = require('webpack');
const config = require('./webpack.config.js');
const dev = require('webpack-dev-middleware');
const hot = require('webpack-hot-middleware');
const express = require('express');

const compiler = webpack(config);
const app = express();

app.use(dev(compiler));
app.use(hot(compiler));

app.get('*', (req, res) => {
	if (req.url.endsWith('.js') && req.url !== '/index.js') {
		res.redirect('/index.js');
	} else {
		res.send(`Include <pre>${req.protocol}://${req.get('host')}/index.js</pre> in Monoltih.`);
	}
});

app.listen(3000, err => {
	if (err) {
		console.err(err); // eslint-disable-line no-console
	}
});

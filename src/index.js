import startGame from './start-game';

module.exports = ({ el, providedDependencies, models, translate, basePath }) => {
	const isProd = process.env.NODE_ENV === 'production';

	const canvas = document.createElement('canvas');
	canvas.setAttribute('id', 'game');
	canvas.setAttribute('width', '640px');
	canvas.setAttribute('height', '480px');
	canvas.style.position = 'fixed';
	canvas.style.left = 'calc(50% - 320px)';

	el.appendChild(canvas);

	fetch('/api/marketplace/v1/listing?filter=FEATURED')
		.then(resp => resp.json())
		.then(apps => startGame(apps));
};

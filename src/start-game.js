import './lib/rpgjs/Main';
import materials from './materials.json';
import database from './database.json';

const RPGJS = window.RPGJS;

function createMerchant(apps) {
	const e = RPGJS.Map.createEvent('EV-1', 7, 9);
	const choices = apps.slice(0, 10);
	const actions = choices
		.map((app, idx) => [
			`CHOICE_${idx}`,
			`SHOW_TEXT: {'text': 'Boi: Nice, ${app.name} is a pretty cool app developed by ${app.developerName}. I&quote;ll redirect you to it!'}`,
			`SCRIPT: {"text": "window.location.assign(&quote;/apps/${app.id}&quote;);"}`
		])
		.reduce((arr, choice) => arr.concat(choice), []);

	e.addPage({
		trigger: 'action_button',
		type: 'fixed',
		graphic: '2'
	}, [
		`CHOICES: ${JSON.stringify(choices.map(app => app.name))}`,
		...actions,
		'ENDCHOICES'
	]);

	e.display();
}

function createPeasant() {
	const e2 = RPGJS.Map.createEvent('EV-2', 9, 19);
	e2.addPage({
		trigger: 'action_button',
		type: 'fixed',
		graphic: '3'
	}, [
		'SHOW_TEXT: {"text": "Leonard: Hey man! Welcome to my town, my name is Senor Leonard Face."}',
		'SHOW_TEXT: {"text": "Leonard: There is some pretty interesting stuff going on around here, apparently a merchant has started selling subscription based cloud applications just north of here."}',
		'SHOW_TEXT: {"text": "Leonard: Her name is Lady Boi But On. Feel free to hit her up."}'
	]);
	e2.display();
}

function createPlayer() {
	RPGJS.Player.init({
		actor: 1,
		start: {
			x: 11,
			y: 19,
			id: 1
		}
	});
}

export default function startGame(apps) {
	RPGJS.Materials = materials;
	RPGJS.Database = database;

	RPGJS.defines({
		canvas: 'game',
		autoload: false,
		scene_path: '../'
	}).ready(() => {
		createPlayer();

		RPGJS.Scene.map(() => {
			createMerchant(apps);
			createPeasant();
		});
	});
}

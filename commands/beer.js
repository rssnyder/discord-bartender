module.exports = {
	name: 'beer',
	description: 'Beer!',
	execute(message, args) {
		const { stock, sayings } = require('./beer.json')
		message.reply(` one ${stock[Math.floor(Math.random()*stock.length)]}, ${sayings[Math.floor(Math.random()*stock.length)]} :beer:`);
	},
};

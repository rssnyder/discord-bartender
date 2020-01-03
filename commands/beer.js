module.exports = {
	name: 'beer',
	description: 'Beer!',
	execute(message, args, fs) {
		const admin = require('firebase-admin');
		const { stock, sayings } = require('./beer.json');

		// Get user information
		let tab = fs.collection(message.channel.guild.name).doc(`${message.author.username}${message.author.discriminator}`).collection('tab');

		let command = args[0];
		if (command === 'menu') {

			// Give them some options
			message.reply(` here's what we got: ${stock.toString()}`)
		} else if (stock.includes(command)) {

			let beer = command;

			// Change tab
			let time = new Date(Date.now());
			let chargeTab = tab.doc(`${Date.now()}`).set({
				'type': 'beer',
				'name': beer,
				'price': 2.50,
				'quantity': 1,
				'time': `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
			});
			
			// Deliver
			message.reply(` one ${beer}, ${sayings[Math.floor(Math.random()*stock.length)]} :beer:`);
		} else {
			
			// Unknown command
			message.reply(` couldn't really understand you, say again?`);
		}
	},
};

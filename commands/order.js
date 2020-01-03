module.exports = {
	name: 'order',
	description: 'Come on, drink a little!',
	execute(message, args, fs) {
		const admin = require('firebase-admin');
		const types = ["beer", "wine", "liquor"]
		const { beer, wine, liquor, mixers, sayings } = require('./stock.json');

		// Get user information
		let tab = fs.collection(message.channel.guild.name).doc(`${message.author.username}${message.author.discriminator}`).collection('tab');

		let command = args[0];
		if (command === 'menu') {

			// Give them some options
			message.reply(` here's what we got: ${beer.toString()}`);
		} else if (command === 'beer') {

			let type = args[1];
			if (beer.includes(type)) {
	
				// Change tab
				let time = new Date(Date.now());
				let chargeTab = tab.doc(`${Date.now()}`).set({
					'type': 'beer',
					'name': type,
					'price': 2.50,
					'quantity': 'pint',
					'time': `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
				});
				
				// Deliver
				message.reply(` one ${type}, ${sayings[Math.floor(Math.random()*sayings.length)]} :beer:`);
			} else {

				message.reply(" we don't carry that");
			}

		} else if (command === 'wine') {

			let type = args[1];
			if (wine.includes(type)) {
	
				// Change tab
				let time = new Date(Date.now());
				let chargeTab = tab.doc(`${Date.now()}`).set({
					'type': 'wine',
					'name': type,
					'price': 8.00,
					'quantity': 'glass',
					'time': `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
				});
				
				// Deliver
				message.reply(` one ${type}, ${sayings[Math.floor(Math.random()*sayings.length)]} :wine_glass:`);
			} else {

				message.reply(" too fancy for us, sorry");
			}

		} else if (command === 'liquor') {

			let type = args[1];
			if(liquor.includes(type)) {

				if (args.length > 2) {

					let mix = args[2]
					if(mixers.includes(mix)) {

						// Change tab
						let time = new Date(Date.now());
						let chargeTab = tab.doc(`${Date.now()}`).set({
							'type': 'mixed drink',
							'name': `${type} ${mix}`,
							'price': 4.00,
							'quantity': 'pint',
							'time': `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
						});
						
						// Deliver
						message.reply(` one ${type} ${mix}, ${sayings[Math.floor(Math.random()*sayings.length)]} :milk:`);
					} else {

						message.reply(" I've got the liquor, fresh out of the mixer tho");
					}
				} else {
		
					// Change tab
					let time = new Date(Date.now());
					let chargeTab = tab.doc(`${Date.now()}`).set({
						'type': 'shot',
						'name': type,
						'price': 2.00,
						'quantity': 'pour',
						'time': `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
					});
					
					// Deliver
					message.reply(` one shot of ${type}, ${sayings[Math.floor(Math.random()*sayings.length)]} :tumbler_glass:`);
				}
			} else {
				
				message.reply(" dont have that liquor here, sorry pal");
			}
		} 
	},
};

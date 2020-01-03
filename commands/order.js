module.exports = {
	name: 'order',
	description: 'Come on, drink a little!',
	execute(message, args, fs) {
		const admin = require('firebase-admin');
		const types = ["beer", "wine", "liquor"]
		const { beer, wine, liquor, mixers, sayings } = require('./stock.json');

		// Get user information
		let user = fs.collection(message.channel.guild.name).doc(`${message.author.username}${message.author.discriminator}`)
		let tab = user.collection('tab');

		// Set user to active
		let active = user.set({
			active: true
		}, {merge: true});

		// Check for open tab
		let tabStatus = user.get().then(function(doc) {
			let billAmount = doc.data().bill
			if (billAmount > 0.0) {

				// There is already a bill
				message.reply(` your closed bill is $${billAmount}. Please pay before ordering more.`)
			} else {

				let command = args[0];
				if (command === 'beer') {

					let type = args[1];
					if (beer.includes(type)) {
			
						// Charge tab
						let now = Date.now()
						let time = new Date(now);
						let chargeTab = tab.doc(`${now}`).set({
							'type': 'beer',
							'name': type,
							'price': 2.50,
							'quantity': 'pint',
							'paid' : false,
							'time': `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
							'id': now
						});
						
						// Deliver
						message.reply(` one ${type}, ${sayings[Math.floor(Math.random()*sayings.length)]} :beer:`);
					} else if (type === 'menu') {

						message.reply(` here's what we got: ${beer.toString()}`);
					} else {

						message.reply(" we don't carry that");
					}

				} else if (command === 'wine') {

					let type = args[1];
					if (wine.includes(type)) {
			
						// Charge tab
						let now = Date.now()
						let time = new Date(now);
						let chargeTab = tab.doc(`${now}`).set({
							'type': 'wine',
							'name': type,
							'price': 8.00,
							'quantity': 'glass',
							'paid' : false,
							'time': `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
							'id': now
						});
						
						// Deliver
						message.reply(` one ${type}, ${sayings[Math.floor(Math.random()*sayings.length)]} :wine_glass:`);
					} else if (type === 'menu') {

						message.reply(` here's what we got: ${wine.toString()}`);
					} else {

						message.reply(" too fancy for us, sorry");
					}

				} else if (command === 'liquor') {

					let type = args[1];
					if(liquor.includes(type)) {

						if (args.length > 2) {

							let mix = args[2]
							if(mixers.includes(mix)) {

								// Charge tab
								let now = Date.now()
								let time = new Date(now);
								let chargeTab = tab.doc(`${now}`).set({
									'type': 'mixed drink',
									'name': `${type} ${mix}`,
									'price': 4.00,
									'quantity': 'pint',
									'paid' : false,
									'time': `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
									'id': now
								});
								
								// Deliver
								message.reply(` one ${type} ${mix}, ${sayings[Math.floor(Math.random()*sayings.length)]} :milk:`);
							} else {

								message.reply(" I've got the liquor, fresh out of the mixer tho");
							}
						} else {
				
							// Charge tab
							let now = Date.now()
							let time = new Date(now);
							let chargeTab = tab.doc(`${now}`).set({
								'type': 'shot',
								'name': type,
								'price': 2.00,
								'quantity': 'pour',
								'paid' : false,
								'time': `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
								'id': now
							});
							
							// Deliver
							message.reply(` one shot of ${type}, ${sayings[Math.floor(Math.random()*sayings.length)]} :tumbler_glass:`);
						}
					} else if (type === 'menu') {

						message.reply(` here's what we got: ${liquor.toString()}\n and the mixers we carry are: ${mixers.toString()}`);
					} else {
						
						message.reply(" dont have that liquor here, sorry pal");
					}
				} 
			}
		});
	},
};

module.exports = {
	name: 'tab',
	description: 'Pay up!',
	execute(message, args, fs) {
		const admin = require('firebase-admin');
		const coin = require("coinkey")
		const coinInfo = require('coininfo')
		const bs58check = require('bs58check')
		const Table = require('easy-table')
		const https = require('https');

		// Get user information
		let user = fs.collection(message.channel.guild.name).doc(`${message.author.username}${message.author.discriminator}`)

		let command = args[0];
		if (command === 'show') {

			// Get unpaid items on tab
            let open = user.collection('tab').where('paid', '==', false).get().then(snapshot => {
                if (snapshot.empty) {

                    message.reply(' you are all paid up my friend');
                    return
                } else {

					// Build table for tab display
					const docs = snapshot.docs.map(doc => doc.data());
					var t = new Table
					let total = 0.0
					docs.forEach(function(product) {
						console.log(product)
						t.cell('Date', product.time)
						t.cell('Description', product.name)
						t.cell('Price, DOGE', product.price, Table.number(2))
						total += product.price
						t.newRow()
					})

					message.reply(`\n\`\`\`${t.toString()}\nTotal: ${total}D\`\`\`\n\n`)
				}  
            
                
            }).catch(err => {

				message.reply(' I cant seem to find you in the system, check back later');
				throw new Error(err.message)
            });
		} else if (command === 'pay') {
			
			// Calculate total of unpaid items
			let open = user.collection('tab').where('paid', '==', false).get().then(snapshot => {
                if (snapshot.empty) {

                    message.reply(' you are all paid up my friend');
                    return
                } else {

					// Calculate tab total
					let docs = snapshot.docs.map(doc => doc.data());
					let total = 0.0
					docs.forEach(function(product) {
						total += product.price
					})

					// Get current user information
					let thing = ''
					let userData = user.get().then(function(doc) {
						let billAmount = doc.data().bill
						if (billAmount > 0.0) {

							// There is already a bill, look for payment
							let address = doc.data().paymentAddress
							https.get(`https://dogechain.info/api/v1/address/balance/${address}`, (resp) => {
								let data = '';
								// A chunk of data has been recieved.
								resp.on('data', (chunk) => {
									data += chunk;
								});

								// The whole response has been received. Print out the result.
								resp.on('end', () => {
									let balance = JSON.parse(data).balance;
									if (balance >= billAmount) {

										// Bill has been paid
										message.reply(" your payment was recived, hope you had a good time!")

										// Set user balance to 0
										user.set({
											bill: 0,
											paymentAddress: 'none'
										}, {merge: true});

										// Calculate tab total
										let docs = snapshot.docs.map(doc => doc.data());
										let total = 0.0
										docs.forEach(function(product) {
											product.price
											let item = user.collection('tab').doc(`${product.id}`);
											let change = item.set({
												paid: true
											}, {merge: true});
										});
									} else {

										message.reply(` your closed bill is ${billAmount}.\nAddress for payment (dogecoin): \`${address}\``)
									}
								});

							}).on("error", (err) => {
								message.reply(' our system is down, check back later');
							});
						} else {

							// Generate payment address
							var dogeInfo = coinInfo('DOGE').versions
							var ck = new coin.createRandom(dogeInfo)

							const importKey = ck.privateWif
							const privateKey = ck.privateKey.toString('hex')
							const publicAddress = ck.publicAddress

							let bank = fs.collection('Addresses').doc(publicAddress)
							bank.set({
								public: publicAddress,
								private: privateKey,
								import: importKey
							});
							message.reply("bank write computed")
							user.set({
								bill: total,
								paymentAddress: publicAddress
							  }, {merge: true});
							message.reply(` I have closed your tab, your total is ${total}. You will be unable to order more drinks until this is paid\nAddress for payment (dogecoin): \`${publicAddress}\``)
						}
					});
				}  
            
                
            }).catch(err => {
				message.reply(' I cant seem to find you in the system, check back later');
				throw new Error(err.message)
				
            });
		} else {
			
			// Unknown command
			message.reply(` couldn't really understand you, say again?`);
		}
	},
};
